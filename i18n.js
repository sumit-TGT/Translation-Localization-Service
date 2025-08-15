
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    preload: ["en", "hi"],
    backend: {
      loadPath: path.join(__dirname, "/locales/{{lng}}.json"),
    },
    detection: {
      order: ["querystring", "header"],
      caches: false
    }
  });

export default i18next;
