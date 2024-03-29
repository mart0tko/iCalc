import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Description from "../Description";
import Title from "../Title";

export default function BMR() {
  const { t } = useTranslation("");
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(1.85);
  const [gender, setGender] = useState("female");
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);
  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    let bmr;
    if (gender === "male") {
      bmr = 66 + 13.7 * weight + 5 * height - 6.8 * age;
    } else if (gender === "female") {
      bmr = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
    }
    setResult(bmr.toFixed(2));
  };

  const handleClear = () => {
    gender && setGender("");
    age && setAge("");
    weight && setWeight("");
    height && setHeight("");
    result && setResult("");
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
          <TextField
            type="number"
            label={t("bmr.age")}
            variant="standard"
            value={age}
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
          <TextField
            type="number"
            label={t("bmr.weight")}
            variant="standard"
            value={weight}
            onChange={(e) => handleChange(e, setWeight)}
          />
          <TextField
            type="number"
            label={t("bmr.height")}
            variant="standard"
            value={height}
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
      <br />
      <CalcButtons handleClear={handleClear} handleSubmit={handleSubmit} />
    </ThreeColumnLayout>
  );
}
