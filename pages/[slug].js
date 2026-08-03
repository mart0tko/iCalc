import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Error from "next/error";
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
import { findToolBySlug, toolCatalog } from "../constants";
import { useTranslation } from "next-i18next";
import YesOrNoGenerator from "../components/generators/YesOrNoGenerator";
import WordCounter from "../components/other/WordCounter";
import RandomTextGenerator from "../components/generators/RandomTextGenerator";
import LoveCalculator from "../components/Calculaters/LoveCalculator";
import FuelCostCalculator from "../components/Calculaters/FuelCostCalculator";
import MD5Generator from "../components/generators/MD5Generator";
import SipCalculator from "../components/Calculaters/SipCalculator";
import MirrorTextGenerator from "../components/generators/MirrorTextGenerator";
import BubbleTextGenerator from "../components/generators/BubbleTextGenerator";
import ZalgoGlitchGenerator from "../components/generators/ZalgoGlitchGenerator";
import FacebookTextGenerator from "../components/generators/FacebookTextGenerator";
import MorseCodeTranslator from "../components/other/MorseCodeTranslator";
import BinaryCodeTranslator from "../components/other/BinaryCodeTranslator";
import NatoPhoneticAlphabetTranslator from "../components/other/NatoPhoneticAlphabetTranslator";
import CagrCalculator from "../components/Calculaters/CagrCalculator";
import BounceRateCalculator from "../components/Calculaters/BounceRateCalculator";
import BTUtoM3Converter from "../components/converters/BTUtoM3Converter";
import BtuToM2 from "../components/other/BtuToM2";
import BTUtoKwConverter from "../components/converters/BTUtoKwConverter";
import WattToKilowattConverter from "../components/converters/WattToKilowattConverter";

const componentsBySlug = {
  "percentage-difference-calculator": PercentageDifferance,
  "percentage-change-calculator": PercentageChange,
  "percentage-calculator": Percentage,
  "age-calculator": Age,
  "simple-loan-calculator": SimpleLoanCalculator,
  "conversion-rate-calculator": ConversionRateCalculator,
  "profit-margin-calculator": ProfitMarginCalculator,
  "bmi-calculator": BMI,
  "bmr-calculator": BMR,
  "dog-age-calculator": DogAgeCalculator,
  "cat-age-calculator": CatAgeCalculator,
  "salary-to-hourly-calculator": SalaryToHourlyCalculator,
  "tire-size-calculator": TireSizeCalculator,
  "tip-calculator": TipCalculator,
  "gratuity-calculator": GratuityCalculator,
  "margin-calculator": MarginCalculator,
  "discount-calculator": DiscountCalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "cm-to-inches-converter": CmToInchesConverter,
  "mm-to-inches-converter": MmToInchesConverter,
  "feet-to-inches-converter": FeetToInchesConverter,
  "cm-to-feet-converter": CmToFeetConverter,
  "miles-to-km-converter": MilesToKmConverter,
  "meter-to-feet-converter": MToFeetConverter,
  "random-number-generator": RandomNumberGenerator,
  "random-string-generator": RandomStringGenerator,
  "random-password-generator": RandomPasswordGenerator,
  "random-team-generator": RandomTeamGenerator,
  "yes-or-no-generator": YesOrNoGenerator,
  "random-text-generator": RandomTextGenerator,
  "love-calculator": LoveCalculator,
  "fuel-cost-calculator": FuelCostCalculator,
  "md5-generator": MD5Generator,
  "sip-calculator": SipCalculator,
  "word-counter": WordCounter,
  "mirror-text-generator": MirrorTextGenerator,
  "bubble-text-generator": BubbleTextGenerator,
  "zalgo-glitch-generator": ZalgoGlitchGenerator,
  "facebook-font-generator": FacebookTextGenerator,
  "morse-code-translator": MorseCodeTranslator,
  "binary-code-translator": BinaryCodeTranslator,
  "nato-phonetical-alphabet-translator": NatoPhoneticAlphabetTranslator,
  "cagr-calculator": CagrCalculator,
  "bounce-rate-calculator": BounceRateCalculator,
  "btu-to-m3-convertor": BTUtoM3Converter,
  "btu-to-kw-convertor": BTUtoKwConverter,
  "watt-to-kilowatt-convertor": WattToKilowattConverter,
  "btu-to-m2": BtuToM2,
  "m2-to-btu": BtuToM2,
};

export default function ToolPage({ slug, titleKey, descriptionKey }) {
  const { t } = useTranslation();
  const ToolComponent = componentsBySlug[slug];

  if (!ToolComponent) {
    return <Error statusCode={404} />;
  }

  const translatedTitle = t(titleKey);
  const translatedDescription = t(descriptionKey);
  const canonicalUrl = `https://wannacalc.com/${slug}/`;

  return (
    <>
      <Head>
        <title>{`${translatedTitle} | WannaCalc`}</title>
        <meta name="description" content={translatedDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${translatedTitle} | WannaCalc`} />
        <meta property="og:description" content={translatedDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <ToolComponent />
    </>
  );
}

export async function getStaticProps({ locale, params }) {
  const tool = findToolBySlug(params.slug);

  if (!tool || !componentsBySlug[params.slug]) {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      slug: params.slug,
      titleKey: tool.title,
      descriptionKey: tool.title
        .replace(".titleReversed", ".descriptionReversed")
        .replace(".title", ".description"),
    },
  };
}

export const getStaticPaths = async () => {
  return {
    paths: toolCatalog.map((tool) => ({ params: { slug: tool.slug } })),
    fallback: false,
  };
};
