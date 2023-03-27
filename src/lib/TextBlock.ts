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
