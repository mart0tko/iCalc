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

export default function MilesToKmConverter() {
  const { t } = useTranslation("");
  const [km, setKm] = useState(25);
  const [direction, setDirection] = useState("milesToKm");
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, [direction]);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    if (!km) {
      return;
    }
    setResult("");
    const res =
      direction === "milesToKm"
        ? currency(km, { precision: 2 }).multiply(1.609344).value
        : currency(km, { precision: 2 }).divide(1.609344).value;
    setResult(res.toFixed(2));
  };

  const handleClear = () => {
    km && setKm("");
    direction && setDirection("milesToKm");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("milesToKmConverter.title")}</Title>
      <Description>{t("milesToKmConverter.description")}</Description>
      <br />
      <RadioGroup
        defaultValue="milesToKm"
        value={direction}
        onChange={(e) => setDirection(e.target.value)}
      >
        <FormControlLabel
          value="milesToKm"
          control={<Radio />}
          label={t("milesToKmConverter.milesToKm")}
        />
        <FormControlLabel
          value="kmToMiles"
          control={<Radio />}
          label={t("milesToKmConverter.kmToMiles")}
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
              direction === "milesToKm"
                ? t("milesToKmConverter.milesToKm")
                : t("milesToKmConverter.kmToMiles")
            }
            variant="standard"
            value={km}
            onChange={(e) => handleChange(e, setKm)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton
            result={`${result} ${
              result && direction === "milesToKm"
                ? t("common.miles")
                : t("common.km")
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
                (direction === "milesToKm"
                  ? t("common.km")
                  : t("common.miles"))}
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
