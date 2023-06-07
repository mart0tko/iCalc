import Box from "@mui/material/Box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CalculaterHomeLink from "../components/CalculaterHomeLink";
import InternationalLinks, {
  InternationalLinksConvertors,
  InternationalLinksGenerators,
  InternationalLinksOthers,
} from "../constants";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Head from "next/head";
import useDebounce from "../hooks/useDebounce";

export default function Home() {
  const { locale, defaultLocale } = useRouter();
  const [calculators, setCalculators] = useState([
    ...InternationalLinks,
    ...InternationalLinksConvertors,
    ...InternationalLinksGenerators,
    ...InternationalLinksOthers,
  ]);
  const [search, setSearch] = useState("");
  const calculatorsRef = useRef(calculators);
  const debouncedSearch = useDebounce(search, 400);
  useEffect(() => {
    const filteredCalculators = calculatorsRef.current.filter(
      (value) => value.en.indexOf(search.trim().toLowerCase()) !== -1
    );

    if (filteredCalculators.length) {
      setCalculators(filteredCalculators);
    }
  }, [debouncedSearch]);

  return (
    <>
      <Head>
        <title>
          WannaCalc - Free online Calculators, Converters and Generators!
        </title>
        <meta
          name="description"
          content="Free online Math, Science, Fun, Animal - Calculators, Units, Currencies, Crypto and etc. - Converters, and Password, Team, String, Yes or No - Generators!"
        />
        <meta
          property="og:title"
          content="WannaCalc - Free online Calculators, Converters and Generators!"
        />

        <meta
          property="og:description"
          content="Free online Math, Science, Fun, Animal - Calculators, Units, Currencies, Crypto and etc. - Converters, and Password, Team, String, Yes or No - Generators!"
        />
        <meta property="og:site_name" content="WannaCalc" key="ogsitename" />
        <meta
          property="og:image"
          content="https://wannacalc.com/white_icon_transparent_background.png"
        />
        <meta property="og:url" content="https://wannacalc.com/" />
        <meta property="og:type" content="website" />
      </Head>
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
            key={value[defaultLocale]}
            color={index % 2 == 0}
            href={value[defaultLocale]}
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
