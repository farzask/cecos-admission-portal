'use client';

import Script from 'next/script';

/**
 * Loads Google Analytics 4 (gtag.js) for the whole site.
 *
 * Rendered once in the root layout. The Measurement ID comes from the
 * NEXT_PUBLIC_GA_ID env var, so analytics stay disabled in any environment
 * where that var is unset (e.g. local dev). GA4's automatic + enhanced
 * measurement covers page views, traffic source, device, geo/city, session
 * duration, visit count, and new-vs-returning out of the box. Custom button /
 * quiz / filter events are fired via {@link trackEvent} in lib/analytics.ts.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
