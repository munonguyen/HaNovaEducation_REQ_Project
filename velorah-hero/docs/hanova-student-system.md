# HaNova Student System Direction

This document extends the existing homepage into a full student-facing product without breaking its visual identity.

## Source Of Truth

The current visual DNA already exists in:

- `src/pages/Home.tsx`: full-screen rounded cinematic video frame, serif-led editorial hero, soft glass notices, restrained CTA rhythm.
- `src/components/Navigation.tsx`: bottom-center capsule, floating dark menu panel, logo-divider-menu behavior, soft blur overlay.
- `src/layouts/Layout.tsx`: starfield base layer plus internal-page video haze.
- `src/index.css`: dark glass surfaces, amber primary action, indigo support tones, slow-motion ambient atmosphere.

The rest of the system should feel like these elements evolved, not like a second product was attached.

## Product Positioning

HaNova is not a tutor marketplace and not a dashboard SaaS. It is a cinematic academic sanctuary where students enter, choose guidance, book with confidence, and track progress with calm clarity.

Core principles:

- Use a single large rounded content frame as the main spatial anchor on major screens.
- Keep dark immersive backgrounds and soft motion continuity.
- Prefer one strong block plus two or three supporting blocks instead of many widgets.
- Treat glass as accent material, not the entire page surface.
- Preserve generous empty space and editorial pacing.
- Use serif for meaning and sans-serif for systems.

## System Frame

## Before login

Bottom floating capsule remains the universal anchor:

- `Logo | divider | MENU`
- Menu items: Home, Find Tutors, Study Experience, Sign In, Get Started

Sign-up is the primary action:

- Hero CTA becomes `Begin Your Learning Journey`
- Menu includes a subtly accented `Get Started` row with amber-tinted border and softer glow than the homepage primary button
- One supporting CTA section lower on the homepage invites students to “Create your learning space.”

## After login

The capsule stays unchanged in position and proportion, but the menu becomes contextual:

- Account identity strip appears directly below the menu header
- Menu items: Dashboard, Find Tutors, My Schedule, Study Plans, Notifications, Profile, Settings, Log Out
- Account strip content: avatar/initials, student name, `Academic journey active`, small text actions for Profile and Settings

The account strip should feel embedded into the menu shell, not like a standalone profile card.

## Shared Screen Anatomy

Use these primitives across the system:

- `Cinematic Frame`: 28px to 40px rounded outer shell with shadowed edge and subtle interior stroke.
- `Editorial Header`: small uppercase pretitle, large serif headline, one restrained supporting paragraph.
- `Focus Module`: the largest block on the page, used for the next lesson, current plan, booking summary, or payment confirmation.
- `Quiet List`: vertically spaced rows with soft separators, no dense tables.
- `Identity Strip`: compact glass row for tutor or student identity.
- `Floating Action`: one primary rounded CTA per page, never multiple competing primaries.

## Authentication

## Sign-up

Purpose: make entry feel like joining a guided academic world, not completing a utility form.

Layout:

- Reached from homepage hero CTA, menu CTA, and one lower supporting homepage section.
- Page or modal opens inside the same large rounded cinematic frame.
- Left side carries emotional copy and a dim academic visual or looping ambient video.
- Right side holds the form in a glass panel with generous padding.

Hierarchy:

- Pretitle: `Begin`
- Heading: `Create your learning space.`
- Supporting copy: `Start with structure, stay with progress.`
- Fields: full name, email, password, confirm password, academic goal or subject interest, school or university, terms checkbox
- Primary CTA: `Join HaNova`
- Secondary text link: `Already part of HaNova? Sign in`

Style:

- Darkened environment, soft amber edge-light, blurred cinematic backdrop, serif headline, system-grade inputs with low-contrast borders.
- Fields appear sequentially in two soft waves rather than all at once.

Motion:

- Background dims first.
- Shell rises 18px while fading in.
- Left copy appears, then form fields stagger upward at 40ms to 60ms intervals.
- Success state transitions to a calm confirmation panel before entering the dashboard.

## Sign-in

Purpose: welcome returning students back into the same atmosphere.

Layout:

- Same shell as sign-up, slightly quieter visual treatment.
- Form centered more tightly with a smaller copy rail.

Hierarchy:

- Heading: `Welcome back to your learning space.`
- Fields: email, password, forgot password
- Primary CTA: `Sign In`
- Secondary link: `Create your account`

Style and motion:

- Same material system as sign-up, but with less accent emphasis.
- Returning-user motion is quicker and slightly less theatrical.

## Screen Direction

## Dashboard / Sanctuary

Purpose: a calm academic home after login.

Layout: one dominant hero block for the next lesson, then a two-column secondary zone for active study plan and quiet notifications, then a slim weekly rhythm strip.

Hierarchy: greeting, next lesson, current plan, next actions, latest messages.

Style: less “dashboard”, more lounge-like study control room; use large modules and soft dividers.

Motion: hero module fades and settles first, then supporting modules arrive with delayed upward drift.

Continuity: keep the internal video haze from `Layout.tsx`; preserve bottom capsule unchanged.

## Tutor Discovery

Purpose: curated discovery without marketplace noise.

Layout: editorial filter rail at top, one featured tutor lane, then a two-column staggered list instead of a tight three-column grid.

Hierarchy: search, subject and availability filters, featured matches, more mentors.

Style: larger portrait ratios, fewer badges, short trust signals, price and availability near CTA.

Motion: filters fade in as one strip; tutor rows stagger by group.

Continuity: cards become quieter, taller, and more portrait-led than the current `Tutors.tsx` grid.

## Tutor Detail

Purpose: build trust through identity, expertise, and teaching fit before asking for a booking.

Layout: portrait and identity in the first frame, expertise and teaching style in the next band, reviews and availability below, booking CTA pinned within the main reading flow.

Hierarchy: name, teaching philosophy, credentials, student outcomes, availability preview, price, booking.

Style: magazine-like composition with strong whitespace and one warm accent line.

Motion: portrait and name appear first; secondary sections reveal as the student scrolls.

Continuity: preserve the current asymmetrical editorial feel, but reduce decorative density and correct the booking CTA prominence.

## Booking Flow

Purpose: move from trust to commitment with very little friction.

Layout: three-step horizontal story inside one rounded shell: time, format and notes, confirmation summary.

Hierarchy: selected tutor strip, slot picker, lesson format, policy note, booking summary, continue CTA.

Style: time slots feel like elegant selection chips, not app scheduler cells.

Motion: each step slides softly with fade; summary grows clearer as choices are made.

Continuity: treat the modal as a lifted layer from the same cinematic environment, not as a utility dialog.

## Payment Flow

Purpose: provide calm trust around a sensitive action.

Layout: left column summary, right column payment methods, bottom confirmation note.

Hierarchy: session summary, tutor, date/time, payment method, cancellation policy, confirm payment.

Style: restrained financial language, subtle trust markers, dark form surfaces with clear focus states.

Motion: method panels cross-fade; confirmation uses a soft amber pulse, never a bright celebratory flash.

Continuity: payment remains wrapped in the same rounded glass shell and internal video haze.

## Schedule

Purpose: help students feel their academic rhythm, not manage a corporate calendar.

Layout: week view ribbon at top, upcoming sessions in a central column, completed sessions and self-study blocks in a quieter secondary panel.

Hierarchy: this week, next lesson, upcoming, completed, reschedule or cancel actions.

Style: timeline and ribbon language over dense month-grid logic.

Motion: date changes glide horizontally; day details rise in gently.

Continuity: use soft separators and calm spacing rather than calendar chrome.

## Lesson Detail

Purpose: make the next lesson legible and actionable.

Layout: one core focus block containing date, tutor, objective, preparation notes, attached study plan, and action footer.

Hierarchy: lesson title, date/time, tutor identity, goal, prep, linked plan, reschedule or cancel.

Style: keep everything readable in one calm frame with emphasis on the next required action.

Motion: primary details load together; secondary notes and attachments reveal after.

Continuity: feels like a focused page extracted from the sanctuary, not a record screen.

## Study Plans

Purpose: turn HaNova’s roadmap into the product’s signature screen.

Layout: large horizontal milestone path or vertical chapter journey with one current milestone expanded and adjacent recommendations.

Hierarchy: overall target, current stage, tasks, tutor notes, recommended focus areas, next milestone.

Style: roadmap language, subtle path lines, numbered stages, very limited charting.

Motion: milestone progression animates as a slow trace, not as data visualization.

Continuity: this is the strongest branded differentiator and should inherit homepage grandeur.

## Progress Tracking

Purpose: show momentum without drifting into analytics software.

Layout: a single progress overview band, then three supporting measures: lessons completed, milestones reached, next goals.

Hierarchy: percentage or stage marker first, then narrative interpretation.

Style: calm indicators, thin progress lines, milestone dots, very light micro-chart usage.

Motion: numbers count softly; lines fill gradually.

Continuity: insight remains editorial and human, not numerical-first.

## Notifications

Purpose: keep updates purposeful and low-noise.

Layout: grouped message stream by type or recency inside a quiet reading panel.

Hierarchy: today, upcoming, earlier; each item shows event type, message, relevant action.

Style: each message behaves like a premium note card with one accent marker, not a busy notification feed.

Motion: items fade in by cluster; dismissals collapse smoothly.

Continuity: keep the same serif/sans hierarchy and dark glass restraint.

## Profile / Settings

Purpose: give students a refined account environment tied back to the menu identity strip.

Layout: identity header first, then grouped sections for personal info, learning preferences, saved tutors, payment history, security.

Hierarchy: profile, preferences, billing, security.

Style: settings rows feel like editorial forms, not admin tables.

Motion: sections appear progressively; edit states expand inline.

Continuity: the menu account strip should feel like the miniature version of this page header.

## Support / Help

Purpose: resolve issues without breaking the calm mood.

Layout: search or quick-help prompt at top, curated help topics in the middle, direct contact at bottom.

Hierarchy: urgent help first, common answers second, contact third.

Style: quiet and high-trust; avoid customer-support clutter.

Motion: results and suggested topics fade in within the same shell structure.

Continuity: support remains part of the sanctuary rather than a detached help center.

## Account Identity In Menu

Structure:

- Avatar or initials
- Student name
- Status line: `Academic journey active`
- Two quick actions: `Profile`, `Settings`

Behavior:

- Before login, this area is occupied by a sign-up emphasis row.
- After login, the row swaps into identity with no layout jump.
- Hover states remain understated; the strip should not compete with menu links.

## Motion Rules

- Use fade plus 12px to 24px upward drift as the default entrance.
- Use stagger only for related sibling items.
- Avoid hard page cuts when moving between homepage, auth, tutors, booking, and dashboard.
- Let overlays darken the environment before the foreground shell appears.
- Keep animation curves close to the existing `cubic-bezier(0.16, 1, 0.3, 1)` and `cubic-bezier(0.22, 1, 0.36, 1)`.

## Content Tone

- Calm
- Warm
- Intelligent
- Guided
- Premium
- Academically reassuring

Avoid:

- Loud marketing
- Playful EdTech language
- Bureaucratic labels
- Dense data jargon

## Immediate Design Corrections To Current Build

- `Tutors.tsx` should move away from the current marketplace-like multi-card density toward curated discovery lanes.
- `Dashboard.tsx` should become a sanctuary with fewer, larger zones and more spatial calm.
- The current booking modal is directionally right, but the payment step should feel more trust-led and less placeholder-like.
- The menu should gain a sign-up emphasis pre-login and an identity strip post-login before more routes are added.
