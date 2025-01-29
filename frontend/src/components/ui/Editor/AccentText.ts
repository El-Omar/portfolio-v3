import { Mark, mergeAttributes } from "@tiptap/core";
import type { CommandProps } from "@tiptap/core";

export const AccentText = Mark.create({
  name: "accent",

  addOptions() {
    return {
      HTMLAttributes: {
        class: "font-baskerville text-cool-red rtl:font-rakkas",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (element) => {
          const el = element as HTMLElement;
          return el.classList.contains("font-baskerville") ||
            el.classList.contains("font-rakkas")
            ? {}
            : false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  // @ts-expect-error false negative
  addCommands() {
    return {
      toggleAccent:
        () =>
        ({ commands }: CommandProps) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});
