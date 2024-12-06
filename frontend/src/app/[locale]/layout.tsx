import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import PageWrapper from "./PageWrapper";
import { Locale, routing } from "@/i18n/routing";

// Generate static params for all supported locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const res = await params;
  const locale = res.locale;

  // Set the locale for the request
  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    notFound();
  }

  const isRTL = locale === "ar";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div dir={isRTL ? "rtl" : "ltr"}>
        <PageWrapper>{children}</PageWrapper>
      </div>
    </NextIntlClientProvider>
  );
}
