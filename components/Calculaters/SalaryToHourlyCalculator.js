import { Alert, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";
import Description from "../Description";
import Title from "../Title";
import { calculateSalaryRates } from "../../lib/calculations";

export default function SalaryToHourlyCalculator() {
  const { t } = useTranslation("");
  const [salary, setSalary] = useState(50000);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [result, setResult] = useState("");
  const [resultPerWeek, setResultPerWeek] = useState("");
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
      const rates = calculateSalaryRates(salary, hoursPerWeek);
      setResult(rates.hourly.toFixed(2));
      setResultPerWeek(rates.weekly.toFixed(2));
    } catch (calculationError) {
      setResult("");
      setResultPerWeek("");
      setError(calculationError.message);
    }
  };

  const handleClear = () => {
    hoursPerWeek && setHoursPerWeek(40);
    salary && setSalary(50000);
    result && setResult("");
    resultPerWeek && setResultPerWeek("");
    setError("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("salaryToHourlyCalculator.title")}</Title>
      <Description>{t("salaryToHourlyCalculator.description")}</Description>
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
            label={t("salaryToHourlyCalculator.salary")}
            variant="standard"
            value={salary}
            onChange={(e) => handleChange(e, setSalary)}
          />
          <Input
            type="number"
            label={t("salaryToHourlyCalculator.hoursPerWeek")}
            variant="standard"
            value={hoursPerWeek}
            inputProps={{ min: 1, max: 168, step: "any" }}
            onChange={(e) => handleChange(e, setHoursPerWeek)}
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
              {t("salaryToHourlyCalculator.hourlyPay")} {result}
            </Typography>
          </CopyToClipboardButton>
          <CopyToClipboardButton result={`${resultPerWeek}`}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("salaryToHourlyCalculator.perWeek")} {resultPerWeek}
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
