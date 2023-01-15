import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Error from "next/error";
import { useRouter } from "next/router";
import Age from "../components/Calculaters/Age";
import ConversionRateCalculator from "../components/Calculaters/ConversionRateCalculator";
import MarginCalculator from "../components/Calculaters/MarginCalculator";
import Percentage from "../components/Calculaters/Percentage";
import PercentageChange from "../components/Calculaters/PercentageChange";
import PercentageDifferance from "../components/Calculaters/PercentageDifferance";
import ProfitMarginCalculator from "../components/Calculaters/ProfitMarginCalculator";
import SimpleLoanCalculator from "../components/Calculaters/SimpleLoanCalculator";

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
    case "simple-loan-calculator":
      return <SimpleLoanCalculator />;
    case "conversion-rate-calculator":
      return <ConversionRateCalculator />;
    case "profit-margin-calculator":
      return <ProfitMarginCalculator />;
    case "margin-calculator":
      return <MarginCalculator />;
    default:
      return <Error statusCode={404} />;
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
