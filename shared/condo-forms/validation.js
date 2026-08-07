/**
 * @typedef {import('./types').FormSchema} FormSchema
 * @typedef {import('./types').FormField} FormField
 * @typedef {import('./types').FormAnswers} FormAnswers
 * @typedef {import('./types').FieldError} FieldError
 * @typedef {import('./types').FieldValue} FieldValue
 */

/**
 * @param {FormSchema} schema
 * @returns {FormField[]}
 */
export function getAllFields(schema) {
  return schema.sections.flatMap((section) => section.fields);
}

/**
 * @param {FormSchema} schema
 * @param {string} id
 * @returns {FormField | undefined}
 */
export function findField(schema, id) {
  return getAllFields(schema).find((field) => field.id === id);
}

/**
 * Whether a conditional field should be shown given current answers.
 * @param {FormField} field
 * @param {FormAnswers} answers
 * @returns {boolean}
 */
export function isFieldVisible(field, answers) {
  if (!field.showWhen) return true;
  const current = answers[field.showWhen.field];
  if (Array.isArray(current)) {
    return field.showWhen.equals.some((v) => typeof v === 'string' && current.includes(v));
  }
  return field.showWhen.equals.some((v) => v === current);
}

/**
 * @param {FieldValue | undefined} value
 * @returns {boolean}
 */
function isEmpty(value) {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'boolean') return value === false;
  return false;
}

/**
 * Validates answers against the schema. Runs identically on client and server
 * so the server never trusts client-side checks alone.
 * @param {FormSchema} schema
 * @param {FormAnswers} answers
 * @returns {FieldError[]}
 */
export function validateForm(schema, answers) {
  /** @type {FieldError[]} */
  const errors = [];

  for (const field of getAllFields(schema)) {
    if (field.fixedValue !== undefined) continue;
    if (!isFieldVisible(field, answers)) continue;

    const value = answers[field.id];

    if (field.required && isEmpty(value)) {
      errors.push({ field: field.id, message: `${field.label} is required.` });
      continue;
    }

    if (isEmpty(value)) continue;

    if (typeof value === 'string') {
      if (field.maxLength && value.length > field.maxLength) {
        errors.push({
          field: field.id,
          message: `${field.label} must be ${field.maxLength} characters or fewer.`,
        });
      }
      if (field.pattern) {
        let re = null;
        try {
          re = new RegExp(field.pattern);
        } catch {
          re = null;
        }
        if (re && !re.test(value)) {
          errors.push({
            field: field.id,
            message: field.patternMessage ?? `${field.label} is not in the expected format.`,
          });
        }
      }
      if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.push({ field: field.id, message: `${field.label} must be a valid email address.` });
      }
    }

    if ((field.type === 'select' || field.type === 'radio') && field.options && typeof value === 'string') {
      if (!field.options.some((opt) => opt.value === value)) {
        errors.push({ field: field.id, message: `${field.label} has an invalid selection.` });
      }
    }

    if (field.type === 'checkbox-group' && field.options && Array.isArray(value)) {
      const allowed = new Set(field.options.map((opt) => opt.value));
      if (value.some((v) => !allowed.has(v))) {
        errors.push({ field: field.id, message: `${field.label} has an invalid selection.` });
      }
    }
  }

  return errors;
}
