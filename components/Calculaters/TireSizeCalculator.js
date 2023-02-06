import { Container, Typography } from "@mui/material";
import { useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";
import currency from "currency.js";

export default function TireSizeCalculator() {
  const { t } = useTranslation("");
  const [width, setWidth] = useState(205);
  const [aspectRatio, setAspectRatio] = useState(55);
  const [wheelDiameter, setWheelDiameter] = useState(16);
  const [result, setResult] = useState("");

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    const res = currency(+width, { precision: 1 })
      .multiply(+aspectRatio)
      .divide(2540)
      .multiply(2)
      .add(+wheelDiameter).value;
    setResult(res);
  };

  const handleClear = () => {
    width && setWidth("");
    aspectRatio && setAspectRatio("");
    wheelDiameter && setWheelDiameter("");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("tireSizeCalculator.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("tireSizeCalculator.description")}
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
            label={t("tireSizeCalculator.width")}
            variant="standard"
            value={width}
            onChange={(e) => handleChange(e, setWidth)}
          />
          <Input
            type="number"
            label={t("tireSizeCalculator.aspectRatio")}
            variant="standard"
            value={aspectRatio}
            onChange={(e) => handleChange(e, setAspectRatio)}
          />
          <Input
            type="number"
            label={t("tireSizeCalculator.wheelDiameter")}
            variant="standard"
            value={wheelDiameter}
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
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
