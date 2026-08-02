import { Alert, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Description from "../Description";
import Title from "../Title";
import Input from "../Input";
import { calculateRate } from "../../lib/calculations";

export default function ConversionRateCalculator() {
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState(50);
  const [valueTwo, setValueTwo] = useState(1000);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    try {
      setError("");
      setResult(calculateRate(valueOne, valueTwo, "Visitors").toFixed(2));
    } catch (calculationError) {
      setResult("");
      setError(calculationError.message);
    }
  };

  const handleClear = () => {
    valueOne && setValueOne("");
    valueTwo && setValueTwo("");
    result && setResult("");
    setError("");
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
          <Input
            type="number"
            label={t("conversionRateCalc.valueOne")}
            variant="standard"
            value={valueOne}
            onChange={(e) => handleChange(e, setValueOne)}
          />
          <Input
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
      {error && <Alert severity="error">{error}</Alert>}
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
