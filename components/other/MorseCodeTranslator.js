import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Description from "../Description";
import Title from "../Title";

const morseCodeMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  " ": "/",
};

function textToMorseCode(text) {
  const upperCaseText = text.toUpperCase();
  let morseCode = "";
  for (let i = 0; i < upperCaseText.length; i++) {
    const character = upperCaseText[i];
    const morseChar = morseCodeMap[character];
    if (morseChar) {
      morseCode += morseChar + " ";
    }
  }
  return morseCode.trim();
}

function morseCodeToText(morseCode) {
  const reverseMap = Object.fromEntries(
    Object.entries(morseCodeMap).map(([character, code]) => [code, character])
  );
  return morseCode
    .trim()
    .split(/\s+/)
    .map((code) => reverseMap[code] || "")
    .join("");
}

export default function MorseCodeTranslator() {
  const { t } = useTranslation("");
  const [input, setInput] = useState("Example text");
  const [result, setResult] = useState("");
  const [direction, setDirection] = useState("encode");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    setResult("");
    const res =
      direction === "encode" ? textToMorseCode(input) : morseCodeToText(input);
    setResult(res);
  };

  const handleClear = () => {
    input && setInput("");
    result && setResult("");
  };

  const changeDirection = (event) => {
    const nextDirection = event.target.value;
    setDirection(nextDirection);
    setInput(
      nextDirection === "encode" ? "Example text" : ". -..- .- -- .--. .-.. ."
    );
    setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("morseCodeTranslator.title")}</Title>
      <Description>{t("morseCodeTranslator.description")}</Description>
      <RadioGroup
        row
        value={direction}
        onChange={changeDirection}
        aria-label="Translation direction"
      >
        <FormControlLabel
          value="encode"
          control={<Radio />}
          label="Text to Morse"
        />
        <FormControlLabel
          value="decode"
          control={<Radio />}
          label="Morse to text"
        />
      </RadioGroup>
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
          <Typography sx={{}}>{t("morseCodeTranslator.input")}</Typography>
          <TextareaAutosize
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "100%", minHeight: "7rem", padding: "1rem" }}
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
        type="convert"
      />
    </ThreeColumnLayout>
  );
}
