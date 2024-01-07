import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "college-yellow": "#fdd800",
                "college-grey": "#313236",
                "college-grey-2": "rgba(221, 221, 221, 0.75)",
            },
            fontFamily: {
                primary: ["Raleway", "sans-serif"],
                secondary: ["Be Vietnam Pro", "sans-serif"],
            },
            borderWidth: {
                "1": "1.5px",
            },
        },
    },
    plugins: [],
};
export default config;
