import { Alert, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";
import Description from "../Description";
import Title from "../Title";
import { calculateSip } from "../../lib/calculations";

const initialValues = {
  principal: 10000,
  monthlyInvestment: 5000,
  interestRate: 10,
  duration: 5,
};

const emptyResult = {
  futureValue: null,
  totalInvestment: null,
  totalReturns: null,
};

export default function SipCalculator() {
  const { t } = useTranslation("");
  const [principal, setPrincipal] = useState(initialValues.principal);
  const [monthlyInvestment, setMonthlyInvestment] = useState(
    initialValues.monthlyInvestment
  );
  const [interestRate, setInterestRate] = useState(initialValues.interestRate);
  const [duration, setDuration] = useState(initialValues.duration);
  const [result, setResult] = useState(emptyResult);
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
      const calculation = calculateSip(
        principal,
        monthlyInvestment,
        interestRate,
        duration
      );
      setResult({
        futureValue: calculation.futureValue.toFixed(2),
        totalInvestment: calculation.totalInvestment.toFixed(2),
        totalReturns: calculation.totalReturns.toFixed(2),
      });
    } catch (calculationError) {
      setResult(emptyResult);
      setError(calculationError.message);
    }
  };

  const handleClear = () => {
    principal && setPrincipal(initialValues.principal);
    monthlyInvestment && setMonthlyInvestment(initialValues.monthlyInvestment);
    interestRate && setInterestRate(initialValues.interestRate);
    duration && setDuration(initialValues.duration);
    setResult(emptyResult);
    setError("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("sipCalculator.title")}</Title>
      <Description>{t("sipCalculator.description")}</Description>
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
            label={t("sipCalculator.initialAmount")}
            variant="standard"
            value={principal}
            inputProps={{ min: 0, step: "any" }}
            onChange={(e) => handleChange(e, setPrincipal)}
          />
          <br />
          <Input
            type="number"
            label={t("sipCalculator.monthlyInvestment")}
            variant="standard"
            value={monthlyInvestment}
            inputProps={{ min: 0, step: "any" }}
            onChange={(e) => handleChange(e, setMonthlyInvestment)}
          />
          <br />
          <Input
            type="number"
            label={t("sipCalculator.annualInterest")}
            variant="standard"
            value={interestRate}
            maxLength="5"
            onChange={(e) => handleChange(e, setInterestRate)}
          />
          <br />
          <Input
            type="number"
            label={t("sipCalculator.duration")}
            variant="standard"
            value={duration}
            inputProps={{ min: 0.1, step: "any" }}
            onChange={(e) => handleChange(e, setDuration)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{t("sipCalculator.result")}</Typography>
          <CopyToClipboardButton result={result.futureValue}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("sipCalculator.futureValue")}
              {result.futureValue}
            </Typography>
          </CopyToClipboardButton>
          <CopyToClipboardButton result={result.totalInvestment}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("sipCalculator.totalInvestment")}
              {result.totalInvestment}
            </Typography>
          </CopyToClipboardButton>
          <CopyToClipboardButton result={result.totalReturns}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("sipCalculator.totalReturns")}
              {result.totalReturns}
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
