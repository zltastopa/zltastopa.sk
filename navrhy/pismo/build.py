"""Package ten headline studies around the current static homepage."""
from pathlib import Path
import json,re
from hashlib import sha256
root=Path(__file__).resolve().parents[2]
here=Path(__file__).resolve().parent
shared=root.parent/'design-system/patterns/type-study.css'
if shared.exists():(here/'study.css').write_text(shared.read_text())
fonts=json.loads((here/'fonts.json').read_text())
(here/'fonts.js').write_text('window.STOPA_FONTS='+json.dumps(fonts,ensure_ascii=False)+';\n')
(here/'fonts.css').write_text('\n'.join('@font-face{font-family:"Study '+f['id']+'";src:url("fonts/'+f['id']+'.ttf") format("truetype");font-weight:'+str(f['weight'])+';font-display:swap}' for f in fonts))
version=sha256(b''.join((here/name).read_bytes() for name in ['study.js','study.css','fonts.js','fonts.css','preview.js','preview.css'])+(root/'index.html').read_bytes()).hexdigest()[:10]
index=(here/'index.html').read_text()
index=re.sub(r'data-preview-version="[^"]*"',f'data-preview-version="{version}"',index)
index=re.sub(r'(href|src)="((?:study|fonts)\.(?:css|js))(?:\?v=[^"]*)?"',lambda m:f'{m[1]}="{m[2]}?v={version}"',index)
index=re.sub(r'src="preview.html\?font=4(?:&v=[^"]*)?"',f'src="preview.html?font=4&v={version}"',index)
(here/'index.html').write_text(index)
page=(root/'index.html').read_text().replace('<head>','<head>\n  <base href="../../">\n  <meta name="robots" content="noindex">',1)
page=page.replace('</head>','<link rel="stylesheet" href="navrhy/pismo/fonts.css"><link rel="stylesheet" href="navrhy/pismo/preview.css"><script src="navrhy/pismo/fonts.js" defer></script><script src="navrhy/pismo/preview.js" defer></script></head>')
page=page.replace('navrhy/pismo/fonts.css\"',f'navrhy/pismo/fonts.css?v={version}\"').replace('navrhy/pismo/preview.css\"',f'navrhy/pismo/preview.css?v={version}\"').replace('navrhy/pismo/fonts.js\"',f'navrhy/pismo/fonts.js?v={version}\"').replace('navrhy/pismo/preview.js\"',f'navrhy/pismo/preview.js?v={version}\"')
(here/'preview.html').write_text(page)
print('Built 10 font studies around the current homepage.')
