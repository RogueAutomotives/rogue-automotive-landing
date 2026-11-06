// GitHub Pages only knows real files: any other path is served by 404.html with
// a 404 status, even though the SPA then renders it. That is fine for a visitor
// but not for an ad — Meta checks the landing URL and can reject a 404.
// So the routes ads point at get a real copy of index.html (served with 200 at
// "/<route>/"). The app router renders the right page from the path as usual.
import { copyFileSync, mkdirSync } from "node:fs";

const AD_ROUTES = [
  "offers/ceramic-sealant",
  "offers/ceramic-coating",
  "car-rentals",
  "car-rentals/honda-accord",
  "car-rentals/honda-fit-shuttle",
];

for (const route of AD_ROUTES) {
  mkdirSync(`dist/${route}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/${route}/index.html`);
}
console.log(`static routes: ${AD_ROUTES.join(", ")}`);
