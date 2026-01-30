import { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import PageWrapper from "./PageWrapper";
import { getMetadata } from "@/config/metadata";
import { routing } from "@/i18n/routing";

// Generate static params for all supported locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = getMetadata();

const LocaleLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  // Validate the locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Set the locale for the request
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const isRTL = locale === "ar";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div dir={isRTL ? "rtl" : "ltr"}>
        <PageWrapper>{children}</PageWrapper>
      </div>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
