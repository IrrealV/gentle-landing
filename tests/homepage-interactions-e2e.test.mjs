import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const codeTabsSource = readFileSync(new URL('../src/components/CodeTabs.astro', import.meta.url), 'utf8');
const getStartedSource = readFileSync(new URL('../src/components/GetStarted.astro', import.meta.url), 'utf8');

test('get started tabs include interaction hooks for switching', () => {
	assert.match(codeTabsSource, /addEventListener\('click'/, 'expected click handler for tab activation');
	assert.match(codeTabsSource, /addEventListener\('keydown'/, 'expected keyboard handler for tab activation');
	assert.match(codeTabsSource, /aria-selected/, 'expected ARIA selected state management');
	assert.match(codeTabsSource, /role="tabpanel"/, 'expected tabpanel semantics for accessible switching');
});

test('get started section provides responsive mobile-to-desktop reflow classes', () => {
	assert.match(getStartedSource, /grid-cols-1/, 'expected single-column mobile baseline');
	assert.match(getStartedSource, /lg:grid-cols-5/, 'expected large-screen 5-column layout reflow');
	assert.match(getStartedSource, /lg:col-span-2/, 'expected responsive left panel span');
	assert.match(getStartedSource, /lg:col-span-3/, 'expected responsive right panel span');
});
