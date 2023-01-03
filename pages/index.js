import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navigation from "../components/navigation";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Navigation />
      <div className="mt-5">
        <h1>{t("home.Home title")}</h1>
        <p>{t("home.Home description")}</p>
      </div>
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
