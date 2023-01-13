import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import currency from "currency.js";

export default function ConversionRateCalculator() {
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [result, setResult] = useState("");
  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    const val1 = currency(+valueOne, { precision: 4 }).divide(+valueTwo).value;
    const res = currency(val1).multiply(100).value;
    setResult(res.toFixed(2));
  };

  const handleClear = () => {
    valueOne && setValueOne("");
    valueTwo && setValueTwo("");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("simpleLoanCalc.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("simpleLoanCalc.description")}
      </Typography>
      <br />
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            type="number"
            label={t("simpleLoanCalc.valueOne")}
            variant="standard"
            value={valueOne}
            onChange={(e) => handleChange(e, setValueOne)}
          />
          <TextField
            type="number"
            label={t("simpleLoanCalc.valueTwo")}
            variant="standard"
            value={valueTwo}
            onChange={(e) => handleChange(e, setValueTwo)}
          />
        </Container>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton result={result}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {result} %
            </Typography>
          </CopyToClipboardButton>
        </Container>
      </Container>
      <br />
      <Container sx={{ padding: "1rem" }}>
        <Button
          variant="contained"
          onClick={handleClear}
          sx={{ backgroundColor: "secondary.dark", margin: "1rem" }}
        >
          {t("common.reset")}
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ margin: "1rem" }}
        >
          {t("common.calculate")}
        </Button>
      </Container>
    </ThreeColumnLayout>
  );
}
