import { useState } from "react";
import { Container, Icon, Snackbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CopyToClipboardButton({ children, result }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(result.toString());
  };
  if (!result) {
    return null;
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        wordBreak: "break-all",
      }}
    >
      {children}
      <Icon
        onClick={handleClick}
        color="primary"
        sx={{ cursor: "pointer", marginLeft: "1rem" }}
      >
        content_copy
      </Icon>
      <Snackbar
        message={t("common.copiedToClibboard")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </Container>
  );
}
