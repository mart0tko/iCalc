import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import currency from "currency.js";
import Input from "../Input";

export default function CmToFeetConverter() {
  const { t } = useTranslation("");
  const [cm, setCm] = useState(25);
  const [direction, setDirection] = useState("cmToFeet");
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, [direction]);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    if (!cm) {
      return;
    }
    setResult("");
    const res =
      direction === "cmToFeet"
        ? currency(cm, { precision: 2 }).divide(2.54).divide(12).value
        : currency(cm, { precision: 2 }).multiply(2.54).multiply(12).value;
    setResult(res.toFixed(2));
  };

  const handleClear = () => {
    cm && setCm("");
    direction && setDirection("cmToFeet");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("cmToFeetConverter.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("cmToFeetConverter.description")}
      </Typography>
      <br />
      <RadioGroup
        defaultValue="cmToFeet"
        value={direction}
        onChange={(e) => setDirection(e.target.value)}
      >
        <FormControlLabel
          value="cmToFeet"
          control={<Radio />}
          label={t("cmToFeetConverter.cmToFeet")}
        />
        <FormControlLabel
          value="inchToCm"
          control={<Radio />}
          label={t("cmToFeetConverter.cmToFeet")}
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
          <Input
            type="number"
            label={
              direction === "cmToFeet"
                ? t("cmToFeetConverter.cmToFeet")
                : t("cmToFeetConverter.inchToCm")
            }
            variant="standard"
            value={cm}
            onChange={(e) => handleChange(e, setCm)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton
            result={`${result} ${
              result && direction === "cmToFeet"
                ? t("common.inches")
                : t("common.cm")
            }`}
          >
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {result}{" "}
              {result &&
                (direction === "cmToFeet" ? t("common.feet") : t("common.cm"))}
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
