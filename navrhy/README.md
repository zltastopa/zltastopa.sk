# 🟡 Žltá stopa: návrhy nového webu

Public comparison of ten revised homepage directions and an eleventh direction based on the screenshot-led gallery.

Public URL: <https://zltastopa.sk/navrhy/>. Concept URLs use `concept.html?v=1` through `v=11`. This directory is self-contained and is deployed through the existing GitHub Pages setup. It does not replace the production homepage.

## Brand and content

The line is **Keď niečo smrdí, zostane stopa.** The yellow circles in the original logo refer to pee on snow. The mark always sits on white, including on yellow or dark pages. Humour belongs in the brand and introductory copy; project captions retain their source scope and uncertainty.

Actual project screenshots lead. Budget and food access are the two most prominent projects; the new hero adds a smaller Letokruhy screen. Concept 11 makes the next project row visible in the first viewport on both desktop and mobile.

Screenshots were captured from the public products on 23 October 2026. Provenance is in `captures/manifest.json`. The budget image shows the partially estimated 2027 allocation. The food map shows modelled access, not a proven causal effect of a law. The linked products hold current data, details and methodology.

## Comparing and sharing

Each concept has a stable number and direct URL. Visitors can add favourites to their selection and copy a URL such as `?vyber=2%2C5%2C11`. Opening that URL restores the selection. Selections persist in the current browser; no votes or totals are sent to a server. To collect opinions, friends send their selection link or concept numbers back to Peter.

## Maintenance

The public files are ordinary HTML, CSS and JavaScript, with local fonts and screenshots. No build or external package is required to serve them.

Shared brand sources live in the sibling design-system repository:

- `tokens.css`
- `patterns/brand-mark.css`
- `patterns/project-showcase.css`

After editing them, run `python3 navrhy/build-brand.py` from the homepage repository to regenerate `assets/brand.css`. The original Public Sans license is included as `assets/OFL.txt`.

## Visual verification

1. Target: the accepted screenshot-led direction, the original brand joke and white-backed logo, with a visible invitation to scroll.
2. Before: the local round-two comparison gallery, preserved under `explorations/round-2/`.
3. Findings: the yellow logo disappeared on yellow, the copy did not carry the joke, and the gallery itself suggested a useful extra homepage direction.
4. Changes: ten revised directions, a new three-screen hero, reusable white-backed brand treatment, a public comparison gallery and shareable shortlists.
5. Checks: all eleven concepts at 1440, 390 and 360 CSS pixels; gallery at the same widths; no horizontal overflow, broken images, fragment destinations or JavaScript errors. White logo backgrounds verified throughout. Cinema, directory and rail interactions passed, as did shortlist restoration, selection, clearing and copied URLs. The first project row in concept 11 begins at 919 pixels in a 1050-pixel desktop viewport and at 797 pixels in an 844-pixel phone viewport.
6. Verdict: a verified comparison for choosing a direction. Peter subsequently selected concept 11. Its header is now fully white and its copy is reduced. The new right-side comparison is at `hero/`.

## Selected layout

Peter selected concept 11 on 23 October 2026. Ten right-side treatments are available at <https://zltastopa.sk/navrhy/hero/>. The full menu is white, the hero yellow, and copy is reduced across the selected page. See `hero/README.md` for implementation, asset provenance and checks. Production `/` remains unchanged.
