export const metadata = {
  title: "Roth vs Traditional IRA Calculator | Compare Retirement Accounts",
  description: "Compare Roth IRA and Traditional IRA after-tax values. See which retirement account wins based on your current and future tax rates.",
  alternates: { canonical: "https://www.rothvstraditional.com" },
  openGraph: {
    title: "Roth vs Traditional IRA Calculator",
    description: "Compare Roth IRA and Traditional IRA after-tax values based on your tax rates.",
    url: "https://www.rothvstraditional.com",
    siteName: "Moneywise Calculators",
    images: [{ url: "https://www.rothvstraditional.com/og-image.png", width: 1200, height: 630, alt: "Roth vs Traditional IRA Calculator" }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Roth vs Traditional IRA Calculator", description: "Compare Roth and Traditional IRA after-tax values." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/apple-touch-icon.png" },
  viewport: { width: "device-width", initialScale: 1, maximumScale: 5 },
  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800" crossOrigin="anonymous"></script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Roth vs Traditional IRA Calculator", description: "Compare after-tax retirement account values", url: "https://www.rothvstraditional.com", applicationCategory: "Finance", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}