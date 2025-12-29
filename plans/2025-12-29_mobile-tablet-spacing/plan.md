# Spec Provenance

**Date**: 2025-12-29  
**Author**: User request  
**Context**: Kwapong Foundation static website experiencing mobile/tablet spacing issues - sections appear too close together on smaller screens.

---

# Spec Header

## Name
Mobile & Tablet Spacing Optimization for Kwapong Foundation Website

## Smallest Acceptable Scope
Fix spacing and padding across all sections for mobile (≤768px) and tablet (769px-1024px) devices to create comfortable, consistent vertical rhythm without redesigning layouts or modifying HTML structure.

## Non-Goals
- Complete mobile redesign or layout restructuring
- Touch interaction enhancements
- Performance optimization
- HTML changes or new components
- Design system overhaul
- Adding new features

---

# Paths to Supplementary Guidelines

No specific Memex design guidelines apply - this is a pure CSS spacing fix for an existing static site. The site already has its own design system based on the Crimson Warriors app palette (Zen Greens & Blues).

**Reference materials**:
- Existing design system: Variables defined in `css/styles.css` lines 1-75
- Current breakpoints: Lines 1337-1520 in `css/styles.css`

---

# Decision Snapshot

## Problem Analysis
1. **Current state**: Site uses `clamp(80px, 12vh, 140px)` for section padding
2. **Mobile override**: Only reduces to `var(--space-48)` (48px) - still too cramped
3. **Missing tablet refinement**: Tablet breakpoint exists but lacks proper spacing adjustments
4. **Inconsistent component spacing**: Grids, cards, and hero elements don't scale gracefully

## Technical Approach
- **Pure CSS fix**: No HTML changes required
- **Breakpoint strategy**:
  - Mobile (≤768px): Reduce section padding to 32-40px vertical
  - Tablet (769px-1024px): Use 48-64px vertical padding
  - Component-level adjustments for grids, cards, buttons
- **Preserve existing design**: Keep colors, typography, layouts intact

## Key Decisions
1. **Spacing scale for mobile**:
   - Sections: 32px vertical (down from 48px)
   - Between elements: 16-24px (down from 32-48px)
   - Card padding: 20px (down from 32px)
   
2. **Tablet intermediate values**:
   - Sections: 48-56px vertical
   - Preserve most desktop spacing patterns
   
3. **Priority sections** (all will be fixed, but these are critical):
   - Hero section (first impression)
   - Mission cards grid
   - App showcase
   - Testimonials slider
   - Donate section
   - Contact form

---

# Architecture at a Glance

```
css/styles.css
├── Variables (lines 1-75) ← No changes needed
├── Base styles (lines 76-420) ← Minor adjustments
├── Section styles (line 419+) ← Update padding values
├── Component styles ← Update internal spacing
└── Media queries (1337+)
    ├── Mobile (≤768px) ← Primary work area
    ├── Tablet (769px-1024px) ← Secondary adjustments
    └── Small mobile (≤480px) ← Refinements
```

**No new files needed** - all changes in existing `css/styles.css`

---

# Implementation Plan

## Phase 1: Analyze Current Spacing Issues (15 min)
**Goal**: Document exact spacing problems in current media queries

1. Read full `css/styles.css` to map all section-specific styles
2. Note current mobile spacing values:
   - Section padding
   - Grid gaps
   - Card/component padding
   - Hero elements
   - Form elements
3. Identify specific pain points causing "too close" feeling

## Phase 2: Update Mobile Breakpoint (≤768px) (30 min)
**Goal**: Fix spacing for phones and small tablets

### 2.1 Section-level spacing
```css
@media (max-width: 768px) {
    section {
        padding: var(--space-32) 0; /* Down from 48px */
    }
    
    .section-title {
        margin-bottom: var(--space-32); /* Down from 48px */
    }
}
```

### 2.2 Hero section adjustments
- Reduce hero padding to 40px vertical
- Adjust hero-cta gap to 12-16px
- Ensure hero tagline has proper breathing room (16px margins)
- Reduce hero button padding for better proportions

### 2.3 Grid and card spacing
- Mission grid: gap from 32px → 20px
- Services grid: gap from 20px → 16px
- Card internal padding: 32px → 20px
- Involvement grid: gap from default → 16px

### 2.4 Component-specific fixes
- Testimonial slider: reduce spacing between quotes
- Donate amount options: tighter grid gap (12px)
- Contact form: adjust field spacing (16px between fields)
- Footer columns: reduce gap to 24px

### 2.5 Typography breathing room
- Add proper margin-bottom to headings within sections (16px)
- Ensure paragraphs have 12-16px spacing
- Fix any zero-margin elements causing crush

## Phase 3: Refine Tablet Breakpoint (769px-1024px) (20 min)
**Goal**: Create intermediate spacing that doesn't feel cramped but isn't as spacious as desktop

### 3.1 Section spacing
```css
@media (min-width: 769px) and (max-width: 1024px) {
    section {
        padding: clamp(48px, 8vh, 64px) 0;
    }
    
    .section-title {
        margin-bottom: var(--space-32);
    }
}
```

### 3.2 Layout adjustments
- 2-column grids: ensure proper gap (24-32px)
- Hero section: moderate padding reduction
- Cards: keep most desktop padding but reduce slightly (28px)

## Phase 4: Small Mobile Refinements (≤480px) (15 min)
**Goal**: Handle very small phones without over-compressing

### 4.1 Additional compression
- Section padding: 24-28px vertical (if needed)
- Font size already handled - just verify spacing works with smaller text
- Ensure container padding doesn't cause horizontal squeeze

### 4.2 Critical components
- Hero: ensure CTA buttons stack nicely with adequate spacing
- Forms: input fields need proper touch targets (44px+ height)
- Navigation: mobile menu spacing

## Phase 5: Cross-Section Consistency (20 min)
**Goal**: Ensure all sections follow the new spacing rhythm

Walk through each section type:
1. ✓ Hero
2. ✓ Stats counter
3. ✓ About/Mission
4. ✓ What We Do (services)
5. ✓ App Showcase
6. ✓ Testimonials
7. ✓ Get Involved
8. ✓ Donate
9. ✓ Trustees
10. ✓ Contact
11. ✓ Footer

Apply consistent spacing values for each breakpoint.

## Phase 6: Testing & Refinement (20 min)
**Goal**: Verify fixes work across devices

1. **Browser DevTools testing**:
   - Chrome DevTools: Test at 375px (iPhone SE), 768px (iPad), 1024px (iPad Pro)
   - Firefox Responsive Mode: Cross-check layouts
   
2. **Visual checks**:
   - Sections don't feel cramped
   - No awkward gaps or compression
   - Typography breathes properly
   - Buttons and CTAs are accessible
   
3. **Edge cases**:
   - Very small phones (320px)
   - Landscape orientation on phones
   - Tablet portrait vs landscape
   
4. **Quick fixes**: Address any remaining issues discovered

---

# Verification & Demo Script

## Manual Testing Checklist

### Mobile (iPhone SE - 375px)
- [ ] Hero section: Comfortable padding, CTA buttons well-spaced
- [ ] Mission cards: Stack vertically with proper gaps (not squished)
- [ ] App showcase: Phone mockup + text have breathing room
- [ ] Testimonials: Quote cards separated nicely
- [ ] Donate: Amount buttons have adequate spacing
- [ ] Contact: Form fields properly spaced, touch-friendly
- [ ] Footer: Columns stack with good separation

### Tablet (iPad - 768px)
- [ ] Hero: 2-column or stacked layout feels balanced
- [ ] Grids: 2-column layouts have proper gutters
- [ ] Overall: Sections feel neither cramped nor too loose
- [ ] Navigation: Menu works properly at breakpoint

### Small Mobile (320px)
- [ ] Content doesn't overflow horizontally
- [ ] Text remains readable
- [ ] Buttons remain tappable
- [ ] No awkward line breaks or crushing

## Before/After Comparison
Document 2-3 screenshots showing:
1. Hero section (before/after mobile)
2. Mission cards grid (before/after mobile)
3. Any section that was particularly problematic

## Success Criteria
✅ All sections have consistent, comfortable spacing on mobile
✅ No "sections too close together" feeling
✅ Tablet views look intentional (not stretched mobile)
✅ Touch targets remain accessible (≥44px)
✅ No horizontal overflow on any device size
✅ Maintains visual hierarchy and design system

---

# Deploy

**Deployment steps**:
1. Changes are in `css/styles.css` only
2. Since this is a static site:
   - If hosted: Push changes to hosting (Netlify/Vercel auto-deploy)
   - If local: Simply refresh browser
   - No build step required

**Testing on real devices** (recommended):
- Test on actual phone (iOS/Android)
- Test on actual tablet if available
- Use browser DevTools as proxy if real devices unavailable

**Rollback plan**:
- Keep backup of original `css/styles.css` (Git history)
- Can revert instantly if issues arise

**No deploy blockers** - pure CSS change, no server-side dependencies.

---

# Notes

- **Time estimate**: 1-2 hours total (as scoped)
- **Risk level**: Very low - CSS-only, easily reversible
- **Dependencies**: None - no external libraries or build changes
- **Future improvements** (out of scope):
  - Add touch gesture improvements
  - Optimize images for mobile
  - Add lazy loading
  - Progressive Web App features
  - Dark mode toggle
