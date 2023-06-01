import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";
import Description from "../Description";
import Title from "../Title";

function calculateBounceRate(bounces, entrances) {
  const bounceRate = (bounces / entrances) * 100;
  return bounceRate.toFixed(2); // Round to 2 decimal places
}

const defaultValues = { bounces: 500, entrances: 2000 };

export default function BounceRateCalculator() {
  const { t } = useTranslation("");
  const [bounces, setBounces] = useState(defaultValues.bounces);
  const [entrances, setEntrances] = useState(defaultValues.entrances);
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    const res = calculateBounceRate(bounces, entrances);
    setResult(res);
  };

  const handleClear = () => {
    bounces && setBounces(defaultValues.bounces);
    entrances && setEntrances(defaultValues.entrances);
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("bounceRateCalculator.title")}</Title>
      <Description>{t("bounceRateCalculator.description")}</Description>
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
            label={t("bounceRateCalculator.bounces")}
            variant="standard"
            value={bounces}
            onChange={(e) => handleChange(e, setBounces)}
          />
          <br />
          <Input
            type="number"
            label={t("bounceRateCalculator.entrances")}
            variant="standard"
            value={entrances}
            onChange={(e) => handleChange(e, setEntrances)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton
            result={`${t("bounceRateCalculator.result")}${result}%`}
          >
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("bounceRateCalculator.result")}
              {result} %
            </Typography>
          </CopyToClipboardButton>
        </Container>
      </Container>
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
