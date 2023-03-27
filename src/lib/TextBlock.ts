/**
 * @param title user recognisable title
 * @returns {random chars}*8 + title in lowercase with spaces replaced by dashes
 */
function generateId(title: string) {
	return Math.random().toString(36).slice(2, 9) + title.toLowerCase().replace(/ /g, '-');
}

interface TextBlock {
	id: string;
	blockType: string;
	text: string;
}

export class Heading implements TextBlock {
	id: string;
	blockType = 'heading';
	children: TextBlock[] = [];

	constructor(public text: string, public level: number) {
		this.id = generateId(text);
	}

	addHeading(text: string) {
		const heading = new Heading(text, this.level + 1);
		this.children.push(heading);
		return heading;
	}

	addParagraph(text: string) {
		const paragraph = new Paragraph(text);
		this.children.push(paragraph);
		return paragraph;
	}
}

export class Paragraph implements TextBlock {
	id: string;
	blockType = 'paragraph';

	constructor(public text: string) {
		this.id = generateId(text);
	}
}

export function isHeading(block: Block): block is Heading {
	return block.blockType === 'heading';
}

export type Block = Heading | Paragraph;
