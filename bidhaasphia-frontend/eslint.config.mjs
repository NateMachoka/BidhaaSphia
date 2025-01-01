import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Disable or configure the no-html-link-for-pages rule
      "@next/next/no-html-link-for-pages": "off",

      // Disable or adjust the react/no-unescaped-entities rule
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
