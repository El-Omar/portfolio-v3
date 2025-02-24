import { Metadata } from "next";

const defaultMetadata = {
  title: "Elomar | Developer & Designer",
  description:
    "Full Stack Developer and Designer specializing in creating beautiful, performant, and accessible web applications.",
  authors: [{ name: "Elomar" }],
  creator: "Elomar",
  publisher: "Elomar",
  keywords: [
    "Full Stack Developer",
    "Web Designer",
    "React Developer",
    "TypeScript",
    "Next.js",
    "Portfolio",
    "Web Development",
    "UI/UX Designer",
    "Belgium",
    "Feelance",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elomar.be",
    siteName: "Elomar",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Elomar - Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elomar - Developer & Designer",
    description:
      "Full Stack Developer and Designer specializing in creating beautiful, performant, and accessible web applications.",
    creator: "@elomar",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: "#ffffff",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export const getMetadata = (overrides?: Partial<Metadata>): Metadata => {
  if (!overrides) return defaultMetadata;

  const title = overrides.title
    ? `${overrides.title} | Elomar`
    : defaultMetadata.title;

  return {
    ...defaultMetadata,
    ...overrides,
    title,
  };
};
