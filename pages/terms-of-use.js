import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Container, Paper, Typography } from "@mui/material";

export default function TermsOfUse() {
  return (
    <>
      <Head>
        <title>Terms of Use | WannaCalc</title>
        <meta
          name="description"
          content="Terms and important limitations for using WannaCalc calculators and tools."
        />
        <link rel="canonical" href="https://wannacalc.com/terms-of-use/" />
      </Head>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Paper
          component="article"
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 5 },
            border: "1px solid",
            borderColor: "divider",
            "& h2": { mt: 4, mb: 1.5 },
            "& p": { color: "text.secondary", lineHeight: 1.75 },
          }}
        >
          <Typography
            component="h1"
            variant="h1"
            sx={{ fontSize: { xs: "2rem", md: "2.7rem" }, mb: 3 }}
          >
            Terms of Use
          </Typography>
          <Typography component="p">
            WannaCalc provides free calculators and utilities for general
            informational purposes. By using this website, you agree to these
            terms.
          </Typography>
          <Typography component="h2" variant="h3">
            No professional advice
          </Typography>
          <Typography component="p">
            Results are estimates and are not financial, medical, legal, tax,
            or other professional advice. Confirm important decisions with a
            qualified professional and an authoritative source.
          </Typography>
          <Typography component="h2" variant="h3">
            Accuracy and availability
          </Typography>
          <Typography component="p">
            We work to keep every tool accurate and available, but cannot
            guarantee that results are complete, error-free, or suitable for a
            specific purpose. You are responsible for checking inputs, units,
            and results.
          </Typography>
          <Typography component="h2" variant="h3">
            Acceptable use
          </Typography>
          <Typography component="p">
            Do not misuse, disrupt, scrape excessively, or attempt to gain
            unauthorized access to the service. Tools may be changed or removed
            when necessary.
          </Typography>
          <Typography component="h2" variant="h3">
            Limitation of liability
          </Typography>
          <Typography component="p">
            To the fullest extent allowed by law, WannaCalc is not responsible
            for losses or decisions resulting from use of the website or its
            calculated results.
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
