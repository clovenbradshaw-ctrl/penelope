import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { materializeOverview, verifyMaterialization } from '../organs/generation/overview.mjs';
import { weave } from '../organs/generation/api.mjs';
const recipe = () => ({ sources: [{ id: 's', title: '</script><script>evil()</script>', text: 'é🙂 Tenants are affected.\n<script>evil()</script>', coverage: 'complete', space: 'received-text', limitations: 'Text only; original media not mapped', giver: null }], frame: { question: 'Who speaks?', viewpoint: 'Tenant consequences', owner: 'Researcher', experiencer: 'Researcher', selection: 'All nonempty lines', query: '' }, expectations: [{ expected: 'Tenant testimony', basis: 'Researcher question', owner: 'Researcher', standing: 'owned', query: 'I am a tenant', next: 'Seek direct testimony' }] });
test('portable export contains full evidence, gaps, reverse links and safe embedded record', async () => {
  const p = await materializeOverview(recipe());
  assert.equal((await verifyMaterialization(p)).ok, true);
  assert.ok(p.html.includes('data-overview-source="s"')); assert.ok(p.html.includes('No literal match'));
  assert.ok(p.html.includes('Select text')); assert.ok(p.html.includes('Depends on:'));
  assert.ok(!p.html.includes('<script>evil()</script>'));
  const data = p.html.split('<script type="application/json" id="overview-data">')[1].split('</script>')[0];
  assert.deepEqual(JSON.parse(data), p.overview);
});
test('materialized text, envelope hash and source changes cannot masquerade as verified', async () => {
  const p = await materializeOverview(recipe());
  assert.equal((await verifyMaterialization({ ...p, html: p.html.replace('Who speaks?', 'All settled') })).ok, false);
  assert.equal((await verifyMaterialization({ ...p, htmlHash: 'forged' })).ok, false);
  assert.equal((await verifyMaterialization(p, [{ ...recipe().sources[0], text: 'changed' }])).ok, false);
});
test('public Penelope lifecycle runs actual ethos, logos and pathos with no model or network', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'overview-'));
  const before = globalThis.fetch; let calls = 0;
  globalThis.fetch = () => { calls++; throw new Error('network tripwire'); };
  try {
    const r = await weave({ intent: 'Create an evidence overview of this selected material', artifact: 'overview', context: { overview: recipe() }, noModel: true, output: dir });
    assert.equal(r.ok, true); assert.equal(r.model, null); assert.equal(calls, 0);
    assert.equal(r.evidence.outcomes[0].stage, 'field');
    const archons = r.verification.verdict.archons;
    assert.equal(archons.ethos.cleared, true); assert.deepEqual(archons.logos.cycles, []);
    assert.equal(archons.pathos.read.forWhom.who, 'Researcher');
    assert.equal(fs.readFileSync(r.materialization.widget, 'utf8').includes('negative-space'), true);
  } finally { globalThis.fetch = before; fs.rmSync(dir, { recursive: true, force: true }); }
});
test('missing declared experiencer stops at intake before materialization', async () => {
  const i = recipe(); delete i.frame.experiencer;
  await assert.rejects(materializeOverview(i), /experiencer/);
});
