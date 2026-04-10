import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const srcBase = new URL('../src/', import.meta.url);

const readSrc = (relativePath) => readFileSync(new URL(relativePath, srcBase), 'utf8');

const layout = readSrc('layouts/Layout.astro');
const globalCss = readSrc('styles/global.css');
const tailwindConfig = readSrc('../tailwind.config.mjs');
const index = readSrc('pages/index.astro');
const features = readSrc('pages/features.astro');
const docs = readSrc('pages/docs.astro');
const howItWorks = readSrc('pages/how-it-works.astro');
const navbar = readSrc('components/ui/Navbar.astro');
const footer = readSrc('components/ui/Footer.astro');
const codeTabs = readSrc('components/ui/CodeTabs.astro');
const terminalWindow = readSrc('components/ui/TerminalWindow.astro');

test('design-tokens: consolidated token groups resolve across pages', () => {
	assert.match(globalCss, /--surface-container-lowest/);
	assert.match(globalCss, /--on-surface-variant/);
	assert.match(globalCss, /--primary-fixed/);
	assert.match(globalCss, /--secondary-container/);
	assert.match(globalCss, /--tertiary-container/);
	assert.match(globalCss, /--outline-variant/);
	assert.match(tailwindConfig, /window-control-red/);
	assert.match(tailwindConfig, /window-control-amber/);
	assert.match(tailwindConfig, /window-control-green/);
});

test('design-tokens: contrast hierarchy remains consistent', () => {
	assert.match(globalCss, /--surface-container-lowest/);
	assert.match(globalCss, /--surface-container-low/);
	assert.match(globalCss, /--surface-container-high/);
	assert.match(globalCss, /--on-surface/);
	assert.match(globalCss, /--on-surface-variant/);
});

test('design-tokens: typography roles remain deterministic', () => {
	assert.match(globalCss, /--font-mono/);
	assert.match(globalCss, /--font-sans/);
	assert.match(globalCss, /code,[\s\S]*@apply font-mono/);
	assert.match(globalCss, /p,[\s\S]*@apply font-sans/);
});

test('design-tokens: material symbols render across shared components', () => {
	assert.match(layout, /material-symbols-outlined-latin-400-normal/);
	assert.match(navbar, /material-symbols-outlined/);
	assert.match(codeTabs, /material-symbols-outlined/);
	assert.match(terminalWindow, /material-symbols-outlined/);
});

test('design-tokens: brutalist shape constraints are preserved', () => {
	assert.match(globalCss, /--radius-brutal/);
	assert.match(globalCss, /\.radius-brutal/);
	assert.match(tailwindConfig, /borderRadius:[\s\S]*brutal/);
});

test('design-tokens: hairline utilities are reusable cross-page', () => {
	assert.match(globalCss, /\.border-hairline/);
	assert.match(globalCss, /\.border-b-hairline/);
	assert.match(globalCss, /\.border-r-hairline/);
	assert.match(features, /border-hairline/);
});

test('landing-page: hero and sections keep updated stitch structure', () => {
	for (const component of ['<Navbar', '<Hero', '<FeaturesGrid', '<GetStarted', '<HowItWorks', '<Stats', '<Footer']) {
		assert.notEqual(index.indexOf(component), -1, `Missing landing section ${component}`);
	}
});

test('landing-page: interactions are restrained and utility-based', () => {
	assert.match(navbar, /transition-colors/);
	assert.match(footer, /transition-colors/);
	assert.match(codeTabs, /transition-colors/);
	assert.doesNotMatch(index, /animate-|parallax|particle/i);
});

test('landing-page: canonical section sequence appears once', () => {
	const ordered = ['<Navbar', '<Hero', '<FeaturesGrid', '<GetStarted', '<HowItWorks', '<Stats', '<Footer'];
	let last = -1;
	for (const token of ordered) {
		const current = index.indexOf(token);
		assert.ok(current > last, `${token} out of order`);
		last = current;
	}
});

test('landing-page: cross-page CTAs route internally', () => {
	assert.match(index, /ctaSecondaryHref="\/docs"/);
	assert.match(navbar, /href: '\/docs'/);
	assert.match(navbar, /href: '\/features'/);
	assert.match(navbar, /href: '\/demo'/);
});

test('landing-page: all primary navigation links are internal', () => {
	const allowedCommunityExternal = new Set([
		'https://github.com/Gentleman-Programming/gentle-ai',
		'https://discord.gg/gentlemanprogramming',
	]);
	const sources = [index, navbar, footer];
	for (const source of sources) {
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

test('landing-page: former external destinations map to internal placeholders', () => {
	assert.doesNotMatch(index, /https?:\/\//i);
	assert.doesNotMatch(navbar, /https?:\/\//i);
	assert.match(footer, /https:\/\/github\.com\/Gentleman-Programming\/gentle-ai/);
	assert.match(footer, /https:\/\/discord\.gg\/gentlemanprogramming/);
});

test('features-page: feature grid communicates capability groups', () => {
	assert.match(features, /const featureCards = \[/);
	assert.match(features, /title:/);
	assert.match(features, /summary:/);
	assert.match(features, /<BentoCard/);
});

test('features-page: architecture diagram remains readable at multiple widths', () => {
	assert.match(features, /Post-Install Architecture Diagram/);
	assert.match(features, /overflow-x-auto/);
	assert.match(features, /mono text-xs leading-relaxed/);
});

test('features-page: shared shell is present', () => {
	assert.match(features, /<Navbar/);
	assert.match(features, /<Footer/);
	assert.match(features, /<Layout/);
});

test('features-page: feature actions are internal-only', () => {
	for (const match of features.matchAll(/href:\s*'([^']+)'/g)) {
		assert.equal(match[1].startsWith('/') || match[1].startsWith('#'), true, `Non-internal feature href: ${match[1]}`);
	}
	for (const match of features.matchAll(/href\s*=\s*"([^"]+)"/g)) {
		assert.equal(match[1].startsWith('/') || match[1].startsWith('#'), true, `Non-internal feature link: ${match[1]}`);
	}
});

test('docs-page: sidebar and content regions render together', () => {
	assert.match(docs, /id="docs-sidebar"/);
	assert.match(docs, /id="docs-content"/);
	assert.match(docs, /id="sec-system-overview"/);
});

test('docs-page: sidebar actions stay internal', () => {
	for (const match of docs.matchAll(/href:\s*'([^']+)'/g)) {
		assert.equal(match[1].startsWith('/') || match[1].startsWith('#'), true, `Non-internal docs href: ${match[1]}`);
	}
});

test('docs-page: navbar and footer remain consistent', () => {
	assert.match(docs, /<Navbar currentPath="\/docs"/);
	assert.match(docs, /<Footer\s*\/>/);
});

test('docs-page: code content uses reusable primitives', () => {
	assert.match(docs, /<TerminalWindow/);
});

test('configurator-page: decommission removes page, data, and shell links', () => {
	assert.equal(existsSync(new URL('pages/configurator.astro', srcBase)), false);
	assert.equal(existsSync(new URL('data/configuratorData.ts', srcBase)), false);
	assert.doesNotMatch(navbar, /href: '\/configurator'/);
	assert.doesNotMatch(footer, /\/configurator/);
});

test('landing-page: footer community block exposes only github and discord', () => {
	assert.match(footer, /const community = \[/);
	assert.match(footer, /\{ label: 'GitHub', href: 'https:\/\/github\.com\/Gentleman-Programming\/gentle-ai' \}/);
	assert.match(footer, /\{ label: 'Discord', href: 'https:\/\/discord\.gg\/gentlemanprogramming' \}/);
	assert.doesNotMatch(footer, /Community Guide|Contribution Workflow|Configuration Center/);
	assert.match(codeTabs, /role="tablist"/);
	assert.match(codeTabs, /role="tabpanel"/);
});

test('routing: internal navigation relies on default full-page loads', () => {
	assert.doesNotMatch(layout, /<ClientRouter\s*\/>/);
	assert.match(navbar, /href: '\/docs'/);
	assert.match(navbar, /href: '\/features'/);
	assert.match(navbar, /href: '\/demo'/);
});

test('view-transitions: anchor-only navigation remains functional', () => {
	assert.match(docs, /data-section=/);
	assert.match(navbar, /href: '\/docs'/);
});

test('routing: navigation does not require ClientRouter or ViewTransition API', () => {
	assert.doesNotMatch(layout, /import \{ ClientRouter \} from 'astro:transitions'/);
	assert.doesNotMatch(layout, /if \(!document\.startViewTransition\) throw/);
	assert.match(navbar, /<a href="\//);
});

test('view-transitions: shared shell remains stable during transitions', () => {
	for (const page of [index, features, docs, howItWorks]) {
		assert.match(page, /<Layout/);
		assert.match(page, /<Navbar/);
		assert.match(page, /<Footer/);
	}
});
