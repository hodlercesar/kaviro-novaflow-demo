import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const compat = new FlatCompat({
  baseDirectory,
  resolvePluginsRelativeTo: path.dirname(
    require.resolve("eslint-config-next/package.json"),
  ),
});

const config = [
  { ignores: [".next/**", "node_modules/**"] },
  ...compat.extends("next/core-web-vitals"),
];

export default config;
