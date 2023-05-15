import { useTranslation } from "next-i18next";
import { Button, Container } from "@mui/material";

export default function CalcButtons({
  handleClear,
  handleSubmit,
  type,
  withoutReset,
}) {
  const { t } = useTranslation();

  return (
    <Container sx={{ padding: "1rem" }}>
      {!withoutReset && (
        <Button
          variant="contained"
          onClick={() => {
            //   gtag.event({
            //     action: "click",
            //     category: "button click",
            //     label: "calculate",
            //     value: "calculate button click",
            //   });
            handleClear();
          }}
          sx={{ backgroundColor: "secondary.dark", margin: "1rem" }}
        >
          {t("common.reset")}
        </Button>
      )}
      <Button
        variant="contained"
        onClick={() => {
          //   gtag.event({
          //     action: "click",
          //     category: "button click",
          //     label: "calculate",
          //     value: "calculate button click",
          //   });
          handleSubmit();
        }}
        sx={{ margin: "1rem" }}
      >
        {t(`common.${type ?? "calculate"}`)}
      </Button>
    </Container>
  );
}
