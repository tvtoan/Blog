import { Mark, mergeAttributes } from "@tiptap/core";

const FontSize = Mark.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"], // Đảm bảo tương thích với TextStyle
    };
  },

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: (element) =>
          element.style.fontSize?.replace("px", "") || null,
        renderHTML: (attributes) => {
          if (!attributes.size) return {};
          return { style: `font-size: ${attributes.size}px` };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (element) => {
          if (element.style.fontSize) {
            return { size: element.style.fontSize.replace("px", "") };
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0]; // Sửa lại: 0 không hợp lệ, thay bằng []
  },

  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ commands }) => {
          return commands.setMark(this.name, { size: size.toString() });
        },
      unsetFontSize:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-0": () => this.editor.commands.unsetFontSize(),
    };
  },
});

export default FontSize;
