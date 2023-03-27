/**
 * @param title user recognisable title
 * @returns [random chars]*8 + title in lowercase with spaces replaced by dashes
 */
function generateId(title: string) {
	return (
		Math.random().toString(36).slice(2, 9) +
		'-' +
		title.toLowerCase().replace(/ /g, '-').slice(0, 28)
	);
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

	/**
	 * @param text - user recognisable title
	 * @returns new Heading with level + 1
	 * @throws Error if level is 2 or higher
	 */
	addHeading(text: string) {
		if (this.level >= 2) {
			throw new Error('Cannot add heading to a heading with level 3 or higher');
		}

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
