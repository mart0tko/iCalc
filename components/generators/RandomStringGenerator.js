import {
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";
import Description from "../Description";
import Title from "../Title";

const charactersAll =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charactersSmallLetters = "abcdefghijklmnopqrstuvwxyz";
const charactersWithNumbers = "abcdefghijklmnopqrstuvwxyz0123456789";
const charactersWithCapitalLetters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function generateString(length, characters) {
  let result = "";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const defaultCheckboxValue = {
  withCapitalLetters: true,
  withNumbers: true,
};

export default function RandomStringGenerator() {
  const { t } = useTranslation("");
  const [length, setLength] = useState(10);
  const [checkboxes, setCheckboxes] = useState(defaultCheckboxValue);
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    let result;
    if (checkboxes.withCapitalLetters && checkboxes.withNumbers) {
      result = generateString(length, charactersAll);
    }

    if (!checkboxes.withCapitalLetters && checkboxes.withNumbers) {
      result = generateString(length, charactersWithNumbers);
    }

    if (checkboxes.withCapitalLetters && !checkboxes.withNumbers) {
      result = generateString(length, charactersWithCapitalLetters);
    }

    if (!checkboxes.withCapitalLetters && !checkboxes.withNumbers) {
      result = generateString(length, charactersSmallLetters);
    }

    setResult(result);
  };

  const handleClear = () => {
    length && setLength(10);
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("randomStringGenerator.title")}</Title>
      <Description>{t("randomStringGenerator.description")}</Description>
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
            label={t("randomStringGenerator.length")}
            variant="standard"
            value={length}
            onChange={(e) => handleChange(e, setLength)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={checkboxes.withNumbers}
                defaultChecked
                onChange={(e) =>
                  setCheckboxes({
                    ...checkboxes,
                    withNumbers: e.target.checked,
                  })
                }
              />
            }
            label={t("randomStringGenerator.withNumbers")}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={checkboxes.withCapitalLetters}
                defaultChecked
                onChange={(e) =>
                  setCheckboxes({
                    ...checkboxes,
                    withCapitalLetters: e.target.checked,
                  })
                }
              />
            }
            label={t("randomStringGenerator.withCapitalLetters")}
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
        </Container>
      </Container>
      <br />
      <CalcButtons
        handleClear={handleClear}
        handleSubmit={handleSubmit}
        type="generate"
      />
    </ThreeColumnLayout>
  );
}
