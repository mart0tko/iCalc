import * as React from "react";
import { Typography } from "@mui/material";

export default function Description({ children }) {
  return (
    <Typography
      component="p"
      variant="body1"
      color="text.secondary"
      sx={{
        maxWidth: 660,
        mb: 3,
        fontSize: { xs: ".95rem", sm: "1.05rem" },
        lineHeight: 1.7,
        whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </Typography>
  );
}
