import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Box from "@mui/material/Box";
import CalculaterHomeLink from "../components/CalculaterHomeLink";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row wrap",
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
