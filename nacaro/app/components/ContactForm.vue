<script setup>
import { SITE } from '~/utils/site';

const form = reactive({
  name: '',
  email: '',
  role: 'Board director',
  associationSize: 'Under 50 units',
  topic: 'Annual meeting',
  message: '',
  website: '',
});

const status = ref('idle');
const errorMessage = ref('');

async function submitForm() {
  if (form.website) return;

  status.value = 'loading';
  errorMessage.value = '';

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        role: form.role,
        associationSize: form.associationSize,
        topic: form.topic,
        message: form.message,
      },
    });
    status.value = 'success';
  } catch (error) {
    status.value = 'error';
    errorMessage.value =
      error instanceof Error
        ? error.message
        : 'Unable to send your message. Please try again later.';
  }
}
</script>

<template>
  <div>
    <p class="max-w-2xl text-slate-700">
      Questions about guides, templates, tools, or glossary topics? Send a message and we will get back to you.
      {{ SITE.name }} provides educational resources, not legal advice.
    </p>

    <form
      v-if="status !== 'success'"
      class="mt-8 max-w-xl space-y-4"
      aria-label="Contact form"
      @submit.prevent="submitForm"
    >
      <div class="hidden" aria-hidden="true">
        <label for="website">Website</label>
        <input id="website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <div>
        <label for="name" class="block text-sm font-medium text-slate-900">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          autocomplete="name"
          class="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-slate-900">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          autocomplete="email"
          class="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label for="role" class="block text-sm font-medium text-slate-900">Role</label>
        <select id="role" v-model="form.role" class="mt-1 w-full rounded-md border border-border px-3 py-2">
          <option>Board director</option>
          <option>Homeowner</option>
          <option>Community manager</option>
          <option>Attorney or professional</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label for="association-size" class="block text-sm font-medium text-slate-900">Association size</label>
        <select
          id="association-size"
          v-model="form.associationSize"
          class="mt-1 w-full rounded-md border border-border px-3 py-2"
        >
          <option>Under 50 units</option>
          <option>50–100 units</option>
          <option>100–250 units</option>
          <option>250–500 units</option>
          <option>500+ units</option>
        </select>
      </div>

      <div>
        <label for="topic" class="block text-sm font-medium text-slate-900">Topic</label>
        <select id="topic" v-model="form.topic" class="mt-1 w-full rounded-md border border-border px-3 py-2">
          <option>Annual meeting</option>
          <option>Board election</option>
          <option>Proxy voting</option>
          <option>Quorum</option>
          <option>Board governance</option>
          <option>Templates or tools</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-slate-900">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          rows="5"
          required
          class="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <p v-if="status === 'error'" class="text-sm text-red-700">{{ errorMessage }}</p>

      <button
        type="submit"
        class="rounded-md bg-brand-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
        :disabled="status === 'loading'"
      >
        {{ status === 'loading' ? 'Sending…' : 'Send message' }}
      </button>
    </form>

    <div
      v-else
      class="mt-8 max-w-xl rounded-xl border border-brand-200 bg-brand-50 p-6"
      role="status"
    >
      <h2 class="text-lg font-semibold text-brand-900">Thank you for your message</h2>
      <p class="mt-2 text-sm leading-6 text-slate-700">
        We have received your inquiry. While you wait, these resources may help:
      </p>
      <ul class="mt-4 space-y-2 text-sm">
        <li><NuxtLink to="/guides/hoa-annual-meeting-guide">HOA Annual Meeting Guide</NuxtLink></li>
        <li><NuxtLink to="/templates/annual-meeting-checklist">Annual Meeting Checklist</NuxtLink></li>
        <li><NuxtLink to="/tools/quorum-calculator">Quorum Calculator</NuxtLink></li>
        <li><NuxtLink to="/guides/board-election-procedures">Board Election Procedures</NuxtLink></li>
      </ul>
    </div>
  </div>
</template>
