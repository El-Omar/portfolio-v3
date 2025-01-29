import { mergeAttributes, Node } from "@tiptap/core";

export const PullQuote = Node.create({
  name: "pullquote",
  group: "block",
  content: "inline*",
  defining: true,

  addAttributes() {
    return {
      class: {
        default:
          "border-y border-neutral-200 py-8 text-center font-baskerville border-l-0",
      },
      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align") || "center",
        renderHTML: (attributes) => {
          return { "data-align": attributes.align };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: "blockquote[data-pull-quote]" }];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "blockquote",
      mergeAttributes(
        {
          "data-pull-quote": "",
          class: `pull-quote align-${node.attrs.align}`,
        },
        HTMLAttributes,
      ),
      0,
    ];
  },

  // @ts-expect-error false negative
  addCommands() {
    return {
      togglePullquote:
        (align = "center") =>
        // @ts-expect-error false negative
        ({ state, commands }) => {
          const { selection } = state;
          const isActive = selection.$from.node().type.name === "pullquote";

          console.log(isActive, this.name, state);

          if (isActive) {
            return commands.lift();
          } else {
            commands.insertContent({
              type: this.name,
              attrs: { align },
            });
          }
        },
    };
  },
});
