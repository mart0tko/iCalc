import { Paper, Typography } from "@mui/material";
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
      <Typography variant="caption" color="initial">
        {t("common.copyright")}
      </Typography>
    </Paper>
  );
}
