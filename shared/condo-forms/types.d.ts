export type FieldType =
  | 'text'
  | 'textarea'
  | 'date'
  | 'email'
  | 'tel'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'checkbox-group';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldCondition {
  /** id of another field in the same schema */
  field: string;
  /** show this field only when the other field's value equals one of these */
  equals: Array<string | boolean>;
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  /** Plain-language help shown under the field. */
  guidance?: string;
  placeholder?: string;
  /** For select / radio / checkbox-group. */
  options?: FieldOption[];
  /** Regex source string validated on client and server. */
  pattern?: string;
  patternMessage?: string;
  maxLength?: number;
  /** Layout hint inside a section's two-column grid. */
  colSpan?: 1 | 2;
  defaultValue?: FieldValue;
  /** Prefilled, read-only value baked into the form (e.g. Province: Ontario). */
  fixedValue?: string;
  /** Conditional display. */
  showWhen?: FieldCondition;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  /** Advanced/rare section — rendered collapsed by default. */
  advanced?: boolean;
  fields: FormField[];
}

export interface FormSchema {
  slug: string;
  title: string;
  formNumber?: string;
  authority: string;
  /** Filename of the official blank PDF each app stores for download. */
  officialPdf: string;
  officialSourceUrl: string;
  /** Base filename (no extension) for the generated, filled PDF. */
  outputFileName: string;
  /** Short instruction shown at the top of the guided filler. */
  intro?: string;
  /** Note about signatures / manual steps shown before submit. */
  signatureNote?: string;
  sections: FormSection[];
}

export type FieldValue = string | string[] | boolean;

export type FormAnswers = Record<string, FieldValue | undefined>;

export interface FieldError {
  field: string;
  message: string;
}
