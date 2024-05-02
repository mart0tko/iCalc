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
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

function btuToM3(btu) {
  const conversionFactor = 0.0000293;
  const cubicMeters = currency(btu, { precision: 4 }).multiply(
    conversionFactor
  ).value;
  return cubicMeters;
}

export default function BTUtoM3Converter() {
  const theme = useTheme();
  const { t } = useTranslation("");
  const [btu, setBTU] = useState(12000);
  const [result, setResult] = useState("");

  
  const handleChange = (newValue) => {   
    const result = btuToM3(newValue);

    setBTU(newValue)
    setResult(!!result ? result : "");
  };
  
  const handleClear = () => {
    btu && setBTU("");
    result && setResult("");
  };

  useEffect(() => {
    handleChange(btu);
  }, []);

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
            onChange={(e) => handleChange(e.target.value)}
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
        withoutCalc={true}
        type="convert"
      />
       <br />
      <Typography sx={{ fontSize: "0.75rem" }}>
        {t("percentage.related")}
        <Link
          href="/btu-to-kw-convertor"
          style={{ color: theme.palette.primary.main }}
        >
          {t("btuToKwConverter.title")}
        </Link>
        {", "}
        <Link
          href="/btu-to-m2"
          style={{ color: theme.palette.primary.main }}
        >
          {t("btuToM2.titleReversed")}
        </Link>
      </Typography>
    </ThreeColumnLayout>
  );
}
