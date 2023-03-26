class TextBlock {
	id: string;
	title: string;
	content: string;
	type = 'textblock';

	constructor(id: string, title: string, content: string) {
		this.id = id;
		this.title = title;
		this.content = content;
	}

	get children(): TextBlocks {
		return [];
	}
}

export type TextBlocks = TextBlock[];

export class Paragraph extends TextBlock {
	type = 'paragraph';

	constructor(content: string) {
		const id = Math.random().toString(36).slice(2, 9);
		super(id, '', content);
	}

	get children(): TextBlocks {
		return [];
	}

	clone() {
		return new Paragraph(this.content);
	}
}

export class Section extends TextBlock {
	type = 'section';
	paragraphs: Paragraph[] = [];

	constructor(title: string, content: string) {
		const id = Math.random().toString(36).slice(2, 9);
		super(id, title, content);
	}

	addParagraph(paragraph: Paragraph) {
		this.paragraphs.push(paragraph);
	}

	deleteParagraph(paragraph: Paragraph) {
		this.paragraphs = this.paragraphs.filter((p) => p !== paragraph);
	}

	get children(): TextBlocks {
		return this.paragraphs;
	}

	clone() {
		const clone = new Section(this.title, this.content);
		clone.paragraphs = this.paragraphs.map((p) => p.clone());
		return clone;
	}
}

export class Chapter extends TextBlock {
	type = 'chapter';
	sections: Section[] = [];

	constructor(title: string, content: string) {
		const id = Math.random().toString(36).slice(2, 9);
		super(id, title, content);
	}

	addSection(section: Section) {
		this.sections.push(section);
	}

	deleteSection(section: Section) {
		this.sections = this.sections.filter((s) => s !== section);
	}

	get children(): TextBlocks {
		return this.sections;
	}

	clone() {
		const clone = new Chapter(this.title, this.content);
		clone.sections = this.sections.map((s) => s.clone());
		return clone;
	}
}
