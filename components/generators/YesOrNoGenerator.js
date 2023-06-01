import { Button, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import Description from "../Description";
import Title from "../Title";

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
      <Title>{t("yesOrNoGenerator.title")}</Title>
      <Description>{t("yesOrNoGenerator.description")}</Description>
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
