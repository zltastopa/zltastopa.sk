# 📺 Žltá stopa: ten hero treatments

Public comparison: <https://zltastopa.sk/navrhy/hero/>.

Peter selected homepage layout 11, then requested a full white menu, yellow hero, shorter copy and ten right-side treatments. These previews keep that layout fixed while comparing five televisions and five other physical objects. They do not replace the production homepage.

## Directions

1. Portable cream CRT, rabbit ears and channel knobs.
2. Black studio monitor with green status light.
3. Wooden living-room television.
4. Silver portable television with handle and aerial.
5. Four-monitor control room, showing all four channels.
6. Film projector with turning reels.
7. Ring-bound project cards in a metal stand.
8. Investigation board with pinned screenshots and yellow thread.
9. Mechanical split-flap image board.
10. Newspaper front page with a moving picture.

`concept.html?v=1` through `v=10` are stable links. Add `&still=1` to pause animation for screenshots, or `&channel=3` to start on the reporter. Visitors can select favourites on the gallery and copy a shareable `?vyber=1%2C8` URL. Picks are stored only in their browser, with no vote collection service.

## Rendering and motion

These are actual Three.js models, with rounded geometry, depth, lighting, glass, controls and contact shadows. The reference was the physical depth and tactile controls of the device at Peter's local `/room/` page. No code or assets from that project are published here.

Three project screenshots rotate with one illustrated reporter channel every 5.2 seconds. TVs add barrel distortion, scanlines, slight RGB separation, grain and a brief roughly 300 ms static transition. The reporter illustration has subtle local mouth movement and camera drift. It is silent, with no recorded speech or claim to be a real news broadcast. Non-TV directions use their own physical transitions instead of CRT interference.

Manual channels and pause are always available. Reduced-motion preference starts paused. Rendering is capped at 30 fps and stops when the hero is off screen or the tab is hidden. Device pixel ratio is capped. Without WebGL, the same channels show static source images. All assets are served locally.

## Sources and assets

Project screenshot provenance is in `../captures/manifest.json`. Existing project images are reused unchanged as screen textures, with no fabricated measurements. Budget and food access lead, with Letokruhy third. The 2027 budget contains estimates, retained in the project description.

`assets/reporter.png` is an original fictional reporter illustration made with the imagegen skill and the built-in image generation tool on 23 October 2026. Brief: a full-bleed 4:3 editorial gouache scene of an adult dark-haired woman in a navy jacket, speaking into a yellow microphone in front of a camera, with Bratislava and the castle behind her; natural proportions, slightly open speaking mouth, no text or existing media branding. It does not depict a named person. The local animation is implemented in the screen shader.

`assets/gallery-tv.png`, `assets/overview.jpg` and `previews/*.jpg` are captures of these running pages, not generated site mockups. The gallery shows stills; open each direction to inspect motion.

Three.js 0.182.0 is vendored from the installed official package. Its MIT license is `vendor/THREE-LICENSE.txt`. Fonts and their license are in `../assets/`.

## Maintenance

No app build or external CDN is needed. Serve this directory through a normal HTTP server. The canonical page CSS is `../../../design-system/patterns/hero-broadcast.css` in this workspace. Run `python3 navrhy/build-brand.py` from the homepage repository to package it alongside shared brand patterns. `scene.js` owns geometry and shaders, `directions.js` owns the ten directions and four sources, and `page.js` owns the shared short-copy layout.

## Visual verification

1. Target and north star: selected layout 11, original white-backed logo, yellow hero and the room reference's tactile device. The hero is a project gateway, with screenshots of the next projects entering the first viewport.
2. Before evidence: existing public concept 11 and the local room device, inspected in their running interfaces.
3. Ranked findings: the old menu had only a white logo rectangle; hero copy repeated claims and labels; static layered screens lacked the requested physical object and channel transitions.
4. Changes made: full white header, pared-down selected page, ten actual 3D right-side treatments, real screenshot channels, an illustrated reporter, manual controls and shareable comparison.
5. After evidence and checks: all ten variants inspected at 1440, 390 and 360 CSS pixels. No overflow, broken images or JavaScript/shader errors. Header is white and hero yellow throughout. First project images start at 941 px in a 1050 px desktop viewport, 801 px on a 390 by 844 phone and 762 px on a 360 by 844 phone. Automatic channel change, manual reporter selection, pause, reduced-motion startup, WebGL fallback, shortlist restoration and clipboard sharing were exercised in Chrome. Selected concept 11 was also checked at all three widths.
6. Verdict: pass for a public comparison. Peter has selected the layout, but has not yet selected one of these ten hero treatments.

The second visual pass prompted clearer word spacing, 44 px channel controls, a larger mobile model, a clearer reporter-state link and thinner mechanical tile seams. These changes were re-rendered at desktop and both mobile widths with no errors or overflow.
