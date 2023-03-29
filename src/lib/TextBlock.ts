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
	color: string;
	parent?: Heading;
}

export class Heading implements TextBlock {
	id: string;
	blockType = 'heading';
	children: TextBlock[] = [];
	parent?: Heading;

	constructor(public text: string, public level: number) {
		this.id = generateId(text);
	}

	default() {
		return new Heading('', 0);
	}

	get scope() {
		if (this.level == 0) return 'Title';
		else if (this.level == 1) return 'Chapter';
		else if (this.level == 2) return 'Section';
		else if (this.level == 3) return 'Sub-section';
	}

	/**
	 * @returns rank of heading in parent scope
	 */
	get numbering(): string {
		if (this.level == 0 || !this.parent) return '';
		const parentChildrenHeadings = this.parent.children.filter((c) => isHeading(c));

		const parentNumbering = this.parent.numbering;

		const childNumbering = (
			parentChildrenHeadings.findIndex((child) => child.id === this.id) + 1
		).toString();

		if (parentNumbering) return `${parentNumbering}.${childNumbering}`;
		else return childNumbering;
	}

	get childScope() {
		if (this.level == 0) return 'Chapter';
		else if (this.level == 1) return 'Section';
		else if (this.level == 2) return 'Sub-section';
	}

	get color() {
		if (this.level == 0) return '#e0f2fe';
		else if (this.level == 1) return '#38bdf8';
		else if (this.level == 2) return '#4ade80';
		else if (this.level == 3) return '#fb923c';
		return '#f87171';
	}

	/**
	 * @param text - user recognisable title
	 * @returns new Heading with level + 1
	 * @throws Error if level is 3 or higher
	 */
	addHeading(text: string) {
		if (this.level >= 3) {
			throw new Error('Cannot add heading to a heading with level 3 or higher');
		}

		const heading = new Heading(text, this.level + 1);
		heading.parent = this;
		this.children = [...this.children, heading];
		return heading;
	}

	addHeadingBefore(text: string, before: Block) {
		if (this.level >= 3) {
			throw new Error('Cannot add heading to a heading with level 3 or higher');
		}

		const heading = new Heading(text, this.level + 1);
		heading.parent = this;
		const index = this.children.findIndex((child) => child.id === before.id);
		if (index < 0) throw new Error('Block not found');

		this.children = [...this.children.slice(0, index), heading, ...this.children.slice(index)];
		return heading;
	}

	addParagraph(text: string) {
		const paragraph = new Paragraph(text);
		paragraph.parent = this;
		this.children = [...this.children, paragraph];

		return paragraph;
	}

	addParagraphBefore(text: string, before: Block) {
		const paragraph = new Paragraph(text);
		paragraph.parent = this;
		const index = this.children.findIndex((child) => child.id === before.id); // find index of before
		if (index < 0) throw new Error('Block not found');

		this.children = [...this.children.slice(0, index), paragraph, ...this.children.slice(index)];

		return paragraph;
	}
}

export class Paragraph implements TextBlock {
	id: string;
	blockType = 'paragraph';
	parent?: Heading;

	constructor(public text: string) {
		this.id = generateId(text);
	}

	static default() {
		return new Paragraph('');
	}

	get color() {
		return '#fde047';
	}
}

export function isHeading(block: Block): block is Heading {
	return block.blockType === 'heading';
}

export type Block = Heading | Paragraph;
