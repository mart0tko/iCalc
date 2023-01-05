import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import CalculaterHomeLink from "../components/CalculaterHomeLink";
import Link from "next/link";

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
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
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
