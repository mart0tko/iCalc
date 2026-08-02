import { Box, Container, Icon, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 800 }}>WannaCalc</Typography>
          <Typography variant="body2" color="text.secondary">
            Practical calculators and tools, free to use.
          </Typography>
        </Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2.5 }}
          component="nav"
          aria-label="Footer navigation"
          sx={{ "& a": { color: "text.secondary", fontSize: ".9rem" } }}
        >
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-use">Terms of Use</Link>
          <Box
            component="a"
            href="https://www.facebook.com/profile.php?id=100090344551476"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow WannaCalc on Facebook"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Icon sx={{ fontSize: 18 }} aria-hidden="true">
              facebook
            </Icon>
            Follow Us
          </Box>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} WannaCalc
        </Typography>
      </Container>
    </Box>
  );
}
