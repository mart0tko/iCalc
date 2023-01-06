import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Box from "@mui/material/Box";
import CalculaterHomeLink from "../components/CalculaterHomeLink";
import Icon from "@mui/material/Icon";

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
          title="percentDiffCalc.title"
          route="percentage-difference-calculator"
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
