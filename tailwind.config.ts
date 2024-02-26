import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "chat-background": "url('/images/chat-background.png')",
            },
            colors: {
                "college-yellow": "#fdd800",
                "college-grey": "#313236",
                "college-grey-2": "rgba(221, 221, 221, 0.75)",
                "college-bg-grey": "#F6F6F9",
            },
            fontFamily: {
                primary: ["Lato", "sans-serif"],
                secondary: ["Lato", "sans-serif"],
            },
            borderWidth: {
                "1": "1.5px",
            },
        },
    },
    plugins: [],
};
export default config;
