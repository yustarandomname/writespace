import { redirect } from '@sveltejs/kit';

export const load = () => {
	const versions = ['a']; // TODO: add more versions

	// Get random version
	const version = versions[Math.floor(Math.random() * versions.length)];

	throw redirect(307, '/' + version + '/');
};
