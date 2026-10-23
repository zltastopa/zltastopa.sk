# 🟡 Žltá stopa

Mapy, grafy a nástroje o Slovensku. Na jednom mieste.

Live site: <https://zltastopa.sk/>. The selected layout is concept 11 with the Nástenka hero. Earlier comparisons remain under `navrhy/`.

## Edit the page

The site is static HTML and CSS. Visitors need no JavaScript, WebGL, framework, external fonts or third-party services. The small script only places the decorative thread between pins.

- `content/projects.json`: project order, names, descriptions, links, image paths, authors and board labels.
- `templates/home.html`: page structure and general copy.
- `index.html`: generated, fully rendered public page.
- `assets/home/home.css`: packaged homepage CSS.
- `../design-system/patterns/home-noticeboard.css`: canonical shared pattern when working in the full workspace.
- `assets/home/home.js`: decorative thread placement.

After editing the inventory or template:

```sh
python3 -m pip install Pillow
python3 scripts/build-home.py
python3 -m http.server 8765
```

The build uses Pillow to read actual image dimensions and create responsive WebP sizes. With the sibling design-system checkout present, it also packages canonical CSS and tokens. Without it, the existing checked-in CSS is retained, so content edits work in a standalone clone.

## Replace a board image

1. Add the new screenshot under `assets/home/`.
2. Change its project's `image` and `alt` in `content/projects.json`.
3. Run `python3 scripts/build-home.py`.

There are three board slots: `budget`, `food` and `rings`, selected by the project's `board` property. The reporter's image is the separate `reporter` object in the same file. Board captions are real HTML, not part of the screenshot. Caption overflow is truncated visually; the link's accessible name remains complete.

Image widths and heights are read automatically. Portrait, square and panoramic images fit inside their existing paper without cropping or altering the board. Responsive variants are rebuilt automatically. Their aspect ratio does not control the layout. The larger project previews below the board let visitors inspect the products clearly. Compact secondary previews use a top-aligned crop.

To add a project, add an entry with `id`, `name`, `description`, `url`, `image` and `alt`. Set `featured: true` for a large card; omit `board` unless replacing one of the three pinned projects. No JavaScript changes are required.

## Design and content

The full header and footer are white, preserving the yellow-circles-on-snow logo. The hero is yellow, with the established line “Keď niečo smrdí, zostane stopa.” and a direct explanation of the collection.

The board is one view containing three independent native project links and an illustrated reporter in a CSS television. There is no carousel, autoplay, channel selection or canvas. Shadows, cork grain, pins and screen lines are CSS. Reduced-motion preferences disable hover transitions and smooth scrolling.

Budget and food access lead. Letokruhy, parliamentary attendance, asset declarations and CRZ Explorer follow. The community invitation and advanced toolkit are secondary. The budget retains its 2027 estimate qualifier. There are no promises of daily refreshes or proven effects of a law. Each project links to its own sources and methodology.

Original screenshot provenance: `navrhy/captures/manifest.json`. The new WebP assets are optimised copies of those captures. `reporter.webp` is an optimised copy of the fictional illustration created for the previous comparison; its generation brief and provenance are in `navrhy/hero/README.md`. It does not depict a named person or claim to be a real broadcast. Fonts are Public Sans, with the OFL license alongside them.

## Verification

1. Target and north star: Peter's selected fixed noticeboard, clear project aggregation, full white header, yellow hero and an intentional phone composition.
2. Before evidence: the prior toolkit-led production page and selected WebGL board, inspected and captured in the browser.
3. Ranked findings: the old page led with the advanced toolkit; the exploration rotated projects and required WebGL; the hub's purpose needed a plain sentence.
4. Changes made: project-led static homepage, three independently replaceable pinned screenshots and a reporter TV, simpler copy, six project destinations, contribution route and secondary toolkit.
5. After evidence and checks: Chrome at 1440, 1280, 1024, 768, 760, 600, 390, 360 and 320 CSS pixels. Actual screenshots inspected, with no horizontal overflow or missing images. Extreme portrait and panoramic replacement images leave board dimensions unchanged at desktop, phone and narrow-phone widths. No-JavaScript page retains all six project links and three board links. CTA anchors, keyboard progression and toolkit navigation pass. All six project destinations, GitHub and Discord returned HTTP 200. Desktop and mobile first folds retain the start of the project previews.
6. Verdict: ready as the selected homepage, with static HTML content and no runtime build requirement.

The old `#projects` and `#steps` fragment links continue to reach the project list and toolkit. The former installation tutorial and CRZ methodology now belong to their linked source repository and product, rather than the homepage.
