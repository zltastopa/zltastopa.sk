(async()=>{
 const n=Number(new URLSearchParams(location.search).get('font'));
 const f=window.STOPA_FONTS[n-1];if(!f)return;
 document.documentElement.dataset.fontStudy=n;
 const h=document.querySelector('.hero h1');
 document.documentElement.classList.add('font-loading');
 h.innerHTML='<span class="study-line">Keď<span class="study-word-space"> </span>niečo</span> <span class="study-line">smrdí,</span> <span class="study-line highlight">zostane stopa.</span>';
 h.style.fontFamily=`"Study ${f.id}"`;h.style.fontWeight=f.weight;h.style.setProperty('--study-tracking',f.tracking);
 function fit(){h.style.fontSize='';const base=parseFloat(getComputedStyle(h).fontSize);const width=Math.max(...[...h.children].map(e=>e.getBoundingClientRect().width));const available=h.clientWidth-6;if(width>available)h.style.fontSize=`${base*available/width}px`;}
 try{await document.fonts.load(`${f.weight} 72px "Study ${f.id}"`,'Keď niečo smrdí, zostane stopa.');await document.fonts.ready;fit();new ResizeObserver(fit).observe(h.parentElement);document.title=f.name+' · Žltá stopa';}
 finally{document.documentElement.classList.remove('font-loading');parent.postMessage({type:'stopa-font-ready',font:n},location.origin);}
})();
