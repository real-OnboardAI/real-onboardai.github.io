// Thin wrapper around the Umami Cloud script loaded in index.html.
// Page views and links tagged with data-umami-event are tracked automatically;
// use track() for events that happen in code (form submits, etc.).

type UmamiEventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: UmamiEventData) => void };
  }
}

export function track(event: string, data?: UmamiEventData) {
  // umami is undefined on localhost, when blocked, or before the script loads.
  try {
    window.umami?.track(event, data);
  } catch {
    // Analytics must never break the page.
  }
}
