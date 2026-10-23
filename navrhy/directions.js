export const directions=[
 {id:1,slug:'launch',name:'Yellow Launch',note:'A saturated yellow opening. Two large, overlapping product windows make the budget and food map the immediate story.'},
 {id:2,slug:'wall',name:'The Project Wall',note:'No metaphor to decode. Big yellow panels, actual interfaces, and a blunt invitation to open something.'},
 {id:3,slug:'split',name:'Half Yellow, All Work',note:'A fixed yellow identity panel beside a scrolling exhibition of full-size product screenshots.'},
 {id:4,slug:'cinema',name:'Public Cinema',note:'Black stage, yellow type, one enormous screenshot. A visible filmstrip switches the featured project.'},
 {id:5,slug:'desktop',name:'Open Windows',note:'A playful yellow desktop made from actual project windows. Every window opens the real site.'},
 {id:6,slug:'dispatch',name:'The Yellow Dispatch',note:'A loud editorial masthead, a generous lead story and a second lead for the food map. More visual newspaper than dashboard.'},
 {id:7,slug:'directory',name:'Yellow Pages',note:'Huge project names form the navigation. Selecting one reveals a large, undistorted screenshot beside the index.'},
 {id:8,slug:'rail',name:'The Wide View',note:'A horizontal sequence of yellow exhibition panels. The next project peeks into view, with ordinary controls and a complete index below.'},
 {id:9,slug:'poster',name:'Public by Design',note:'A graphic yellow-and-black campaign. Oversized project numbers and large screenshots create a deliberately bold vertical rhythm.'},
 {id:10,slug:'overview',name:'Everything, Open',note:'The collection starts immediately. Six real project screenshots in a dense, colourful overview, with a short yellow masthead.'},
 {id:11,slug:'beacon',name:'Po stope',note:'Tri skutočné obrazovky, výrazný slogan a ďalšie projekty viditeľné hneď pod úvodom. Nový smer vychádzajúci z rozcestníka.'}
];
const slovak=[['Žltý štart','Veľký slogan a dva hlavné projekty spolu na žltom pozadí.'],['Stena projektov','Rozpočet a potravinová mapa vedľa seba. Veľké obrazovky, krátke popisy.'],['Pol na pol','Žltý úvod zostáva na mieste, projekty pokračujú v pravom stĺpci.'],['Čuch nestačí','Tmavé javisko, veľká obrazovka a náhľady na prepínanie projektov.'],['Otvorené okná','Tri projektové okná na žltej ploche. Každé otvorí skutočný web.'],['Žlté vydanie','Výrazná hlavička a dva hlavné projekty v redakčnom rozložení.'],['Sleduj stopu','Veľké názvy projektov a obrazovka, ktorá reaguje na výber.'],['Stopa vedie ďalej','Široké projektové panely. Dá sa listovať aj otvoriť projekt priamo.'],['Niečo smrdí?','Žlto-čierne plagáty s veľkými číslami a skutočnými obrazovkami.'],['Kopa stôp','Všetkých šesť projektov v kompaktnom vizuálnom prehľade.']];
directions.slice(0,10).forEach((d,i)=>Object.assign(d,{name:slovak[i][0],note:slovak[i][1]}));
