import { Container, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Description from "../Description";
import Title from "../Title";

const natoAlphabet = {
  A: "Alpha",
  B: "Bravo",
  C: "Charlie",
  D: "Delta",
  E: "Echo",
  F: "Foxtrot",
  G: "Golf",
  H: "Hotel",
  I: "India",
  J: "Juliet",
  K: "Kilo",
  L: "Lima",
  M: "Mike",
  N: "November",
  O: "Oscar",
  P: "Papa",
  Q: "Quebec",
  R: "Romeo",
  S: "Sierra",
  T: "Tango",
  U: "Uniform",
  V: "Victor",
  W: "Whiskey",
  X: "X-ray",
  Y: "Yankee",
  Z: "Zulu",
};

function translateToNATOAlphabet(word) {
  const uppercaseWord = word.toUpperCase();
  let translatedWord = "";
  for (let i = 0; i < uppercaseWord.length; i++) {
    const character = uppercaseWord[i];
    const natoWord = natoAlphabet[character];
    if (natoWord) {
      translatedWord += natoWord + " ";
    }
  }
  return translatedWord.trim();
}

export default function NatoPhoneticAlphabetTranslator() {
  const { t } = useTranslation("");
  const [input, setInput] = useState("Example text");
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    setResult("");
    const res = translateToNATOAlphabet(input);
    setResult(res);
  };

  const handleClear = () => {
    input && setInput("");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("natoPhoneticAlphabetTranslator.title")}</Title>
      <Description>
        {t("natoPhoneticAlphabetTranslator.description")}
      </Description>
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
          <Typography sx={{}}>
            {t("natoPhoneticAlphabetTranslator.input")}
          </Typography>
          <TextareaAutosize
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ widht: "100%" }}
            style={{ height: "5rem" }}
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
        withoutReset={true}
      />
    </ThreeColumnLayout>
  );
}
