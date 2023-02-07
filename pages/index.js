import Box from "@mui/material/Box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CalculaterHomeLink from "../components/CalculaterHomeLink";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "center",
          justifyContent: "center",
          "& > :not(style)": {
            m: 1,
            width: "100%",
          },
        }}
      >
        <CalculaterHomeLink
          title="percentage.title"
          route="percentage-calculator"
          icon="percent"
        />
        <CalculaterHomeLink
          color={true}
          title="percentDiffCalc.title"
          route="percentage-difference-calculator"
          icon="percent"
        />
        <CalculaterHomeLink
          title="percentChange.title"
          route="percentage-change-calculator"
          icon="percent"
        />
        <CalculaterHomeLink
          color={true}
          title="ageCalc.title"
          route="age-calculator"
          icon="date_range"
        />
        <CalculaterHomeLink
          title="simpleLoanCalc.title"
          route="simple-loan-calculator"
          icon="currency_exchange"
        />
        <CalculaterHomeLink
          color={true}
          title="conversionRateCalc.title"
          route="conversion-rate-calculator"
          icon="ads_click"
        />
        <CalculaterHomeLink
          title="profitMarginCalc.title"
          route="profit-margin-calculator"
          icon="score"
        />
        <CalculaterHomeLink
          color={true}
          title="marginCalc.title"
          route="margin-calculator"
          icon="score"
        />
        <CalculaterHomeLink
          title="bmi.title"
          route="bmi-calculator"
          icon="favorite"
        />
        <CalculaterHomeLink
          color={true}
          title="bmr.title"
          route="bmr-calculator"
          icon="favorite"
        />
        <CalculaterHomeLink
          title="dogAgeCalculator.title"
          route="dog-age-calculator"
          icon="pets"
        />
        <CalculaterHomeLink
          color={true}
          title="catAgeCalculator.title"
          route="cat-age-calculator"
          icon="pets"
        />
        <CalculaterHomeLink
          title="tireSizeCalculator.title"
          route="tire-size-calculator"
          icon="directions_car"
        />
        <CalculaterHomeLink
          color={true}
          title="tipCalculator.title"
          route="tip-calculator"
          icon="payments"
        />
        <CalculaterHomeLink
          title="gratuityCalculator.title"
          route="gratuity-calculator"
          icon="payments"
        />
        <CalculaterHomeLink
          color={true}
          title="discountCalculator.title"
          route="discount-calculator"
          icon="payments"
        />
      </Box>
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
