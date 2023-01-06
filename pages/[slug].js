import { Box } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import PercentageDifferance from "../components/Calculaters/PercentageDifferance";

export default function About() {
  const { t } = useTranslation("");
  const { locale, route } = useRouter();

  // TODO Make builder as per the provided routee
  if (locale !== "en") {
    return (
      <div className="mt-5">
        <h1>{locale}</h1>
        <h1>{t("about.About title")}</h1>
        <p>{t("about.About description")}</p>
      </div>
    );
  }

  return <PercentageDifferance />;
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
