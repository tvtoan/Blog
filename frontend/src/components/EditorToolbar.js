import React from "react";

const EditorToolbar = ({ editor }) => {
  if (!editor) return null;

  const fontSizes = [12, 16, 20, 24];

  // Lấy font size hiện tại từ trạng thái editor
  const currentFontSize = editor.isActive("fontSize")
    ? editor.getAttributes("fontSize").size || ""
    : "";

  return (
    <div className="flex flex-wrap gap-2 border p-3 mb-2 rounded-lg bg-gray-100 shadow-sm">
      {/* Bold */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded-md transition-colors ${
          editor.isActive("bold")
            ? "bg-gray-300 text-gray-800"
            : "bg-white text-gray-600 hover:bg-gray-200"
        }`}
        title="In đậm"
      >
        <b>B</b>
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded-md transition-colors ${
          editor.isActive("italic")
            ? "bg-gray-300 text-gray-800"
            : "bg-white text-gray-600 hover:bg-gray-200"
        }`}
        title="In nghiêng"
      >
        <i>I</i>
      </button>

      {/* Font Size Dropdown */}
      <select
        value={currentFontSize}
        onChange={(e) => {
          const size = e.target.value;
          if (size) {
            editor.chain().focus().setFontSize(size).run();
          } else {
            editor.chain().focus().unsetFontSize().run();
          }
        }}
        className="px-3 py-1 rounded-md bg-white text-gray-600 hover:bg-gray-200 transition-colors"
        title="Chọn kích thước chữ"
      >
        <option value="">Kích thước chữ</option>
        {fontSizes.map((size) => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>

      {/* Image */}
      <button
        type="button"
        onClick={() => {
          const url = prompt("Nhập URL của ảnh:");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
        className="px-3 py-1 rounded-md bg-white text-gray-600 hover:bg-gray-200 transition-colors"
        title="Chèn ảnh"
      >
        🖼️
      </button>
    </div>
  );
};

export default EditorToolbar;
