import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";
// TODO make it dynamic
import Const from "../components/consts";

console.log(Const);
const InternationalLinks = {
  "percentage-calculator": {
    en: "/percentage-calculator",
  },
  "percentage-change-calculator": {
    en: "/percentage-change-calculator",
  },
  "percentage-difference-calculator": {
    en: "/percentage-difference-calculator",
  },
  "age-calculator": {
    en: "/age-calculator",
  },
  "simple-loan-calculator": {
    en: "/simple-loan-calculator",
  },
  "conversion-rate-calculator": {
    en: "/conversion-rate-calculator",
  },
  "profit-margin-calculator": {
    en: "/profit-margin-calculator",
  },
  "bmi-calculator": {
    en: "/bmi-calculator",
  },
  "bmr-calculator": {
    en: "/bmr-calculator",
  },
  "dog-age-calculator": {
    en: "/dog-age-calculator",
  },
  "cat-age-calculator": {
    en: "/cat-age-calculator",
  },
  "tip-calculator": {
    en: "/tip-calculator",
  },
  "margin-calculator": {
    en: "/margin-calculator",
  },
};

async function generate() {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "pages/*.js",
    "data/**/*.mdx",
    "!data/*.mdx",
    "!pages/_*.js",
    "!pages/api",
    "!pages/404.js",
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace("pages", "")
              .replace("data", "")
              .replace(".js", "")
              .replace(".mdx", "");
            const route = path === "/index" ? "" : path;

            return `
              <url>
                  <loc>${`https://wannacalc.com${route}`}</loc>
              </url>
            `;
          })
          .join("")}
        ${Object.keys(InternationalLinks)
          .map((page) => {
            return `
              <url>
                  <loc>${`https://wannacalc.com${InternationalLinks[page]["en"]}`}</loc>
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  writeFileSync("public/sitemap.xml", formatted);
}

generate();
