import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function About() {
  const { t } = useTranslation("");

  return (
    <>
      <h1 style={{ marginTop: 0, paddingTop: "1rem" }}>
        We are not responsible for any decisions made based on our calculators!
      </h1>
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
