import { Button, Container, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import { useTheme } from "@mui/material/styles";

export default function PercentageDifferance() {
  const theme = useTheme();
  const { t } = useTranslation("");
  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [result, setResult] = useState("");
  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    const val1 =
      +valueOne < +valueTwo ? +valueTwo - +valueOne : +valueOne - +valueTwo;
    const val2 = (+valueOne + +valueTwo) / 2;
    const res = (val1 / val2) * 100;
    setResult(res.toFixed(2));
  };

  const handleClear = () => {
    valueOne && setValueOne("");
    valueTwo && setValueTwo("");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("percentDiffCalc.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("percentDiffCalc.description")}
      </Typography>
      <br />
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            type="number"
            label={t("percentDiffCalc.valueOne")}
            variant="standard"
            value={valueOne}
            onChange={(e) => handleChange(e, setValueOne)}
          />
          <TextField
            type="number"
            label={t("percentDiffCalc.valueTwo")}
            variant="standard"
            value={valueTwo}
            onChange={(e) => handleChange(e, setValueTwo)}
          />
        </Container>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{}}>{t("common.result")}</Typography>
          <Typography sx={{ color: "success.dark" }}>
            {result} {result ? "%" : null}
          </Typography>
          <br />
          <Typography sx={{ fontSize: "0.75rem" }}>
            {t("percentDiffCalc.note")}
            <Link
              href="/percent-change-calculator"
              style={{ color: theme.palette.primary.main }}
            >
              {t("percentChange.title")}
            </Link>
          </Typography>
        </Container>
      </Container>
      <br />
      <Container sx={{ padding: "1rem" }}>
        <Button
          variant="contained"
          onClick={handleClear}
          sx={{ backgroundColor: "secondary.dark", margin: "1rem" }}
        >
          {t("common.reset")}
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ margin: "1rem" }}
        >
          {t("common.calculate")}
        </Button>
      </Container>
    </ThreeColumnLayout>
  );
}
