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

function btuToKw(btu) {
  var conversionFactor = 0.00029307107;
  var kw = currency(btu, { precision: 4 }).multiply(conversionFactor).value;
  return kw;
}

export default function BTUtoKwConverter() {
  const theme = useTheme();
  const { t } = useTranslation("");
  const [btu, setBTU] = useState(50000);
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit(btu);
  }, []);

  const handleSubmit = (newValue) => {
    const result = btuToKw(newValue);

    setBTU(newValue)
    setResult(!!result ? result : "");
  };

  const handleClear = () => {
    btu && setBTU("");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("btuToKwConverter.title")}</Title>
      <Description>{t("btuToKwConverter.description")}</Description>
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
            label={t("btuToKwConverter.btuToKw")}
            variant="standard"
            value={btu}
            onChange={(e) => handleSubmit(e.target.value)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton result={`${result} ${t("common.kw")}`}>
            {result && (
              <Typography
                sx={{
                  color: "success.dark",
                  fontSize: "1.5rem",
                }}
              >
                {result} {t("common.kw")}
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
          href="/btu-to-m3-convertor"
          style={{ color: theme.palette.primary.main }}
        >
          {t("btuToM3Converter.title")}
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
