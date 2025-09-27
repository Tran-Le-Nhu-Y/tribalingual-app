import React from 'react';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

interface TextEditorProps {
	value?: string;
	onChange?: (html: string) => void;
	readOnly?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({
	value = '',
	onChange,
	readOnly = false,
}) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
		],
		content: value,
		editable: !readOnly,
		editorProps: {
			attributes: {
				style: 'text-align: left; min-height: 450px; ',
			},
		},
		onUpdate: ({ editor }) => {
			onChange?.(editor.getHTML());
		},
	});

	if (!editor) return null;

	return (
		<RichTextEditor editor={editor}>
			<RichTextEditor.Toolbar sticky stickyOffset={60}>
				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Bold />
					<RichTextEditor.Italic />
					<RichTextEditor.Underline />
					<RichTextEditor.Strikethrough />
					<RichTextEditor.ClearFormatting />
					<RichTextEditor.Highlight />
					<RichTextEditor.Code />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.H1 />
					<RichTextEditor.H2 />
					<RichTextEditor.H3 />
					<RichTextEditor.H4 />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Blockquote />
					<RichTextEditor.Hr />
					<RichTextEditor.BulletList />
					<RichTextEditor.OrderedList />
					<RichTextEditor.Subscript />
					<RichTextEditor.Superscript />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Link />
					<RichTextEditor.Unlink />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.AlignLeft />
					<RichTextEditor.AlignCenter />
					<RichTextEditor.AlignJustify />
					<RichTextEditor.AlignRight />
				</RichTextEditor.ControlsGroup>
			</RichTextEditor.Toolbar>

			<RichTextEditor.Content />
		</RichTextEditor>
	);
};

export default TextEditor;
