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

export default function MToFeetConverter() {
  const { t } = useTranslation("");
  const [m, setM] = useState(25);
  const [direction, setDirection] = useState("mToFeet");
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, [direction]);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    if (!m) {
      return;
    }
    setResult("");
    const res =
      direction === "mToFeet"
        ? currency(m, { precision: 2 }).multiply(3.28).value
        : currency(m, { precision: 2 }).divide(3.28).value;
    setResult(res.toFixed(2));
  };

  const handleClear = () => {
    m && setM("");
    direction && setDirection("mToFeet");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("mToFeetConverter.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("mToFeetConverter.description")}
      </Typography>
      <br />
      <RadioGroup
        defaultValue="mToFeet"
        value={direction}
        onChange={(e) => setDirection(e.target.value)}
      >
        <FormControlLabel
          value="mToFeet"
          control={<Radio />}
          label={t("mToFeetConverter.mToFeet")}
        />
        <FormControlLabel
          value="inchToM"
          control={<Radio />}
          label={t("mToFeetConverter.mToFeet")}
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
              direction === "mToFeet"
                ? t("mToFeetConverter.mToFeet")
                : t("mToFeetConverter.feetToM")
            }
            variant="standard"
            value={m}
            onChange={(e) => handleChange(e, setM)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton
            result={`${result} ${
              result && direction === "mToFeet"
                ? t("common.feet")
                : t("common.m")
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
                (direction === "mToFeet" ? t("common.feet") : t("common.m"))}
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
