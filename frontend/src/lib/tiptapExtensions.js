// lib/tiptapExtensions.js
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import FontSize from "tiptap-extension-font-size"; // 👈 bạn cần cài lib này: npm i tiptap-extension-font-size

export const extensions = [
  StarterKit,
  Image,
  Link,
  Underline,
  TextStyle,
  FontSize.configure({
    types: ["textStyle"],
  }),
];
