# 🟡 Homepage review, 24 October 2026

Peter selected **04 Sora ExtraBold** and requested several rounds of independent designer and marketer critiques, with a Jobs-inspired product perspective deciding what ships. Sora was deployed first.

This is a design exercise using inspired perspectives, not statements by Jony Ive, Steve Jobs, David Ogilvy or Bill Bernbach. The reviewers inspected the rendered desktop and phone pages. Their judgments are not visitor research or measured conversion results.

## The job

A new visitor should understand that Žltá stopa collects useful visual projects around public data about Slovakia, see something personally interesting and open a project. Keep the distinctive yellow joke and physical board. Preserve equal lead status for budget and food access, editable images, the investigative toolkit, honest data qualifiers and usable phones.

## Round 1: independent top five

| Priority | Design, Ive-inspired | Marketing, Ogilvy/Bernbach-inspired | Product, Jobs-inspired |
| --- | --- | --- | --- |
| 1 | Name public data and the human reason to explore in the existing hero paragraph. | Give board captions a useful question rather than a filing label. | Make the subject and scope explicit after the joke. |
| 2 | Fix the visually fused “Keďniečo” word gap. | Explicitly identify the collection as public data about Slovakia. | Send the main CTA directly to the budget as the strongest demonstration. |
| 3 | Prototype featured project titles above screenshots so the first-fold peek has meaning. | Test a direct budget demonstration instead of a generic browse CTA. | Replace opaque board names with useful descriptive handles. |
| 4 | Explain Letokruhy with “Vek poslancov” on the board. | Remove the advanced toolkit from primary navigation. | Remove the premature join request from primary navigation and clarify the journalist route. |
| 5 | Explain the investigative workflow without unexplained “Skills”. | Let people submit a project by email without joining Discord. | Restore an optically clear gap between the headline's first two words. |

### Binding build decision

The product perspective chose five changes. It did not count votes or average the proposals.

1. **Clarify the category.** Replace the existing hero paragraph with “Verejné dáta o Slovensku. / Mapy, grafy a nástroje na jednom mieste.” The joke wins attention; this sentence identifies the collection.
2. **Make the board understandable.** Use questions for budget and food access and “Vek poslancov” for the parliamentary chart. The real screenshots now have a reason to click before a visitor recognises each product.
3. **Focus the top menu.** Remove “Toolkit”. Keep the existing folder and specialist section as the audience-specific route. Retain “Projekty”, “Pridaj sa” and GitHub.
4. **Match the contribution action to the invitation.** “Pošli nám projekt” opens the existing public email address. Discord remains available in the footer, without making community membership a prerequisite for submitting a link.
5. **Finish Sora's typesetting.** Increase the first word gap to .32em and keep the three lines. Preserve the white final-line highlight and readable narrow-phone composition.

**Rejected: direct-budget hero CTA.** Both the marketer and the product reviewer initially preferred it as an immediate demonstration. The product reviewer changed that decision after weighing the explicit collection goal: favouring one app would narrow the identity and weaken food access's equal prominence. “Pozrieť projekty” remains the main action.

**Deferred: titles above featured screenshots.** The designer defended a more meaningful first-fold peek. The product decision preserves actual image visibility and avoids spending scarce fold space. The improved board captions provide project meaning without shrinking the board or images.

**Overridden: remove the join link from the header.** Keep the collection's contribution route. Removing the advanced toolkit is sufficient simplification for this pass.

## Round 2: challenge the rendered revision

The new category sentence and board labels made the collection clearer. The design reviewer withdrew the title-position change as a shipping priority, while preserving it as a future hypothesis. The marketer retained the direct-budget conversion hypothesis without treating it as a blocker.

Two final refinements were approved:

- The initial food caption “Kde sú potraviny?” needed 68 px in a 58 px caption slot at 320 px. “Potraviny v obci” still needed 60 px. **“Kde nakúpiš?”** fits at 51 px. Use that single caption at every width, without responsive duplicate labels or a smaller font. The designer prefers the literal “Potraviny”; the product reviewer chose the useful question and accepted its broader shopping wording.
- Replace only **“Skills” with “Postupy”** in the specialist paragraph. Retain the explicit AI-agent scope and the existing audience description. The designer considered the technical wording acceptable for specialists; the product reviewer chose the lower language barrier.

A full-phone QA image showed blank budget previews even though the first-fold capture contained them. The reviewers held visual acceptance until the state was recaptured. Fresh image decoding, a completed paint and another capture showed both images correctly, with no failed requests. No product workaround was added for this capture problem.

## Round 3: final ruling

All three reviewers inspected the final desktop and phone renders. The designer and marketer found no material remaining blockers. The product reviewer issued **SHIP**, conditional on native interaction and public-site verification.

Dissent remains recorded: direct budget demonstration, literal food wording and titles before screenshots are hypotheses, not part of this release. No new section, metric, animation, signup or decorative mechanism was added.

## Verification

- Rendered at 1440, 1280, 1920, 1024, 768, 760, 390 and 320 CSS pixels, with representative short desktop heights.
- Sora loaded at weight 800; all headline lines fit. Text remains complete for assistive technology.
- Board and screenshot dimensions match the Sora-only baseline. Both actual lead images remain visible above the desktop fold.
- All captions fit without truncation, including 320 px. Budget screenshots are present in first-fold and full-phone renders.
- Keyboard project CTA and toolkit-folder anchors, native contribution email, footer Discord, image loading and no-JavaScript project links checked.
- Final public assets and rendered page verified after deployment.
