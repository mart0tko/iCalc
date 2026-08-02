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
import { percentageChange } from "../../lib/calculations";

export default function PercentageChange() {
  const theme = useTheme();
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState(100);
  const [valueTwo, setValueTwo] = useState(200);
  const [result, setResult] = useState("");
  const [isNegative, setIsNegative] = useState(false);
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
      const calculation = percentageChange(valueOne, valueTwo);
      setResult(calculation.toFixed(2));
      setIsNegative(calculation < 0);
    } catch (calculationError) {
      setResult("");
      setError(calculationError.message);
    }
  };

  const handleClear = () => {
    valueOne && setValueOne("");
    valueTwo && setValueTwo("");
    result && setResult("");
    setIsNegative(null);
    setError("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("percentChange.title")}</Title>
      <Description>{t("percentChange.description")}</Description>
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
              {result} {result ? "%" : null}{" "}
              {result
                ? Number(result) === 0
                  ? t("common.noChange")
                  : isNegative
                  ? t("common.decrease")
                  : t("common.increase")
                : null}
            </Typography>
            <br />
          </CopyToClipboardButton>
          <Typography sx={{ fontSize: "0.75rem" }}>
            {t("percentChange.related")}
            <Link
              href="/percentage-difference-calculator"
              style={{ color: theme.palette.primary.main }}
            >
              {t("percentDiffCalc.title")}
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
