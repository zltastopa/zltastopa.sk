"""Build the static, JS-independent homepage from one editable project inventory."""
import json
from runpy import run_path
from hashlib import sha256
from html import escape
from pathlib import Path
from string import Template
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SHARED = ROOT.parent / 'design-system'
data = json.loads((ROOT / 'content/projects.json').read_text())
for source,destination in [('tokens.css','tokens.css'),('patterns/home-noticeboard.css','home.css'),('patterns/social-icons.svg','icons.svg'),('patterns/board-overlay.svg','board-overlay.svg')]:
    if (SHARED / source).exists():
        (ROOT / 'assets/home' / destination).write_text((SHARED / source).read_text())
version = sha256(b''.join((ROOT / path).read_bytes() for path in [
    'templates/home.html', 'content/projects.json', 'assets/home/home.css',
    'assets/home/home.js', 'assets/home/icons.svg', 'assets/home/tokens.css', 'assets/home/board-overlay.svg', 'scripts/build-home.py'
])).hexdigest()[:10]
external = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10"/></svg>'
down = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3v14m-5-5 5 5 5-5"/></svg>'

def text(value):
    return escape(str(value), quote=True)

def dimensions(path):
    with Image.open(ROOT / path) as image:
        return ImageOps.exif_transpose(image).size

def picture(project, *, eager=False):
    width, height = dimensions(project['image'])
    source = ROOT / project['image']
    responsive = ROOT / 'assets/home/responsive'
    responsive.mkdir(exist_ok=True)
    candidates = []
    for target in (320, 640, 1280):
        if target >= width:
            continue
        output = responsive / f'{project["id"]}-{target}.webp'
        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image)
            image.thumbnail((target, round(height * target / width)))
            image.save(output, quality=88, method=6)
        candidates.append(f'{output.relative_to(ROOT)} {target}w')
    candidates.append(f'{project["image"]} {width}w')
    sizes = '(max-width:760px) 45vw, 320px' if eager else ('(max-width:760px) 90vw, 640px' if project.get('featured') else '(max-width:760px) 34vw, 250px')
    return f'<img src="{text(project["image"])}" srcset="{text(", ".join(candidates))}" sizes="{sizes}" alt="{text(project["alt"])}" width="{width}" height="{height}" loading="{"eager" if eager or project.get("featured") else "lazy"}" decoding="async">'

def open_control(arrow, label):
    return f'<span class="paper-action" aria-hidden="true"><span class="paper-action-label">{text(label)}</span>{arrow}</span>'

def board_item(project):
    return f'''<a class="board-paper board-{text(project['board'])}" href="{text(project['url'])}" aria-label="Otvoriť projekt: {text(project['name'])}"><span class="pin-anchor" aria-hidden="true"></span><div class="paper-image">{picture(project,eager=True)}</div><span class="paper-caption"><span>{text(project['boardLabel'])}</span>{open_control(external, 'Otvoriť')}</span></a>'''

def project_card(project):
    featured = project.get('featured', False)
    context = f'<p class="project-context">{text(project["context"])}</p>' if project.get('context') else ''
    return f'''<article class="project-card {"project-featured" if featured else "project-compact"}"><a href="{text(project['url'])}" class="project-link"><div class="project-image">{picture(project)}</div><div class="project-copy"><h3>{text(project['name'])}{external}</h3><p>{text(project['description'])}</p>{context}</div></a></article>'''

def icon(name):
    return f'<svg class="social-icon icon-{name}" aria-hidden="true"><use href="assets/home/icons.svg?v={version}#{name}"></use></svg>'

board_toolkit = data['boardToolkit']
content = Template((ROOT / 'templates/home.html').read_text()).substitute(
    board_overlay=(ROOT / 'assets/home/board-overlay.svg').read_text(),version=version,external=external,down=down,github=icon('github'),discord=icon('discord'),mail=icon('mail'),search=icon('search'),
    board_items='\n'.join(board_item(p) for p in data['projects'] if p.get('board')),
    featured_projects='\n'.join(project_card(p) for p in data['projects'] if p.get('featured')),
    more_projects='\n'.join(project_card(p) for p in data['projects'] if not p.get('featured')),
    toolkit_action=open_control(down, 'Pozrieť'),
    board_toolkit_url=text(board_toolkit['url']),
    board_toolkit_title='<br>'.join(text(line) for line in board_toolkit['titleLines']),
    board_toolkit_prompt=text(board_toolkit['prompt']),
    board_toolkit_label=text(board_toolkit['prompt']+' '+' '.join(board_toolkit['titleLines'])))
(ROOT / 'index.html').write_text(content)
print(f'Built homepage: {len(data["projects"])} projects, three pinned screenshots and a toolkit card.')

# Keep the active font comparison on the same page revision as production.
study_builder = ROOT / "navrhy/pismo/build.py"
if study_builder.exists():
    run_path(str(study_builder))
