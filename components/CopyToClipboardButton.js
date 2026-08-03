import { useState } from "react";
import { Box, Icon, IconButton, Snackbar } from "@mui/material";
import { useTranslation } from "next-i18next";

export default function CopyToClipboardButton({ children, result }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(String(result));
      setOpen(true);
    } catch {
      setOpen(false);
    }
  };
  if (result === undefined || result === null || result === "") {
    return null;
  }

  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        mt: 1,
        p: 2,
        borderRadius: 2,
        bgcolor: "primary.light",
        color: "text.primary",
        wordBreak: "break-all",
      }}
    >
      {children}
      <IconButton
        aria-label="Copy result to clipboard"
        onClick={handleClick}
        color="primary"
        size="small"
        sx={{ ml: 1 }}
      >
        <Icon fontSize="small">content_copy</Icon>
      </IconButton>
      <Snackbar
        message={t("common.copiedToClibboard")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </Box>
  );
}
