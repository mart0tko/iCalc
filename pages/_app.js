import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import BackToTop from "../components/nav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <BackToTop>
        <Component {...pageProps} />
      </BackToTop>
    </>
  );
}

export default appWithTranslation(MyApp);
