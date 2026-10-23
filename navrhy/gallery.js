import {directions} from './directions.js';
import {projects} from './projects.js';
import {brandHero} from './hero.js';
const P=projects.map(p=>({...p,img:`captures/${p.id}.jpg`,host:new URL(p.url).hostname}));
const tag=t=>`<span class="eyebrow">${t}</span>`;
const shot=(p,cls)=>`<a class="shot ${cls}" href="${p.url}" target="_blank" rel="noopener" aria-label="Otvoriť ${p.name}"><div class="window-top"><span class="window-dots" aria-hidden="true">● ● ●</span><span class="window-title"><strong>${p.name}</strong><small>${p.host}</small></span><span aria-hidden="true">↗</span></div><img src="${p.img}" alt="Skutočné rozhranie: ${p.name}" width="1600" height="1000"></a>`;
document.querySelector('#gallery-hero').innerHTML=brandHero({shot,projects:P,tag,gallery:true});
document.querySelector('.study-grid').innerHTML=directions.map(d=>`<article class="study-card" id="direction-${d.id}"><a class="study-preview" href="concept.html?v=${d.id}" aria-label="Otvoriť návrh ${d.id}: ${d.name}"><img src="previews/${String(d.id).padStart(2,'0')}.jpg" width="1440" height="1050" alt="Návrh ${d.id}: ${d.name}" loading="eager"><span>Otvoriť návrh ${String(d.id).padStart(2,'0')} ↗</span></a><div class="study-card-caption"><span class="study-number">${String(d.id).padStart(2,'0')}</span><div><h2><a href="concept.html?v=${d.id}">${d.name} <span aria-hidden="true">↗</span></a></h2><p>${d.note}</p><button class="pick-button" type="button" data-pick="${d.id}" aria-pressed="false">Pridať do výberu +</button><a class="open-page" href="concept.html?v=${d.id}">Celá stránka ↗</a></div></div></article>`).join('');
document.querySelector('.study-jump').innerHTML=directions.map(d=>`<a href="#direction-${d.id}" aria-label="Prejsť na návrh ${d.id}">${String(d.id).padStart(2,'0')}</a>`).join('');
const valid=items=>items.map(Number).filter(n=>Number.isInteger(n)&&directions.some(d=>d.id===n));
const fromUrl=new URLSearchParams(location.search).get('vyber');let saved=[];
try{saved=JSON.parse(localStorage.getItem('stopa-design-picks-v1')||'[]');}catch{}
const selected=new Set(valid(fromUrl!==null?fromUrl.split(','):Array.isArray(saved)?saved:[]));
function render(){
 const ids=[...selected].sort((a,b)=>a-b);
 document.querySelectorAll('[data-pick]').forEach(b=>{const on=selected.has(Number(b.dataset.pick));b.setAttribute('aria-pressed',String(on));b.textContent=on?'Vo výbere ✓':'Pridať do výberu +';});
 document.querySelector('.selection-bar').hidden=ids.length===0;
 document.querySelector('#selection-summary').textContent=`Môj výber: ${ids.map(n=>String(n).padStart(2,'0')).join(', ')}`;
 document.querySelector('#copy-status').textContent='';document.querySelector('#share-fallback').hidden=true;
 try{localStorage.setItem('stopa-design-picks-v1',JSON.stringify(ids));}catch{}
}
document.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.pick);selected.has(n)?selected.delete(n):selected.add(n);render();}));
document.querySelector('#clear-selection').addEventListener('click',()=>{selected.clear();render();});
document.querySelector('#copy-selection').addEventListener('click',async()=>{
 const url=new URL(location.href);url.search='';url.hash='';url.searchParams.set('vyber',[...selected].sort((a,b)=>a-b).join(','));
 try{await navigator.clipboard.writeText(url.href);document.querySelector('#copy-status').textContent='Odkaz skopírovaný.';}catch{const field=document.querySelector('#share-fallback');field.hidden=false;field.value=url.href;field.focus();field.select();document.querySelector('#copy-status').textContent='Skopíruj tento odkaz.';}
});
render();
