import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["300"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const poppins_extrabold = Poppins({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-poppins-extrabold",
});

const poppins_bold = Poppins({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-poppins-bold",
});

export const metadata: Metadata = {
  title: "The Green Life",
  description: "The Green Life - Shaping the future of Saving the Planet",
  twitter: {
    card: "summary_large_image", // For a large Twitter card
    site: "https://thegreenlife.vercel.app/",
    title: "The Green Life",
    description: "The Green Life - Shaping the future of Saving the Planet",
    images: "/twitter-image.png", // Twitter image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://thegreenlife.vercel.app/" />
        <meta
          name="twitter:title"
          content="The Green Life - Shaping the future of Saving the Planet"
        />
        <meta
          name="twitter:description"
          content="The Green Life - Shaping the future of Saving the Planet"
        />
        <meta name="twitter:image" content="/twitter-image.png" />
      </Head>
      <body
        className={`${poppins.variable} ${poppins_extrabold.variable} ${poppins_bold.variable}`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
