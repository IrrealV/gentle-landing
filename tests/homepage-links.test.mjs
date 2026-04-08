import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const base = new URL('../src/', import.meta.url);
const files = [
	'pages/index.astro',
	'components/Navbar.astro',
	'components/Hero.astro',
	'components/Footer.astro',
];

const internalHref = (href) => href.startsWith('/') || href.startsWith('#');

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
		assert.equal(
			internalHref(href),
			true,
			`Found non-internal href "${href}". Expected href to start with / or #.`,
		);
	}
});
