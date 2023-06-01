import {
  Button,
  CircularProgress,
  Container,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import Description from "../Description";
import Title from "../Title";

function wordCount(text) {
  let words = text.trim().split(/\s+/);
  return words.length;
}

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
export default function WordCounter() {
  const { t } = useTranslation("");
  const [input, setInput] = useState(text);
  const [result, setResult] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    setResult("");
    setResult(wordCount(input));
  };

  return (
    <ThreeColumnLayout>
      <Title>{t("wordCounter.title")}</Title>
      <Description>{t("wordCounter.description")}</Description>
      <br />
      <Container
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Typography sx={{}}>{t("wordCounter.text")}</Typography>
          <TextareaAutosize
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ widht: "100%" }}
            style={{ height: "5rem" }}
          />
        </Container>
        <br />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>{t("wordCounter.result")}</Typography>
          <Typography
            sx={{
              color: "success.dark",
              fontSize: "1.5rem",
            }}
          >
            {result}
          </Typography>
        </Container>
      </Container>
      <br />
      <Button variant="contained" onClick={handleSubmit}>
        {t("common.check")}
      </Button>
    </ThreeColumnLayout>
  );
}
