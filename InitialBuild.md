Initialize a fully working Astro website for “Ontario Condo Guide”.

Project Goal:
Build a static-first, SEO-optimized, fast-loading resource website for Ontario condo boards, condo owners, property managers, and condo corporations. The website should feel like a practical independent authority on Ontario condo governance topics such as AGMs, owners’ meetings, board elections, proxy voting, quorum, electronic voting, board duties, meeting notices, checklists, and templates.

This is an MVP site shell with boilerplate content only. Do not write full production articles yet. Build the complete working structure, layouts, content system, routing, metadata, schema generation, search readiness, and sample placeholder content so real articles can be added later.

Use this stack:
Astro
TypeScript
MDX
Astro Content Collections
Tailwind CSS
Pagefind-ready static search structure
Generated JSON-LD
Generated sitemap support
Generated llms.txt
Generated JSON content indexes
Minimal client-side JavaScript
Interactive islands only where needed


Core Build Requirements:
Create a clean Astro project using TypeScript.
Set up Tailwind CSS.
Set up MDX support.
Set up Astro Content Collections.
Create reusable layouts for guides, templates, tools, glossary terms, and general landing pages.
Create reusable SEO and schema helpers.
Create static routes for all core sections.
Create sample boilerplate content for each content type.
Create a working homepage.
Create working index pages for guides, templates, tools, and glossary.
Create sample dynamic pages generated from content collections.
Create lightweight placeholder tools for quorum, AGM readiness, and election readiness.
Create llms.txt output.
Create JSON index outputs for guides, templates, tools, and glossary.
Create sitemap-ready URL structure.
Keep the project structured so production content can be added by creating new MDX files only.

Brand:
Name: Ontario Condo Guide
Positioning: Practical resources for condo boards, owners, and property managers.
Tone: Clear, neutral, practical, authoritative, non-salesy.
Do not make it look or sound like a government site, law firm, SaaS landing page, or fake regulator.
Include a general disclaimer that the site provides educational information only and does not provide legal advice.

Primary Site Sections:
Homepage
Guides
Templates
Tools
Glossary
About
Contact
Disclaimer
Privacy

Main Categories:
AGM & Meetings
Voting & Elections
Proxies & Quorum
Board Governance
Owner Resources
Templates & Tools
Digital Voting

Recommended Routes:
/
/guides
/guides/[slug]
/templates
/templates/[slug]
/tools
/tools/quorum-calculator
/tools/agm-readiness-check
/tools/election-readiness-check
/glossary
/glossary/[slug]
/about
/contact
/disclaimer
/privacy
/llms.txt
/llms-full.txt
/guides.json
/templates.json
/tools.json
/glossary.json

Content Directory Structure:
src/content/guides
src/content/templates
src/content/glossary
src/content/tools

Create these content collections:
guides
templates
glossary
tools

Guide Collection Schema:
title
slug
summary
category
metaTitle
metaDescription
lastUpdated
author
primaryKeyword
secondaryKeywords
relatedGuides
relatedTemplates
relatedTools
ctaType
disclaimerType
faqs

Template Collection Schema:
title
slug
summary
category
metaTitle
metaDescription
lastUpdated
useCase
relatedGuides
relatedTools
ctaType

Glossary Collection Schema:
title
slug
term
definition
summary
category
relatedGuides

Tool Collection Schema:
title
slug
summary
category
metaTitle
metaDescription
lastUpdated
toolType
relatedGuides
relatedTemplates
ctaType

Create sample MDX content files:
src/content/guides/ontario-condo-agm-guide.mdx
src/content/guides/ontario-condo-board-elections.mdx
src/content/guides/ontario-condo-proxy-form.mdx
src/content/guides/ontario-condo-quorum.mdx
src/content/guides/electronic-voting-ontario-condos.mdx

src/content/templates/agm-checklist.mdx
src/content/templates/condo-election-checklist.mdx
src/content/templates/proxy-checklist.mdx

src/content/glossary/agm.mdx
src/content/glossary/quorum.mdx
src/content/glossary/proxy.mdx
src/content/glossary/electronic-voting.mdx

src/content/tools/quorum-calculator.mdx
src/content/tools/agm-readiness-check.mdx
src/content/tools/election-readiness-check.mdx

The sample MDX files should contain short boilerplate placeholder sections only. Do not generate long articles. Each should demonstrate frontmatter, headings, FAQ support where applicable, related content references, and placeholder body content.

Reusable Layouts:
Create these layouts:
BaseLayout.astro
GuideLayout.astro
TemplateLayout.astro
ToolLayout.astro
GlossaryLayout.astro
LandingPageLayout.astro

BaseLayout should handle:
HTML shell
SEO metadata
Canonical URL
Open Graph metadata
Global header
Global footer
Site-wide JSON-LD where relevant

GuideLayout should handle:
Breadcrumbs
Category
Title
Summary
Last updated date
Author/editor
Table of contents
MDX body
FAQ block
Related guides
Related templates
Related tools
Disclaimer
Contextual CTA
Article JSON-LD
FAQPage JSON-LD
BreadcrumbList JSON-LD

TemplateLayout should handle:
Breadcrumbs
Category
Title
Summary
Use case
MDX body
Related guide links
Related tool links
Download CTA placeholder
Disclaimer if needed
Article or CreativeWork JSON-LD

ToolLayout should handle:
Breadcrumbs
Category
Title
Summary
Static explanatory content
Interactive tool slot or component
Related guides
Related templates
Disclaimer
WebApplication JSON-LD where appropriate

GlossaryLayout should handle:
Breadcrumbs
Term
Definition
Plain-language explanation
Related guides
BreadcrumbList JSON-LD

Components:
ArticleCard.astro
CategoryCard.astro
Breadcrumbs.astro
CTABox.astro
DisclaimerBox.astro
FAQBlock.astro
RelatedContent.astro
TableOfContents.astro
SearchBox.astro
ToolResultBox.astro
GuideList.astro
TemplateList.astro
GlossaryList.astro

SEO Helpers:
Create src/lib/seo.ts to generate:
Page title
Meta description
Canonical URL
Open Graph title
Open Graph description
Open Graph type
Robots metadata where needed

Schema Helpers:
Create src/lib/schema.ts or a schema directory with helpers for:
Article schema
FAQPage schema
BreadcrumbList schema
WebSite schema
Organization schema
WebApplication schema for tools

Do not hardcode JSON-LD inside every page. Generate schema from content metadata.

LLMO Requirements:
Create a generated /llms.txt route that outputs a concise markdown overview of the site, its purpose, its main categories, and links to the most important guides, templates, tools, and glossary terms.

Create a generated /llms-full.txt route that outputs a more complete markdown index of all published content grouped by type and category.

Create JSON index routes:
guides.json
templates.json
tools.json
glossary.json

Each JSON index item should include:
title
url
summary
category
lastUpdated
primaryKeyword where available

Search Requirements:
Set the site up to be Pagefind-ready.
Use semantic HTML.
Ensure content pages render as static HTML.
Add clear headings, summaries, categories, and body content so Pagefind can index them after build.
Do not implement a complex external search provider.
A basic search page or search component can be included as a placeholder, but it should be compatible with Pagefind later.

Interactive Tools:
Create three lightweight tool pages.

Quorum Calculator:
Inputs:
Total eligible voting units
Required quorum percentage
Confirmed attendees
Valid proxies
Optional advance/electronic voters

Outputs:
Required number for quorum
Current counted participation
Whether quorum appears met
Additional participation needed

AGM Readiness Check:
Inputs:
Meeting type
Election required
Proxy collection required
Electronic voting considered
Number of units
Target meeting date

Outputs:
Simple checklist
Missing items
Suggested next steps

Election Readiness Check:
Inputs:
Number of voting units
Number of open positions
Candidate nominations status
Proxy voting allowed
Electronic voting planned
Voter list prepared
Quorum requirement known

Outputs:
Basic readiness score
Missing steps
Recommended next actions

The tools should use minimal client-side JavaScript and should not turn the site into a SPA.

Homepage Requirements:
The homepage should introduce Ontario Condo Guide as an independent educational resource.
It should route visitors into Guides, Templates, Tools, and Glossary.
It should highlight sample topic areas:
AGMs
Board elections
Proxy voting
Quorum
Electronic voting
Board governance
Meeting templates

The homepage should include:
Clear positioning
Short explanatory copy
Category entry points
Featured guide cards
Featured template cards
Featured tool cards
Disclaimer note
Soft digital voting CTA

Do not make ElectoSense the main focus of the homepage.
Include only a subtle contextual CTA such as:
“Planning a condo vote or AGM? Explore digital voting resources.”

Footer Requirements:
Include site name.
Include positioning line.
Include links to Guides, Templates, Tools, Glossary, About, Contact, Disclaimer, Privacy.
Include disclaimer:
“Ontario Condo Guide provides general educational information and practical resources. It is not a government website and does not provide legal advice.”

About Page:
Create a simple page explaining that Ontario Condo Guide is an independent resource for condo boards, owners, and property managers trying to understand common Ontario condo governance processes.

Contact Page:
Create a simple contact page with a non-functional placeholder form.
Fields:
Name
Email
Role
Topic
Message

Role options:
Board director
Condo owner
Property manager
Other

Topic options:
AGM
Election
Proxy
Quorum
Electronic voting
Board meeting
Owner meeting
Other

Disclaimer Page:
Create a clear general-information disclaimer.
State that the site is not a government website, not a law firm, and does not provide legal advice.

Privacy Page:
Create a simple placeholder privacy policy suitable for an MVP resource site.

Content Style:
All placeholder content should be concise.
Avoid long articles for now.
Use realistic headings and snippets so the site feels complete.
Do not fill the site with lorem ipsum.
Use useful boilerplate text that can be replaced later.

Performance Requirements:
Static-first.
Minimal JavaScript.
No unnecessary dependencies.
No animation library.
No heavy UI framework.
No client-side routing.
Fast page loads.
Clean semantic HTML.
Accessible headings and links.
Responsive layout.

Code Quality Requirements:
Use TypeScript.
Use clear folder structure.
Use reusable components.
Avoid repeated boilerplate across pages.
Keep content metadata validated through Content Collections.
Use layouts to automatically generate recurring article structures.
Use helper functions for related content, SEO, and schema.
Use consistent naming.
Include comments only where they clarify structure or generation logic.

Deliverable:
A fully working Astro project that can be run locally with:
npm install
npm run dev
npm run build

The finished MVP should compile successfully, render all routes, generate dynamic pages from MDX content collections, include reusable layouts/components, include structured SEO/schema helpers, include LLM-readable output routes, and be ready for real production content to be added later.