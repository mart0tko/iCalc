import {
  Checkbox,
  Container,
  FormControlLabel,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";

function generateZalgoText(text, options = {}) {
  const { intensity = 5 } = options;
  const zalgoChars = [
    "\u030d",
    "\u030e",
    "\u0304",
    "\u0305",
    "\u033f",
    "\u0311",
    "\u0306",
    "\u0310",
    "\u0352",
    "\u0357",
    "\u0351",
    "\u0307",
    "\u0308",
    "\u030a",
    "\u0342",
    "\u0343",
    "\u0344",
    "\u034a",
    "\u034b",
    "\u034c",
    "\u0303",
    "\u0302",
    "\u030c",
    "\u0350",
    "\u0300",
    "\u0301",
    "\u030b",
    "\u030f",
    "\u0312",
    "\u0313",
    "\u0314",
    "\u033d",
    "\u0309",
    "\u0363",
    "\u0364",
    "\u0365",
    "\u0366",
    "\u0367",
    "\u0368",
    "\u0369",
    "\u036a",
    "\u036b",
    "\u036c",
    "\u036d",
    "\u036e",
    "\u036f",
    "\u033e",
    "\u035b",
    "\u0346",
    "\u031a",
  ];

  let zalgoText = "";
  for (let i = 0; i < text.length; i++) {
    zalgoText += text[i];
    for (let j = 0; j < intensity; j++) {
      const randomZalgoChar =
        zalgoChars[Math.floor(Math.random() * zalgoChars.length)];
      zalgoText += randomZalgoChar;
    }
  }

  return zalgoText;
}

export default function ZalgoGlitchGenerator() {
  const { t } = useTranslation("");
  const [input, setInput] = useState("Example text");
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    setResult("");
    const res = generateZalgoText(input);
    setResult(res);
  };

  const handleClear = () => {
    input && setInput("");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("zalgoGlitchGenerator.title")}
      </Typography>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontSize: "1rem", whiteSpace: "pre-wrap" }}
      >
        {t("zalgoGlitchGenerator.description")}
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
          <Typography sx={{}}>{t("zalgoGlitchGenerator.input")}</Typography>
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
          <br />
          <br />
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
