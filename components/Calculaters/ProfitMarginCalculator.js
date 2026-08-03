import { Alert, Container, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import { useTheme } from "@mui/material/styles";
import Input from "../Input";
import Description from "../Description";
import Title from "../Title";
import { calculateMargin } from "../../lib/calculations";

export default function ProfitMarginCalculator() {
  const theme = useTheme();
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState(50);
  const [valueTwo, setValueTwo] = useState(100);
  const [netProfitMarginResult, setNetProfitMarginResult] = useState(null);
  const [netProfitResult, setNetProfitResult] = useState(null);
  const [profitPercentageResult, setProfitPercentageResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    try {
      setError("");
      const calculation = calculateMargin(valueOne, valueTwo);
      setNetProfitMarginResult(calculation.margin.toFixed(2));
      setNetProfitResult(calculation.profit.toFixed(2));
      setProfitPercentageResult(
        calculation.markup === null ? "N/A" : calculation.markup.toFixed(2)
      );
    } catch (calculationError) {
      setNetProfitMarginResult(null);
      setNetProfitResult(null);
      setProfitPercentageResult(null);
      setError(calculationError.message);
    }
  };

  const handleClear = () => {
    valueOne && setValueOne("");
    valueTwo && setValueTwo("");
    netProfitMarginResult && setNetProfitMarginResult(null);
    netProfitResult && setNetProfitResult(null);
    profitPercentageResult && setProfitPercentageResult(null);
    setError("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("profitMarginCalc.title")}</Title>
      <Description>{t("profitMarginCalc.description")}</Description>
      <br />
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="span"
            gutterBottom
            sx={{ fontSize: "1rem", textDecoration: "underline" }}
          >
            {t("common.positiveNumbersNote")}
          </Typography>
          <Input
            type="number"
            label={t("profitMarginCalc.valueOne")}
            variant="standard"
            value={valueOne}
            onChange={(e) => handleChange(e, setValueOne)}
          />
          <br />
          <Input
            type="number"
            label={t("profitMarginCalc.valueTwo")}
            variant="standard"
            value={valueTwo}
            onChange={(e) => handleChange(e, setValueTwo)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{t("common.result")}</Typography>
          <CopyToClipboardButton result={netProfitMarginResult}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("profitMarginCalc.netProfitMarginResult")}{" "}
              {netProfitMarginResult} %
            </Typography>
          </CopyToClipboardButton>
          <br />
          <CopyToClipboardButton result={netProfitResult}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("profitMarginCalc.netProfitResult")} $ {netProfitResult}
            </Typography>
          </CopyToClipboardButton>
          <br />
          <CopyToClipboardButton result={profitPercentageResult}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {t("profitMarginCalc.profitPercentageResult")}{" "}
              {profitPercentageResult} %
            </Typography>
          </CopyToClipboardButton>
          <br />
          <Typography sx={{ fontSize: "0.75rem" }}>
            {t("marginCalc.related")}
            <Link
              href="/margin-calculator"
              style={{ color: theme.palette.primary.main }}
            >
              {t("marginCalc.title")}
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
