import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

export default function NotFoundPage() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <h1>404 - {t("common.pageNotFound")}</h1>
      <Link href="/" style={{ color: theme.palette.primary.main }}>
        {t("common.goBackHome")}
      </Link>
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
