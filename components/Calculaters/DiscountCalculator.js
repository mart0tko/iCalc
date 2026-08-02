import { Alert, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";
import Description from "../Description";
import Title from "../Title";
import { calculateDiscount } from "../../lib/calculations";

export default function DiscountCalculator() {
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState(100);
  const [valueTwo, setValueTwo] = useState(20);
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
      setResult(calculateDiscount(valueOne, valueTwo).finalPrice.toFixed(2));
    } catch (calculationError) {
      setResult("");
      setError(calculationError.message);
    }
  };

  const handleClear = () => {
    valueOne && setValueOne("");
    valueTwo && setValueTwo("");
    result && setResult("");
    setError("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("discountCalculator.title")}</Title>
      <Description>{t("discountCalculator.description")}</Description>
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
            label={t("discountCalculator.valueOne")}
            variant="standard"
            value={valueOne}
            onChange={(e) => handleChange(e, setValueOne)}
          />
          <Input
            type="number"
            label={t("discountCalculator.valueTwo")}
            variant="standard"
            value={valueTwo}
            inputProps={{ min: 0, max: 100, step: "any" }}
            onChange={(e) => handleChange(e, setValueTwo)}
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
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
