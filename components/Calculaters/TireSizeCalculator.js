import { Alert, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";
import currency from "currency.js";
import Description from "../Description";
import Title from "../Title";

export default function TireSizeCalculator() {
  const { t } = useTranslation("");
  const [width, setWidth] = useState(205);
  const [aspectRatio, setAspectRatio] = useState(55);
  const [wheelDiameter, setWheelDiameter] = useState(16);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);
  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    const values = [width, aspectRatio, wheelDiameter].map(Number);
    if (values.some((value) => !Number.isFinite(value) || value <= 0)) {
      setResult("");
      setError("Width, aspect ratio, and wheel diameter must be positive.");
      return;
    }
    setError("");
    const res = currency(values[0], { precision: 2 })
      .multiply(values[1])
      .divide(2540)
      .multiply(2)
      .add(values[2]).value;
    setResult(res.toFixed(2));
  };

  const handleClear = () => {
    width && setWidth("");
    aspectRatio && setAspectRatio("");
    wheelDiameter && setWheelDiameter("");
    result && setResult("");
    setError("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("tireSizeCalculator.title")}</Title>
      <Description>{t("tireSizeCalculator.description")}</Description>
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
            label={t("tireSizeCalculator.width")}
            variant="standard"
            value={width}
            inputProps={{ min: 0, step: "any" }}
            onChange={(e) => handleChange(e, setWidth)}
          />
          <Input
            type="number"
            label={t("tireSizeCalculator.aspectRatio")}
            variant="standard"
            value={aspectRatio}
            inputProps={{ min: 0, step: "any" }}
            onChange={(e) => handleChange(e, setAspectRatio)}
          />
          <Input
            type="number"
            label={t("tireSizeCalculator.wheelDiameter")}
            variant="standard"
            value={wheelDiameter}
            inputProps={{ min: 0, step: "any" }}
            onChange={(e) => handleChange(e, setWheelDiameter)}
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
              {result} {t("tireSizeCalculator.diameter")}
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
