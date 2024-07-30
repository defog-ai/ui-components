import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { peerDependencies } from "./package.json";
// import { libInjectCss } from "vite-plugin-lib-inject-css";
import { resolve } from "path";
import tailwindcss from "tailwindcss";
import dts from "vite-plugin-dts";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [react(), dts({ include: ["lib"] })],
  build: {
    sourcemap: "inline",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "lib/main.ts"),
      // the proper extensions will be added
      fileName: "ui-components",
      formats: ["es"],
    },
    manifest: true,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [...Object.keys(peerDependencies)],
      target: "esnext",
      sourcemap: true,
    },
  },
});
