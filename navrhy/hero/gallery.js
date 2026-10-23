import {directions} from './directions.js';
const card=d=>`<article id="version-${d.id}" class="version"><a class="version-preview" href="concept.html?v=${d.id}" aria-label="Otvoriť ${d.name}"><img src="previews/${String(d.id).padStart(2,'0')}.jpg" alt="${d.name}" width="1440" height="1050" loading="eager"></a><div class="version-caption"><span>${String(d.id).padStart(2,'0')}</span><h3><a href="concept.html?v=${d.id}">${d.name} ↗</a></h3><button type="button" data-pick="${d.id}" aria-pressed="false">Vybrať +</button></div></article>`;
document.querySelector('#tv-grid').innerHTML=directions.filter(d=>d.kind==='tv').map(card).join('');
document.querySelector('#other-grid').innerHTML=directions.filter(d=>d.kind==='other').map(card).join('');
const fromUrl=new URLSearchParams(location.search).get('vyber');let saved=[];try{saved=JSON.parse(localStorage.getItem('stopa-hero-picks')||'[]');}catch{}
const values=fromUrl!==null?fromUrl.split(','):Array.isArray(saved)?saved:[];
const picks=new Set(values.map(Number).filter(i=>directions.some(d=>d.id===i)));
function render(){const ids=[...picks].sort((a,b)=>a-b);document.querySelector('.selection').hidden=!ids.length;document.querySelector('#selection-summary').textContent=`Môj výber: ${ids.map(i=>String(i).padStart(2,'0')).join(', ')}`;document.querySelectorAll('[data-pick]').forEach(b=>{const on=picks.has(Number(b.dataset.pick));b.setAttribute('aria-pressed',String(on));b.textContent=on?'Vybrané ✓':'Vybrať +';});document.querySelector('#share-status').textContent='';document.querySelector('#share-fallback').hidden=true;try{localStorage.setItem('stopa-hero-picks',JSON.stringify(ids));}catch{}}
document.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>{const id=Number(b.dataset.pick);picks.has(id)?picks.delete(id):picks.add(id);render();}));
document.querySelector('#clear-selection').addEventListener('click',()=>{picks.clear();render();});
document.querySelector('#share-selection').addEventListener('click',async()=>{const url=new URL(location.href);url.search='';url.hash='';url.searchParams.set('vyber',[...picks].sort((a,b)=>a-b).join(','));try{await navigator.clipboard.writeText(url.href);document.querySelector('#share-status').textContent='Odkaz skopírovaný.';}catch{const f=document.querySelector('#share-fallback');f.hidden=false;f.value=url.href;f.focus();f.select();}});
render();
