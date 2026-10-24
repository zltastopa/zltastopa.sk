# 🟡 Ten headline fonts

Public comparison: <https://zltastopa.sk/navrhy/pismo/>. Select 01–10 to change only the headline in the actual homepage. Each selection has a shareable `?font=1` through `?font=10` URL. Option 04, Sora ExtraBold, is the selected and shipped font. “Na webe” shows the current homepage typography. The comparison opens on Sora.

`fonts.json` holds the families, actual weights and tracking. `fonts/` contains locally hosted Latin/Latin Extended subsets and the ten upstream OFL licenses. Static instances are generated from the indicated axes. Derived font family names are prefixed `Stopa Study`; outlines retain the upstream designs. Source files: [Google Fonts repository](https://github.com/google/fonts/tree/main/ofl).

The headline retains its Slovak copy and three lines. A width check after font loading keeps the last line inside the available column at desktop and phone widths, without stretching the letterforms. Board, screenshots, copy and links come from the current generated homepage.

The homepage build automatically refreshes this preview. Run `python3 navrhy/pismo/build.py` to refresh it independently. It refreshes `preview.html`, font declarations and metadata. Canonical gallery CSS is `../../../design-system/patterns/type-study.css`; the packaged `study.css` works in a standalone clone. Fonts require no external runtime requests.

Verification: all ten fonts at 1440, 1280, 390 and 320 CSS pixels; no headline overflow, missing fonts or JavaScript errors. Slovak glyph coverage checked in each font file. The current-homepage reference matches production. Picker, next/previous, gallery selection, mobile navigation, copied links and visible copy feedback pass. Independent rendered-image review found no material typography issues.
