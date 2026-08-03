import { Alert, Container, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";
import Description from "../Description";
import Title from "../Title";

function LoveCalculator() {
  const { t } = useTranslation("");
  const [yourName, setYourName] = useState("John");
  const [yourCrush, setYourCrush] = useState("Sally");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const calculateLove = useCallback(
    (firstName, secondName) => {
      const normalizedFirst = firstName
        .trim()
        .toUpperCase()
        .replace(/[^A-Z]/g, "");
      const normalizedSecond = secondName
        .trim()
        .toUpperCase()
        .replace(/[^A-Z]/g, "");
      if (!normalizedFirst || !normalizedSecond) {
        return;
      }

      let totalValue = 0;
      // Summing up the numerical values for the first name
      for (var i = 0; i < normalizedFirst.length; i++) {
        totalValue += normalizedFirst.charCodeAt(i) - 64;
      }

      // Summing up the numerical values for the second name
      for (var j = 0; j < normalizedSecond.length; j++) {
        totalValue += normalizedSecond.charCodeAt(j) - 64;
      }

      // Calculating the love score
      let loveScore = (totalValue % 100) + 1;
      let resultText = "Your love score is " + loveScore + "%.";

      if (loveScore > 80) {
        resultText += t("loveCalculator.madeForEachOther");
      } else if (loveScore > 50) {
        resultText += t("loveCalculator.goodChance");
      } else {
        resultText += t("loveCalculator.sorry");
      }

      return resultText;
    },
    [t]
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    const res = calculateLove(yourName, yourCrush);
    if (!res) {
      setError("Please enter both names.");
      return;
    }
    setError("");
    setResult(res);
  };

  const handleClear = () => {
    setYourName("");
    setYourCrush("");
    setResult("");
    setError("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("loveCalculator.title")}</Title>
      <Description>{t("loveCalculator.description")}</Description>
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
            type="text"
            label={t("loveCalculator.yourName")}
            variant="standard"
            value={yourName}
            onChange={(e) => handleChange(e, setYourName)}
          />
          <br />
          <Input
            type="text"
            label={t("loveCalculator.yourCrush")}
            variant="standard"
            value={yourCrush}
            onChange={(e) => handleChange(e, setYourCrush)}
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
              {result}
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

export default memo(LoveCalculator);
