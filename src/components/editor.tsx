"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

import { useCreateBlockNote } from "@blocknote/react";

import { BlockNoteView, darkDefaultTheme, lightDefaultTheme, Theme } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";

interface EditorProps {
	onChange: () => void;
	initialContent?: string;
	editable?: boolean;
}

const lightTheme = {
	colors: {
		editor: {
			text: "#222222",
			background: "transparent",
		},
		menu: {
			text: "#09090b",
			background: "#ffffff",
		},
		tooltip: {
			text: "#09090b",
			background: "rgba(9, 9, 11, .05)",
		},
		hovered: {
			text: "#ffffff",
			background: "rgba(9, 9, 11, .05)",
		},
		selected: {
			text: "#ffffff",
			background: "rgba(9, 9, 11, .05)",
		},
		disabled: {
			text: "#9b0000",
			background: "#7d0000",
		},
		border: "rgb(9 9 11 / 0.1);",
		sideMenu: "#bababa",
		highlights: lightDefaultTheme.colors!.highlights,
	},
	borderRadius: 4,
} satisfies Theme;

const darkTheme = {
	...lightTheme,
	colors: {
		...lightTheme.colors,
		editor: {
			text: "#ffffff",
			background: "trasparent",
		},
		sideMenu: "#ffffff",
		menu: {
			background: "rgba(39, 39, 42)",
			text: "#ffffff",
		},
		tooltip: {
			text: "#fffff",
			background: "#71717a",
		},
		hovered: {
			background: "rgb(255 255 255 / 0.2)",
		},
		border: "rgb(255 255 255 / 0.1)",
		highlights: darkDefaultTheme.colors!.highlights,
	},
} satisfies Theme;

const customTheme = {
	light: lightTheme,
	dark: darkTheme,
};

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
	const editor: BlockNoteEditor = useCreateBlockNote({
		initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
	});
	return (
		<div className="px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] dark:text-white border rounded-lg border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20 bg-transparent dark:bg-white/5">
			<BlockNoteView editor={editor} editable={editable} theme={customTheme} onChange={onChange} />
		</div>
	);
};

export default Editor;
