import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import prettier from "prettier";

async function generate() {
  const root = process.cwd();
  const constants = readFileSync(resolve(root, "constants.js"), "utf8");
  const toolRoutes = [...constants.matchAll(/en:\s*"([^"]+)"/g)].map(
    ([, route]) => route
  );
  const routes = ["/", "/privacy-policy/", "/terms-of-use/", ...toolRoutes];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${routes
          .map((route) => {
            const normalizedRoute =
              route === "/" ? route : `${route.replace(/\/$/, "")}/`;
            return `
              <url>
                  <loc>${`https://wannacalc.com${normalizedRoute}`}</loc>
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  const formatted = prettier.format(sitemap.trim(), {
    parser: "html",
  });

  writeFileSync(resolve(root, "public/sitemap.xml"), formatted);
}

generate();
