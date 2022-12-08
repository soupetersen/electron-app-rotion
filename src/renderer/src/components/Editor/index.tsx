import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export interface OnContentUpdatedArgs {
    title: string;
    content: string;
}

interface EditorProps {
    content: string;
    onContentUpdated: (args: OnContentUpdatedArgs) => void;
}

export function Editor({ content, onContentUpdated }: EditorProps) {
    const editor = useEditor({
        extensions: [
            Document.extend({
                content: "heading block*",
            }),
            StarterKit.configure({
                document: false,
            }),
            Highlight,
            Typography,
            Placeholder.configure({
                placeholder: "Untitled",
                emptyEditorClass:
                    "before:content-[attr(data-placeholder)] beforo:text-gray-500 before:h-0 before:float-left before:pointer-events-none",
            }),
        ],
        onUpdate: ({ editor }) => {
            const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/;
            const pasedContent = editor.getHTML().match(contentRegex)?.groups;

            const title = pasedContent?.title ?? "Untitled";
            const content = pasedContent?.content ?? "";

            onContentUpdated({ title, content });
        },
        content,
        autofocus: "end",
        editorProps: {
            attributes: {
                class: "focus:outline-none prose prose-invert prose-headings:mt-0",
            },
        },
    });
    return <EditorContent className="w-[65ch]" editor={editor} />;
}
