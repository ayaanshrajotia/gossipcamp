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
                "college-dark-black": "#000000",
                "college-dark-white": "#E6E9EA",
                "college-dark-white-2": "#858585",
                "college-dark-gray-1": "#121212",
                "college-dark-gray-2": "#1E1E1E",
                "college-dark-gray-3": "#262626",
            },
            fontFamily: {
                primary: ["Lato", "sans-serif"],
                secondary: ["Source Sans 3", "sans-serif"],
            },
            borderWidth: {
                "1": "1.5px",
            },
        },
    },
    plugins: [],
};
export default config;
