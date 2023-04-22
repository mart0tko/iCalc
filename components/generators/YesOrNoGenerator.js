import { Button, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";

export default function YesOrNoGenerator() {
  const { t } = useTranslation("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    setResult("");
    setLoading(true);
    setTimeout(() => {
      setResult(Math.round(Math.random()));
      setLoading(false);
    }, 1000);
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("yesOrNoGenerator.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("yesOrNoGenerator.description")}
      </Typography>
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
          <Button variant="contained" onClick={handleSubmit}>
            {t("yesOrNoGenerator.button")}
          </Button>
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
          {!loading && (
            <>
              <Typography sx={{}}>{t("common.result")}</Typography>
              <Typography
                sx={{
                  color: "success.dark",
                  fontSize: "1.5rem",
                }}
              >
                {result ? t("yesOrNoGenerator.yes") : t("yesOrNoGenerator.no")}
              </Typography>
            </>
          )}
          {loading && <CircularProgress />}
        </Container>
      </Container>
    </ThreeColumnLayout>
  );
}
