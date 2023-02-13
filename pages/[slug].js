import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Error from "next/error";
import { useRouter } from "next/router";
import Age from "../components/Calculaters/Age";
import ConversionRateCalculator from "../components/Calculaters/ConversionRateCalculator";
import MarginCalculator from "../components/Calculaters/MarginCalculator";
import Percentage from "../components/Calculaters/Percentage";
import BMI from "../components/Calculaters/BMI";
import BMR from "../components/Calculaters/BMR";
import PercentageChange from "../components/Calculaters/PercentageChange";
import PercentageDifferance from "../components/Calculaters/PercentageDifferance";
import ProfitMarginCalculator from "../components/Calculaters/ProfitMarginCalculator";
import SimpleLoanCalculator from "../components/Calculaters/SimpleLoanCalculator";
import DogAgeCalculator from "../components/Calculaters/DogAgeCalculator";
import CatAgeCalculator from "../components/Calculaters/CatAgeCalculator";
import TireSizeCalculator from "../components/Calculaters/TireSizeCalculator";
import TipCalculator from "../components/Calculaters/TipCalculator";
import GratuityCalculator from "../components/Calculaters/GratuityCalculator";
import DiscountCalculator from "../components/Calculaters/DiscountCalculator";
import CmToInchesConverter from "../components/converters/CmToInchesConverter";
import MmToInchesConverter from "../components/converters/MmToInchesConverter";
import FeetToInchesConverter from "../components/converters/FeetToInchesConverter";
import CmToFeetConverter from "../components/converters/CmToFeetConverter";
import MilesToKmConverter from "../components/converters/MilesToKmConverter";

export default function About() {
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
    case "bmi-calculator":
      return <BMI />;
    case "bmr-calculator":
      return <BMR />;
    case "dog-age-calculator":
      return <DogAgeCalculator />;
    case "cat-age-calculator":
      return <CatAgeCalculator />;
    case "tire-size-calculator":
      return <TireSizeCalculator />;
    case "tip-calculator":
      return <TipCalculator />;
    case "gratuity-calculator":
      return <GratuityCalculator />;
    case "margin-calculator":
      return <MarginCalculator />;
    case "discount-calculator":
      return <DiscountCalculator />;
    case "cm-to-inches-converter":
      return <CmToInchesConverter />;
    case "mm-to-inches-converter":
      return <MmToInchesConverter />;
    case "feet-to-inches-converter":
      return <FeetToInchesConverter />;
    case "cm-to-feet-converter":
      return <CmToFeetConverter />;
    case "miles-to-km-converter":
      return <MilesToKmConverter />;
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
