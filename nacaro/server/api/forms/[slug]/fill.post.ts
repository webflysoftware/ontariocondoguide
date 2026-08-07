import { getFormSchema, type FormAnswers } from '../../../../shared/forms';
import { generateFilledPdf } from '../../../utils/forms';

interface FillBody {
  answers?: FormAnswers;
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' });
  }

  const schema = getFormSchema(slug);
  if (!schema) {
    throw createError({ statusCode: 404, statusMessage: 'Form not found' });
  }

  const body = await readBody<FillBody>(event);
  const answers = body?.answers ?? {};

  try {
    const bytes = await generateFilledPdf(slug, answers);
    setHeader(event, 'Content-Type', 'application/pdf');
    setHeader(event, 'Content-Disposition', `attachment; filename="${schema.outputFileName}.pdf"`);
    setHeader(event, 'Cache-Control', 'no-store');
    return Buffer.from(bytes);
  } catch (error) {
    const validation = (error as Error & { validation?: unknown }).validation;
    if (validation) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Validation failed',
        data: { errors: validation },
      });
    }
    throw createError({ statusCode: 500, statusMessage: 'Could not generate the filled PDF.' });
  }
});
