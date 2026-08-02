import { Alert, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import { useTheme } from "@mui/material/styles";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Description from "../Description";
import Title from "../Title";
import Input from "../Input";
import { percentageDifference } from "../../lib/calculations";

export default function PercentageDifferance() {
  const theme = useTheme();
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState(10);
  const [valueTwo, setValueTwo] = useState(20);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    try {
      setError("");
      setResult(percentageDifference(valueOne, valueTwo).toFixed(2));
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
      <Title>{t("percentDiffCalc.title")}</Title>
      <Description>{t("percentDiffCalc.description")}</Description>
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
            label={t("common.valueOne")}
            variant="standard"
            value={valueOne}
            onChange={(e) => handleChange(e, setValueOne)}
          />
          <Input
            type="number"
            label={t("common.valueTwo")}
            variant="standard"
            value={valueTwo}
            onChange={(e) => handleChange(e, setValueTwo)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton result={result}>
            <Typography sx={{ color: "success.dark", fontSize: "1.5rem" }}>
              {result} {result ? "%" : null}
            </Typography>
          </CopyToClipboardButton>
          <br />
          <Typography sx={{ fontSize: "0.75rem" }}>
            {t("percentDiffCalc.note")}
            <Link
              href="/percentage-change-calculator"
              style={{ color: theme.palette.primary.main }}
            >
              {t("percentChange.title")}
            </Link>
            {", "}
            <Link
              href="/percentage-calculator"
              style={{ color: theme.palette.primary.main }}
            >
              {t("percentage.title")}
            </Link>
          </Typography>
        </Container>
      </Container>
      {error && <Alert severity="error">{error}</Alert>}
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
