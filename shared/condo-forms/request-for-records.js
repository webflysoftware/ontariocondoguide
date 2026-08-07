/** @type {import('./types').FormSchema} */
export const requestForRecords = {
  slug: 'request-for-records',
  title: 'Request for Records',
  formNumber: 'Condominium Act, 1998 — O. Reg. 48/01',
  authority: 'Government of Ontario / Condominium Authority of Ontario',
  officialPdf: 'request-for-records.pdf',
  officialSourceUrl: 'https://www.condoauthorityontario.ca/resource/request-for-records/',
  outputFileName: 'request-for-records-filled',
  intro:
    'Owners, purchasers, and mortgagees (or their authorized agents) use this mandatory form to request a condominium corporation\u2019s records. Complete the fields below with guidance, then generate a filled PDF to print, sign, and deliver.',
  signatureNote:
    'This form must be signed. After generating your PDF, print it, sign and date it, and deliver it to the corporation in person, by mail, courier, fax, or email. Keep a copy for your records — the corporation has 30 days to respond using the mandatory Board\u2019s Response to Request for Records form.',
  sections: [
    {
      id: 'requester',
      title: 'About you (the requester)',
      description: 'Tell the corporation who you are and confirm your entitlement to the records.',
      fields: [
        {
          id: 'requesterType',
          label: 'I am a…',
          type: 'radio',
          required: true,
          guidance:
            'You must be an owner, a purchaser, or a mortgagee of a unit or common interest to request records.',
          options: [
            { value: 'owner', label: 'Owner' },
            { value: 'mortgagee', label: 'Mortgagee' },
            { value: 'purchaser', label: 'Purchaser' },
          ],
        },
        {
          id: 'affirm',
          label:
            'I affirm that this request for records is solely related to my interests as an owner, a purchaser, or a mortgagee, having regard to the purposes of the Condominium Act, 1998.',
          type: 'checkbox',
          required: true,
          guidance:
            'This affirmation is required by the form. Requests unrelated to your interests under the Act can be refused.',
        },
        {
          id: 'name',
          label: 'My full name',
          type: 'text',
          required: true,
          maxLength: 120,
          placeholder: 'e.g. Jordan Alvarez',
        },
        {
          id: 'date',
          label: 'Date of this request',
          type: 'date',
          required: true,
          guidance: 'The date you are submitting the request (used to track the 30-day response window).',
        },
        {
          id: 'unitIdentification',
          label: 'Identify the unit or common interest',
          type: 'text',
          required: true,
          maxLength: 200,
          placeholder: 'e.g. Unit 12, Level 3 (Unit 512)',
          guidance:
            'Identify the unit or common interest that connects you to the corporation, as shown on your deed or status certificate.',
        },
        {
          id: 'corporationName',
          label: 'Condominium corporation name',
          type: 'text',
          required: true,
          maxLength: 200,
          colSpan: 2,
          placeholder: 'e.g. Toronto Standard Condominium Corporation No. 1234',
          guidance: 'The full legal name of the corporation you are requesting records from.',
        },
      ],
    },
    {
      id: 'address',
      title: 'Your mailing address (in Ontario)',
      description: 'Where the corporation can reach you about this request.',
      fields: [
        { id: 'unitNumber', label: 'Unit number', type: 'text', colSpan: 1, maxLength: 20 },
        { id: 'streetNumber', label: 'Street number', type: 'text', colSpan: 1, required: true, maxLength: 20 },
        { id: 'streetName', label: 'Street name', type: 'text', colSpan: 2, required: true, maxLength: 120 },
        { id: 'poBox', label: 'PO Box', type: 'text', colSpan: 1, maxLength: 30 },
        { id: 'cityTown', label: 'City / Town', type: 'text', colSpan: 1, required: true, maxLength: 80 },
        { id: 'province', label: 'Province', type: 'text', colSpan: 1, fixedValue: 'Ontario' },
        {
          id: 'postalCode',
          label: 'Postal code',
          type: 'text',
          colSpan: 1,
          required: true,
          pattern: '^[A-Za-z]\\d[A-Za-z]\\s?\\d[A-Za-z]\\d$',
          patternMessage: 'Enter a valid Canadian postal code (e.g. M5V 2T6).',
          placeholder: 'M5V 2T6',
        },
        {
          id: 'email',
          label: 'Email address (optional)',
          type: 'email',
          colSpan: 1,
          placeholder: 'you@example.com',
        },
        { id: 'phone', label: 'Telephone number (optional)', type: 'tel', colSpan: 1, maxLength: 40 },
        {
          id: 'preferredContact',
          label: 'Preferred method of contact about this request',
          type: 'radio',
          colSpan: 2,
          options: [
            { value: 'mail', label: 'Mail' },
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
          ],
        },
      ],
    },
    {
      id: 'records',
      title: 'Records you are requesting',
      description: 'Choose the format and which core records you want.',
      fields: [
        {
          id: 'recordFormat',
          label: 'Requested format',
          type: 'radio',
          required: true,
          guidance:
            'Choosing “electronic” means you agree to receive the records by electronic communication where the corporation keeps them electronically.',
          options: [
            { value: 'electronic', label: 'Electronic' },
            { value: 'paper', label: 'Paper' },
          ],
        },
        {
          id: 'deliveryMethod',
          label: 'How you want to access the records',
          type: 'radio',
          required: true,
          options: [
            { value: 'examine', label: 'Examine the record in person' },
            { value: 'delivery', label: 'Receive delivery of a copy' },
            { value: 'pickup', label: 'Pick up a copy in person' },
          ],
        },
        {
          id: 'coreRecords',
          label: 'Core records requested',
          type: 'checkbox-group',
          guidance:
            'Core records must generally be provided free of charge (a reasonable fee may apply to paper copies). Select all that apply.',
          colSpan: 2,
          options: [
            { value: 'declaration', label: 'Declaration, by-laws, and rules' },
            { value: 'budget', label: 'Current fiscal year budget' },
            { value: 'financials', label: 'Most recent approved financial statements' },
            { value: 'auditor', label: 'Most recent auditor\u2019s report' },
            { value: 'reserve', label: 'Approved plan for the reserve fund study' },
            { value: 'minutes', label: 'Board meeting minutes (last 12 months)' },
            { value: 'ownersRecord', label: 'Record of owners and mortgagees' },
            { value: 'infoCerts', label: 'Information certificates (last 12 months)' },
            { value: 'mutualUse', label: 'Any mutual use agreements' },
          ],
        },
        {
          id: 'otherRecords',
          label: 'Other records (describe)',
          type: 'textarea',
          colSpan: 2,
          maxLength: 600,
          guidance:
            'Optional. Describe any non-core records you are requesting. Non-core records may be subject to reasonable fees.',
        },
      ],
    },
    {
      id: 'agent',
      title: 'Authorized agent (if applicable)',
      description: 'Only complete this if you are submitting the request on someone else\u2019s behalf.',
      advanced: true,
      fields: [
        {
          id: 'isAgent',
          label: 'I am a duly authorized agent submitting on behalf of the requester',
          type: 'checkbox',
        },
        {
          id: 'agentName',
          label: 'Agent\u2019s full name',
          type: 'text',
          maxLength: 120,
          showWhen: { field: 'isAgent', equals: [true] },
        },
        {
          id: 'agentPrincipalName',
          label: 'Name of the owner / mortgagee / purchaser you represent',
          type: 'text',
          maxLength: 120,
          showWhen: { field: 'isAgent', equals: [true] },
        },
      ],
    },
  ],
};
