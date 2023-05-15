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
import CompoundInterestCalculator from "../components/Calculaters/CompoundInterestCalculator";
import SalaryToHourlyCalculator from "../components/Calculaters/SalaryToHourlyCalculator";
import CmToInchesConverter from "../components/converters/CmToInchesConverter";
import MmToInchesConverter from "../components/converters/MmToInchesConverter";
import FeetToInchesConverter from "../components/converters/FeetToInchesConverter";
import CmToFeetConverter from "../components/converters/CmToFeetConverter";
import MilesToKmConverter from "../components/converters/MilesToKmConverter";
import MToFeetConverter from "../components/converters/mToFeetConverter";
import RandomNumberGenerator from "../components/generators/RandomNumberGenerator";
import RandomStringGenerator from "../components/generators/RandomStringGenerator";
import RandomPasswordGenerator from "../components/generators/RandomPasswordGenerator";
import RandomTeamGenerator from "../components/generators/RandomTeamGenerator";
import Head from "next/head";
import InternationalLinks, {
  InternationalLinksConvertors,
  InternationalLinksGenerators,
  InternationalLinksOthers,
} from "../constants";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import YesOrNoGenerator from "../components/generators/YesOrNoGenerator";
import WordCounter from "../components/other/WordCounter";
import RandomTextGenerator from "../components/generators/RandomTextGenerator";
import LoveCalculator from "../components/Calculaters/LoveCalculator";

const pages = [
  ...InternationalLinks,
  ...InternationalLinksConvertors,
  ...InternationalLinksGenerators,
  ...InternationalLinksOthers,
];
export default function About() {
  const { t } = useTranslation();
  const { asPath, locale } = useRouter();
  const clearAsPath = asPath.replaceAll("/", "");
  const [title, setTitle] = useState("WannaCalc");
  const [description, setDescription] = useState("WannaCalc");

  // Set meta title and description
  useEffect(() => {
    const clearPath = asPath.slice(0, -1);
    const element = pages.find((element) => element[locale] === clearPath);
    const newDescription = element.title.replace(".title", ".description");
    setTitle(element.title);
    setDescription(newDescription);
  }, [asPath, locale]);

  // TODO Make to match as per different languages
  const pageToLoad = () => {
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
      case "salary-to-hourly-calculator":
        return <SalaryToHourlyCalculator />;
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
      case "compound-interest-calculator":
        return <CompoundInterestCalculator />;
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
      case "meter-to-feet-converter":
        return <MToFeetConverter />;
      case "random-number-generator":
        return <RandomNumberGenerator />;
      case "random-string-generator":
        return <RandomStringGenerator />;
      case "random-password-generator":
        return <RandomPasswordGenerator />;
      case "random-team-generator":
        return <RandomTeamGenerator />;
      case "yes-or-no-generator":
        return <YesOrNoGenerator />;
      case "random-text-generator":
        return <RandomTextGenerator />;
      case "love-calculator":
        return <LoveCalculator />;
      case "word-counter":
        return <WordCounter />;
      default:
        return <Error statusCode={404} />;
    }
  };

  return (
    <>
      <Head>
        <title>{t(title)}</title>
        <meta name="description" content={t(description)} />
      </Head>
      {pageToLoad()}
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

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
