import { useTranslation } from "next-i18next";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Icon, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const sizePaper = 128;
const paddingTop = 0;

function generateText(type) {
  switch (type) {
    case "calculator":
      return "common.calculator";
    case "Converter":
      return "common.converter";
    case "Generator":
      return "common.generator";
    default:
      return "";
  }
}

function generateColor(type, theme) {
  switch (type) {
    case "calculator":
      return theme.palette.success.main;
    case "Converter":
      return theme.palette.warning.main;
    case "Generator":
      return theme.palette.error.main;
    default:
      return theme.palette.grey.main;
  }
}

export default function CalculaterHomeLink({ href, icon, title, color, type }) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [label, setLabel] = useState("");
  const [labelColor, setLabelColor] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setLabel(t(generateText(type)));
    setLabelColor(t(generateColor(type, theme)));
    console.log(theme);
  }, []);

  return (
    <Link
      href={href}
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
          position: "relative",
          paddingTop: paddingTop,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            textAlign: "center",
            width: "100%",
            backgroundColor: labelColor,
          }}
        >
          {label}
        </span>
        <Icon sx={{ mb: 1 }} style={{ fontSize: "25px" }}>
          {icon}
        </Icon>
        {t(title)}
      </Paper>
    </Link>
  );
}
