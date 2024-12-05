import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
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

  // Determine text direction based on locale
  const isRTL = locale === "ar";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div dir={isRTL ? "rtl" : "ltr"}>
        <Navigation />
        {children}
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
