import { Container, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Description from "../Description";
import Title from "../Title";

function generateBubbleText(text) {
  const bubbleLetters = {
    A: "ⓐ",
    B: "ⓑ",
    C: "ⓒ",
    D: "ⓓ",
    E: "ⓔ",
    F: "ⓕ",
    G: "ⓖ",
    H: "ⓗ",
    I: "ⓘ",
    J: "ⓙ",
    K: "ⓚ",
    L: "ⓛ",
    M: "ⓜ",
    N: "ⓝ",
    O: "ⓞ",
    P: "ⓟ",
    Q: "ⓠ",
    R: "ⓡ",
    S: "ⓢ",
    T: "ⓣ",
    U: "ⓤ",
    V: "ⓥ",
    W: "ⓦ",
    X: "ⓧ",
    Y: "ⓨ",
    Z: "ⓩ",
  };

  const uppercaseText = text.toUpperCase();
  let bubbleText = "";
  for (let i = 0; i < uppercaseText.length; i++) {
    const character = uppercaseText[i];
    const bubbleLetter = bubbleLetters[character] || character;
    bubbleText += bubbleLetter;
  }

  return bubbleText;
}

export default function BubbleTextGenerator() {
  const { t } = useTranslation("");
  const [input, setInput] = useState("Example text");
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    setResult("");
    const res = generateBubbleText(input);
    setResult(res);
  };

  const handleClear = () => {
    input && setInput("");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("bubbleTextGenerator.title")}</Title>
      <Description>{t("bubbleTextGenerator.description")}</Description>
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
          <Typography sx={{}}>{t("bubbleTextGenerator.input")}</Typography>
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
