import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const base = new URL('../src/', import.meta.url);
const files = [
	'pages/index.astro',
	'components/ui/Navbar.astro',
	'components/ui/Hero.astro',
	'components/ui/Footer.astro',
];

const internalHref = (href) => href.startsWith('/') || href.startsWith('#');
const allowedExternal = new Set([
	'https://github.com/Gentleman-Programming/gentle-ai',
	'https://discord.gg/gentlemanprogramming',
]);

const collectHrefs = (content) => {
	const hrefs = [];

	const staticHrefRegex = /href\s*=\s*"([^"]+)"/g;
	for (const match of content.matchAll(staticHrefRegex)) hrefs.push(match[1]);

	const objectHrefRegex = /href:\s*'([^']+)'/g;
	for (const match of content.matchAll(objectHrefRegex)) hrefs.push(match[1]);

	return hrefs;
};

test('homepage links only target internal routes or anchors', () => {
	const hrefs = files.flatMap((file) => {
		const source = readFileSync(new URL(file, base), 'utf8');
		return collectHrefs(source);
	});

	assert.ok(hrefs.length > 0, 'expected to discover homepage links');

	for (const href of hrefs) {
		const isAllowedExternal = allowedExternal.has(href);
		assert.equal(
			internalHref(href) || isAllowedExternal,
			true,
			`Found unexpected href "${href}". Expected internal route/anchor or approved community URL.`,
		);
	}
});
