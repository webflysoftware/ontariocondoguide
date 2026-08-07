import { requestForRecords } from './request-for-records.js';
import { proxyForm } from './proxy-form.js';

export { getAllFields, findField, isFieldVisible, validateForm } from './validation.js';

/** @type {import('./types').FormSchema[]} */
export const FORM_SCHEMAS = [requestForRecords, proxyForm];

/**
 * @param {string} slug
 * @returns {import('./types').FormSchema | undefined}
 */
export function getFormSchema(slug) {
  return FORM_SCHEMAS.find((schema) => schema.slug === slug);
}

/**
 * @returns {import('./types').FormSchema[]}
 */
export function getAllFormSchemas() {
  return FORM_SCHEMAS;
}
