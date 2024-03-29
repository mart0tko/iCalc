import { useTranslation } from "next-i18next";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Icon, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const sizePaper = 128;
const paddingTop = 2;

function generateText(type) {
  switch (type) {
    case "calculator":
      return "common.calculator";
    case "Converter":
      return "common.converter";
    case "Generator":
      return "common.generator";
    case "Other":
      return "common.other";
    default:
      return "";
  }
}

function generateColor(type, theme) {
  switch (type) {
    case "calculator":
      return theme.palette.secondary.main;
    case "Converter":
      return theme.palette.warning.main;
    case "Generator":
      return theme.palette.error.main;
    case "Other":
      return theme.palette.grey[800];
    default:
      return theme.palette.grey[800];
  }
}

export default function CalculaterHomeLink({ href, icon, title, color, type }) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [label, setLabel] = useState("");
  const theme = useTheme();
  const [labelColor, setLabelColor] = useState(theme.palette.grey.main);

  useEffect(() => {
    setLabel(t(generateText(type)));
    setLabelColor(generateColor(type, theme));
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
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderColor: theme.palette.primary.main,
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
