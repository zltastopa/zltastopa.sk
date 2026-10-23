"""Package canonical sibling design-system sources for this static preview."""
from pathlib import Path

here = Path(__file__).resolve().parent
shared = here.parents[1] / 'design-system'
sources = ['tokens.css', 'patterns/brand-mark.css', 'patterns/project-showcase.css']
(here / 'assets/brand.css').write_text('\n'.join((shared / source).read_text() for source in sources))
print('Packaged brand tokens, white-backed mark and project showcase.')

(here / 'hero/hero.css').write_text((shared / 'patterns/hero-broadcast.css').read_text())
