import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Link from "next/link";
import Image from "next/image";
import { grey } from "@mui/material/colors";
import LogoImage from "../public/white_icon_transparent_background.png";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import BurgerMenu from "./BurgerMenu";

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Header(props) {
  const { route } = useRouter();
  return (
    <React.Fragment>
      <AppBar position="sticky" sx={{ pl: 0 }}>
        <Toolbar
          sx={{
            justifyContent: { xs: "center", sm: "center", md: "flex-start" },
          }}
        >
          <Link
            href="/"
            style={{ display: "flex", flexGrow: 1, alignItems: "center" }}
          >
            <Image
              src={LogoImage}
              alt="logo"
              style={{ width: "60px", height: "auto" }}
            />
            <Typography
              variant={route === "/" ? "h1" : "p"}
              noWrap
              sx={{
                fontFamily: "Roboto, Halvetica, monospace",
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "2.5rem" },
                fontWeight: 400,
              }}
            >
              WannaCalc
            </Typography>
          </Link>
          <BurgerMenu />
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          backgroundColor: grey[100],
          minHeight: "calc(100vh - 121px)",
          marginLeft: 0,
          marginRight: 0,
          minWidth: "100%",
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
          paddingBottom: "1rem",
        }}
      >
        {route === "/" && (
          <Toolbar
            id="back-to-top-anchor"
            sx={{
              backgroundColor: "primary.light",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              padding: "2rem",
            }}
          >
            <Typography variant="h2" sx={{ margin: 0, fontSize: "2.125rem" }}>
              Free Online Calculators
            </Typography>
          </Toolbar>
        )}
        <React.Suspense fallback={<CircularProgress />}>
          <Box>{props.children}</Box>
        </React.Suspense>
      </Container>
      {/* <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          TODO fix it when there is enough content
          <Icon sx={{ mr: 1 }} style={{ fontSize: "50px" }}>
            arrow
          </Icon>
        </Fab>
      </ScrollTop> */}
    </React.Fragment>
  );
}
