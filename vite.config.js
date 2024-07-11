import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { peerDependencies, dependencies } from "./package.json";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { resolve } from "path";
import tailwindcss from "tailwindcss";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  plugins: [react(), libInjectCss()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "lib/main.js"),
      name: "UIComponents",
      // the proper extensions will be added
      fileName: "ui-components",
      formats: ["es", "cjs"],
    },
    manifest: true,
  },
  resolve: {
    alias: {
      $lib: resolve(__dirname, "lib/"),
      $utils: resolve(__dirname, "lib/utils/"),
    },
  },
  rollupOptions: {
    // make sure to externalize deps that shouldn't be bundled
    // into your library
    external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)],
    target: "esnext",
    sourcemap: true,
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      globals: {
        moment: "moment",
        uuid: "uuid",
        react: "react",
      },
    },
  },
});
