/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                card: "repeat(auto-fill, minmax(350px, 1fr))",
            },
            perspective: {
                2000: "2000px",
            },
            transitionProperty: {
                card: "transform 0.8s cubic-bezier(0.86,0,0.07,1);",
            },
        },
    },
    plugins: [require("@xpd/tailwind-3dtransforms")],
};
