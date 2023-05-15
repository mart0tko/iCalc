import { Container, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";

function LoveCalculator() {
  const { t } = useTranslation("");
  const [yourName, setYourName] = useState("John");
  const [yourCrush, setYourCrush] = useState("Sally");
  const [result, setResult] = useState("");

  const calculateLove = useCallback(
    (firstName, secondName) => {
      if (firstName === "" || secondName === "") {
        alert("Please enter both names.");
        return;
      }

      let totalValue = 0;
      // Summing up the numerical values for the first name
      for (var i = 0; i < firstName.length; i++) {
        totalValue += firstName.charCodeAt(i) - 64; // assuming uppercase letters only
      }

      // Summing up the numerical values for the second name
      for (var j = 0; j < secondName.length; j++) {
        totalValue += secondName.charCodeAt(j) - 64; // assuming uppercase letters only
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
    setResult(res);
  };

  const handleClear = () => {};

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("loveCalculator.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("loveCalculator.description")}
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
      <br />
      <CalcButtons
        handleClear={handleClear}
        handleSubmit={handleSubmit}
        withoutReset={true}
      />
    </ThreeColumnLayout>
  );
}

export default memo(LoveCalculator);
