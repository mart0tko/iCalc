import Box from "@mui/material/Box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CalculaterHomeLink from "../components/CalculaterHomeLink";
import InternationalLinks, {
  InternationalLinksConvertors,
  InternationalLinksGenerators,
} from "../constants";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { locale } = useRouter();
  const { t } = useTranslation("");
  const [calculators, setCalculators] = useState([
    ...InternationalLinks,
    ...InternationalLinksConvertors,
    ...InternationalLinksGenerators,
  ]);
  const calculatorsRef = useRef(calculators);

  const handleChange = (searchTerm) => {
    const filteredCalculators = calculatorsRef.current.filter(
      (value) => value.en.indexOf(searchTerm.toLowerCase()) !== -1
    );
    setCalculators(filteredCalculators);
  };

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
        <Input
          label={"Search"}
          onChange={(e) => handleChange(e.target.value)}
          // sx={{
          //   width: {
          //     xs: "calc(100% - 10%)",
          //     sm: "calc(100% - 20%)",
          //     md: "calc(100% - 30%)",
          //   },
          //   margin: { xs: "2% 5%", sm: "2% 10%", md: "2% 15%" },
          // }}
        />
        {calculators.map((value, index) => (
          <CalculaterHomeLink
            key={value[locale]}
            color={index % 2 == 0}
            href={value[locale]}
            icon={value.icon}
            title={value.title}
            type={value.type}
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

// Responsive design example here with sx={}
