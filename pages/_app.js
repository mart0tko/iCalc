import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import Header from "../components/Header";
import Footer from "../components/footer";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default appWithTranslation(MyApp);
