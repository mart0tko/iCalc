import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import Header from "../components/Header";
import Footer from "../components/footer";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Analytics } from "@vercel/analytics/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GoogleAnalytics />
      <Header>
        <Component {...pageProps} />
        <Analytics />
      </Header>
      <Footer />
    </ThemeProvider>
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
