import { useId } from "react";
import { TextField } from "@mui/material";

export default function Input(props) {
  const generatedId = useId().replace(/:/g, "");

  return (
    <TextField
      id={props.id || `input-${generatedId}`}
      inputProps={{ inputMode: props.type === "number" ? "decimal" : undefined }}
      {...props}
      variant={props.variant === "standard" ? "outlined" : props.variant || "outlined"}
    />
  );
}
