import { Alert, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";
import Description from "../Description";
import Title from "../Title";
import { calculateFuelCost } from "../../lib/calculations";

const initialValues = {
  distance: 200,
  fuelEfficiency: 12,
  fuelPrice: 1.5,
};

export default function FuelCostCalculator() {
  const { t } = useTranslation("");
  const [distance, setDistance] = useState(initialValues.distance);
  const [fuelEfficiency, setFuelEfficiency] = useState(
    initialValues.fuelEfficiency
  );
  const [fuelPrice, setFuelPrice] = useState(initialValues.fuelPrice);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    try {
      setError("");
      setResult(
        calculateFuelCost(distance, fuelEfficiency, fuelPrice).toFixed(2)
      );
    } catch (calculationError) {
      setResult("");
      setError(calculationError.message);
    }
  };

  const handleClear = () => {
    distance && setDistance(initialValues.distance);
    fuelEfficiency && setFuelEfficiency(initialValues.fuelEfficiency);
    fuelPrice && setFuelPrice(initialValues.fuelPrice);
    result && setResult("");
    setError("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("fuelCostCalculator.title")}</Title>
      <Description>{t("fuelCostCalculator.description")}</Description>
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
            inputProps={{ min: 0, step: "any" }}
            onChange={(e) => handleChange(e, setDistance)}
          />
          <br />
          <Input
            type="number"
            label={t("fuelCostCalculator.fuelEfficiency")}
            variant="standard"
            value={fuelEfficiency}
            inputProps={{ min: 0, step: "any" }}
            onChange={(e) => handleChange(e, setFuelEfficiency)}
          />
          <br />
          <Input
            type="number"
            label={t("fuelCostCalculator.fuelPrice")}
            variant="standard"
            value={fuelPrice}
            inputProps={{ min: 0, step: "any" }}
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
      {error && <Alert severity="error">{error}</Alert>}
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
