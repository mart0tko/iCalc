import { Alert, Container, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Description from "../Description";
import Title from "../Title";
import { calculateLoan } from "../../lib/calculations";

const loanAmountefaultValue = 100000;
const loanTermDefaultValue = 60;
const interestDefaultValue = 5;

export default function SimpleLoanCalculator() {
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState(loanAmountefaultValue);
  const [valueTwo, setValueTwo] = useState(loanTermDefaultValue);
  const [valueThree, setValueThree] = useState(interestDefaultValue);
  const [resultMontly, setResultMontly] = useState("");
  const [resultTotal, setResultTotal] = useState("");
  const [resultTotalInterest, setResultTotalInterest] = useState("");
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
      const calculation = calculateLoan(valueOne, valueThree, valueTwo);
      setResultMontly(calculation.monthlyPayment.toFixed(2));
      setResultTotal(calculation.totalPayment.toFixed(2));
      setResultTotalInterest(calculation.totalInterest.toFixed(2));
    } catch (calculationError) {
      setResultMontly("");
      setResultTotal("");
      setResultTotalInterest("");
      setError(calculationError.message);
    }
  };

  const handleClear = () => {
    setValueOne(loanAmountefaultValue);
    setValueTwo(loanTermDefaultValue);
    setValueThree(interestDefaultValue);
    resultMontly && setResultMontly("");
    resultTotal && setResultTotal("");
    resultTotalInterest && setResultTotalInterest("");
    setError("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("simpleLoanCalc.title")}</Title>
      <Description>{t("simpleLoanCalc.description")}</Description>
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
          {/* Inputs */}
          <Typography gutterBottom>
            {t("simpleLoanCalc.loanAmount")} {valueOne} $
          </Typography>
          <Slider
            value={valueOne}
            min={10000}
            step={1000}
            max={1000000}
            onChange={(e) => handleChange(e, setValueOne)}
          />
          <Typography gutterBottom>
            {t("simpleLoanCalc.loanTerm")} {valueTwo}{" "}
            {t("simpleLoanCalc.months")}
          </Typography>
          <Slider
            value={valueTwo}
            min={1}
            step={1}
            max={360}
            onChange={(e) => handleChange(e, setValueTwo)}
          />
          <Typography gutterBottom>
            {t("simpleLoanCalc.interestRate")} {valueThree} %
          </Typography>
          <Slider
            value={valueThree}
            min={0}
            step={0.1}
            max={100}
            onChange={(e) => handleChange(e, setValueThree)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{t("common.result")}</Typography>
          <CopyToClipboardButton result={resultMontly}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("simpleLoanCalc.resultMontly")} {resultMontly && "$"}{" "}
              {resultMontly}
            </Typography>
          </CopyToClipboardButton>
          <CopyToClipboardButton result={resultTotal}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("simpleLoanCalc.resultTotal")} {resultTotal && "$"}{" "}
              {resultTotal}
            </Typography>
          </CopyToClipboardButton>
          <CopyToClipboardButton result={resultTotalInterest}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("simpleLoanCalc.resultTotalInterest")}{" "}
              {resultTotalInterest && "$"} {resultTotalInterest}
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
