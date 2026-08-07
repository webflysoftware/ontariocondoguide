// Ontario condo forms core now lives in the repo-root shared package so it can
// be shared with the Astro site (ontariocondoguide.ca). This module re-exports
// it under the existing `#shared/forms` alias for backwards compatibility.
// NOTE: only import schema + validation here (client-safe). The PDF engine
// lives in `condo-forms/pdf` and must only be imported server-side.
export * from '../../../shared/condo-forms/index.js';
