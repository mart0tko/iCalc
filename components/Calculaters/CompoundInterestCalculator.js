import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";

function compoundInterest(
  principal,
  interestRate,
  timeInYears,
  compoundPerYear
) {
  const interestRateDecimal = interestRate / 100;
  let amount =
    principal *
    Math.pow(
      1 + interestRateDecimal / compoundPerYear,
      compoundPerYear * timeInYears
    );
  let interest = amount - principal;
  return amount.toFixed(2);
}

const initialValues = {
  initialMoney: 10000,
  interestRate: 5,
  years: 5,
  compoundPerYear: 1,
};

export default function CompoundInterestCalculator() {
  const { t } = useTranslation("");
  const [initialMoney, setInitialMoney] = useState(initialValues.initialMoney);
  const [interestRate, setInterestRate] = useState(initialValues.interestRate);
  const [years, setYears] = useState(initialValues.years);
  const [compoundPerYear, setCompoundPerYear] = useState(
    initialValues.compoundPerYear
  );
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    const res = compoundInterest(
      initialMoney,
      interestRate,
      years,
      compoundPerYear
    );
    setResult(res);
  };

  const handleClear = () => {
    initialMoney && setInitialMoney(initialValues.initialMoney);
    interestRate && setInterestRate(initialValues.interestRate);
    years && setYears(initialValues.years);
    compoundPerYear && setCompoundPerYear(initialValues.compoundPerYear);
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("compoundInterestCalculator.title")}
      </Typography>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontSize: "1rem", whiteSpace: "pre-wrap" }}
      >
        {t("compoundInterestCalculator.description")}
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
            label={t("compoundInterestCalculator.initialMoney")}
            variant="standard"
            value={initialMoney}
            onChange={(e) => handleChange(e, setInitialMoney)}
          />
          <Input
            type="number"
            label={t("compoundInterestCalculator.interestRate")}
            variant="standard"
            value={interestRate}
            onChange={(e) => handleChange(e, setInterestRate)}
          />
          <Input
            type="number"
            label={t("compoundInterestCalculator.years")}
            variant="standard"
            value={years}
            onChange={(e) => handleChange(e, setYears)}
          />
          <Input
            type="number"
            label={t("compoundInterestCalculator.compoundPerYear")}
            variant="standard"
            value={compoundPerYear}
            maxLength="5"
            onChange={(e) => handleChange(e, setCompoundPerYear)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton result={`${result}`}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("compoundInterestCalculator.futureValue")} {result}
            </Typography>
          </CopyToClipboardButton>
        </Container>
      </Container>
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
