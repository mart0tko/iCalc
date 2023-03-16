import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import Header from "../components/Header";
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
