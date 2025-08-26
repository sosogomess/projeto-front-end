import "./globals.css";

export const metadata = {
    title: "Projeto front-end",
    description: "Projto front-end com next.js",
    icons: {
        icon: "/icons/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
