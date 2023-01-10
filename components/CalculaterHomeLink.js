import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Icon } from "@mui/material";
import { useRouter } from "next/router";
import InternationalLinks from "./consts";

const sizePaper = 128;

export default function CalculaterHomeLink({ route, icon, title, color }) {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <Link
      href={InternationalLinks[route][locale]}
      style={{ maxWidth: sizePaper, height: sizePaper }}
      locale={locale}
    >
      <Paper
        variant="outlined"
        hrefLang="en"
        sx={{
          cursor: "pointer",
          backgroundColor: color ? "primary.light" : "primary.dark",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: sizePaper,
          height: sizePaper,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        <Icon sx={{ mb: 1 }} style={{ fontSize: "25px" }}>
          {icon}
        </Icon>
        {t(title)}
      </Paper>
    </Link>
  );
}
