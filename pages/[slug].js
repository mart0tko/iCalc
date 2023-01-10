import { Box } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Age from "../components/Calculaters/Age";
import Percentage from "../components/Calculaters/Percentage";
import PercentageChange from "../components/Calculaters/PercentageChange";
import PercentageDifferance from "../components/Calculaters/PercentageDifferance";
import NotFoundPage from "./404";

export default function About() {
  const { t } = useTranslation("");
  const { asPath } = useRouter();
  const clearAsPath = asPath.replaceAll("/", "");

  // TODO Make to match as per different languages
  switch (clearAsPath) {
    case "percentage-difference-calculator":
      return <PercentageDifferance />;
    case "percentage-change-calculator":
      return <PercentageChange />;
    case "percentage-calculator":
      return <Percentage />;
    case "age-calculator":
      return <Age />;
    default:
      return <NotFoundPage />;
  }
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
