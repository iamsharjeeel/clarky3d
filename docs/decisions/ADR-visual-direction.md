# ADR: Visual direction selection

**Date:** 2026-08-11  
**Status:** provisional (no human response; agent-selected)  
**Concepts:** `/design-concepts/editorial`, `/design-concepts/spatial` (noindex)

## Options

### Direction A — Editorial Gallery

Strong editorial typography, asymmetric media-led grid, large product imagery with
captions, calm transitions, premium catalogue atmosphere. Brand retained via cyan/dark
field, pixel wordmark, Space Mono meta, playful published voice.

### Direction B — Spatial Studio

Layered depth, modular bays, cinematic framing, selective parallax-like motion with
static/reduced-motion equivalents. Same brand tokens; heavier compositional chrome.

## Weighted evaluation

| Criterion | Weight | Editorial (A) | Spatial (B) | Notes |
| --- | --- | --- | --- | --- |
| Brand continuity | 20% | 4.5 | 4.0 | Both keep cyan/pixel; A uses wordmark more heroically |
| First-screen comprehension | 15% | 4.5 | 3.5 | A states offer beside large media; B risks depth competing with copy |
| Portfolio / catalogue storytelling | 15% | 4.5 | 4.0 | A captions + asymmetric features; B cinematic but denser |
| Visual distinction from legacy | 15% | 4.5 | 4.5 | Both break dense equal grids; A clearer break from button-chrome |
| Accessibility | 15% | 4.5 | 3.5 | Parallax/layers need more reduced-motion care |
| Mobile quality | 10% | 4.5 | 3.5 | Editorial stacks cleanly; spatial layering harder at 320–390 |
| Performance / resilience | 10% | 4.5 | 3.5 | A is CSS/image only; B invites more motion/compositing |
| **Weighted total** | 100% | **4.46** | **3.84** | |

Scores are 1–5 evidence-informed judgments from concepts + audit constraints.

## Decision

**Proceed with Direction A — Editorial Gallery** for production implementation.

Rationale: best balance of brand continuity, buyer comprehension, accessibility, and
meaningful difference from the legacy dense SPA grid—without inventing agency proof or
adding mandatory WebGL.

## Consequences

- Production shell, home, catalogue, product, how-it-works, about, and contact adopt
  editorial tokens/components.
- Spatial concept remains available at `/design-concepts/spatial` for owner comparison.
- Trust/testimonial sections stay omitted until approved evidence exists.
