import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Instrument_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "@/lib/queryprovider";
import AppHeader from "@/components/nonreusable/appHeader";
import AppFooter from "@/components/nonreusable/appFooter";
import SessionWrapper from "@/components/sessionwrapper";
import { Suspense } from "react";
import Loading from "@/components/reusable/loading";

const mavenPro = localFont({
  src: "../../assets/fonts/maven_pro.ttf",
  variable: "--font-mavenPro",
  weight: "400 900",
});

const robotoMono = localFont({
  src: "../../assets/fonts/roboto_mono.ttf",
  variable: "--font-robotoMono",
  weight: "100 700",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrumentSans",
});

export const metadata: Metadata = {
  title: "The Time Cube | A dynamic time visualizer",
  description:
    "See how much time you have left, visualized in cubes that fill up as time passes. Pick a mode and watch your day, week or life unfold",
  openGraph: {
    title: "The Time Cube | A dynamic time visualizer",
    description:
      "See how much time you have left, visualized in cubes that fill up as time passes. Pick a mode and watch your day, week or life unfold",
    url: "https://www.thetimecube.com/",
    siteName: "TheTimeCube",
    images: [
      {
        url: "https://www.thetimecube.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TheTimeCube",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Time Cube | A dynamic time visualizer",
    description:
      "See how much time you have left, visualized in cubes that fill up as time passes. Pick a mode and watch your day, week or life unfold",
    images: ["https://www.thetimecube.com/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="TimeCube" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${mavenPro.variable} ${robotoMono.variable} ${instrumentSans.variable} antialiased`}
      >
        <div className=" min-h-screen flex flex-col items-center">
          <QueryProvider>
            <Suspense fallback={<Loading />}>
              <SessionWrapper>
                <Toaster />
                <AppHeader />
                {children}
                <div className="flex-1"></div>
                {/* <Analytics /> */}
                <AppFooter />
              </SessionWrapper>
            </Suspense>
          </QueryProvider>
        </div>
      </body>
      {/* <GoogleAnalytics gaId="G-Y2TKWE6CZK" /> */}
    </html>
  );
}
