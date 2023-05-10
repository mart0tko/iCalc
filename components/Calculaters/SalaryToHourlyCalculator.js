import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";

function salaryToHourly(salary, hoursPerWeek) {
  let hoursPerYear = hoursPerWeek * 52; // assuming 2 weeks of vacation per year
  let hourlyRate = salary / hoursPerYear;
  return hourlyRate.toFixed(2);
}

export default function SalaryToHourlyCalculator() {
  const { t } = useTranslation("");
  const [salary, setSalary] = useState(50000);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [result, setResult] = useState("");
  const [resultPerWeek, setResultPerWeek] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    const res = salaryToHourly(salary, hoursPerWeek);
    setResult(res);
    setResultPerWeek((res * 5).toFixed(2));
  };

  const handleClear = () => {
    hoursPerWeek && setHoursPerWeek(40);
    salary && setSalary(50000);
    result && setResult("");
    resultPerWeek && setResultPerWeek("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("salaryToHourlyCalculator.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("salaryToHourlyCalculator.description")}
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
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
