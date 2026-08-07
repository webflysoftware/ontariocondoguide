<script setup lang="ts">
import {
  getAllFields,
  isFieldVisible,
  validateForm,
  type FieldValue,
  type FormAnswers,
  type FormField,
  type FormSchema,
} from '#shared/forms';

const props = defineProps<{
  schema: FormSchema;
  fillUrl: string;
  downloadUrl: string;
  officialSourceUrl: string;
}>();

const answers = reactive<FormAnswers>({});
for (const field of getAllFields(props.schema)) {
  if (field.fixedValue !== undefined) continue;
  if (field.type === 'checkbox-group') answers[field.id] = [];
  else if (field.type === 'checkbox') answers[field.id] = false;
  else answers[field.id] = (field.defaultValue as FieldValue) ?? '';
}

const errors = ref<Record<string, string>>({});
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
const serverMessage = ref('');

function fieldVisible(field: FormField): boolean {
  return isFieldVisible(field, answers);
}

function visibleFields(fields: FormField[]): FormField[] {
  return fields.filter(fieldVisible);
}

function toggleGroup(fieldId: string, value: string, checked: boolean) {
  const current = Array.isArray(answers[fieldId]) ? [...(answers[fieldId] as string[])] : [];
  if (checked) {
    if (!current.includes(value)) current.push(value);
  } else {
    const idx = current.indexOf(value);
    if (idx >= 0) current.splice(idx, 1);
  }
  answers[fieldId] = current;
}

function validate(): boolean {
  const found = validateForm(props.schema, { ...answers });
  const map: Record<string, string> = {};
  for (const e of found) map[e.field] = e.message;
  errors.value = map;
  return found.length === 0;
}

async function scrollToFirstError() {
  await nextTick();
  const firstId = Object.keys(errors.value)[0];
  if (!firstId) return;
  const el = document.getElementById(`field-${firstId}`);
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  (el?.querySelector('input, select, textarea') as HTMLElement | null)?.focus();
}

function triggerDownload(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${props.schema.outputFileName}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function generate() {
  serverMessage.value = '';
  if (!validate()) {
    status.value = 'error';
    serverMessage.value = 'Please fix the highlighted fields.';
    await scrollToFirstError();
    return;
  }

  status.value = 'loading';
  try {
    const blob = await $fetch<Blob>(props.fillUrl, {
      method: 'POST',
      body: { answers: { ...answers } },
      responseType: 'blob',
    });
    triggerDownload(blob);
    status.value = 'success';
  } catch (error: unknown) {
    status.value = 'error';
    const data = (error as { data?: { data?: { errors?: { field: string; message: string }[] } } })?.data;
    const serverErrors = data?.data?.errors;
    if (serverErrors?.length) {
      const map: Record<string, string> = {};
      for (const e of serverErrors) map[e.field] = e.message;
      errors.value = map;
      serverMessage.value = 'Please fix the highlighted fields.';
      await scrollToFirstError();
    } else {
      serverMessage.value = 'Something went wrong generating the PDF. Please try again.';
    }
  }
}

const inputClass =
  'mt-1 w-full rounded-md border border-border px-3 py-2 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30';
</script>

<template>
  <form class="space-y-6" novalidate @submit.prevent="generate">
    <section
      v-for="section in schema.sections"
      :key="section.id"
      class="rounded-xl border border-border bg-white shadow-sm"
    >
      <!-- Advanced sections collapse by default -->
      <component
        :is="section.advanced ? 'details' : 'div'"
        class="group"
      >
        <component
          :is="section.advanced ? 'summary' : 'div'"
          class="flex cursor-default items-start justify-between gap-3 px-4 py-4 sm:px-6"
          :class="section.advanced ? 'cursor-pointer list-none' : ''"
        >
          <div>
            <h2 class="font-serif text-lg font-semibold text-brand-900">{{ section.title }}</h2>
            <p v-if="section.description" class="mt-1 text-sm leading-6 text-slate-600">
              {{ section.description }}
            </p>
          </div>
          <span
            v-if="section.advanced"
            aria-hidden="true"
            class="mt-1 shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-slate-500 group-open:hidden"
          >
            Show
          </span>
        </component>

        <div class="grid grid-cols-1 gap-x-5 gap-y-4 border-t border-border px-4 py-5 sm:grid-cols-2 sm:px-6">
          <template v-for="field in visibleFields(section.fields)" :key="field.id">
            <div
              :id="`field-${field.id}`"
              :class="(field.colSpan ?? 1) === 2 ? 'sm:col-span-2' : 'sm:col-span-1'"
            >
              <!-- Fixed / read-only value -->
              <template v-if="field.fixedValue !== undefined">
                <label class="block text-sm font-medium text-slate-900">{{ field.label }}</label>
                <input :value="field.fixedValue" type="text" readonly :class="[inputClass, 'bg-slate-50 text-slate-500']" />
              </template>

              <!-- Single checkbox -->
              <template v-else-if="field.type === 'checkbox'">
                <label class="flex items-start gap-3">
                  <input
                    v-model="answers[field.id]"
                    type="checkbox"
                    class="mt-1 h-4 w-4 rounded border-border text-brand-700 focus:ring-brand-500/40"
                  />
                  <span class="text-sm leading-6 text-slate-800">
                    {{ field.label }}
                    <span v-if="field.required" class="text-red-600">*</span>
                  </span>
                </label>
              </template>

              <!-- Radio group -->
              <template v-else-if="field.type === 'radio'">
                <span class="block text-sm font-medium text-slate-900">
                  {{ field.label }}<span v-if="field.required" class="text-red-600"> *</span>
                </span>
                <div class="mt-2 space-y-2">
                  <label
                    v-for="opt in field.options"
                    :key="opt.value"
                    class="flex items-start gap-3 rounded-md border border-border px-3 py-2 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50"
                  >
                    <input
                      v-model="answers[field.id]"
                      type="radio"
                      :value="opt.value"
                      :name="field.id"
                      class="mt-0.5 h-4 w-4 border-border text-brand-700 focus:ring-brand-500/40"
                    />
                    <span class="text-sm leading-6 text-slate-800">{{ opt.label }}</span>
                  </label>
                </div>
              </template>

              <!-- Checkbox group -->
              <template v-else-if="field.type === 'checkbox-group'">
                <span class="block text-sm font-medium text-slate-900">
                  {{ field.label }}<span v-if="field.required" class="text-red-600"> *</span>
                </span>
                <div class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <label
                    v-for="opt in field.options"
                    :key="opt.value"
                    class="flex items-start gap-3 rounded-md border border-border px-3 py-2 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50"
                  >
                    <input
                      type="checkbox"
                      :value="opt.value"
                      :checked="Array.isArray(answers[field.id]) && (answers[field.id] as string[]).includes(opt.value)"
                      class="mt-0.5 h-4 w-4 rounded border-border text-brand-700 focus:ring-brand-500/40"
                      @change="toggleGroup(field.id, opt.value, ($event.target as HTMLInputElement).checked)"
                    />
                    <span class="text-sm leading-6 text-slate-800">{{ opt.label }}</span>
                  </label>
                </div>
              </template>

              <!-- Select -->
              <template v-else-if="field.type === 'select'">
                <label :for="`input-${field.id}`" class="block text-sm font-medium text-slate-900">
                  {{ field.label }}<span v-if="field.required" class="text-red-600"> *</span>
                </label>
                <select :id="`input-${field.id}`" v-model="answers[field.id]" :class="inputClass">
                  <option value="" disabled>Select…</option>
                  <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </template>

              <!-- Textarea -->
              <template v-else-if="field.type === 'textarea'">
                <label :for="`input-${field.id}`" class="block text-sm font-medium text-slate-900">
                  {{ field.label }}<span v-if="field.required" class="text-red-600"> *</span>
                </label>
                <textarea
                  :id="`input-${field.id}`"
                  v-model="answers[field.id]"
                  rows="3"
                  :maxlength="field.maxLength"
                  :placeholder="field.placeholder"
                  :class="inputClass"
                />
              </template>

              <!-- Text / email / tel / date -->
              <template v-else>
                <label :for="`input-${field.id}`" class="block text-sm font-medium text-slate-900">
                  {{ field.label }}<span v-if="field.required" class="text-red-600"> *</span>
                </label>
                <input
                  :id="`input-${field.id}`"
                  v-model="answers[field.id]"
                  :type="field.type === 'date' ? 'date' : field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text'"
                  :maxlength="field.maxLength"
                  :placeholder="field.placeholder"
                  :class="inputClass"
                />
              </template>

              <p v-if="field.guidance" class="mt-1.5 text-xs leading-5 text-slate-500">{{ field.guidance }}</p>
              <p v-if="errors[field.id]" class="mt-1.5 text-xs font-medium text-red-600">{{ errors[field.id] }}</p>
            </div>
          </template>
        </div>
      </component>
    </section>

    <p v-if="schema.signatureNote" class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
      {{ schema.signatureNote }}
    </p>

    <!-- Sticky action bar: primary CTA within thumb reach on mobile -->
    <div class="sticky bottom-0 z-20 -mx-4 border-t border-border bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div class="min-h-5 text-sm" role="status" aria-live="polite">
          <span v-if="status === 'success'" class="font-medium text-green-700">Your filled PDF was downloaded.</span>
          <span v-else-if="serverMessage" class="font-medium text-red-600">{{ serverMessage }}</span>
          <span v-else class="text-slate-500">Answers stay in your browser until you generate the PDF.</span>
        </div>
        <button
          type="submit"
          class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
          :disabled="status === 'loading'"
        >
          <span
            v-if="status === 'loading'"
            aria-hidden="true"
            class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
          {{ status === 'loading' ? 'Generating…' : 'Generate filled PDF' }}
        </button>
      </div>
    </div>
  </form>
</template>
