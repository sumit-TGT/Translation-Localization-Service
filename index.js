// 1. Import required modules
import express from "express";
import dotenv from "dotenv";
import i18next from "./i18n.js";
import middleware from "i18next-http-middleware";
import { formatCurrency, formatDate } from "./utils/formatter.js";

// 2. Load environment variables from .env
dotenv.config();

// 3. Use variables from .env with fallbacks
const port = process.env.PORT || 3000;
const storeName = process.env.STORE_NAME || "Default Store";
const defaultRegion = process.env.DEFAULT_REGION || "IN";

// 4. Region → Language mapping
const regionToLang = {
  IN: "hi",
  US: "en"
};

const app = express();
app.use(middleware.handle(i18next));

// 5. Receipt route
app.get("/receipt", (req, res) => {
  const region = req.query.region || defaultRegion;
  const lang = regionToLang[region] || "en";
  const t = i18next.getFixedT(lang);

  const receipt = {
    [t("receipt.title")]: {
      [t("receipt.storeName")]: storeName,
      [t("receipt.date")]: formatDate(new Date(), lang),
      [t("receipt.time")]: new Date().toLocaleTimeString(lang),
      [t("receipt.customer")]: "Ravi Kumar",
      [t("receipt.items")]: [
        {
          [t("receipt.items")]: "Shampoo",
          [t("receipt.quantity")]: 2,
          [t("receipt.price")]: formatCurrency(199.99, lang)
        },
        {
          [t("receipt.items")]: "Toothpaste",
          [t("receipt.quantity")]: 1,
          [t("receipt.price")]: formatCurrency(49.99, lang)
        }
      ],
      [t("receipt.total")]: formatCurrency(449.97, lang),
      [t("receipt.thanks")]: t("receipt.thanks")
    }
  };

  res.json(receipt);
});

// 6. Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
