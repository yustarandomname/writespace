<script lang="ts">
	import MenuBar from '../MenuBar.svelte';

	let title = 'new page';

	class TextBlock {
		id: string;
		title: string;
		content: string;

		constructor(id: string, title: string, content: string) {
			this.id = id;
			this.title = title;
			this.content = content;
		}
	}

	class Paragraph extends TextBlock {
		constructor(title: string, content: string) {
			const id = Math.random().toString(36).slice(2, 9);
			super(id, title, content);
		}
	}

	class Section extends TextBlock {
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
	}

	class Chapter extends TextBlock {
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
	}

	let page: Chapter[] = [];
</script>

<MenuBar />

<div class="flex">
	<div class="overview" />

	<div class="content" />
</div>
