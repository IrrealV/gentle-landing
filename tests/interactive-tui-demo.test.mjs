import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const srcBase = new URL('../src/', import.meta.url);

const readSrc = (relativePath) => readFileSync(new URL(relativePath, srcBase), 'utf8');

const demoPage = readSrc('pages/demo.astro');
const tui = readSrc('components/ui/InteractiveTUI.astro');
const navbar = readSrc('components/ui/Navbar.astro');
const footer = readSrc('components/ui/Footer.astro');

test('demo route composes shared shell and TUI host', () => {
	assert.match(demoPage, /<Layout/);
	assert.match(demoPage, /<Navbar currentPath="\/demo"/);
	assert.match(demoPage, /<InteractiveTUI/);
	assert.match(demoPage, /<Footer\s*\/>/);
});

test('interactive tui implements deterministic three-state FSM', () => {
	assert.match(tui, /phase: 'prompt'/);
	assert.match(tui, /state\.phase = 'menu'/);
	assert.match(tui, /state\.phase = 'detail'/);
	assert.match(tui, /function beginFlow/);
	assert.match(tui, /function renderDetail/);
});

test('interactive tui lifecycle uses IIFE and AbortController hooks', () => {
	assert.match(tui, /new AbortController\(\)/);
	assert.match(tui, /\(\(\) => \{/);
	assert.match(tui, /astro:page-load/);
	assert.match(tui, /astro:before-swap/);
	assert.match(tui, /astro:page-unload/);
	assert.match(tui, /\.abort\(\)/);
});

test('interactive tui remains keyboard-first with pointer parity and aria support', () => {
	assert.match(tui, /root\.addEventListener\('keydown'/);
	assert.match(tui, /event\.preventDefault\(\)/);
	assert.match(tui, /addEventListener\(\s*'click'/);
	assert.match(tui, /role="region"/);
	assert.match(tui, /aria-live="polite"/);
	assert.match(tui, /aria-label=/);
});

test('demo navigation remains internal-only in navbar and footer', () => {
	assert.match(navbar, /href:\s*'\/demo'/);
	assert.match(footer, /href:\s*'\/demo'/);
	const allowedCommunityExternal = new Set([
		'https://github.com/Gentleman-Programming/gentle-ai',
		'https://discord.gg/gentlemanprogramming',
	]);

	for (const source of [navbar, footer, demoPage]) {
		for (const match of source.matchAll(/href\s*=\s*"([^"]+)"/g)) {
			const href = match[1];
			const isInternal = href.startsWith('/') || href.startsWith('#');
			const isAllowedExternal = source === footer && allowedCommunityExternal.has(href);
			assert.equal(isInternal || isAllowedExternal, true, `Unexpected href found: ${href}`);
		}
		for (const match of source.matchAll(/href:\s*'([^']+)'/g)) {
			const href = match[1];
			const isInternal = href.startsWith('/') || href.startsWith('#');
			const isAllowedExternal = source === footer && allowedCommunityExternal.has(href);
			assert.equal(isInternal || isAllowedExternal, true, `Unexpected data href found: ${href}`);
		}
	}
});

test('interactive tui mirrors the real gentle-ai welcome options and workflow terms', () => {
	assert.match(tui, /Start installation/);
	assert.match(tui, /Upgrade tools/);
	assert.match(tui, /Sync configs/);
	assert.match(tui, /Upgrade \+ Sync/);
	assert.match(tui, /Configure models/);
	assert.match(tui, /Create your own Agent/);
	assert.match(tui, /Manage backups/);
	assert.match(tui, /AI Gentle Stack \$\{VERSION\}/);
	assert.match(tui, /gentle-ai/);
});

test('interactive tui no longer uses a generic shared pipeline object for every option', () => {
	assert.doesNotMatch(tui, /const PIPELINES = \{/);
	assert.match(tui, /renderInstallScreen/);
	assert.match(tui, /renderUpgradeScreen/);
	assert.match(tui, /renderSyncScreen/);
	assert.match(tui, /renderUpgradeSyncScreen/);
	assert.match(tui, /renderModelsScreen/);
	assert.match(tui, /renderBuilderScreen/);
	assert.match(tui, /renderBackupsScreen/);
});
