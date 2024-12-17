/**
 * Creates a slug out of the passed string
 * @example slugify("My Very cool project") => "my-very-cool-project"
 * @param text Text you want to create a slug from
 * @returns the slugified text
 */
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");