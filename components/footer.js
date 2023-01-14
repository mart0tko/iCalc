import { Link, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("");
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
      component="footer"
      variant="outlined"
    >
      <Typography
        variant="caption"
        color="initial"
        sx={{ marginRight: "1rem" }}
      >
        {t("common.copyright")}
      </Typography>
      <Link
        href="/privacy-policy"
        sx={{
          color: "initial",
          textDecorationColor: "initial",
          cursor: "pointer",
        }}
      >
        {t("common.privacyPolicy")}
      </Link>
      {" | "}
      <Link
        href="/terms-of-use"
        sx={{
          color: "initial",
          textDecorationColor: "initial",
          cursor: "pointer",
        }}
      >
        {t("common.termsOfUse")}
      </Link>
    </Paper>
  );
}
