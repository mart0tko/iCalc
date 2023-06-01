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

export default function Percentage() {
  const theme = useTheme();
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState(1);
  const [valueTwo, setValueTwo] = useState(12);
  const [result, setResult] = useState("");
  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    setResult("");
    const val1 = +valueTwo * +valueOne;
    const res = val1 / 100;
    setResult(res.toFixed(5));
  };

  const handleClear = () => {
    valueOne && setValueOne("");
    valueTwo && setValueTwo("");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("percentage.title")}</Title>
      <Description>{t("percentage.description")}</Description>
      <Typography variant="p" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("percentage.example")}
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
          <TextField
            type="number"
            label={t("percentage.valueOne")}
            variant="standard"
            value={valueOne}
            onChange={(e) => handleChange(e, setValueOne)}
          />
          <TextField
            type="number"
            label={t("percentage.valueTwo")}
            variant="standard"
            value={valueTwo}
            onChange={(e) => handleChange(e, setValueTwo)}
          />
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <CopyToClipboardButton result={result}>
            <Typography
              sx={{
                color: "success.dark",
                fontSize: "1.5rem",
              }}
            >
              {result}
            </Typography>
          </CopyToClipboardButton>
          <br />
          <Typography sx={{ fontSize: "0.75rem" }}>
            {t("percentage.related")}
            <Link
              href="/percentage-difference-calculator"
              style={{ color: theme.palette.primary.main }}
            >
              {t("percentDiffCalc.title")}
            </Link>
            {", "}
            <Link
              href="/percentage-change-calculator"
              style={{ color: theme.palette.primary.main }}
            >
              {t("percentChange.title")}
            </Link>
          </Typography>
        </Container>
      </Container>
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
