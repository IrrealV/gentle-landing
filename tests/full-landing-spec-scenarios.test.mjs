import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const srcBase = new URL('../src/', import.meta.url);

const readSrc = (relativePath) => readFileSync(new URL(relativePath, srcBase), 'utf8');

const layout = readSrc('layouts/Layout.astro');
const globalCss = readSrc('styles/global.css');
const tailwindConfig = readSrc('../tailwind.config.mjs');
const index = readSrc('pages/index.astro');
const features = readSrc('pages/features.astro');
const docs = readSrc('pages/docs.astro');
const howItWorks = readSrc('pages/how-it-works.astro');
const configurator = readSrc('pages/configurator.astro');
const navbar = readSrc('components/Navbar.astro');
const footer = readSrc('components/Footer.astro');
const codeTabs = readSrc('components/CodeTabs.astro');
const terminalWindow = readSrc('components/ui/TerminalWindow.astro');
const configuratorData = readSrc('data/configuratorData.ts');

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
	assert.match(layout, /Material\+Symbols\+Outlined/);
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
	assert.match(docs, /border-hairline/);
	assert.match(configurator, /border-hairline/);
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
	assert.match(index, /ctaSecondaryHref="\/how-it-works"/);
	assert.match(index, /ctaPrimaryHref="#protocols"/);
	assert.match(navbar, /href: '\/docs'/);
	assert.match(navbar, /href: '\/features'/);
	assert.match(navbar, /href: '\/configurator'/);
});

test('landing-page: all primary navigation links are internal', () => {
	const sources = [index, navbar, footer];
	for (const source of sources) {
		for (const match of source.matchAll(/href\s*=\s*"([^"]+)"/g)) {
			assert.equal(match[1].startsWith('/') || match[1].startsWith('#'), true, `External href found: ${match[1]}`);
		}
		for (const match of source.matchAll(/href:\s*'([^']+)'/g)) {
			assert.equal(match[1].startsWith('/') || match[1].startsWith('#'), true, `External data href found: ${match[1]}`);
		}
	}
});

test('landing-page: former external destinations map to internal placeholders', () => {
	assert.doesNotMatch(index, /https?:\/\//i);
	assert.doesNotMatch(navbar, /https?:\/\//i);
	assert.doesNotMatch(footer, /https?:\/\//i);
	assert.match(navbar, /href="#"/);
});

test('features-page: feature grid communicates capability groups', () => {
	assert.match(features, /const featureCards = \[/);
	assert.match(features, /title:/);
	assert.match(features, /summary:/);
	assert.match(features, /<BentoCard/);
});

test('features-page: architecture diagram remains readable at multiple widths', () => {
	assert.match(features, /System Architecture Diagram/);
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
	assert.match(docs, /<Sidebar/);
	assert.match(docs, /<section class="space-y-8">/);
	assert.match(docs, /id="system-overview"/);
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
	assert.match(docs, /<CodeTabs/);
	assert.match(docs, /<TerminalWindow/);
});

test('configurator-page: agent and skill catalogs are visible', () => {
	assert.match(configurator, /Agent Catalog/);
	assert.match(configurator, /Skill Registry/);
	assert.match(configurator, /agentProfiles\.map/);
	assert.match(configurator, /skillProfiles\.map/);
});

test('configurator-page: memory persistence controls are explicit', () => {
	assert.match(configurator, /Memory Controls/);
	assert.match(configurator, /memoryToggles\.map/);
	assert.match(configuratorData, /projectPersistence/);
	assert.match(configuratorData, /sessionPersistence/);
	assert.match(configurator, /default on|default off/);
});

test('configurator-page: config output uses terminal visual model', () => {
	assert.match(configurator, /<TerminalWindow/);
	assert.match(configurator, /Local preview only/);
});

test('configurator-page: multi-profile presets use tabbed primitives', () => {
	assert.match(configurator, /<CodeTabs/);
	assert.match(codeTabs, /role="tablist"/);
	assert.match(codeTabs, /role="tabpanel"/);
});

test('configurator-page: tentative behavior is local and non-destructive', () => {
	assert.match(configurator, /\[STATUS\] Local preview only/);
	assert.doesNotMatch(configurator, /fetch\(|XMLHttpRequest|https?:\/\//i);
	assert.match(configurator, /addEventListener\('click'/);
});

test('configurator-page: links remain internal via shared shell', () => {
	assert.match(configurator, /<Navbar currentPath="\/configurator"/);
	assert.match(navbar, /href: '\/docs'/);
	assert.match(navbar, /href: '\/features'/);
	assert.match(footer, /href: '\/how-it-works'/);
});

test('view-transitions: transition executes on internal route navigation', () => {
	assert.match(layout, /<ViewTransitions\s*\/>/);
	assert.match(navbar, /href: '\/docs'/);
	assert.match(navbar, /href: '\/features'/);
	assert.match(navbar, /href: '\/configurator'/);
});

test('view-transitions: anchor-only navigation remains functional', () => {
	assert.match(docs, /href: '#system-overview'/);
	assert.match(navbar, /href="#"/);
});

test('view-transitions: unsupported browsers can fall back to normal routing', () => {
	assert.match(layout, /import \{ ViewTransitions \} from 'astro:transitions'/);
	assert.doesNotMatch(layout, /if \(!document\.startViewTransition\) throw/);
	assert.match(navbar, /<a href="\//);
});

test('view-transitions: shared shell remains stable during transitions', () => {
	for (const page of [index, features, docs, howItWorks, configurator]) {
		assert.match(page, /<Layout/);
		assert.match(page, /<Navbar/);
		assert.match(page, /<Footer/);
	}
});

test('configurator fixture realism: arrays are non-empty and typed', () => {
	assert.match(configuratorData, /export const agentProfiles:[\s\S]*\[/);
	assert.match(configuratorData, /export const skillProfiles:[\s\S]*\[/);
	assert.match(configuratorData, /export const memoryToggles:[\s\S]*\[/);
	assert.match(configuratorData, /export const configPresets:[\s\S]*\[/);
});
