import { Container, InputLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import moment from "moment";
import CalcButtons from "../CalcButtons";
import Description from "../Description";
import Title from "../Title";

export default function Age() {
  const { t } = useTranslation("");
  const [birth, setBirth] = useState(
    moment().subtract(20, "years").format("YYYY-MM-DD")
  );
  const [ageAtDate, setAgeAtDate] = useState(moment().format("YYYY-MM-DD"));
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  // TODO add Today option
  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    if (!birth || !ageAtDate) {
      return;
    }
    setResult("");
    let startDateMoment = moment(birth);
    let endDateMoment = moment(ageAtDate);
    if (startDateMoment.valueOf() > endDateMoment.valueOf()) {
      setResult(t("ageCalc.wrongValue"));
      setShowResult(false);
      return;
    }
    setShowResult(true);
    setResult(endDateMoment.diff(startDateMoment, "years").toString());
  };

  const handleClear = () => {
    birth && setBirth("");
    ageAtDate && setAgeAtDate("");
    result && setResult("");
    setShowResult(false);
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("ageCalc.title")}</Title>
      <Description>{t("ageCalc.description")}</Description>
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
          <InputLabel htmlFor="age-calculator-input-one">
            {t("ageCalc.valueOne")}
          </InputLabel>
          <TextField
            type="date"
            id="age-calculator-input-one"
            variant="outlined"
            value={birth}
            onChange={(e) => handleChange(e, setBirth)}
          />
          <br />
          <InputLabel htmlFor="age-calculator-input-two">
            {t("ageCalc.valueTwo")}
          </InputLabel>
          <TextField
            type="date"
            id="age-calculator-input-two"
            variant="outlined"
            sx={{ borderWidth: "1px", backgroundColor: "primary" }}
            value={ageAtDate}
            onChange={(e) => handleChange(e, setAgeAtDate)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{t("common.result")}</Typography>
          <CopyToClipboardButton result={`${result} ${t("ageCalc.years")}`}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {result} {showResult && t("ageCalc.years")}
            </Typography>
          </CopyToClipboardButton>
        </Container>
      </Container>
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
