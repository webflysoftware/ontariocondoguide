import { CATEGORIES, CATEGORY_META, SITE } from '../../app/utils/site';
import {
  buildLlmsFullTxt,
  buildLlmsTxt,
  getAllContentPaths,
  getGlossaryIndex,
  getGuideIndex,
  getTemplateIndex,
  getToolIndex,
} from './content';

export function buildLlmsTxtForSite() {
  return buildLlmsTxt(SITE, CATEGORIES, CATEGORY_META);
}

export function buildLlmsFullTxtForSite() {
  return buildLlmsFullTxt(SITE, CATEGORIES);
}

export function getSitemapPaths() {
  return getAllContentPaths();
}
