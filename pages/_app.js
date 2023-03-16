import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import Header from "../components/Header";
import Script from "next/script";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";
import getConfig from "next/config";
import Footer from "../components/footer";
import GoogleAnalytics from "../components/GoogleAnalytics";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics />
      <Header>
        <Component {...pageProps} />
      </Header>
      <Footer />
    </>
  );
}

export default appWithTranslation(MyApp);
