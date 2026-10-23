import {directions,channels} from './directions.js';
import {createScene} from './scene.js';
const params=new URLSearchParams(location.search);
const n=Math.min(directions.length,Math.max(1,Math.floor(Number(params.get('v')))||1));
const D=directions[n-1];
const extra=[
 {id:'attendance',name:'Dochádzka NR SR',url:'https://nrsr-dochadzka.zltastopa.sk/',image:'../captures/attendance.jpg',desc:'Účasť poslancov na hlasovaniach.'},
 {id:'compass',name:'Majetkový kompas',url:'https://kompas.zltastopa.sk/',image:'../captures/compass.jpg',desc:'Majetkové priznania vedľa seba.'},
 {id:'contracts',name:'CRZ Explorer',url:'https://zmluvy.zltastopa.sk/',image:'../captures/contracts.jpg',desc:'Vyhľadávanie vo verejných zmluvách.'}
];
document.title=`Žltá stopa / ${D.name}`;
document.body.dataset.variant=D.type;
document.querySelector('#app').innerHTML=`<nav class="study-nav" aria-label="Verzie hero sekcie"><a href="index.html">← Všetkých 10</a><div><a href="concept.html?v=${n===1?10:n-1}" aria-label="Predchádzajúci návrh">←</a><label class="sr-only" for="variant-select">Vybrať návrh</label><select id="variant-select">${directions.map(d=>`<option value="${d.id}" ${d.id===n?'selected':''}>${String(d.id).padStart(2,'0')} / ${d.name}</option>`).join('')}</select><a href="concept.html?v=${n===10?1:n+1}" aria-label="Ďalší návrh">→</a></div></nav><header class="site-header"><a class="brand" href="concept.html?v=${n}" aria-label="Žltá stopa"><img src="../assets/logo.png" alt="Žltá stopa" width="75" height="68"></a><nav aria-label="Hlavná navigácia"><a href="#projects">Projekty</a><a href="#toolkit">Toolkit</a><a href="https://github.com/zltastopa" target="_blank" rel="noopener">GitHub ↗</a></nav></header><main id="main"><section class="hero"><div class="hero-copy"><h1>Keď niečo<br>smrdí,<br><em>zostane stopa.</em></h1><a class="hero-cta" href="#projects">Pozrieť projekty <span aria-hidden="true">↓</span></a></div><div class="hero-right"><div class="scene" id="scene" role="img" aria-label="${D.name}, obrazovka s projektmi"><img class="scene-fallback" src="../captures/budget.jpg" alt="Na čo míňa štát?"></div><div class="channel-controls"><div class="channel-buttons" role="group" aria-label="Vybrať kanál">${channels.map((c,i)=>`<button type="button" data-channel="${i}" aria-pressed="${i===0}">${c.short}</button>`).join('')}</div><button class="pause" title="Pozastaviť alebo spustiť prepínanie kanálov" type="button" aria-label="Pozastaviť striedanie" aria-pressed="false">Ⅱ</button></div><a id="current-project" class="current-project" href="${channels[0].url}" target="_blank" rel="noopener">${channels[0].name} ↗</a></div></section><section class="projects" id="projects"><h2>Projekty</h2><div class="project-grid">${[...channels.slice(0,3),...extra].map(p=>`<a class="project" href="${p.url}" target="_blank" rel="noopener"><div class="project-image"><img src="${p.image}" alt="${p.name}" width="1400" height="900" loading="lazy"></div><h3>${p.name}<span aria-hidden="true">↗</span></h3><p>${p.desc}</p></a>`).join('')}</div></section><section class="toolkit" id="toolkit"><h2>Vlastné pátranie?</h2><a href="https://github.com/zltastopa/zltastopa" target="_blank" rel="noopener">Dáta, kód a investigatívne skills ↗</a></section></main><footer><a href="https://zltastopa.sk" aria-label="Žltá stopa"><img src="../assets/logo.png" alt="Žltá stopa" width="65" height="60"></a><a href="https://discord.gg/3rMUDFeFz7" target="_blank" rel="noopener">Discord ↗</a><a href="mailto:hello@zltastopa.sk">hello@zltastopa.sk</a></footer>`;
document.querySelector('#variant-select').addEventListener('change',e=>location.href=`concept.html?v=${e.target.value}`);
const controls=[...document.querySelectorAll('[data-channel]')];
const onChannel=index=>{
 controls.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.channel)===index)));
 const c=channels[index],a=document.querySelector('#current-project');a.textContent=index===3?'Všetky projekty ↓':`${c.name} ↗`;a.href=c.url;
 if(index===3){a.removeAttribute('target');a.removeAttribute('rel');}else{a.target='_blank';a.rel='noopener';}
 document.querySelector('#scene').setAttribute('aria-label',`${D.name}: ${c.name}`);
};
const scene=await createScene(document.querySelector('#scene'),D,{channels,onChannel,still:params.has('still'),initial:Number(params.get('channel'))||0});
controls.forEach(b=>b.addEventListener('click',()=>scene.select(Number(b.dataset.channel))));
const pause=document.querySelector('.pause');
pause.addEventListener('click',()=>{const stopped=scene.togglePause();pause.setAttribute('aria-pressed',String(stopped));pause.setAttribute('aria-label',stopped?'Spustiť striedanie':'Pozastaviť striedanie');pause.textContent=stopped?'▶':'Ⅱ';});
if(scene.paused){pause.setAttribute('aria-pressed','true');pause.textContent='▶';pause.setAttribute('aria-label','Spustiť striedanie');}
window.addEventListener('pagehide',()=>scene.dispose(),{once:true});
