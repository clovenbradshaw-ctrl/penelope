import test from 'node:test';
import assert from 'node:assert/strict';
import {ProvenanceLedger,foldProvenance} from './provenance.mjs';
test('unknown viewpoint stays unknown rather than manufacturing neutrality',()=>{
  const l=new ProvenanceLedger(); l.event({stage:'read'});
  assert.equal(l.eot().position,null); assert.equal(l.eot().events[0].position,null);
});
test('fold changes viewpoint without rewriting prior witnesses',()=>{
  const p={giver:'Elena',question:'Who controls procurement?',sources:['contract']};
  const l=new ProvenanceLedger({position:p}); l.event({stage:'read'});
  p.question='Who benefits?';
  const before=l.eot(), next=foldProvenance(before,{position:p}); next.event({stage:'arrange'});
  assert.equal(next.eot().events[0].position.question,'Who controls procurement?');
  assert.equal(next.eot().events.at(-1).position.question,'Who benefits?');
  assert.equal(before.events.length,1);
});
test('different grounds and viewpoints remain separate events',()=>{
  const l=new ProvenanceLedger();
  const a=l.event({stage:'read',detail:{ground:'A'},position:{giver:'A'}});
  const b=l.event({stage:'read',detail:{ground:'B'},position:{giver:'B'}});
  assert.notEqual(a,b); assert.equal(l.events.length,2);
  assert.equal(l.event({stage:'read',detail:{ground:'A'},position:{giver:'A'}}),a);
});
test('weave carries the caller position through the real no-model pipeline',async()=>{
  const {weave}=await import('./api.mjs');
  const fs=await import('node:fs'), os=await import('node:os'), path=await import('node:path');
  const out=fs.mkdtempSync(path.join(os.tmpdir(),'weave-position-'));
  try {
    const position={giver:'Arun',question:'What changes across cities?',sources:['municipal-plans'],frame:'climate'};
    const adapter={kind:'position-test',readUnits:()=>[{name:'a',spec:'held'}],autofill:()=>({code:'held bytes',address:'field:a'}),snip:v=>v,probeUnit:()=>({ok:true}),testUnits:()=>({ok:true,reason:'held'}),toDocument:()=>'<html></html>'};
    const r=await weave({intent:'Arrange held material',artifact:adapter,noModel:true,context:{position},output:out});
    assert.deepEqual(r.evidence.provenance.position,position);
    assert.ok(r.evidence.provenance.events.length);
    assert.ok(r.evidence.provenance.events.every(e=>e.position.question===position.question));
  } finally {fs.rmSync(out,{recursive:true,force:true});}
});
test('fork and returned ledger snapshots cannot rewrite previous event positions',()=>{
  const l=new ProvenanceLedger({position:{giver:'Mara'}});l.event({stage:'read'});
  const parent=l.eot(), next=foldProvenance(parent);
  next.events[0].position.giver='Someone else';
  assert.equal(parent.events[0].position.giver,'Mara');
  parent.events[0].position.giver='Another edit';
  assert.equal(l.eot().events[0].position.giver,'Mara');
});
