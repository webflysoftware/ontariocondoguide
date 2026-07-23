<script setup>
import {
  CATEGORIES,
  CATEGORY_META,
  SITE,
  SITE_FAQS,
  TOPIC_PILLARS,
} from '~/utils/site';
import { faqPageSchema, itemListSchema } from '~/utils/schema';

const { catalog, allIndexItems, featuredGuides } = await useContentCatalog();

usePageSeo({
  title: SITE.name,
  description: SITE.description,
  path: '/',
  schema: [
    faqPageSchema([...SITE_FAQS]),
    itemListSchema({
      name: `${SITE.name} featured resources`,
      description: 'Guides, templates, tools, and glossary entries for HOA and condo governance.',
      path: '/',
      items: allIndexItems.value,
    }),
  ],
});
</script>

<template>
  <div>
    <HomeHero />

    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div class="flex flex-wrap gap-6 rounded-xl border border-border bg-white px-6 py-5 text-sm shadow-sm">
        <div>
          <span class="text-2xl font-bold text-brand-800">{{ catalog.guides.length }}</span>
          <span class="ml-2 text-slate-600">guides</span>
        </div>
        <div>
          <span class="text-2xl font-bold text-brand-800">{{ catalog.templates.length }}</span>
          <span class="ml-2 text-slate-600">templates</span>
        </div>
        <div>
          <span class="text-2xl font-bold text-brand-800">{{ catalog.tools.length }}</span>
          <span class="ml-2 text-slate-600">tools</span>
        </div>
        <div>
          <span class="text-2xl font-bold text-brand-800">{{ catalog.glossary.length }}</span>
          <span class="ml-2 text-slate-600">glossary terms</span>
        </div>
      </div>

      <section class="mt-12">
        <h2 class="text-2xl font-semibold">Who we serve</h2>
        <p class="mt-2 max-w-2xl text-slate-600">
          NACARO is built for the people who run and participate in community association governance
          across the United States.
        </p>
        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <div class="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h3 class="text-base font-semibold text-brand-900">Board directors</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Meeting planning, elections, fiduciary duties, and records management for volunteer
              and professional board members.
            </p>
          </div>
          <div class="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h3 class="text-base font-semibold text-brand-900">Community managers</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Practical checklists and templates to support associations, CAM firms, and management
              companies.
            </p>
          </div>
          <div class="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h3 class="text-base font-semibold text-brand-900">Homeowners</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Plain-language guides on meetings, voting, proxies, records access, and owner rights
              under typical association documents.
            </p>
          </div>
        </div>
      </section>

      <section class="mt-14">
        <h2 class="text-2xl font-semibold">Explore by topic</h2>
        <p class="mt-2 max-w-2xl text-slate-600">
          Browse resources organized around the governance topics HOA and condo boards deal with
          most often.
        </p>
        <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
            v-for="category in CATEGORIES.filter((cat) => cat !== 'Templates & Tools')"
            :key="category"
            :title="category"
            :description="CATEGORY_META[category].description"
            :href="CATEGORY_META[category].indexPath"
            :count="catalog.guides.filter((guide) => guide.category === category).length"
          />
          <CategoryCard
            title="Templates & Tools"
            :description="CATEGORY_META['Templates & Tools'].description"
            href="/templates"
            :count="catalog.templates.length + catalog.tools.length"
          />
        </div>
      </section>

      <section class="mt-14">
        <h2 class="text-2xl font-semibold">Start with a topic pillar</h2>
        <div class="mt-6 grid gap-6 lg:grid-cols-3">
          <TopicPillar
            v-for="pillar in TOPIC_PILLARS"
            :key="pillar.title"
            v-bind="pillar"
          />
        </div>
      </section>

      <section class="mt-14 grid gap-8 lg:grid-cols-3">
        <div>
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-xl font-semibold">Popular guides</h2>
            <NuxtLink to="/guides" class="text-sm font-medium no-underline">View all</NuxtLink>
          </div>
          <div class="space-y-4">
            <ArticleCard
              v-for="guide in featuredGuides"
              :key="guide.href"
              :title="guide.title"
              :href="guide.href"
              :summary="guide.summary"
              :category="guide.category"
              :meta="guide.lastUpdated ? `Updated ${guide.lastUpdated}` : undefined"
            />
          </div>
        </div>

        <div>
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-xl font-semibold">Templates</h2>
            <NuxtLink to="/templates" class="text-sm font-medium no-underline">View all</NuxtLink>
          </div>
          <div class="space-y-4">
            <ArticleCard
              v-for="template in catalog.templates.slice(0, 2)"
              :key="template.href"
              :title="template.title"
              :href="template.href"
              :summary="template.summary"
              :category="template.category"
            />
          </div>
        </div>

        <div>
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-xl font-semibold">Tools</h2>
            <NuxtLink to="/tools" class="text-sm font-medium no-underline">View all</NuxtLink>
          </div>
          <div class="space-y-4">
            <ArticleCard
              v-for="tool in catalog.tools"
              :key="tool.href"
              :title="tool.title"
              :href="tool.href"
              :summary="tool.summary"
              :category="tool.category"
            />
          </div>
        </div>
      </section>

      <FAQSection :faqs="SITE_FAQS" />

      <section class="mt-12">
        <CTABox
          title="Preparing for an annual meeting or board election?"
          description="Explore guides and tools to help your association plan notices, track quorum, and run orderly meetings and elections."
          href="/guides/hoa-annual-meeting-guide"
        />
      </section>

      <DisclaimerBox />
    </div>
  </div>
</template>
