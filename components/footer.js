import { Link, Paper, Typography } from "@mui/material";

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
      {" | "}
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
      <br />
      <Typography
        variant="caption"
        color="initial"
        sx={{ marginRight: "1rem" }}
      >
        © Copyright 2023 WannaCalc. All Rights Reserved.
      </Typography>
    </Paper>
  );
}
