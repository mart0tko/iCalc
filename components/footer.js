import { Box, Container, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
      component="footer"
      variant="outlined"
    >
      <Typography variant="caption" color="initial">
        Copyright ©2023. Calcalator Limited
      </Typography>
    </Paper>
  );
}
