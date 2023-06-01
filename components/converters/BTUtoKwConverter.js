import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import currency from "currency.js";
import Input from "../Input";

function btuToKw(btu) {
  var conversionFactor = 0.00029307107;
  var kw = currency(btu, { precision: 2 }).multiply(conversionFactor).value;
  return kw;
}

export default function BTUtoKwConverter() {
  const { t } = useTranslation("");
  const [btu, setBTU] = useState(50000);
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    if (!btu) {
      return;
    }

    setResult("");
    setResult(btuToKw(btu));
  };

  const handleClear = () => {
    btu && setBTU("");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("btuToKwConverter.title")}
      </Typography>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontSize: "1rem", whiteSpace: "pre-wrap" }}
      >
        {t("btuToKwConverter.description")}
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
            label={t("btuToKwConverter.btuToKw")}
            variant="standard"
            value={btu}
            onChange={(e) => setBTU(e.target.value)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton result={`${result} ${t("common.kw")}`}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {result} {t("common.kw")}
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
