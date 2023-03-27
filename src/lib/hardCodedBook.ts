import { Heading, Paragraph } from '$lib/TextBlock';

const introductionPar = new Paragraph(
	'Human-computer interaction (HCI) is a vital area of study that focuses on the design, evaluation, and implementation of interactive computing systems for human use. The importance of HCI lies in its ability to improve the usability, accessibility, and overall user experience of computer systems and applications. As technology continues to advance and become more integrated into our daily lives, it is crucial to ensure that these systems are designed with the user in mind. Effective HCI can lead to increased productivity, efficiency, and satisfaction for users, while also reducing errors and frustration. Ultimately, the success of any computing system depends on its ability to meet the needs and expectations of its users, making HCI an essential field for creating successful and user-friendly technology.'
);

const chapter1 = new Heading('Introduction to Human-Computer Interaction', 0);
chapter1.addParagraph('This is a paragraph');
const chapter1s1 = chapter1.addHeading('this is heading 1.1');
chapter1s1.addParagraph('This is a paragraph in 1.1');
const chapter1s1s1 = chapter1s1.addHeading('this is heading 1.1.1');
chapter1s1s1.addParagraph('This is a paragraph in 1.1.1');
chapter1s1s1.addParagraph('This is another paragraph in 1.1.1');

const chapter2 = new Heading('Why Human-Computer Interaction is good', 0);
chapter2.addParagraph('This is a introduction paragraph about why HCI is good');

const chapter3 = new Heading('Why Human-Computer Interaction is bad', 0);
chapter3.addParagraph('This is a introduction paragraph about why HCI is not good');

export default [introductionPar, chapter1, chapter2, chapter3];
