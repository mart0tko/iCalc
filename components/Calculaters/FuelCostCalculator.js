import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";
import currency from "currency.js";

const initialValues = {
  distance: 200,
  fuelEfficiency: 12,
  fuelPrice: 1.5,
};

function calculateFuelCost(distance, fuelEfficiency, fuelPrice) {
  if (distance <= 0 || fuelEfficiency <= 0 || fuelPrice <= 0) {
    return "Invalid input. Please enter positive values.";
  }

  const fuelNeeded = currency(distance, { precision: 2 }).divide(
    fuelEfficiency
  ).value;
  const totalCost = currency(fuelNeeded, { precision: 2 }).multiply(
    fuelPrice
  ).value;
  return totalCost.toFixed(2);
}

export default function FuelCostCalculator() {
  const { t } = useTranslation("");
  const [distance, setDistance] = useState(initialValues.distance);
  const [fuelEfficiency, setFuelEfficiency] = useState(
    initialValues.fuelEfficiency
  );
  const [fuelPrice, setFuelPrice] = useState(initialValues.fuelPrice);
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    const res = calculateFuelCost(distance, fuelEfficiency, fuelPrice);
    setResult(res);
  };

  const handleClear = () => {
    distance && setDistance(initialValues.distance);
    fuelEfficiency && setFuelEfficiency(initialValues.fuelEfficiency);
    fuelPrice && setFuelPrice(initialValues.fuelPrice);
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("fuelCostCalculator.title")}
      </Typography>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontSize: "1rem", whiteSpace: "pre-wrap" }}
      >
        {t("fuelCostCalculator.description")}
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
          <Input
            type="number"
            label={t("fuelCostCalculator.distance")}
            variant="standard"
            value={distance}
            onChange={(e) => handleChange(e, setDistance)}
          />
          <br />
          <Input
            type="number"
            label={t("fuelCostCalculator.fuelEfficiency")}
            variant="standard"
            value={fuelEfficiency}
            onChange={(e) => handleChange(e, setFuelEfficiency)}
          />
          <br />
          <Input
            type="number"
            label={t("fuelCostCalculator.fuelPrice")}
            variant="standard"
            value={fuelPrice}
            onChange={(e) => handleChange(e, setFuelPrice)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{t("common.result")}</Typography>
          <CopyToClipboardButton result={result}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("fuelCostCalculator.totalCost")}
              {result}
            </Typography>
          </CopyToClipboardButton>
        </Container>
      </Container>
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
