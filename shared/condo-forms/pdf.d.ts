import type * as PdfLib from 'pdf-lib';
import type { FormAnswers } from './types';

export interface GenerateFilledPdfResult {
  bytes: Uint8Array;
  fileName: string;
}

export interface GenerateFilledPdfOptions {
  /** The pdf-lib module, injected by the caller. */
  pdfLib: typeof PdfLib;
  /** Attribution shown in the generated PDF header/footer. */
  brand?: string;
}

/**
 * Generates a clean, filled PDF from collected answers for the given form slug.
 * Runs server-side validation first and throws an Error with a `.validation`
 * property (FieldError[]) when the answers are invalid.
 */
export declare function generateFilledPdf(
  slug: string,
  answers: FormAnswers,
  options: GenerateFilledPdfOptions,
): Promise<GenerateFilledPdfResult>;
