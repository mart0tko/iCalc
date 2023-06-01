import * as React from "react";
import { Typography } from "@mui/material";

export default function Title({ children }) {
  return (
    <Typography
      variant="h1"
      gutterBottom
      sx={{ fontSize: "2rem", lineHeight: "3rem" }}
    >
      {children}
    </Typography>
  );
}
