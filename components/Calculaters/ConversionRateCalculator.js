import { Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import currency from "currency.js";
import CalcButtons from "../CalcButtons";
import Description from "../Description";
import Title from "../Title";

export default function ConversionRateCalculator() {
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState(50);
  const [valueTwo, setValueTwo] = useState(1000);
  const [result, setResult] = useState("");

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

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
      <Title>{t("conversionRateCalc.title")}</Title>
      <Description>{t("conversionRateCalc.description")}</Description>
      <br />
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            type="number"
            label={t("conversionRateCalc.valueOne")}
            variant="standard"
            value={valueOne}
            onChange={(e) => handleChange(e, setValueOne)}
          />
          <TextField
            type="number"
            label={t("conversionRateCalc.valueTwo")}
            variant="standard"
            value={valueTwo}
            onChange={(e) => handleChange(e, setValueTwo)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton result={`${result} %`}>
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
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
