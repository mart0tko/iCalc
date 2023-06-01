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
import CryptoJS from "crypto-js";
import Description from "../Description";
import Title from "../Title";

export default function MD5Generator() {
  const { t } = useTranslation("");
  const [input, setInput] = useState("Example text");
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    setResult("");
    let res = CryptoJS.MD5(input);

    setResult(res.toString());
  };

  const handleClear = () => {
    input && setInput("");
    result && setResult("");
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("md5Generator.title")}</Title>
      <Description>{t("md5Generator.description")}</Description>
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
            type="string"
            label={t("md5Generator.input")}
            variant="standard"
            value={input}
            onChange={(e) => handleChange(e, setInput)}
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
        withoutReset={true}
      />
    </ThreeColumnLayout>
  );
}
