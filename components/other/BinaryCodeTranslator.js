import {
  Alert,
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

function textToBinary(text) {
  let binary = "";
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const binaryCode = charCode.toString(2);
    binary += binaryCode.padStart(8, "0") + " ";
  }
  return binary.trim();
}

function binaryToText(binary) {
  const binaryArray = binary.trim().split(/\s+/);
  if (binaryArray.some((value) => !/^[01]{1,16}$/.test(value))) {
    throw new RangeError("Enter binary values containing only 0 and 1.");
  }
  let text = "";
  for (let i = 0; i < binaryArray.length; i++) {
    const binaryCode = binaryArray[i];
    const charCode = parseInt(binaryCode, 2);
    const character = String.fromCharCode(charCode);
    text += character;
  }
  return text;
}

export default function BinaryCodeTranslator() {
  const { t } = useTranslation("");
  const [input, setInput] = useState("Example text");
  const [result, setResult] = useState("");
  const [direction, setDirection] = useState("encode");
  const [error, setError] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    try {
      setError("");
      setResult(
        direction === "encode" ? textToBinary(input) : binaryToText(input)
      );
    } catch (translationError) {
      setResult("");
      setError(translationError.message);
    }
  };

  const handleClear = () => {
    input && setInput("");
    result && setResult("");
    setError("");
  };

  const changeDirection = (event) => {
    const nextDirection = event.target.value;
    setDirection(nextDirection);
    setInput(nextDirection === "encode" ? "Example text" : "01000001 01000010");
    setResult("");
    setError("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("binaryCodeTranslator.title")}</Title>
      <Description>{t("binaryCodeTranslator.description")}</Description>
      <RadioGroup
        row
        value={direction}
        onChange={changeDirection}
        aria-label="Translation direction"
      >
        <FormControlLabel
          value="encode"
          control={<Radio />}
          label="Text to binary"
        />
        <FormControlLabel
          value="decode"
          control={<Radio />}
          label="Binary to text"
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
          <Typography sx={{}}>{t("binaryCodeTranslator.input")}</Typography>
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
      {error && <Alert severity="error">{error}</Alert>}
      <br />
      <CalcButtons
        handleClear={handleClear}
        handleSubmit={handleSubmit}
        type="convert"
      />
    </ThreeColumnLayout>
  );
}
