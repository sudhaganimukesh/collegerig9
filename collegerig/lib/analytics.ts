/**
 * CollegeRig Privacy-First Event Telemetry
 * Zero personal data collection, zero cross-site fingerprinting.
 */

export type AnalyticsEvent =
  | "page_view"
  | "finder_start"
  | "finder_step_complete"
  | "finder_finished"
  | "weight_slider_changed"
  | "laptop_viewed"
  | "compare_added"
  | "compare_removed"
  | "laptop_saved"
  | "affiliate_link_clicked"
  | "pro_waitlist_joined"
  | "college_request_submitted";

interface EventPayload {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(eventName: AnalyticsEvent, payload?: EventPayload) {
  try {
    // Check cookie consent
    const consent = localStorage.getItem("collegerig-cookie-consent");
    if (consent === "essential_only" && eventName !== "page_view") {
      // Respect student's preference for essential only
      return;
    }

    const eventData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      path: typeof window !== "undefined" ? window.location.pathname : "",
      payload,
    };

    // In development or demo mode, log telemetry to console
    if (process.env.NODE_ENV !== "production") {
      console.log(`[CollegeRig Analytics] ${eventName}:`, eventData);
    }

    // Persist session event count in session storage
    const currentEvents = JSON.parse(sessionStorage.getItem("collegerig-session-events") || "[]");
    currentEvents.push(eventData);
    sessionStorage.setItem("collegerig-session-events", JSON.stringify(currentEvents.slice(-50)));
  } catch {
    // Silently handle storage unavailability
  }
}
