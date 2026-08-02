import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Box, Chip, Icon, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";

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

function generateColor(type) {
  switch (type) {
    case "calculator":
      return "primary";
    case "Converter":
      return "secondary";
    case "Generator":
      return "warning";
    case "Other":
      return "default";
    default:
      return "default";
  }
}

export default function CalculaterHomeLink({ href, icon, title, type }) {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <Link
      href={href}
      style={{ display: "block", height: "100%" }}
      locale={locale}
    >
      <Paper
        component="article"
        elevation={0}
        sx={{
          height: "100%",
          minHeight: 182,
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          transition: "transform .2s ease, border-color .2s ease, box-shadow .2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            borderColor: "primary.main",
            boxShadow: "0 16px 40px rgba(23,32,51,.1)",
          },
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            display: "grid",
            placeItems: "center",
            color: "primary.main",
            bgcolor: "primary.light",
            borderRadius: 2,
            mb: 2,
          }}
        >
          <Icon aria-hidden="true">{icon}</Icon>
        </Box>
        <Typography
          component="h3"
          sx={{ fontWeight: 750, lineHeight: 1.35, mb: 1, flexGrow: 1 }}
        >
          {t(title)}
        </Typography>
        <Chip
          label={t(generateText(type))}
          color={generateColor(type)}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 650 }}
        />
      </Paper>
    </Link>
  );
}
