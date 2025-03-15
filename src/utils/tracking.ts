import { track as vercelTrack } from "@vercel/analytics";
import { IS_PRODUCTION } from "../env";

/**
 * Track a custom event
 * @param eventName The name of the event to track
 * @param properties Optional properties to include with the event
 */
export const track = (
  eventName: string,
  properties?: Record<string, any>
): void => {
  // Only track events in production to avoid polluting analytics data during development
  if (IS_PRODUCTION) {
    vercelTrack(eventName, properties);
  } else {
    // Log tracking events in development for debugging
    console.log(`[TRACKING] ${eventName}`, properties || {});
  }
};

/**
 * Track a page view
 * @param pageName The name of the page being viewed
 * @param properties Optional properties to include with the event
 */
export const trackPageView = (
  pageName: string,
  properties?: Record<string, any>
): void => {
  track("page_view", {
    page: pageName,
    ...properties,
  });
};

/**
 * Track a button click
 * @param buttonName The name of the button being clicked
 * @param properties Optional properties to include with the event
 */
export const trackButtonClick = (
  buttonName: string,
  properties?: Record<string, any>
): void => {
  track("button_click", {
    button: buttonName,
    ...properties,
  });
};

/**
 * Track a form submission
 * @param formName The name of the form being submitted
 * @param properties Optional properties to include with the event
 */
export const trackFormSubmission = (
  formName: string,
  properties?: Record<string, any>
): void => {
  track("form_submission", {
    form: formName,
    ...properties,
  });
};

/**
 * Track a search
 * @param searchTerm The search term
 * @param properties Optional properties to include with the event
 */
export const trackSearch = (
  searchTerm: string,
  properties?: Record<string, any>
): void => {
  track("search", {
    term: searchTerm,
    ...properties,
  });
};

/**
 * Track a filter change
 * @param filterName The name of the filter
 * @param filterValue The value of the filter
 * @param properties Optional properties to include with the event
 */
export const trackFilterChange = (
  filterName: string,
  filterValue: string,
  properties?: Record<string, any>
): void => {
  track("filter_change", {
    filter: filterName,
    value: filterValue,
    ...properties,
  });
};

/**
 * Track a gift card click
 * @param giftName The name of the gift
 * @param properties Optional properties to include with the event
 */
export const trackGiftCardClick = (
  giftName: string,
  properties?: Record<string, any>
): void => {
  track("gift_card_click", {
    gift: giftName,
    ...properties,
  });
};
