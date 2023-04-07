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

export default function CmToInchesConverter() {
  const { t } = useTranslation("");
  const [cm, setCm] = useState(25);
  const [direction, setDirection] = useState("cmToInch");
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
      direction === "cmToInch"
        ? currency(cm, { precision: 2 }).divide(2.54).value
        : currency(cm, { precision: 2 }).multiply(2.54).value;
    setResult(res.toFixed(2));
  };

  const handleClear = () => {
    cm && setCm("");
    direction && setDirection("cmToInch");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("cmToInchesConverter.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("cmToInchesConverter.description")}
      </Typography>
      <br />
      <RadioGroup
        defaultValue="cmToInch"
        value={direction}
        onChange={(e) => setDirection(e.target.value)}
      >
        <FormControlLabel
          value="cmToInch"
          control={<Radio />}
          label={t("cmToInchesConverter.cmToInch")}
        />
        <FormControlLabel
          value="inchToCm"
          control={<Radio />}
          label={t("cmToInchesConverter.inchToCm")}
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
              direction === "cmToInch"
                ? t("cmToInchesConverter.cmToInch")
                : t("cmToInchesConverter.inchToCm")
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
              result && direction === "cmToInch"
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
                (direction === "cmToInch"
                  ? t("common.inches")
                  : t("common.cm"))}
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
