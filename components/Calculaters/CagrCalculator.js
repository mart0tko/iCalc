import { Alert, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";
import Description from "../Description";
import Title from "../Title";
import { calculateCagr } from "../../lib/calculations";

const defaultValues = {
  initialInvestment: 10000,
  finalValue: 20000,
  numYears: 5,
};

export default function CagrCalculator() {
  const { t } = useTranslation("");
  const [initialValue, setInitialValue] = useState(
    defaultValues.initialInvestment
  );
  const [finalValue, setFinalValue] = useState(defaultValues.finalValue);
  const [numYears, setNumYears] = useState(defaultValues.numYears);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    try {
      setError("");
      setResult(calculateCagr(initialValue, finalValue, numYears).toFixed(2));
    } catch (calculationError) {
      setResult("");
      setError(calculationError.message);
    }
  };

  const handleClear = () => {
    initialValue && setInitialValue(defaultValues.initialInvestment);
    finalValue && setFinalValue(defaultValues.finalValue);
    numYears && setNumYears(defaultValues.numYears);
    setResult("");
    setError("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("cagrCalculator.title")}</Title>
      <Description>{t("cagrCalculator.description")}</Description>
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
            label={t("cagrCalculator.initialValue")}
            variant="standard"
            value={initialValue}
            inputProps={{ min: 0.01, step: "any" }}
            onChange={(e) => handleChange(e, setInitialValue)}
          />
          <br />
          <Input
            type="number"
            label={t("cagrCalculator.finalValue")}
            variant="standard"
            value={finalValue}
            inputProps={{ min: 0, step: "any" }}
            onChange={(e) => handleChange(e, setFinalValue)}
          />
          <br />
          <Input
            type="number"
            label={t("cagrCalculator.numYears")}
            variant="standard"
            value={numYears}
            inputProps={{ min: 0.01, step: "any" }}
            onChange={(e) => handleChange(e, setNumYears)}
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
