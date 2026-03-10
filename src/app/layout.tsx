import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource/source-sans-pro/latin-400.css";
import "@fontsource/source-sans-pro/latin-700.css";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { LocaleProvider } from "@/contexts/LocaleContext";

const SITE_URL = "https://exifstrip.com";
// 仅当设置 NEXT_PUBLIC_GA_ID 时加载（生产环境在 .env.production 或 PM2 中配置）
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ExifStrip – Free Online EXIF Viewer, Editor & Metadata Remover",
    template: "%s | ExifStrip",
  },
  description:
    "Free online EXIF viewer and photo metadata remover. View, edit, and strip EXIF from images in your browser—no upload, no sign-up. Remove GPS and location data for privacy. Export EXIF to CSV or JSON.",
  keywords: [
    "EXIF viewer",
    "EXIF editor",
    "remove EXIF",
    "strip EXIF",
    "online EXIF tool",
    "free EXIF viewer",
    "remove GPS from photo",
    "photo metadata remover",
    "image metadata",
  ],
  icons: {
    icon: [
      { url: "/fav/favicon.ico", sizes: "any" },
      { url: "/fav/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/fav/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/fav/apple-touch-icon.png",
  },
  manifest: "/fav/site.webmanifest",
  openGraph: {
    title: "ExifStrip – Free Online EXIF Viewer, Editor & Metadata Remover",
    description:
      "View, edit, and strip EXIF metadata from photos in your browser. No upload, no sign-up. Remove GPS for privacy. Free forever.",
    url: SITE_URL,
    siteName: "ExifStrip",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExifStrip – Free Online EXIF Viewer & Remover",
    description: "View, edit, and strip EXIF from photos in your browser. No upload. Remove GPS for privacy.",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

const WEB_APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ExifStrip",
  description:
    "Free online EXIF viewer, editor, and metadata remover. View, edit, and strip EXIF from photos in your browser. Remove GPS and location data for privacy. No upload, no sign-up.",
  url: SITE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "View EXIF metadata by dimension",
    "Edit EXIF in JPEG",
    "Strip EXIF with presets (GPS only, device only, privacy, remove all)",
    "Export EXIF to CSV, JSON, TXT, HEX",
    "Remove GPS from photo without uploading",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_APP_JSON_LD) }}
        />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
