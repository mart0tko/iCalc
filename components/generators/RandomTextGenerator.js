import {
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";
import Description from "../Description";
import Title from "../Title";

function generateRandomWords(numWords, wordLength) {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < numWords; i++) {
    let word = "";
    for (let j = 0; j < wordLength; j++) {
      word += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    result += word + " ";
  }

  return result.trim();
}

export default function RandomTextGenerator() {
  const { t } = useTranslation("");
  const [wordLength, setWordLength] = useState(5);
  const [numWords, setNumWords] = useState(20);
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    const result = generateRandomWords(numWords, wordLength);

    setResult(result);
  };

  const handleClear = () => {
    wordLength && setWordLength(5);
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("randomTextGenerator.title")}</Title>
      <Description>{t("randomTextGenerator.description")}</Description>
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
            label={t("randomTextGenerator.wordLength")}
            variant="standard"
            value={wordLength}
            maxLength="15"
            onChange={(e) => handleChange(e, setWordLength)}
          />
          <Input
            type="number"
            label={t("randomTextGenerator.numWords")}
            variant="standard"
            value={numWords}
            maxLength="1000"
            onChange={(e) => handleChange(e, setNumWords)}
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
      <CalcButtons
        handleClear={handleClear}
        handleSubmit={handleSubmit}
        type="generate"
      />
    </ThreeColumnLayout>
  );
}
