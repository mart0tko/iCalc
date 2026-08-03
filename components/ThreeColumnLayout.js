import { Box, Container, Paper } from "@mui/material";

export default function ThreeColumnLayout({ children }) {
  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 3, md: 6 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(120px, 1fr) minmax(0, 760px) minmax(120px, 1fr)" },
          gap: { xs: 2, lg: 4 },
          alignItems: "start",
        }}
      >
        <Box
          component="aside"
          aria-label="Advertisement"
          sx={{ display: { xs: "none", lg: "block" }, minHeight: 250 }}
        />
        <Paper
          component="article"
          elevation={0}
            sx={{
              width: "100%",
            minHeight: 360,
            p: { xs: 2.25, sm: 4, md: 5 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "flex-start",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: { xs: 3, md: 4 },
            boxShadow: "0 18px 60px rgba(23,32,51,.08)",
            "& form, & .MuiContainer-root": {
              maxWidth: 620,
            },
            "& .MuiTextField-root": {
              my: 1,
            },
            }}
          >
            {children}
        </Paper>
        <Box
          component="aside"
          aria-label="Advertisement"
          sx={{ display: { xs: "none", lg: "block" }, minHeight: 250 }}
        />
      </Box>
    </Container>
  );
}
