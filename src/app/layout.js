import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/navbar/Footer";
import { ToastProvider } from "@/components/toast/ToastProvider";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://forma-studio.example.com"),
  title: {
    default: "Custom T-Shirt Design Platform",
    template: "%s | Forma Studio",
  },
  description:
    "Create custom T-shirts online. Design your own apparel with our easy-to-use customization studio.",
  keywords: [
    "custom t-shirt design",
    "t-shirt printing",
    "apparel customization",
    "design your own shirt",
    "hoodie design tool",
  ],
  openGraph: {
    title: "Custom T-Shirt Design Platform",
    description:
      "Create custom T-shirts online. Design your own apparel with our easy-to-use customization studio.",
    url: "https://forma-studio.example.com",
    siteName: "Forma Studio",
    images: [
      {
        url: "/hero/og-image.png",
        width: 1200,
        height: 630,
        alt: "Forma Studio - Custom T-Shirt Design Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom T-Shirt Design Platform",
    description:
      "Create custom T-shirts online. Design your own apparel with our easy-to-use customization studio.",
    images: ["/hero/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <ToastProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
