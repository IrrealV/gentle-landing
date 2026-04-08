import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const indexSource = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

const expectedOrder = ['Navbar', 'Hero', 'FeaturesGrid', 'GetStarted', 'HowItWorks', 'Stats', 'Footer'];

test('homepage composes canonical seven sections in order', () => {
	let previousIndex = -1;

	for (const component of expectedOrder) {
		const foundAt = indexSource.indexOf(`<${component}`);
		assert.notEqual(foundAt, -1, `Missing section component: ${component}`);
		assert.ok(foundAt > previousIndex, `${component} is out of canonical order`);
		previousIndex = foundAt;
	}
});
