import * as React from "react";
import { Typography } from "@mui/material";

export default function Title({ children }) {
  return (
    <Typography
      variant="h1"
      gutterBottom
      sx={{
        maxWidth: 680,
        fontSize: { xs: "1.8rem", sm: "2.35rem" },
        lineHeight: 1.15,
        mb: 1.5,
      }}
    >
      {children}
    </Typography>
  );
}
