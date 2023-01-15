import { Container, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import currency from "currency.js";
import { useTheme } from "@mui/material/styles";

export default function MarginCalculator() {
  const theme = useTheme();
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState(125);
  const [valueTwo, setValueTwo] = useState(250);
  const [grossMarginResult, setGrossMarginResult] = useState(null);
  const [markupResult, setMarkupResult] = useState(null);
  const [grossProfitResult, setGrossProfitResult] = useState(null);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    if (!valueOne || !valueTwo) {
      return;
    }
    setGrossMarginResult(null);
    setMarkupResult(null);
    setGrossProfitResult(null);

    const grossProfit = currency(+valueTwo, { precision: 2 }).subtract(
      +valueOne
    ).value;
    const markup = currency(grossProfit, { precision: 2 })
      .divide(+valueOne)
      .multiply(100).value;
    const grossMargin = currency(grossProfit, { precision: 2 })
      .divide(+valueTwo)
      .multiply(100).value;

    setGrossMarginResult(grossMargin);
    setMarkupResult(markup);
    setGrossProfitResult(grossProfit);
  };

  const handleClear = () => {
    valueOne && setValueOne("");
    valueTwo && setValueTwo("");
    grossMarginResult && setGrossMarginResult(null);
    markupResult && setMarkupResult(null);
    grossProfitResult && setGrossProfitResult(null);
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("marginCalc.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("marginCalc.description")}
      </Typography>
      <br />
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            type="number"
            label={t("marginCalc.valueOne")}
            variant="standard"
            value={valueOne}
            onChange={(e) => handleChange(e, setValueOne)}
          />
          <br />
          <TextField
            type="number"
            label={t("marginCalc.valueTwo")}
            variant="standard"
            value={valueTwo}
            onChange={(e) => handleChange(e, setValueTwo)}
          />
          <br />
          <Typography
            variant="span"
            gutterBottom
            sx={{ fontSize: "1rem", textDecoration: "underline" }}
          >
            {t("common.positiveNumbersNote")}
          </Typography>
        </Container>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{t("common.result")}</Typography>
          <CopyToClipboardButton result={grossMarginResult}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("marginCalc.grossMarginResult")} {grossMarginResult} %
            </Typography>
          </CopyToClipboardButton>
          <br />
          <CopyToClipboardButton result={markupResult}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("marginCalc.markupResult")} {markupResult} %
            </Typography>
          </CopyToClipboardButton>
          <br />
          <CopyToClipboardButton result={grossProfitResult}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("marginCalc.grossProfitResult")} $ {grossProfitResult}{" "}
            </Typography>
          </CopyToClipboardButton>
          <br />
          <Typography sx={{ fontSize: "0.75rem" }}>
            {t("profitMarginCalc.related")}
            <Link
              href="/profit-margin-calculator"
              style={{ color: theme.palette.primary.main }}
            >
              {t("profitMarginCalc.title")}
            </Link>
          </Typography>
        </Container>
      </Container>
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
