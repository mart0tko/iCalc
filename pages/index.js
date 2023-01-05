import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Box from "@mui/material/Box";
import CalculaterHomeLink from "../components/CalculaterHomeLink";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
          },
        }}
      >
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
        <CalculaterHomeLink />
      </Box>
    </>
  );
}

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//     },
//   };
// }
