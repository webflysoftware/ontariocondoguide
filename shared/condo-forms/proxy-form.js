/** @type {import('./types').FormSchema} */
export const proxyForm = {
  slug: 'proxy-form',
  title: 'Proxy Form',
  formNumber: 'Condominium Act, 1998 — O. Reg. 48/01, s. 13',
  authority: 'Government of Ontario / Condominium Authority of Ontario',
  officialPdf: 'proxy-form.pdf',
  officialSourceUrl: 'https://www.condoauthorityontario.ca/resource/proxy-form/',
  outputFileName: 'proxy-form-filled',
  intro:
    'An owner or mortgagee (the “proxy giver”) uses this mandatory form to appoint another person (the “proxy”) to attend and vote at a meeting of owners on their behalf. Complete the fields below, then generate a filled PDF to print and sign.',
  signatureNote:
    'A proxy is only valid when signed by the proxy giver. After generating your PDF, print it, sign and date it, and deliver it to the corporation before the meeting (check your notice of meeting for the deadline). In the case of a corporation, affix the corporate seal or attach a statement of signing authority.',
  sections: [
    {
      id: 'corporation',
      title: 'Corporation & meeting',
      description: 'Identify the condominium corporation and the meeting this proxy is for.',
      fields: [
        {
          id: 'corporationName',
          label: 'Condominium corporation name',
          type: 'text',
          required: true,
          maxLength: 200,
          colSpan: 2,
          placeholder: 'e.g. Peel Standard Condominium Corporation No. 987',
        },
        {
          id: 'meetingDate',
          label: 'Date of the meeting of owners',
          type: 'date',
          required: true,
          colSpan: 1,
          guidance: 'This proxy applies to this meeting and any adjournment of it.',
        },
        {
          id: 'proxyId',
          label: 'Proxy identification number (optional)',
          type: 'text',
          colSpan: 1,
          maxLength: 40,
          guidance: 'Some corporations assign a number to track proxies. Leave blank if you were not given one.',
        },
      ],
    },
    {
      id: 'proxyGiver',
      title: 'About you (the proxy giver)',
      description: 'The person entitled to vote who is granting this proxy.',
      fields: [
        {
          id: 'capacity',
          label: 'I am…',
          type: 'radio',
          required: true,
          colSpan: 2,
          options: [
            { value: 'owner', label: 'The registered owner' },
            { value: 'ownerAgent', label: 'Authorized to act on behalf of the registered owner' },
            { value: 'mortgagee', label: 'The mortgagee' },
            { value: 'mortgageeAgent', label: 'Authorized to act on behalf of the mortgagee' },
          ],
        },
        {
          id: 'proxyGiverName',
          label: 'Name of proxy giver',
          type: 'text',
          required: true,
          maxLength: 120,
          colSpan: 2,
          guidance: 'The person entitled to vote at the meeting (e.g. the registered owner or mortgagee).',
        },
        {
          id: 'unitDescription',
          label: 'Unit number / municipal address or description of the unit',
          type: 'text',
          required: true,
          maxLength: 200,
          colSpan: 2,
          guidance:
            'For a common elements condominium corporation, identify the relevant parcel of tied land instead.',
        },
      ],
    },
    {
      id: 'appointment',
      title: 'Who you are appointing',
      description: 'Name the proxy, and optionally a backup who acts only if the first cannot attend.',
      fields: [
        {
          id: 'proxyAName',
          label: 'Proxy (Row A) — full name',
          type: 'text',
          required: true,
          maxLength: 120,
          colSpan: 2,
        },
        {
          id: 'proxyBName',
          label: 'Alternate proxy (Row B) — optional',
          type: 'text',
          maxLength: 120,
          colSpan: 2,
          guidance: 'Acts on your behalf only if the Row A proxy fails to attend.',
        },
        {
          id: 'revokePrevious',
          label: 'I / we revoke all proxies previously given',
          type: 'checkbox',
          colSpan: 2,
        },
      ],
    },
    {
      id: 'authority',
      title: 'What the proxy may do',
      description: 'Choose exactly one. This controls how your proxy can act at the meeting.',
      fields: [
        {
          id: 'authority',
          label: 'Scope of authority',
          type: 'radio',
          required: true,
          colSpan: 2,
          guidance:
            'Choose only one. “Quorum only” counts you toward quorum but casts no votes. “Routine procedure only” limits the proxy to routine motions. “Full authority” lets the proxy nominate and vote, subject to any instructions you add below.',
          options: [
            { value: 'quorum', label: 'Count toward quorum only (no voting authority)' },
            { value: 'routine', label: 'Vote only on matters of routine procedure' },
            { value: 'full', label: 'Full authority — may nominate candidates and/or vote on any matter' },
          ],
        },
        {
          id: 'instructions',
          label: 'Specific voting instructions (optional)',
          type: 'textarea',
          maxLength: 800,
          colSpan: 2,
          showWhen: { field: 'authority', equals: ['full', 'routine'] },
          guidance:
            'Optional. Set out how the proxy must vote on specific matters (for example, election of directors or a particular by-law). If left blank under full authority, the proxy may vote as they see fit.',
        },
      ],
    },
    {
      id: 'signing',
      title: 'Signing details',
      description: 'When you are signing the proxy.',
      advanced: true,
      fields: [
        { id: 'signingDate', label: 'Date signed', type: 'date', colSpan: 1 },
        {
          id: 'signingTime',
          label: 'Time signed (optional)',
          type: 'text',
          colSpan: 1,
          maxLength: 20,
          placeholder: 'e.g. 7:00 PM',
        },
      ],
    },
  ],
};
