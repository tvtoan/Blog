import { Mark, mergeAttributes } from "@tiptap/core";

export const FontSize = Mark.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
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
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ chain, state }) => {
          const { from, to } = state.selection;
          // Nếu không có vùng chọn, kích hoạt mark cho văn bản mới
          if (from === to) {
            return chain().setMark(this.name, { size: size.toString() }).run();
          }
          // Nếu có vùng chọn, áp dụng mark cho vùng chọn
          return chain().setMark(this.name, { size: size.toString() }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().unsetMark(this.name).run();
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      // Có thể thêm phím tắt để xóa font size nếu cần
      "Mod-Shift-0": () => this.editor.commands.unsetFontSize(),
    };
  },
});
