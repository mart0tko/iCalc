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
import Description from "../Description";
import Title from "../Title";

export default function MmToInchesConverter() {
  const { t } = useTranslation("");
  const [mm, setMm] = useState(250);
  const [direction, setDirection] = useState("mmToInch");
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, [direction]);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    if (!mm) {
      return;
    }
    setResult("");
    const res =
      direction === "mmToInch"
        ? currency(mm, { precision: 2 }).divide(2.54).divide(10).value
        : currency(mm, { precision: 2 }).multiply(2.54).multiply(10).value;
    setResult(res.toFixed(2));
  };

  const handleClear = () => {
    mm && setMm("");
    direction && setDirection("mmToInch");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("mmToInchesConverter.title")}</Title>
      <Description>{t("mmToInchesConverter.description")}</Description>
      <br />
      <RadioGroup
        defaultValue="mmToInch"
        value={direction}
        onChange={(e) => setDirection(e.target.value)}
      >
        <FormControlLabel
          value="mmToInch"
          control={<Radio />}
          label={t("mmToInchesConverter.mmToInch")}
        />
        <FormControlLabel
          value="inchToMm"
          control={<Radio />}
          label={t("mmToInchesConverter.inchToMm")}
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
              direction === "mmToInch"
                ? t("mmToInchesConverter.mmToInch")
                : t("mmToInchesConverter.inchToMm")
            }
            variant="standard"
            value={mm}
            onChange={(e) => handleChange(e, setMm)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton
            result={`${result} ${
              result && direction === "mmToInch"
                ? t("common.inches")
                : t("common.mm")
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
                (direction === "mmToInch"
                  ? t("common.inches")
                  : t("common.mm"))}
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
