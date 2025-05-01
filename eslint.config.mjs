import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      /* 
      Не добавлять специальные версии правил с префиксом "@typescript-eslint/".
      При добавлении хоть одного такого свойства Eslint перестает корректно работать!
      */

      // Базовые правила ESLint
      "semi": ["error", "always"], // Запятые
      "quotes": ["error", "double"], // Двойные кавычки
      "object-curly-spacing": ["error", "always"], // Пробелы внутри фигурных скобок { a: 1 }
      
      // Пробелы
      "no-multi-spaces": "error", // Запрет лишних пробелов
      "space-infix-ops": "error", // Пробелы вокруг операторов (` = `, ` + `)
      "comma-spacing": ["error", { "before": false, "after": true }], // Пробелы после запятых
     
      // Для удаления пробелов перед " />" собственных компонентов
      "react/jsx-tag-spacing": ["error", { "beforeSelfClosing": "never" }], 

      // Отступы (indent)
      "indent": ["error", 2], // 2 пробела (или 4, "tab" и т. д.)
      "react/jsx-indent": ["error", 2], // отступы в JSX
      "react/jsx-indent-props": ["error", 2], // отступы у пропсов

      // Отключает проверку используемости для error в catch
      "@typescript-eslint/no-unused-vars": ["error", { args: "after-used", ignoreRestSiblings: true, vars: "all", caughtErrors: "none" }],

    }
  }),
];

export default eslintConfig;