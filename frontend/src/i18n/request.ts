import { getRequestConfig } from "next-intl/server";
import { Locale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the requested locale
  let locale = await requestLocale;

  // Validate and fallback to default if needed
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Load the appropriate messages file
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
