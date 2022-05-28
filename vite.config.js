import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  return defineConfig({
    server: {
      proxy: {
        "/graphql": {
          target: "http://localhost:3004/graphql",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [
      vue(),
      svgLoader({
        svgoConfig: {
          multipass: true,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
