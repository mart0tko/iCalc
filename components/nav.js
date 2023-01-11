import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import Link from "next/link";
import { Icon } from "@mui/material";
import { grey } from '@mui/material/colors';

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

export default function BackToTop(props) {
  return (
    <React.Fragment>
      <AppBar position="static" sx={{ pl: 0 }}>
        <Toolbar>
          <Icon sx={{ mr: 1 }} style={{ fontSize: "50px" }}>
            calculate
          </Icon>
          <Link href="/">
            <Typography
              variant="h4"
              noWrap
              sx={{
                fontFamily: "monospace",
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CALCALATOR
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" sx={{
        backgroundColor: 'primary.light',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '3rem'
      }}>
        <Typography variant="h4">Free Online Calculators</Typography>
      </Toolbar>
      <Container sx={{ backgroundColor: grey[100], minHeight: 'calc(100vh - 220px)'}}>
        <Box>{props.children}</Box>
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
