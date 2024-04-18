import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import currency from "currency.js";
import Input from "../Input";
import Description from "../Description";
import Title from "../Title";

function btuToM3(btu) {
  const conversionFactor = 0.0000283;
  const cubicMeters = currency(btu, { precision: 2 }).multiply(
    conversionFactor
  ).value;
  return cubicMeters;
}

export default function BTUtoM3Converter() {
  const { t } = useTranslation("");
  const [btu, setBTU] = useState(12000);
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    if (!btu) {
      return;
    }

    setResult("");
    setResult(btuToM3(btu));
  };

  const handleClear = () => {
    btu && setBTU("");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("btuToM3Converter.title")}</Title>
      <Description>{t("btuToM3Converter.description")}</Description>
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
            label={t("btuToM3Converter.btuToM3")}
            value={btu}
            onChange={(e) => setBTU(e.target.value)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton result={`${result} ${t("common.m3")}`}>
            {result && (
              <Typography
                sx={{
                  color: "success.dark",
                  fontSize: "1.5rem",
                }}
              >
                {result} {t("common.m3")}
              </Typography>
            )}
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
