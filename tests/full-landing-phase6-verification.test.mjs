import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const srcBase = new URL('../src/', import.meta.url);

const readSrc = (relativePath) => readFileSync(new URL(relativePath, srcBase), 'utf8');

const walkFiles = [
	'components/ui/Navbar.astro',
	'components/ui/Footer.astro',
	'layouts/Layout.astro',
	'pages/index.astro',
	'pages/features.astro',
	'pages/docs.astro',
	'pages/how-it-works.astro',
	'pages/demo.astro',
];

test('phase 6.1: prohibited brand terms are absent in src', () => {
	const forbidden = /\b(OpenCode|Claude|OpenAI|Anthropic)\b/i;

	for (const file of walkFiles) {
		const source = readSrc(file);
		assert.equal(forbidden.test(source), false, `Forbidden brand found in ${file}`);
	}
});

test('phase 6.2: navigation links remain internal-only', () => {
	const astroFiles = [
		'components/ui/Navbar.astro',
		'components/ui/Footer.astro',
		'pages/index.astro',
		'pages/features.astro',
		'pages/docs.astro',
		'pages/how-it-works.astro',
		'pages/demo.astro',
	];

	const internal = (href) => href.startsWith('/') || href.startsWith('#');
	const allowedCommunityExternal = new Set([
		'https://github.com/Gentleman-Programming/gentle-ai',
		'https://discord.gg/gentlemanprogramming',
	]);

	for (const file of astroFiles) {
		const source = readSrc(file);

		for (const match of source.matchAll(/<a\b[^>]*\bhref\s*=\s*"([^"]+)"/g)) {
			const href = match[1];
			const isAllowedExternal = file === 'components/ui/Footer.astro' && allowedCommunityExternal.has(href);
			assert.equal(internal(href) || isAllowedExternal, true, `Non-approved href in ${file}: ${href}`);
		}

		for (const match of source.matchAll(/href:\s*'([^']+)'/g)) {
			const href = match[1];
			const isAllowedExternal = file === 'components/ui/Footer.astro' && allowedCommunityExternal.has(href);
			assert.equal(internal(href) || isAllowedExternal, true, `Non-approved data href in ${file}: ${href}`);
		}
	}
});

test('phase 6.3: shared shell is wired across all pages without ClientRouter', () => {
	const layoutSource = readSrc('layouts/Layout.astro');
	assert.doesNotMatch(layoutSource, /import\s+\{\s*ClientRouter\s*\}\s+from\s+'astro:transitions'/);
	assert.doesNotMatch(layoutSource, /<ClientRouter\s*\/>/);

	const routes = ['index', 'features', 'docs', 'how-it-works', 'demo'];

	for (const route of routes) {
		const pageSource = readSrc(`pages/${route}.astro`);
		assert.match(pageSource, /<Layout\b/, `Missing Layout on ${route}`);
		assert.match(pageSource, /<Navbar\b/, `Missing Navbar on ${route}`);
		assert.match(pageSource, /<Footer\b/, `Missing Footer on ${route}`);
	}
});

test('phase 6.4: configurator route is fully removed from app shell', () => {
	const navbarSource = readSrc('components/ui/Navbar.astro');
	const footerSource = readSrc('components/ui/Footer.astro');

	assert.doesNotMatch(navbarSource, /href:\s*'\/configurator'/);
	assert.doesNotMatch(footerSource, /\/configurator/);
	assert.match(footerSource, /https:\/\/github\.com\/Gentleman-Programming\/gentle-ai/);
	assert.match(footerSource, /https:\/\/discord\.gg\/gentlemanprogramming/);
});
