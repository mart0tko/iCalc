import Box from "@mui/material/Box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CalculaterHomeLink from "../components/CalculaterHomeLink";
import InternationalLinks, { InternationalLinksConvertors } from "../constants";
import { useRouter } from "next/router";

export default function Home() {
  const { locale } = useRouter();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "center",
          justifyContent: "center",
          "& > :not(style)": {
            m: 1,
            width: "100%",
          },
        }}
      >
        {/* <Typography>{t("common.calculators")}</Typography>
        <hr /> */}
        {Object.keys(InternationalLinks).map((value, index) => (
          <CalculaterHomeLink
            key={InternationalLinks[value]}
            color={index % 2 == 0}
            href={InternationalLinks[value][locale]}
            icon={InternationalLinks[value].icon}
            title={InternationalLinks[value].title}
          />
        ))}
        {Object.keys(InternationalLinksConvertors).map((value, index) => (
          <CalculaterHomeLink
            key={InternationalLinksConvertors[value]}
            color={index % 2 == 0}
            href={InternationalLinksConvertors[value][locale]}
            icon={InternationalLinksConvertors[value].icon}
            title={InternationalLinksConvertors[value].title}
          />
        ))}
      </Box>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
