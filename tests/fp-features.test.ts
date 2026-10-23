import {test} from 'node:test';
import assert from 'node:assert/strict';
import {filterRecords, filterTasks, exportRecords, allocationBalance} from '../src/lib/fp-features';
test('fp search/filter preserves false/0/empty',()=>{const rows=[{title:'Alpha',status:'Draft',done:false,amount:0,note:''},{title:'Beta',status:'Approved',done:true,amount:5,note:'x'}];assert.equal(filterRecords(rows,{q:'alpha'}).length,1);assert.equal(filterRecords(rows,{status:'Approved'}).length,1);assert.equal(filterTasks([{title:'Call',status:'OPEN',priority:'HIGH'}],{q:'call',status:'OPEN'}).length,1);});
test('fp export csv/json',()=>{assert.ok(exportRecords([{a:0,b:false,c:''}],'csv').body.includes('0,false'));assert.equal(JSON.parse(exportRecords([{a:0}],'json').body)[0].a,0);assert.throws(()=>exportRecords([],'xml'));});
test('fp fallback labelled aiGenerated:false offline',()=>{delete process.env.OPENROUTER_API_KEY; delete process.env.OPENAI_API_KEY; const r=allocationBalance([{status:'Draft',done:false,allocationUnits:0}]); assert.equal(r.aiGenerated,false); assert.equal(r.metrics.totalPrimary,0); assert.equal(r.metrics.doneFalse,1); assert.ok(r.label.includes('Deterministic fallback'));});
