import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      jsxRuntime: "automatic",
      jsc: {
        transform: {
          react: {
            throwIfNamespace: false, // This line ensures namespaces in JSX are allowed
          },
        },
      },
    }),
  ],
  server: {
    historyApiFallback: true,
  },
});
