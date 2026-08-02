import {
  Alert,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Description from "../Description";
import Title from "../Title";
import Input from "../Input";
import { calculateBmr } from "../../lib/calculations";

export default function BMR() {
  const { t } = useTranslation("");
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(185);
  const [gender, setGender] = useState("female");
  const [result, setResult] = useState("");
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
      const bmr = calculateBmr({ age, weightKg: weight, heightCm: height, gender });
      setResult(bmr.toFixed(2));
    } catch (calculationError) {
      setResult("");
      setError(calculationError.message);
    }
  };

  const handleClear = () => {
    setGender("female");
    age && setAge("");
    weight && setWeight("");
    height && setHeight("");
    result && setResult("");
    setError("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("bmr.title")}</Title>
      <Description>{t("bmr.description")}</Description>
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
            label={t("bmr.age")}
            variant="standard"
            value={age}
            inputProps={{ min: 1, max: 120 }}
            onChange={(e) => handleChange(e, setAge)}
          />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label={t("bmr.female")}
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label={t("bmr.male")}
            />
          </RadioGroup>
          <Input
            type="number"
            label={t("bmr.weight")}
            variant="standard"
            value={weight}
            inputProps={{ min: 1, step: "any" }}
            onChange={(e) => handleChange(e, setWeight)}
          />
          <Input
            type="number"
            label={t("bmr.height")}
            variant="standard"
            value={height}
            inputProps={{ min: 30, max: 300, step: "any" }}
            onChange={(e) => handleChange(e, setHeight)}
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
              {result} {t("bmr.result")}
            </Typography>
          </CopyToClipboardButton>
        </Container>
      </Container>
      {error && <Alert severity="error">{error}</Alert>}
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
