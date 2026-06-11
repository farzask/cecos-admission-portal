# Design System Inspired by WHOOP

## 1. Visual Theme & Atmosphere

WHOOP's design system embodies a modern, performance-driven aesthetic that balances cutting-edge technology with approachable sophistication. The visual language is clean and minimalist, emphasizing clarity and focus through generous whitespace, bold typography, and strategic use of the signature vibrant blue accent. The dark backgrounds paired with high-contrast text create an energetic, forward-thinking atmosphere that speaks to health optimization and continuous self-improvement. The design conveys trust through precision, with a premium feel achieved through careful proportion and restraint rather than visual complexity.

**Key Characteristics**
- Minimalist, high-contrast visual hierarchy
- Premium wearable technology aesthetic
- Clean, modern typography-first approach
- Strategic use of electric blue for calls-to-action
- Dark and light mode-ready palette
- Generous whitespace for breathing room
- Performance-focused, data-driven visual language

## 2. Color Palette & Roles

### Primary
- **Primary Blue** (`#4A53FF`): Primary call-to-action buttons, key interactive elements, accent highlights throughout interface
- **Deep Black** (`#000000`): Primary text, headings, dominant backgrounds, primary content areas

### Accent Colors
- **White** (`#FFFFFF`): Secondary buttons, text on dark backgrounds, high-contrast elements
- **Light Accent** (`#ACCE00`): Tertiary highlights, status indicators, secondary accents (used sparingly)

### Interactive
- **Ghost Dark** (`#191919`): Disabled states, subtle background layers, secondary UI containers
- **Charcoal** (`#010101`): Near-black interactive elements, deep shadows

### Neutral Scale
- **Light Gray** (`#E5E7EB`): Primary neutral surface, borders, dividers, secondary backgrounds
- **Medium Gray** (`#666666`): Secondary text, helper text, muted labels
- **Pale Gray** (`#E5E5E5`): Subtle borders, hairline dividers
- **Off-White** (`#F3F5F9`): Subtle surface differentiation, light container backgrounds

### Surface & Borders
- **Default Border** (`#E5E7EB`): Primary border color for cards, inputs, containers
- **Subtle Border** (`#E5E5E5`): Secondary borders, minimal visual emphasis

## 3. Typography Rules

### Font Family
Primary: `proxima-nova`, fallback stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-------------------|-------|
| Display | proxima-nova | 120px | 400 | 96px | 0px | Hero headings, maximum emphasis |
| Heading 1 | proxima-nova | 50px | 600 | 50px | 0px | Major section headings |
| Heading 2 | proxima-nova | 25px | 600 | 25px | 0px | Subsection headings, card titles |
| Heading 3 | proxima-nova | 24px | 600 | 24px | 0px | Secondary headings, form labels |
| Heading 4 | proxima-nova | 24px | 500 | 26.4px | 0px | Tertiary headings, descriptive titles |
| Subheading | proxima-nova | 20px | 600 | 26px | 0px | Emphasis within body text |
| Body | proxima-nova | 16px | 400 | 20.8px | 0px | Primary body text, descriptions |
| Link | proxima-nova | 15px | 400 | 20px | 0px | Navigation links, inline links |
| Button | proxima-nova | 16px | 400 | 24px | 0px | Button text, interactive labels |
| Caption | proxima-nova | 12.8px | 400 | normal | 0px | Small text, helper text, form captions |
| Label | proxima-nova | 16px | 600 | normal | 0px | Form field labels, badge text |

### Principles
- Hierarchy is achieved through size and weight variation, not color alone
- Line heights provide generous vertical rhythm for readability
- Body text maintains 16px minimum for accessibility on all screen sizes
- Headings use proxima-nova exclusively for brand consistency
- Weight progression: 400 (regular) for body, 500–600 for emphasis and headings
- Letter spacing remains 0px throughout for tight, modern aesthetic

## 4. Component Stylings

### Buttons

#### Primary Button
- Background: `#4A53FF`
- Text Color: `#FFFFFF`
- Padding: `10px 20px`
- Border Radius: `20px`
- Border: `0px none`
- Font Size: `16px`
- Font Weight: `400`
- Line Height: `24px`
- Height: `40px`
- Hover State: Background `#3D44E6`, text `#FFFFFF`
- Active State: Background `#2E35CC`, text `#FFFFFF`
- Disabled State: Background `#CCCCCC`, text `#999999`

#### Secondary Button (White)
- Background: `#FFFFFF`
- Text Color: `#000000`
- Padding: `10px 20px`
- Border Radius: `20px`
- Border: `0px none`
- Font Size: `16px`
- Font Weight: `400`
- Line Height: `24px`
- Height: `40px`
- Hover State: Background `#F3F5F9`, text `#000000`
- Active State: Background `#E5E7EB`, text `#000000`

#### Ghost Button (Transparent)
- Background: `transparent`
- Text Color: `#FFFFFF`
- Padding: `10px 20px`
- Border Radius: `300px`
- Border: `1px solid #FFFFFF`
- Font Size: `16px`
- Font Weight: `400`
- Line Height: `24px`
- Height: `40px`
- Hover State: Background `rgba(255, 255, 255, 0.1)`, text `#FFFFFF`
- Active State: Background `rgba(255, 255, 255, 0.2)`, text `#FFFFFF`

#### Text Link Button
- Background: `transparent`
- Text Color: `#FFFFFF`
- Padding: `0px 0px`
- Border Radius: `0px`
- Border: `0px none`
- Font Size: `16px`
- Font Weight: `400`
- Line Height: `24px`
- Text Decoration: `underline`
- Hover State: Opacity `0.8`, text decoration `underline`

### Cards & Containers

#### Large Card Container
- Background: `transparent`
- Border: `0px solid #E5E7EB`
- Border Radius: `0px`
- Padding: `0px 0px`
- Text Color: `#000000`
- Font Size: `20px`
- Font Weight: `600`
- Line Height: `30px`
- Box Shadow: `none`
- Width: `74%`

#### Standard Card
- Background: `rgba(0, 0, 0, 0)`
- Border: `0px solid #E5E7EB`
- Border Radius: `24px`
- Padding: `20px 20px`
- Text Color: `#000000`
- Font Size: `16px`
- Font Weight: `400`
- Line Height: `20.8px`
- Box Shadow: `rgba(222, 222, 222, 0.2) 0px 4px 20px 0px`

#### Content Card
- Background: `#F3F5F9`
- Border: `1px solid #E5E7EB`
- Border Radius: `24px`
- Padding: `24px 24px`
- Text Color: `#000000`
- Font Size: `16px`
- Font Weight: `400`
- Line Height: `20.8px`
- Box Shadow: `none`

### Inputs & Forms

#### Text Input (Dark Background)
- Background: `#000000`
- Text Color: `#FFFFFF`
- Border: `0px none`
- Border Radius: `0px`
- Padding: `0px 0px`
- Font Size: `16px`
- Font Weight: `400`
- Line Height: `24px`
- Height: `40px`
- Placeholder Color: `#999999`
- Focus State: Border `1px solid #4A53FF`, box shadow `0px 0px 0px 3px rgba(74, 83, 255, 0.1)`

#### Text Input (Light Background)
- Background: `#FFFFFF`
- Text Color: `#000000`
- Border: `1px solid #D1D1D1`
- Border Radius: `50px`
- Padding: `6px 15px`
- Font Size: `12.8px`
- Font Weight: `400`
- Line Height: `normal`
- Height: `31px`
- Placeholder Color: `#999999`
- Focus State: Border `1px solid #4A53FF`, box shadow `0px 0px 0px 3px rgba(74, 83, 255, 0.1)`

#### Search Input
- Background: `#FFFFFF`
- Text Color: `#000000`
- Border: `1px solid #D1D1D1`
- Border Radius: `50px`
- Padding: `6px 35px 6px 15px`
- Font Size: `12.8px`
- Font Weight: `400`
- Line Height: `normal`
- Height: `31px`
- Icon Position: Right `12px`
- Focus State: Border `1px solid #4A53FF`

### Navigation

#### Header Navigation
- Background: `#000000`
- Height: `72px`
- Text Color: `#FFFFFF`
- Font Size: `16px`
- Font Weight: `400`
- Line Height: `24px`
- Padding: `0px 24px`
- Border Bottom: `1px solid #E5E7EB`
- Active Link: Text Color `#4A53FF`, font weight `600`
- Hover State: Text Color `#E5E7EB`

#### Navigation Link
- Text Color: `#FFFFFF`
- Font Size: `15px`
- Font Weight: `400`
- Line Height: `20px`
- Hover State: Text Color `#E5E7EB`, opacity `0.9`
- Active State: Text Color `#4A53FF`, font weight `600`
- Text Decoration: `none`

## 5. Layout Principles

### Spacing System
Base unit: `4px`

**Spacing Scale:**
- `4px` — Micro spacing, icon padding, tight grouping
- `8px` — XS gap, element clustering
- `12px` — S gap, internal spacing
- `16px` — M gap, standard element separation
- `20px` — L padding, component internal spacing
- `24px` — XL padding, section padding, card spacing
- `28px` — XXL padding, block spacing
- `32px` — XXXL gap, major section separation
- `36px` — Heading spacing, large padding
- `40px` — Margin between sections
- `44px` — Large component padding
- `48px` — Hero section padding, maximum internal spacing

### Grid & Container
- Max container width: `1200px` (inferred from component widths)
- Columns: 12-column grid system
- Gutter: `24px` between columns
- Section padding: `40px–48px` vertical, `24px–36px` horizontal
- Full-width hero sections with contained content overlay
- Asymmetric layout support (e.g., 74% width cards)

### Whitespace Philosophy
Generous whitespace is fundamental to WHOOP's design. Empty space is treated as a design element, creating visual hierarchy and reducing cognitive load. Large heading + ample surrounding space creates impact. Navigation and hero sections use full-width containers with internal padding rather than narrow columns. Body sections maintain breathing room between cards and content blocks to guide user focus.

### Border Radius Scale
- `0px` — Sharp edges for hero sections, full-width containers, typography-heavy areas
- `20px` — Moderate rounding for secondary buttons, small interactive elements
- `24px` — Standard rounding for cards, images, containers
- `50px` — Fully rounded for pill-shaped inputs, search boxes, icon buttons
- `50% / 300px` — Circle for avatar and icon buttons

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow | Hero text, backgrounds, flat UI elements |
| Surface (1) | `rgba(222, 222, 222, 0.2) 0px 4px 20px 0px` | Cards, dropdowns, floating content |
| Elevated (2) | `rgba(0, 0, 0, 0.1) 0px 8px 32px 0px` | Modal overlays, popovers, sticky elements |
| Modal (3) | `rgba(0, 0, 0, 0.25) 0px 16px 64px 0px` | Modals, drawers, full-screen overlays |

**Shadow Philosophy:**
Shadows are subtle and used sparingly to indicate depth without creating visual heaviness. The primary shadow (`rgba(222, 222, 222, 0.2) 0px 4px 20px 0px`) is soft and diffuse, suggesting lift rather than harsh separation. This aligns with the clean, minimalist aesthetic. Dark backgrounds reduce shadow visibility, so shadows are applied primarily on light surfaces. Elevated layers use slightly stronger shadows to create clear depth differentiation.

## 7. Do's and Don'ts

### Do
- Use the Primary Blue (`#4A53FF`) for all primary CTAs and key interactive moments
- Maintain high contrast between text and background for accessibility (WCAG AA minimum)
- Apply ample whitespace around headings to create visual emphasis
- Use proxima-nova exclusively for typography across all interfaces
- Implement 16px minimum font size for all body text
- Stack components vertically with consistent `24px–32px` spacing
- Layer depth through subtle shadows on cards and elevated surfaces
- Use weight and size variation for hierarchy, not color alone
- Keep border radius consistent: `0px` for full-width, `24px` for contained cards
- Test all interactive elements at mobile touch target sizes (minimum `44px × 44px`)

### Don't
- Avoid multiple accent colors competing for attention; reserve blue for primary actions
- Don't reduce font sizes below `12.8px` without explicit accessibility review
- Avoid harsh shadows; use soft, diffuse blur for depth
- Don't use color as the only way to communicate status; pair with iconography or text
- Avoid rounded corners on hero sections and full-width containers
- Don't justify body text; use left alignment for legibility
- Avoid using more than two font weights in a single view (typically 400 and 600)
- Don't apply multiple text decorations (underline + bold) without clear hierarchy
- Avoid cramped spacing; use minimum `16px` gap between interactive elements
- Don't override default focus states; always provide visible keyboard navigation indicators

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | 320px–479px | Single column, full-width buttons, 16px–20px side padding, large touch targets |
| Tablet | 480px–767px | Two-column layout option, 20px–24px padding, navigation drawer or horizontal scroll |
| Small Desktop | 768px–1023px | Three-column grid, 24px–32px padding, horizontal navigation visible |
| Desktop | 1024px–1439px | Full layout, max-width containers at 1200px, optimal reading widths |
| Large Desktop | 1440px+ | Consistent max-width, increased side margins, optional multi-column content |

### Touch Targets
- Minimum interactive element size: `44px × 44px` (buttons, links, form controls)
- Navigation items: `48px` height with `16px–20px` horizontal padding
- Icon buttons: `40px` minimum, `44px` recommended
- Form inputs: `40px–44px` height for thumb-friendly interaction
- Spacing between touch targets: minimum `8px` to prevent accidental taps

### Collapsing Strategy
- Hero images scale responsively; text remains readable through overlay or contrast
- Cards transition from two-column (desktop) to single-column stacking (tablet/mobile)
- Navigation collapses to hamburger menu below 768px
- Large heading sizes reduce proportionally: H2 from `120px` down to `48px` on mobile
- Section padding reduces from `48px` to `20px` vertically on mobile
- Grid columns collapse from 12 to 6 to 4 to 2 to 1 as viewport shrinks
- Full-width containers maintain internal padding; never edge-to-edge on mobile without intentional design

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** Primary Blue (`#4A53FF`) — all primary buttons and key interactive states
- **Secondary CTA:** White (`#FFFFFF`) — secondary buttons and high-contrast elements on dark backgrounds
- **Background:** Deep Black (`#000000`) — hero sections, dark containers, primary surfaces
- **Surface:** Light Gray (`#E5E7EB`) — neutral backgrounds, borders, secondary containers
- **Text (Dark):** Deep Black (`#000000`) — primary heading and body text on light backgrounds
- **Text (Light):** White (`#FFFFFF`) — text on dark backgrounds, navigation
- **Accent:** Light Accent (`#ACCE00`) — tertiary highlights, sparse use only
- **Disabled/Muted:** Medium Gray (`#666666`) — disabled states, secondary text, helper text
- **Border:** Light Gray (`#E5E7EB`) — card borders, dividers, input strokes
- **Shadow:** `rgba(222, 222, 222, 0.2) 0px 4px 20px 0px` — card elevation, subtle depth

### Iteration Guide

1. **Typography Foundation:** All text must use proxima-nova; establish clear hierarchy via size (Display 120px → Body 16px) and weight (400 regular, 600 bold). Minimum body text 16px for accessibility.

2. **Color Discipline:** Use Primary Blue (`#4A53FF`) exclusively for primary actions; reserve white and black for contrast and backgrounds. Secondary elements use grays; restrict `#ACCE00` to rare accent moments.

3. **Spacing Rigor:** Apply consistent spacing from the scale (`16px`, `24px`, `32px`, `48px`); never freehand. Headings receive ample surrounding whitespace (`40px–48px` above and below). Internal padding follows `20px–24px` for cards and containers.

4. **Button Consistency:** All buttons follow one of three patterns: Primary Blue solid, White solid, or Ghost (transparent with border). Maintain `40px` height minimum with `10px` horizontal padding for proper touch targets.

5. **Card & Elevation Rules:** Cards use `border-radius: 24px`, light gray backgrounds (`#F3F5F9` or `#FFFFFF`), and the standard shadow `rgba(222, 222, 222, 0.2) 0px 4px 20px 0px`. Hero sections and full-width blocks use `border-radius: 0px` and no shadow.

6. **Form & Input Styling:** Light inputs use `border-radius: 50px`, `#FFFFFF` background, `1px solid #D1D1D1` border, and `31px–40px` height. Dark inputs use `#000000` background with `#FFFFFF` text; no border by default. Focus state adds blue outline.

7. **Navigation & Links:** Header navigation on `#000000` background with white text (`#FFFFFF`), `72px` height, and active state in Primary Blue. Link text is `15px–16px`, white, with underline on hover; no color change required.

8. **Responsive & Touch:** Maintain minimum `44px` interactive target. Collapse navigation to drawer below 768px. Stack columns; reduce heading sizes (H2: 120px → 48px on mobile). Preserve `16px–20px` side padding on all breakpoints.

9. **Accessibility Compliance:** Ensure WCAG AA contrast (4.5:1 for text). Provide visible focus indicators (`0px 0px 0px 3px rgba(74, 83, 255, 0.1)`). Avoid color-only status communication; pair with icons or text. Test keyboard navigation.

10. **Component Defaults:** Cards default transparent with subtle shadow; buttons default to Primary Blue with white text; inputs inherit from context (dark or light). Icon buttons use `40px` with `border-radius: 300px` (pill). All borders use `#E5E7EB` by default.