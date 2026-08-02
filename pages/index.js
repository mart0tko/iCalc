import Head from "next/head";
import { useMemo, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {
  Box,
  Chip,
  Container,
  Icon,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import CalculaterHomeLink from "../components/CalculaterHomeLink";
import Input from "../components/Input";
import { toolCatalog, toolGroups } from "../constants";

const siteDescription =
  "Fast, free online calculators, converters, generators, and everyday utilities.";

export default function Home() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const visibleTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return toolCatalog.filter((tool) => {
      const matchesCategory =
        category === "all" || tool.category === category;
      const searchableText = `${tool.slug} ${t(tool.title)} ${
        tool.categoryLabel
      }`.toLowerCase();
      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [category, query, t]);

  return (
    <>
      <Head>
        <title>WannaCalc — Free Online Calculators and Tools</title>
        <meta name="description" content={siteDescription} />
        <link rel="canonical" href="https://wannacalc.com/" />
        <meta
          property="og:title"
          content="WannaCalc — Free Online Calculators and Tools"
        />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:site_name" content="WannaCalc" />
        <meta
          property="og:image"
          content="https://wannacalc.com/white_icon_transparent_background.png"
        />
        <meta property="og:url" content="https://wannacalc.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Head>

      <Box
        component="section"
        sx={{
          pt: { xs: 7, md: 11 },
          pb: { xs: 6, md: 9 },
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Chip
            icon={<Icon>bolt</Icon>}
            label="49 practical tools, always free"
            color="primary"
            variant="outlined"
            sx={{ mb: 3, fontWeight: 700, bgcolor: "background.paper" }}
          />
          <Typography component="h1" variant="h1">
            The quick answer to
            <Box component="span" sx={{ color: "primary.main" }}>
              {" "}
              everyday questions.
            </Box>
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 640,
              mx: "auto",
              mt: 2.5,
              mb: 4,
              fontSize: { xs: "1rem", md: "1.16rem" },
              lineHeight: 1.7,
            }}
          >
            Calculate, convert, generate, and translate with straightforward
            tools that work on every device.
          </Typography>
          <Input
            type="search"
            label="Search all tools"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “percentage”, “password”, or “miles”…"
            sx={{
              maxWidth: 680,
              "& .MuiOutlinedInput-root": {
                minHeight: 58,
                boxShadow: "0 12px 40px rgba(23,32,51,.1)",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon aria-hidden="true">search</Icon>
                </InputAdornment>
              ),
            }}
          />
        </Container>
      </Box>

      <Container
        component="section"
        maxWidth="lg"
        aria-labelledby="tools-heading"
        sx={{ pt: { xs: 5, md: 8 } }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "end" }}
          gap={2}
          sx={{ mb: 3.5 }}
        >
          <Box>
            <Typography id="tools-heading" component="h2" variant="h2">
              Find the right tool
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Browse by category or search by name.
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            aria-label="Filter tools by category"
          >
            <Chip
              label="All"
              clickable
              color={category === "all" ? "primary" : "default"}
              variant={category === "all" ? "filled" : "outlined"}
              onClick={() => setCategory("all")}
            />
            {toolGroups.map((group) => (
              <Chip
                key={group.id}
                label={group.label}
                clickable
                color={category === group.id ? "primary" : "default"}
                variant={category === group.id ? "filled" : "outlined"}
                onClick={() => setCategory(group.id)}
              />
            ))}
          </Stack>
        </Stack>

        {visibleTools.length > 0 ? (
          <>
          {toolGroups.map((group) => (
            <Box
              key={group.id}
              id={group.id}
              sx={{ position: "relative", top: -100 }}
              aria-hidden="true"
            />
          ))}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            {visibleTools.map((tool) => (
              <Box key={tool.en}>
                <CalculaterHomeLink
                  href={tool.en}
                  icon={tool.icon}
                  title={tool.title}
                  type={tool.type}
                />
              </Box>
            ))}
          </Box>
          </>
        ) : (
          <Box
            role="status"
            sx={{
              textAlign: "center",
              py: 10,
              px: 2,
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: 3,
              bgcolor: "background.paper",
            }}
          >
            <Icon sx={{ fontSize: 42, color: "text.secondary" }}>
              search_off
            </Icon>
            <Typography variant="h3" sx={{ mt: 1 }}>
              No matching tools
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Try another search or select a different category.
            </Typography>
          </Box>
        )}
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
