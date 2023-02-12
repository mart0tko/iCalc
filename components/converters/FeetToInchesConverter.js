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

export default function FeetToInchesConverter() {
  const { t } = useTranslation("");
  const [cm, setCm] = useState(10);
  const [result, setResult] = useState("");
  const [direction, setDirection] = useState("feetToInch");

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
      direction === "feetToInch"
        ? currency(cm, { precision: 2 }).multiply(12).value
        : currency(cm, { precision: 2 }).divide(12).value;
    setResult(res.toFixed(2));
  };

  const handleClear = () => {
    cm && setCm("");
    direction && setDirection("feetToInch");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("feetToInchesConverter.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("feetToInchesConverter.description")}
      </Typography>
      <br />
      <RadioGroup
        defaultValue="feetToInch"
        value={direction}
        onChange={(e) => setDirection(e.target.value)}
      >
        <FormControlLabel
          value="feetToInch"
          control={<Radio />}
          label={t("feetToInchesConverter.feetToInch")}
        />
        <FormControlLabel
          value="inchToCm"
          control={<Radio />}
          label={t("feetToInchesConverter.inchToFeet")}
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
              direction === "feetToInch"
                ? t("feetToInchesConverter.feetToInch")
                : t("feetToInchesConverter.inchToFeet")
            }
            variant="standard"
            value={cm}
            onChange={(e) => handleChange(e, setCm)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton result={`${result} ${t("common.inches")}`}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {result}{" "}
              {result &&
                (direction === "feetToInch"
                  ? t("common.inches")
                  : t("common.feet"))}
            </Typography>
          </CopyToClipboardButton>
        </Container>
      </Container>
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
