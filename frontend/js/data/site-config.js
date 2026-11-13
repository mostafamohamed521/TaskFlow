/* Contact form delivery — set ONE of these so messages reach you:
   contactEmail    : your address. Uses FormSubmit; the first message triggers an activation email you must confirm.
   contactEndpoint : full URL of your own form service (e.g. Formspree) or API. Takes priority over contactEmail.
   Leave both empty and the form validates but only shows a demo confirmation (nothing is sent). */
window.TASKFLOW_CONFIG = { contactEmail: '', contactEndpoint: '' };
