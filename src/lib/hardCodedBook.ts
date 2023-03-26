import { Chapter, Paragraph, Section } from './TextBlock';

const c1 = new Chapter('Chapter 1', 'This is the first chapter');
const s1 = new Section('Section 1', 'This is the first section');
const p1 = new Paragraph(
	'Quantum computers are a new type of computer that use the principles of quantum mechanics to perform calculations. Unlike classical computers, which use bits to represent information as either 0 or 1, quantum computers use qubits, which can be in a state of 0, 1, or both at the same time. This allows quantum computers to perform certain types of calculations much faster than classical computers, particularly in the areas of cryptography and optimization.'
);
const p2 = new Paragraph(
	'Quantum computers are still in the early stages of development, but they have the potential to revolutionize many fields. For example, they could be used to simulate complex chemical reactions, which could lead to the development of new drugs and materials. They could also be used to optimize complex systems, such as transportation networks or financial portfolios. However, there are still many technical challenges that need to be overcome before quantum computers can be widely used, such as improving the stability of qubits and developing error correction techniques.'
);
const p3 = new Paragraph(
	'Despite the challenges, many companies and governments are investing in quantum computing research. In the coming years, we can expect to see significant progress in this field, with the development of more powerful quantum computers and the exploration of new applications. As quantum computers become more advanced, they will likely have a major impact on many aspects of our lives, from the way we communicate and do business to the way we understand the world around us.'
);

s1.addParagraph(p1);
s1.addParagraph(p2);
s1.addParagraph(p3);
c1.addSection(s1);
c1.addSection(s1.clone());

const c2 = c1.clone();
c2.title = 'Chapter 2';

export default [c1, c2];
