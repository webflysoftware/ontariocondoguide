import type { FormSchema, FormField, FormAnswers, FieldError } from './types';

export function getAllFields(schema: FormSchema): FormField[];
export function findField(schema: FormSchema, id: string): FormField | undefined;
export function isFieldVisible(field: FormField, answers: FormAnswers): boolean;
export function validateForm(schema: FormSchema, answers: FormAnswers): FieldError[];
