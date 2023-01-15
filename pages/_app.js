import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import BackToTop from "../components/BackToTop";
import Script from "next/script";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";
import getConfig from "next/config";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }) {
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      !publicRuntimeConfig?.isDev && gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events, publicRuntimeConfig]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${gtag.GA_TRACKING_ID}');
          `,
        }}
      />
      <BackToTop>
        <Component {...pageProps} />
      </BackToTop>
      <Footer />
    </>
  );
}

export default appWithTranslation(MyApp);
