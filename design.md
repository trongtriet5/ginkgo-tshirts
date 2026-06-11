# Ginkgo original quality clothing & accessories from vietnam

## Mission
Create implementation-ready, token-driven UI guidance for Ginkgo original quality clothing & accessories from vietnam that is optimized for consistency, accessibility, and fast delivery across e-commerce storefront.

## Brand
- Product/brand: Ginkgo original quality clothing & accessories from vietnam
- URL: https://ginkgotshirts.com/en/
- Audience: online shoppers and consumers
- Product surface: e-commerce storefront

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=Noto Sans`, `font.family.stack=Noto Sans, sans-serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=20px`
- Typography scale: `font.size.xs=10px`, `font.size.sm=12px`, `font.size.md=12.8px`, `font.size.lg=14px`, `font.size.xl=15px`, `font.size.2xl=16px`, `font.size.3xl=17.6px`, `font.size.4xl=18.4px`
- Color palette: `color.surface.base=#000000`, `color.text.secondary=#232323`, `color.text.tertiary=#007bff`, `color.text.inverse=#808080`, `color.surface.muted=#ffffff`, `color.surface.raised=#fcf8f8`, `color.surface.strong=#f1f1f1`
- Spacing scale: `space.1=1px`, `space.2=2px`, `space.3=4px`, `space.4=4.8px`, `space.5=6px`, `space.6=8px`, `space.7=9.6px`, `space.8=10px`
- Radius/shadow/motion tokens: `radius.xs=25px`, `radius.sm=30px`, `radius.md=40px`, `radius.lg=50px` | `motion.duration.instant=300ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (165), lists (25), inputs (17), buttons (16), cards (4), navigation (1).


## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
