//components/GoogleAnalytics.tsx
import getConfig from "next/config";
import { useRouter } from "next/router";
import Script from "next/script";
import { memo, useEffect } from "react";
const TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
const isDev = process.env.NODE_ENV === "development" ? true : false;
const GoogleAnalytics = () => {
  const router = useRouter();
  //   const { publicRuntimeConfig } = getConfig();
  // 👇 send page views when users gets to the landing page
  useEffect(() => {
    if (!TRACKING_ID || router.isPreview || isDev) return;
    gtag("config", TRACKING_ID, {
      send_page_view: false, //manually send page views to have full control
    });
    gtag("event", "page_view", {
      page_path: window.location.pathname,
      send_to: TRACKING_ID,
    });
  }, []);
  // 👇 send page views on route change
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!TRACKING_ID || router.isPreview || isDev) return;
      // manually send page views
      gtag("event", "page_view", {
        page_path: url,
        send_to: TRACKING_ID,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events, router.isPreview]);
  // 👇 prevent rendering scripts if there is no TRACKING_ID or if it's preview mode.
  if (!TRACKING_ID || router.isPreview || isDev) {
    return null;
  }
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
      ></Script>
      {/* 👇 gtag function definition. notice that we don't send page views at this point.  */}
      <Script
        strategy="lazyOnload"
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />
    </>
  );
};
export default memo(GoogleAnalytics);
