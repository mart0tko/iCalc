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

export default function WattToKilowattConverter() {
  const { t } = useTranslation("");
  const [watts, setWatts] = useState(10000);
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    if (!watts) {
      return;
    }

    setResult("");
    const res = currency(watts, { precision: 2 }).divide(1000).value;
    setResult(res);
  };

  const handleClear = () => {
    watts && setWatts(10000);
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("wattToKilowattConverter.title")}</Title>
      <Description>{t("wattToKilowattConverter.description")}</Description>
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
            label={t("wattToKilowattConverter.watts")}
            variant="standard"
            value={watts}
            onChange={(e) => setWatts(e.target.value)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton result={`${result} ${t("common.kW")}`}>
            {result && (
              <Typography
                sx={{
                  color: "success.dark",
                  fontSize: "1.5rem",
                }}
              >
                {result} {t("common.kW")}
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
