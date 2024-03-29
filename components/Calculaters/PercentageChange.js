import { Container, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import { useTheme } from "@mui/material/styles";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Description from "../Description";
import Title from "../Title";

export default function PercentageChange() {
  const theme = useTheme();
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState(100);
  const [valueTwo, setValueTwo] = useState(200);
  const [result, setResult] = useState("");
  const [isNegative, setIsNegative] = useState(false);
  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    setResult("");
    const val1 = +valueTwo - +valueOne;
    const val2 = +valueOne;
    const res = (val1 / val2) * 100;
    setResult(res.toFixed(2));
    setIsNegative(res < 0);
  };

  const handleClear = () => {
    valueOne && setValueOne("");
    valueTwo && setValueTwo("");
    result && setResult("");
    setIsNegative(null);
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
          <TextField
            type="number"
            label={t("common.valueOne")}
            variant="standard"
            value={valueOne}
            onChange={(e) => handleChange(e, setValueOne)}
          />
          <TextField
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
                ? !!isNegative
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
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
