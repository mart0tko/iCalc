import { Link, Paper, Typography } from "@mui/material";
import { Icon } from "@mui/material";

export default function Footer() {
  return (
    <Paper
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "1rem",
      }}
      component="footer"
      variant="outlined"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.25rem 0",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "canter",
          }}
        >
          <Link
            href="/privacy-policy"
            sx={{
              color: "initial",
              textDecorationColor: "initial",
              cursor: "pointer",
            }}
          >
            Privacy Policy
          </Link>
          <span style={{ marginLeft: "1rem", marginRight: "1rem" }}>|</span>
          <Link
            href="/terms-of-use"
            sx={{
              color: "initial",
              textDecorationColor: "initial",
              cursor: "pointer",
            }}
          >
            Terms of Use
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Link
            href="https://www.facebook.com/profile.php?id=100090344551476"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center ",
            }}
          >
            <Icon
              sx={{ mb: 1 }}
              style={{
                fontSize: "25px",
                marginRight: "0.5rem",
                marginBottom: 0,
              }}
            >
              facebook
            </Icon>
            Follow Us
          </Link>
        </div>
      </div>
      <Typography
        variant="caption"
        color="initial"
        sx={{ marginRight: "1rem", borderTop: "1px solid dotted" }}
      >
        © Copyright 2023 WannaCalc. All Rights Reserved.
      </Typography>
    </Paper>
  );
}
