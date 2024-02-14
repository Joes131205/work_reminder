/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                brunswick_green: "#01464F",
                pizazz: "#BEC624",
                darthmouth_green: "#016A54",
            },
        },
    },
    plugins: [],
};
