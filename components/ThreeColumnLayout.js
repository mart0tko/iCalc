import { Box, Grid } from "@mui/material";

export default function ThreeColumnLayout({ children }) {
  return (
    <Box sx={{ paddingTop: "2rem" }}>
      <Grid container>
        <Grid item xs={1} sm={2} md={2}>
          {/* TODO Google Adsense */}
        </Grid>
        <Grid item xs={10} sm={8} md={8}>
          <Box
            sx={{
              width: "100%",
              minHeight: 300,
              padding: "1rem",
              margin: "1px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "flex-start",
              border: "1px dotted black",
            }}
          >
            {children}
          </Box>
        </Grid>
        <Grid item xs={1} sm={2} md={2}>
          {/* TODO Google Adsense */}
        </Grid>
      </Grid>
    </Box>
  );
}
