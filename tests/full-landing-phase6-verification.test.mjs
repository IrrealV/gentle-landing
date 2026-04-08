import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const srcBase = new URL('../src/', import.meta.url);

const readSrc = (relativePath) => readFileSync(new URL(relativePath, srcBase), 'utf8');

const walkFiles = [
	'components/Navbar.astro',
	'components/Footer.astro',
	'layouts/Layout.astro',
	'pages/index.astro',
	'pages/features.astro',
	'pages/docs.astro',
	'pages/how-it-works.astro',
	'pages/configurator.astro',
	'data/configuratorData.ts',
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
		'components/Navbar.astro',
		'components/Footer.astro',
		'pages/index.astro',
		'pages/features.astro',
		'pages/docs.astro',
		'pages/how-it-works.astro',
		'pages/configurator.astro',
	];

	const internal = (href) => href.startsWith('/') || href.startsWith('#');

	for (const file of astroFiles) {
		const source = readSrc(file);

		for (const match of source.matchAll(/<a\b[^>]*\bhref\s*=\s*"([^"]+)"/g)) {
			assert.equal(internal(match[1]), true, `Non-internal <a href> in ${file}: ${match[1]}`);
		}

		for (const match of source.matchAll(/href:\s*'([^']+)'/g)) {
			assert.equal(internal(match[1]), true, `Non-internal data href in ${file}: ${match[1]}`);
		}
	}
});

test('phase 6.3: shared shell and view transitions are wired across all pages', () => {
	const layoutSource = readSrc('layouts/Layout.astro');
	assert.match(layoutSource, /import\s+\{\s*ViewTransitions\s*\}\s+from\s+'astro:transitions'/);
	assert.match(layoutSource, /<ViewTransitions\s*\/>/);

	const routes = ['index', 'features', 'docs', 'how-it-works', 'configurator'];

	for (const route of routes) {
		const pageSource = readSrc(`pages/${route}.astro`);
		assert.match(pageSource, /<Layout\b/, `Missing Layout on ${route}`);
		assert.match(pageSource, /<Navbar\b/, `Missing Navbar on ${route}`);
		assert.match(pageSource, /<Footer\b/, `Missing Footer on ${route}`);
	}
});

test('phase 6.4: configurator has local interactive state with realistic fixtures', () => {
	const pageSource = readSrc('pages/configurator.astro');
	const dataSource = readSrc('data/configuratorData.ts');

	assert.match(pageSource, /data-memory-toggle=/);
	assert.match(pageSource, /addEventListener\('click'/);
	assert.match(pageSource, /data-preset-summary/);
	assert.match(pageSource, /syncPresetSummary/);

	assert.match(dataSource, /export const agentProfiles:\s*AgentProfile\[]\s*=\s*\[/);
	assert.match(dataSource, /export const skillProfiles:\s*SkillProfile\[]\s*=\s*\[/);
	assert.match(dataSource, /key:\s*'projectPersistence'/);
	assert.match(dataSource, /key:\s*'sessionPersistence'/);
	assert.match(dataSource, /export const configPresets:\s*ConfigPreset\[]\s*=\s*\[/);
});
