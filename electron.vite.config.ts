import { resolve } from "node:path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import tsConfigPathsPlugin from "vite-tsconfig-paths";

const tsConfigPaths = tsConfigPathsPlugin({
    projects: [resolve("tsconfig.json")],
});

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
        publicDir: resolve("resources"),
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
    },
    renderer: {
        define: {
            "process.plçatform": JSON.stringify(process.platform),
        },
        css: {
            postcss: {
                plugins: [
                    tailwindcss({
                        config: "./src/renderer/tailwind.config.js",
                    }),
                ],
            },
        },
        resolve: {
            alias: {
                "@renderer": resolve("src/renderer/src"),
            },
        },
        plugins: [react()],
    },
});
