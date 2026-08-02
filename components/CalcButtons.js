import { useTranslation } from "next-i18next";
import { Button, Stack } from "@mui/material";

export default function CalcButtons({
  handleClear,
  handleSubmit,
  type,
  withoutReset,
  withoutCalc,
}) {
  const { t } = useTranslation();

  return (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      spacing={1.25}
      sx={{ width: "100%", py: 2, justifyContent: "center" }}
    >
      {!withoutReset && (
        <Button
          type="button"
          variant="outlined"
          color="inherit"
          onClick={handleClear}
        >
          {t("common.reset")}
        </Button>
      )}
      {!withoutCalc && (
        <Button
          type="button"
          variant="contained"
          onClick={handleSubmit}
          startIcon={<span className="material-icons">calculate</span>}
        >
          {t(`common.${type ?? "calculate"}`)}
        </Button>
      )}
    </Stack>
  );
}
