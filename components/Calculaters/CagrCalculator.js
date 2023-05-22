import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";

function calculateCAGR(initialValue, finalValue, numYears) {
  const growthRate = (finalValue / initialValue) ** (1 / numYears);
  const cagr = (growthRate - 1) * 100;
  return cagr.toFixed(2); // Round to 2 decimal places
}

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

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    const res = calculateCAGR(initialValue, finalValue, numYears);
    setResult(res);
  };

  const handleClear = () => {
    initialValue && setInitialValue(defaultValues.initialInvestment);
    finalValue && setFinalValue(defaultValues.finalValue);
    numYears && setNumYears(defaultValues.numYears);
    result &&
      setResult(
        calculateCAGR(
          defaultValues.initialInvestment,
          defaultValues.finalValue,
          defaultValues.numYears
        )
      );
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("cagrCalculator.title")}
      </Typography>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontSize: "1rem", whiteSpace: "pre-wrap" }}
      >
        {t("cagrCalculator.description")}
      </Typography>
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
            onChange={(e) => handleChange(e, setInitialValue)}
          />
          <br />
          <Input
            type="number"
            label={t("cagrCalculator.finalValue")}
            variant="standard"
            value={finalValue}
            onChange={(e) => handleChange(e, setFinalValue)}
          />
          <br />
          <Input
            type="number"
            label={t("cagrCalculator.numYears")}
            variant="standard"
            value={numYears}
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
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
