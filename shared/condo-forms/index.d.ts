import type { FormSchema } from './types';

export * from './types';
export { getAllFields, findField, isFieldVisible, validateForm } from './validation';

export declare const FORM_SCHEMAS: FormSchema[];
export declare function getFormSchema(slug: string): FormSchema | undefined;
export declare function getAllFormSchemas(): FormSchema[];
