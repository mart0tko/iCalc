import { Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";

export default function BMI() {
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [result, setResult] = useState("");
  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    const weight = +valueOne;
    const height = +valueTwo * +valueTwo;
    const res = weight / height;
    setResult(res.toFixed(2));
  };

  const handleClear = () => {
    valueOne && setValueOne("");
    valueTwo && setValueTwo("");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("bmi.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("bmi.description")}
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
            label={t("bmi.valueOne")}
            variant="standard"
            value={valueOne}
            onChange={(e) => handleChange(e, setValueOne)}
          />
          <Input
            type="number"
            label={t("bmi.valueTwo")}
            variant="standard"
            value={valueTwo}
            onChange={(e) => handleChange(e, setValueTwo)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton result={result}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {result}
            </Typography>
          </CopyToClipboardButton>
        </Container>
      </Container>
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
