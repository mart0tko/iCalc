import { Button, Container, Slider, Typography } from "@mui/material";
import { useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import moment from "moment";
import currency from "currency.js";
import CalcButtons from "../CalcButtons";

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

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResultMontly("");
    setResultTotal("");
    setResultTotalInterest("");
    const i = currency(+valueThree, { precision: 10 })
      .divide(100)
      .divide(12).value;
    let down = currency(i, { precision: 10 }).add(1).value;
    down = currency(Math.pow(down, +valueTwo), { precision: 10 }).subtract(
      1
    ).value;
    let up = currency(i, { precision: 10 }).add(1).value;
    up = currency(Math.pow(up, valueTwo), { precision: 10 }).value;
    const upFinal = currency(+valueOne).multiply(i).multiply(up).value;
    const resMontly = currency(upFinal, { precision: 2 }).divide(down).value;
    const resTotal = currency(resMontly, { precision: 2 }).multiply(
      +valueTwo
    ).value;
    const resTotalInterest = currency(resTotal, { precision: 2 }).subtract(
      +valueOne
    ).value;
    setResultMontly(resMontly);
    setResultTotal(resTotal);
    setResultTotalInterest(resTotalInterest);
  };

  const handleClear = () => {
    resultMontly && setResultMontly("");
    resultTotal && setResultTotal("");
    resultTotalInterest && setResultTotalInterest("");
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
            min={1}
            step={0.1}
            max={100}
            onChange={(e) => handleChange(e, setValueThree)}
          />
        </Container>
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
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
