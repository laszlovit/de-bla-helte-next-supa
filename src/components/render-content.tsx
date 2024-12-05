import React from "react";

interface ContentItem {
	id: string;
	type: string;
	props: {
		textColor: string;
		backgroundColor: string;
		textAlignment: string;
		level?: number;
	};
	content: Array<{
		type: string;
		text: string;
		styles: Record<string, unknown>;
	}>;
	children: ContentItem[];
}

interface RenderContentProps {
	content: ContentItem[];
}

const RenderContent: React.FC<RenderContentProps> = ({ content }) => {
	return (
		<div className="prose">
			{content.map((item) => {
				switch (item.type) {
					case "heading":
						return React.createElement(
							`h${item.props.level || 1}`,
							{ key: item.id },
							item.content.map((textItem) => textItem.text).join(" "),
						);
					case "paragraph":
						return <p key={item.id}>{item.content.map((textItem) => textItem.text).join(" ")}</p>;
					default:
						return null;
				}
			})}
		</div>
	);
};

export default RenderContent;
