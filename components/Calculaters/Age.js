import { Container, InputLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import moment from "moment";
import CalcButtons from "../CalcButtons";

export default function Age() {
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  // TODO add Today option
  useEffect(() => {
    setValueTwo(moment().format("YYYY-MM-DD"));
  }, []);
  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    if (!valueOne || !valueTwo) {
      return;
    }
    setResult("");
    let startDateMoment = moment(valueOne);
    let endDateMoment = moment(valueTwo);
    if (startDateMoment.valueOf() > endDateMoment.valueOf()) {
      setResult(t("ageCalc.wrongValue"));
      setShowResult(false);
      return;
    }
    setShowResult(true);
    setResult(endDateMoment.diff(startDateMoment, "years").toString());
  };

  const handleClear = () => {
    valueOne && setValueOne("");
    valueTwo && setValueTwo("");
    result && setResult("");
    setShowResult(false);
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("ageCalc.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("ageCalc.description")}
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
          <InputLabel htmlFor="age-calculator-input-one">
            {t("ageCalc.valueOne")}
          </InputLabel>
          <TextField
            type="date"
            id="age-calculator-input-one"
            variant="outlined"
            value={valueOne}
            onChange={(e) => handleChange(e, setValueOne)}
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
            value={valueTwo}
            onChange={(e) => handleChange(e, setValueTwo)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{t("common.result")}</Typography>
          <CopyToClipboardButton result={result}>
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
