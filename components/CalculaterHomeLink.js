import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Icon } from "@mui/material";

const sizePaper = 128;
const sizeIcon = sizePaper / 2.5;

export default function CalculaterHomeLink({ route, icon, title }) {
  const { t } = useTranslation();

  return (
    <Link href={route} style={{ maxWidth: sizePaper, height: sizePaper }}>
      <Paper
        variant="outlined"
        href="/test"
        hrefLang="en"
        sx={{
          cursor: "pointer",
          backgroundColor: "primary.light",
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
          percent
        </Icon>
        {t(title)}
      </Paper>
    </Link>
  );
}
