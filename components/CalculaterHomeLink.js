import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Paper from "@mui/material/Paper";
import { ThreeDRotation } from "@mui/icons-material";
import Link from "next/link";

const sizePaper = 128;
const sizeIcon = sizePaper / 2.5;

export default function CalculaterHomeLink() {
  const { t } = useTranslation();

  return (
    <Link href="/test" style={{ maxWidth: sizePaper, height: sizePaper }}>
      <Paper
        variant="outlined"
        href="/test"
        hrefLang="en"
        sx={{
          cursor: "pointer",
          backgroundColor: "primary.light",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: sizePaper,
          height: sizePaper,
          textAlign: "center",
        }}
      >
        <ThreeDRotation
          sx={{ width: sizeIcon, height: sizeIcon, marginBottom: "1rem" }}
        />
        {t("home.Home title")}
      </Paper>
    </Link>
  );
}

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//     },
//   };
// }
