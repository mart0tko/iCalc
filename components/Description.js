import * as React from "react";
import { Typography } from "@mui/material";

export default function Description({ children }) {
  return (
    <Typography
      variant="h3"
      gutterBottom
      sx={{ fontSize: "1rem", whiteSpace: "pre-wrap" }}
    >
      {children}
    </Typography>
  );
}
