import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, CircularProgress, Icon, Stack } from "@mui/material";
import BurgerMenu from "./BurgerMenu";

const navItems = [
  { label: "Calculators", href: "/#calculators" },
  { label: "Converters", href: "/#converters" },
  { label: "Generators", href: "/#generators" },
];

export default function Header(props) {
  const { route } = useRouter();

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(255,255,255,.9)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 76 } }}>
          <Link
            href="/"
              aria-label="WannaCalc home"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "inherit",
              }}
          >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(37,99,235,.24)",
                }}
              >
                <Icon aria-hidden="true">calculate</Icon>
              </Box>
            <Typography
                component={route === "/" ? "span" : "span"}
              noWrap
              sx={{
                  fontSize: { xs: "1.25rem", sm: "1.4rem" },
                  fontWeight: 800,
                  letterSpacing: "-.035em",
              }}
            >
              WannaCalc
            </Typography>
          </Link>
            <Stack
              component="nav"
              aria-label="Primary navigation"
              direction="row"
              spacing={0.5}
              sx={{ ml: "auto", display: { xs: "none", md: "flex" } }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  color="inherit"
                  sx={{ color: "text.secondary" }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
            <Box sx={{ ml: { xs: "auto", md: 1 } }}>
          <BurgerMenu />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        component="main"
        id="main-content"
        sx={{
          minHeight: "calc(100vh - 176px)",
          pb: { xs: 5, md: 8 },
        }}
      >
        <React.Suspense
          fallback={
            <Box sx={{ display: "grid", minHeight: 300, placeItems: "center" }}>
              <CircularProgress aria-label="Loading page" />
            </Box>
          }
        >
          {props.children}
        </React.Suspense>
      </Box>
    </>
  );
}
