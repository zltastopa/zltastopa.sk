import * as T from './vendor/three.module.min.js';
import {RoundedBoxGeometry} from './vendor/RoundedBoxGeometry.js';

const vertex=`
 varying vec2 vUv;
 uniform float uCurve;
 void main(){vUv=uv;vec3 p=position;vec2 c=uv*2.-1.;p.z+=uCurve*(1.-c.x*c.x)*(1.-c.y*c.y);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}
`;
const fragment=`
 uniform sampler2D uTex;
 uniform float uTime,uBurst,uCRT,uReporter;
 uniform vec4 uRegion;
 varying vec2 vUv;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 void main(){
   vec2 uv=vUv*uRegion.zw+uRegion.xy;
   vec2 c=uv*2.-1.;float radius=dot(c,c);
   uv=.5+(uv-.5)*(1.+.035*radius*uCRT);
   if(uCRT>.5){vec2 corner=max(abs(vUv-.5)-vec2(.445),0.);if(length(corner)>.055)discard;}
   float mouth=exp(-pow((uv.x-.522)/.05,2.)-pow((uv.y-.642)/.026,2.));
   uv.y+=mouth*(sin(uTime*10.)*.007+sin(uTime*17.)*.003)*uReporter;
   float line=step(.96,fract(uv.y*14.+uTime*1.8));
   uv.x+=uBurst*uCRT*(hash(vec2(floor(uv.y*160.),floor(uTime*34.)))-.5)*.09;
   vec3 color;
   float separation=.0016*(.3+radius)*uCRT+uBurst*.009*uCRT;
   color.r=texture2D(uTex,uv+vec2(separation,0.)).r;
   color.g=texture2D(uTex,uv).g;
   color.b=texture2D(uTex,uv-vec2(separation,0.)).b;
   float scan=.96+.04*sin(uv.y*900.);
   float phosphor=.985+.015*sin(gl_FragCoord.x*2.094);
   float vignette=1.-.13*pow(radius*.55,1.6);
   color*=mix(1.,scan*phosphor*vignette,uCRT);
   color+=uCRT*(hash(gl_FragCoord.xy+floor(uTime*23.))-.5)*.024;
   color+=uCRT*pow(max(0.,1.-length((uv-vec2(.17,.9))*vec2(1.3,2.))),5.)*.045;
   float noise=hash(vec2(floor(gl_FragCoord.x*.7),floor(gl_FragCoord.y*.7))+floor(uTime*37.));
   color=mix(color,vec3(noise*.65+.08),uBurst*uCRT*.87);
   color+=line*uBurst*uCRT*.12;
   if(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.)color=vec3(.015);
   gl_FragColor=vec4(color,1.);
   #include <tonemapping_fragment>
   #include <colorspace_fragment>
 }
`;

export async function createScene(host,direction,{channels,onChannel,still=false,initial=0}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let paused=reduced||still,visible=true,dead=false,index=Math.max(0,Math.min(3,initial)),elapsed=Math.max(0,Math.min(3,initial))*5.2,last=performance.now(),frame=0,lastPaint=0;
 let renderer;
 try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power',preserveDrawingBuffer:true});}catch{
  host.dataset.ready='fallback';host.dataset.channel=String(index);const fallback=host.querySelector('img');fallback.src=channels[index].image;fallback.alt=channels[index].name;onChannel(index);
  return {paused:true,select(i){index=i;const img=host.querySelector('img');img.src=channels[i].image;img.alt=channels[i].name;host.dataset.channel=String(i);onChannel(i);},togglePause(){return true;},dispose(){}};
 }
 renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1.35:1.75));renderer.setClearColor(0x000000,0);
 renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 renderer.domElement.setAttribute('aria-hidden','true');host.append(renderer.domElement);
 const scene=new T.Scene(),camera=new T.OrthographicCamera(-4,4,3,-3,.1,80),object=new T.Group();scene.add(object);
 scene.add(new T.HemisphereLight(0xfff7e9,0x695946,1.65));
 const key=new T.DirectionalLight(0xfff4df,3.8);key.position.set(-4,7,8);key.castShadow=false;scene.add(key);
 const fill=new T.DirectionalLight(0xffffff,1.55);fill.position.set(5,2,-3);scene.add(fill);
 const soft=new T.DirectionalLight(0xffffff,1.2);soft.position.set(-5,-1,3);scene.add(soft);
 const floor=new T.Mesh(new T.PlaneGeometry(40,40),new T.ShadowMaterial({opacity:.19}));floor.rotation.x=-Math.PI/2;floor.position.y=-2.05;floor.receiveShadow=true;scene.add(floor);
 const screens=[],moving=[],knobs=[],resources=[],pointer=new T.Vector2(),smooth=new T.Vector2();
 const mats={};
 const grain=document.createElement('canvas');grain.width=128;grain.height=128;const gx=grain.getContext('2d');const pixels=gx.createImageData(128,128);for(let i=0;i<pixels.data.length;i+=4){const v=185+Math.random()*65;pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=v;pixels.data[i+3]=255;}gx.putImageData(pixels,0,0);const bump=new T.CanvasTexture(grain);bump.wrapS=bump.wrapT=T.RepeatWrapping;bump.repeat.set(4,4);resources.push(bump);
 function material(color,roughness=.58,metalness=.04){const k=`${color}-${roughness}-${metalness}`;return mats[k]??=new T.MeshStandardMaterial({color,roughness,metalness,bumpMap:bump,bumpScale:.009});}
 const cream=material('#d9d2bf'),ink=material('#252622'),dark=material('#0e1110'),silver=material('#bfc4c2',.32,.72),chrome=material('#c9cfcd',.22,.85),yellow=material('#e8af00'),paper=material('#f9f7ee',.9),wood=material('#805737',.68),cork=material('#a47b4d',.96);
 function mesh(geometry,mat,parent=object){const m=new T.Mesh(geometry,mat);m.castShadow=true;m.receiveShadow=false;parent.add(m);return m;}
 function box(w,h,d,r,mat,x=0,y=0,z=0,parent=object){const b=mesh(new RoundedBoxGeometry(w,h,d,4,Math.min(r,Math.min(w,h,d)*.48)),mat,parent);b.position.set(x,y,z);return b;}
 function cylinder(radius,depth,mat,x,y,z,parent=object,segments=48){const m=mesh(new T.CylinderGeometry(radius,radius,depth,segments),mat,parent);m.rotation.x=Math.PI/2;m.position.set(x,y,z);return m;}
 function rod(a,b,r,mat,parent=object){const start=new T.Vector3(...a),end=new T.Vector3(...b),d=end.clone().sub(start),m=mesh(new T.CylinderGeometry(r,r,d.length(),14),mat,parent);m.position.copy(start.add(end).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return m;}
 function sphere(r,mat,x,y,z,parent=object){const m=mesh(new T.SphereGeometry(r,20,12),mat,parent);m.position.set(x,y,z);return m;}
 function torus(r,t,mat,x,y,z,parent=object){const m=mesh(new T.TorusGeometry(r,t,10,48),mat,parent);m.position.set(x,y,z);return m;}
 function text(t,w,h,x,y,z,color='#d4d6ca',bg=null,parent=object){const c=document.createElement('canvas');c.width=512;c.height=128;const cx=c.getContext('2d');if(bg){cx.fillStyle=bg;cx.fillRect(0,0,512,128);}cx.fillStyle=color;cx.font='bold 42px monospace';cx.textBaseline='middle';cx.textAlign='center';cx.fillText(t,256,64);const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;resources.push(map);const m=mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map,transparent:!bg}),parent);m.position.set(x,y,z);return m;}
 function screw(x,y,z,parent=object){cylinder(.027,.014,chrome,x,y,z,parent,16);rod([x-.013,y,z+.01],[x+.013,y,z+.01],.004,ink,parent);}
 function knob(x,y,z,r=.2,parent=object){cylinder(r,.13,ink,x,y,z,parent);const k=cylinder(r*.89,.12,silver,x,y,z+.09,parent);const marker=box(.018,r*.5,.012,.005,ink,x,y+r*.28,z+.16,parent);k.userData.action='next';knobs.push(k);return marker;}
 const imgs=await Promise.all(channels.map(c=>new Promise(resolve=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=new URL(c.image,location.href).href;})));
 const canvases=channels.map(()=>{const c=document.createElement('canvas');c.width=1024;c.height=768;return c;});
 const textures=canvases.map(c=>{const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());resources.push(tex);return tex;});
 function paintChannel(i,time=0,newspaper=false){const c=canvases[i],ctx=c.getContext('2d'),im=imgs[i];ctx.fillStyle=i===3?'#d8ddcf':'#f6f6ef';ctx.fillRect(0,0,1024,768);if(im){const scale=Math.min(1024/im.width,768/im.height);const w=im.width*scale,h=im.height*scale;ctx.drawImage(im,(1024-w)/2,(768-h)/2,w,h);}else if(i===3){paintReporter(ctx,time);}if(i===3){ctx.fillStyle='#ffc400';ctx.fillRect(35,35,90,47);ctx.fillStyle='#191b18';ctx.font='bold 30px sans-serif';ctx.fillText('ŽS',52,69);}textures[i].needsUpdate=true;}
 function paintReporter(ctx,t){ctx.fillStyle='#e9e4ce';ctx.fillRect(0,0,1024,768);ctx.fillStyle='#c1c6b2';ctx.fillRect(45,240,930,500);ctx.fillStyle='#606653';ctx.fillRect(75,150,180,210);ctx.fillRect(300,190,150,170);ctx.fillRect(780,130,155,230);ctx.fillStyle='#242b35';ctx.beginPath();ctx.ellipse(520,750,235,290,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#392d27';ctx.beginPath();ctx.ellipse(520,280,135,160,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#cf9b7b';ctx.beginPath();ctx.ellipse(520,310,100,130,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#302b29';ctx.fillRect(475,275,12,9);ctx.fillRect(557,275,12,9);ctx.beginPath();ctx.ellipse(520,355,22,7+Math.abs(Math.sin(t*12))*10,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#222';ctx.fillRect(605,477,16,140);ctx.fillStyle='#ffc400';ctx.fillRect(570,432,85,65);}
 canvases.forEach((_,i)=>paintChannel(i));
 function screen(w,h,x,y,z,{crt=true,offset=0,curve=.07,parent=object,region=[0,0,1,1],frame=true}={}){
  if(frame)box(w+.17,h+.17,.13,.12,dark,x,y,z-.025,parent);
  const mat=new T.ShaderMaterial({uniforms:{uTex:{value:textures[(index+offset)%4]},uTime:{value:0},uBurst:{value:0},uCRT:{value:crt?1:0},uReporter:{value:(index+offset)%4===3?1:0},uCurve:{value:curve},uRegion:{value:new T.Vector4(...region)}},vertexShader:vertex,fragmentShader:fragment,side:T.DoubleSide,toneMapped:false});
  const s=mesh(new T.PlaneGeometry(w,h,30,24),mat,parent);s.position.set(x,y,z+.06);s.castShadow=false;screens.push({mesh:s,mat,offset});return s;
 }
 function ventGrid(x,y,z,count=12,parent=object,vertical=true){for(let i=0;i<count;i++)box(vertical?.035:.62,vertical?.65:.035,.012,.005,dark,x+(vertical?i*.075:0),y-(vertical?0:i*.08),z,parent);}
 function feet(w,y,z,parent=object){for(const x of [-w,w])box(.5,.18,.75,.07,dark,x,y,z,parent);}
 function tv(profile='portable',parent=object,scale=1,offset=0){
  const g=new T.Group();parent.add(g);g.scale.setScalar(scale);
  const studio=profile==='studio',woody=profile==='wood',silvery=profile==='silver';
  const shell=studio?ink:woody?wood:silvery?silver:cream;
  const w=studio?4.65:silvery?5.2:4.8,h=studio?3.35:silvery?3.1:3.45,d=studio?1.85:1.95;
  box(w,h,d,studio?.19:.35,shell,0,0,0,g);
  box(w-.15,h-.15,.08,.22,studio?dark:woody?wood:silvery?chrome:material('#b8b4a6'),0,0,d*.5-.04,g);
  if(studio){
   box(4.2,2.7,.15,.24,dark,0,.18,1.02,g);screen(3.85,2.55,0,.18,1.11,{parent:g,offset,curve:.12});
   for(let i=0;i<6;i++)cylinder(.045,.035,cream,-1.7+i*.2,-1.43,1.04,g,16);
   for(let i=0;i<3;i++)knob(.8+i*.35,-1.42,1.03,.09,g);
   sphere(.033,new T.MeshBasicMaterial({color:'#9dc44a'}),1.82,-1.43,1.07,g);text('ŽS · STUDIO',1.05,.13,-.25,-1.43,1.08,'#a0a594',null,g);
   box(2.35,.11,.35,.03,dark,0,1.8,-.2,g);rod([-1.1,1.67,-.2],[-1.1,1.82,-.2],.04,ink,g);rod([1.1,1.67,-.2],[1.1,1.82,-.2],.04,ink,g);
   feet(1.6,-1.82,.1,g);
  }else{
   box(3.75,2.96,.16,.25,dark,-.37,.08,1.03,g);screen(3.32,2.52,-.37,.08,1.14,{parent:g,offset,curve:.14});
   knob(1.78,.83,1.04,.23,g);knob(1.78,.22,1.04,.19,g);ventGrid(1.44,-.35,1.03,9,g,false);
   sphere(.034,new T.MeshBasicMaterial({color:'#d1b64a'}),1.75,-1.13,1.06,g);text('ŽLTÁ STOPA',1.23,.15,-.38,-1.47,1.05,woody?'#d7c7a5':'#5f6255',null,g);
   if(woody){for(const x of [-1.65,1.65]){rod([x,-1.5,-.5],[x*1.05,-2.08,-.4],.09,wood,g);rod([x,-1.5,.55],[x*1.05,-2.08,.7],.09,wood,g);}}else feet(1.63,-1.85,.05,g);
   if(!woody){
    const height=silvery?1.0:.88;cylinder(.1,.08,chrome,-1.1,1.75,-.4,g);rod([-1.1,1.75,-.4],[-2.05,1.75+height,-.5],.022,chrome,g);sphere(.045,chrome,-2.05,1.75+height,-.5,g);
    if(!silvery){rod([-1.05,1.75,-.4],[-.2,2.6,-.5],.018,chrome,g);sphere(.04,chrome,-.2,2.6,-.5,g);}
    if(silvery){box(2,.13,.4,.055,dark,.25,1.86,-.2,g);rod([-.65,1.7,-.2],[-.65,1.9,-.2],.05,chrome,g);rod([1.15,1.7,-.2],[1.15,1.9,-.2],.05,chrome,g);}
   }
  }
  for(let i=0;i<12;i++)box(.015,.65,.045,.006,dark,w/2+.005,.1,-.8+i*.1,g);
  for(const x of [-w/2+.19,w/2-.19])for(const y of [-h/2+.19,h/2-.19])screw(x,y,1.025,g);
  return g;
 }
 if(['portable','studio','wood','silver'].includes(direction.type))tv(direction.type);
 if(direction.type==='wall'){
  for(let row=0;row<2;row++)for(let col=0;col<2;col++){const g=tv('studio',object,.7,row*2+col);g.position.set((col-.5)*3.5,(.5-row)*2.7,0);}
  box(7.5,.18,2,.05,ink,0,-2.72,0);floor.position.y=-2.85;
 }
 if(direction.type==='projector'){
  box(5.65,3.75,.08,.08,paper,.65,.75,-.9);screen(5.35,3.43,.65,.75,-.78,{crt:false,curve:0,frame:false});
  rod([-2.14,-1.9,-.93],[-2.14,2.7,-.93],.035,chrome);rod([3.45,-1.9,-.93],[3.45,2.7,-.93],.035,chrome);
  box(1.8,1.2,1.15,.14,material('#4a5149'),-1.9,-1.25,1.6);cylinder(.38,.55,dark,-1.9,-1.18,.79);torus(.25,.04,chrome,-1.9,-1.18,.49);
  const beamGeo=new T.BufferGeometry();beamGeo.setAttribute('position',new T.Float32BufferAttribute([-1.9,-1.18,.48,-2.02,-.96,-.83,3.32,-.96,-.83,-1.9,-1.18,.48,3.32,-.96,-.83,3.32,2.46,-.83,-1.9,-1.18,.48,3.32,2.46,-.83,-2.02,2.46,-.83,-1.9,-1.18,.48,-2.02,2.46,-.83,-2.02,-.96,-.83],3));object.add(new T.Mesh(beamGeo,new T.MeshBasicMaterial({color:'#fff5c0',transparent:true,opacity:.08,side:T.DoubleSide,depthWrite:false})));
  for(const [x,y,r] of [[-2.5,.03,.65],[-1.05,.02,.52]]){const reel=new T.Group();object.add(reel);reel.position.set(x,y,1.53);torus(r,.06,silver,0,0,0,reel);cylinder(.12,.12,ink,0,0,.04,reel);for(let i=0;i<6;i++){const a=i*Math.PI/3;rod([0,0,0],[Math.cos(a)*r,Math.sin(a)*r,0],.035,silver,reel);}moving.push({kind:'reel',mesh:reel});}
  rod([-2.5,.03,1.5],[-2.4,-.9,1.5],.04,ink);rod([-1.05,0,1.5],[-1.3,-.9,1.5],.04,ink);
  text('STOPA / 16 mm',1.25,.14,-1.9,-1.6,2.2,'#dddccc');
 }
 if(direction.type==='cards'){
  box(5.4,.25,1.8,.08,ink,0,-1.85,0);rod([-2.45,-1.7,0],[-2.45,1.65,0],.07,chrome);rod([2.45,-1.7,0],[2.45,1.65,0],.07,chrome);
  for(let i=2;i>=0;i--){const g=new T.Group();object.add(g);g.position.set(i*.19,-i*.1,-i*.24);g.rotation.z=(i-1)*-.045;box(4.9,3.5,.055,.035,paper,0,0,0,g);screen(4.6,2.95,0,-.12,.05,{crt:false,curve:0,frame:false,parent:g,offset:i});text('ŽLTÁ STOPA',1.1,.12,-1.55,1.57,.06,'#31342d',null,g);if(i===0)moving.push({kind:'card',mesh:g});}
  for(const x of [-1.8,1.8])torus(.24,.045,chrome,x,1.6,.05);floor.position.y=-2.04;
 }
 if(direction.type==='board'){
  box(6.6,4.5,.22,.08,wood,0,.1,-.5);box(6.28,4.18,.04,.04,cork,0,.1,-.36);
  const positions=[[-1.1,.45,3.7,2.5,-.055,0],[1.7,1,2.1,1.5,.09,1],[1.6,-.95,2.3,1.55,-.05,2]];
  for(const [x,y,w,h,r,o] of positions){const g=new T.Group();object.add(g);g.position.set(x,y,-.25+o*.04);g.rotation.z=r;box(w+.16,h+.29,.035,.015,paper,0,0,0,g);screen(w,h,0,-.05,.04,{crt:false,curve:0,frame:false,parent:g,offset:o});cylinder(.07,.09,yellow,0,h*.5+.04,.12,g);}
  rod([-1.1,1.78,.06],[1.7,1.82,.06],.015,yellow);rod([-1.1,1.78,.06],[1.6,-.1,.14],.015,yellow);rod([1.7,1.82,.08],[1.6,-.1,.14],.015,yellow);floor.position.y=-2.3;
 }
 if(direction.type==='flap'){
  box(6.35,4.25,.5,.16,ink,0,0,-.32);const cols=6,rows=4,w=1.0,h=.92;
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const g=new T.Group();object.add(g);g.position.set((c-2.5)*1.01,(1.5-r)*.93,0);box(w,h,.06,.025,dark,0,0,0,g);screen(w-.012,h-.012,0,0,.06,{crt:false,curve:0,frame:false,parent:g,region:[c/cols,(rows-1-r)/rows,1/cols,1/rows]});rod([-w*.5,0,.07],[w*.5,0,.07],.004,ink,g);moving.push({kind:'flap',mesh:g,delay:(r*cols+c)/24});}
  text('ŽS / OBRAZ Z VEREJNÝCH DÁT',3,.13,0,-1.98,0,'#abafa0');feet(2.2,-2.27,0);floor.position.y=-2.42;
 }
 if(direction.type==='paper'){
  const g=new T.Group();object.add(g);g.rotation.z=-.07;g.rotation.y=-.1;
  for(let i=3;i>=0;i--)box(5.3,4.4,.018,.008,paper,i*.025,-i*.025,-i*.035,g);
  const mast=text('ŽLTÁ STOPA',3.8,.48,0,1.67,.05,'#151712',null,g);
  rod([-2.36,1.3,.05],[2.36,1.3,.05],.013,ink,g);screen(4.8,3.1,0,-.37,.04,{crt:false,curve:.08,frame:false,parent:g});
  text('VEREJNÉ DÁTA',1.1,.12,-1.6,1.13,.06,'#424536',null,g);text('OTVORENÉ ZDROJE',1.45,.12,1.45,1.13,.06,'#424536',null,g);
  moving.push({kind:'paper',mesh:g});floor.position.y=-2.55;
 }
 const shadowCanvas=document.createElement('canvas');shadowCanvas.width=256;shadowCanvas.height=256;const sx=shadowCanvas.getContext('2d');const gradient=sx.createRadialGradient(128,128,10,128,128,125);gradient.addColorStop(0,'rgba(55,38,0,.28)');gradient.addColorStop(.5,'rgba(55,38,0,.14)');gradient.addColorStop(1,'rgba(55,38,0,0)');sx.fillStyle=gradient;sx.fillRect(0,0,256,256);const shadowTex=new T.CanvasTexture(shadowCanvas);resources.push(shadowTex);const contact=new T.Mesh(new T.PlaneGeometry(direction.type==='wall'?8:6.5,direction.type==='wall'?4:3.4),new T.MeshBasicMaterial({map:shadowTex,transparent:true,depthWrite:false,toneMapped:false}));contact.rotation.x=-Math.PI/2;contact.position.set(0,floor.position.y+.02,.1);scene.add(contact);
 const baseRotation=object.rotation.clone();
 const bounds=new T.Box3().setFromObject(object),center=bounds.getCenter(new T.Vector3()),size=bounds.getSize(new T.Vector3());
 const view=new T.Vector3(3.5,1.75,11).normalize();camera.position.copy(center).addScaledVector(view,14);camera.lookAt(center);
 function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);const aspect=w/h;const half=Math.max(size.y*.63,size.x/(aspect*1.7),2.55);camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();}
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize();
 let burst=0,manualBurst=0,manualIndex=null;
 const ray=new T.Raycaster(),ndc=new T.Vector2();
 function select(i){manualIndex=((i%4)+4)%4;manualBurst=reduced?0:.32;if(reduced){index=manualIndex;manualIndex=null;elapsed=index*5.2;onChannel(index);updateScreens();render(0,0);}else if(paused){index=manualIndex;manualIndex=null;elapsed=index*5.2;onChannel(index);updateScreens();render(0,0);}}
 function updateScreens(){for(const s of screens){const ci=(index+s.offset)%4;s.mat.uniforms.uTex.value=textures[ci];s.mat.uniforms.uReporter.value=ci===3?1:0;}host.dataset.channel=String(index);}
 function render(time,transition){
  smooth.lerp(pointer,.055);if(!reduced&&!paused){object.rotation.y=baseRotation.y+smooth.x*.06;object.rotation.x=baseRotation.x+smooth.y*.035;}
  for(const s of screens){s.mat.uniforms.uTime.value=time;s.mat.uniforms.uBurst.value=direction.kind==='tv'?transition:0;}
  for(const m of moving){if(m.kind==='reel'&&!paused)m.mesh.rotation.z=time*.35;if(m.kind==='card')m.mesh.rotation.y=Math.sin(transition*Math.PI)*-.35;if(m.kind==='paper')m.mesh.rotation.y=-.1+Math.sin(transition*Math.PI)*-.2;if(m.kind==='flap')m.mesh.rotation.x=-Math.sin(Math.min(1,Math.max(0,transition*1.7-m.delay*.7))*Math.PI)*Math.PI;}
  renderer.render(scene,camera);
 }
 host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width-.5,(e.clientY-r.top)/r.height-.5);});host.addEventListener('pointerleave',()=>pointer.set(0,0));
 renderer.domElement.addEventListener('pointerup',e=>{const r=renderer.domElement.getBoundingClientRect();ndc.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(ndc,camera);const hit=ray.intersectObjects(knobs,true)[0];if(hit)select(index+1);});
 const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;last=performance.now();});intersection.observe(host);
 function animate(now){if(dead)return;frame=requestAnimationFrame(animate);last=now;if(!visible||document.hidden){lastPaint=now;return;}if(now-lastPaint<1000/30)return;const dt=Math.min(.08,(now-lastPaint)/1000);lastPaint=now;
  if(!paused){elapsed+=dt;const phase=(elapsed%5.2)/5.2;burst=phase>.943?(phase-.943)/.057:0;
   if(manualIndex!==null){manualBurst-=dt;burst=.8;if(manualBurst<=.16){index=manualIndex;manualIndex=null;elapsed=index*5.2+.16;onChannel(index);updateScreens();}}
   else{const next=Math.floor(elapsed/5.2)%4;if(next!==index){index=next;onChannel(index);updateScreens();}}
  }else burst=0;
  render(elapsed,burst);
 }
 updateScreens();onChannel(index);render(elapsed,0);host.dataset.ready='true';host.querySelector('.scene-fallback')?.remove();frame=requestAnimationFrame(animate);
 return {get paused(){return paused;},select,togglePause(){paused=!paused;last=performance.now();render(elapsed,0);return paused;},dispose(){dead=true;cancelAnimationFrame(frame);resizeObserver.disconnect();intersection.disconnect();scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});resources.forEach(r=>r.dispose());renderer.dispose();}};
}
