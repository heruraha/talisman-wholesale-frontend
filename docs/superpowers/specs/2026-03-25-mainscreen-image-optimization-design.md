# MainScreen Image Optimization Design

**Date:** 2026-03-25
**Status:** Approved

## Problem

The MainScreen loads all products in a single API call, then immediately renders 15 listing cards each requesting one or more images at `medium_large` (768px wide). This causes a 5–15 second wait before users see a usable page. Two factors compound:

1. WordPress returns all products in one slow API response
2. Up to 15+ concurrent 768px image requests fire as soon as the response resolves

## Approach

Smaller listing images + lazy loading (frontend-only, no backend changes required).

### Available WordPress Image Sizes

| Key | Dimensions |
|-----|-----------|
| `thumbnail` | 150×150 |
| `medium` | 225×300 |
| `medium_large` | 768×1025 |
| `large` | 768×1024 |
| `1536x1536` | 1151×1536 |
| `2048x2048` | 1535×2048 |

Note: `medium_large` and `large` are the same width, so upgrading between them provides no benefit.

## Design

### Carousel Component (`src/components/Carousel/Carousel.js`)

**Change 1 — `imageSize` prop:** Accept an optional `imageSize` prop (string, defaults to `'medium_large'`). Use `img.sizes[imageSize]` instead of the hardcoded `img.sizes.medium_large`. This allows callers to control image quality without duplicating the component.

**Change 2 — Conditional image render:** Currently, all slide `<img>` elements are rendered upfront and toggled via CSS class (`carousel-item active` vs `carousel-item`). Hidden slides still get fetched by the browser. Change to only render the `<img>` element when `slide === i`. The slide container `<div>` still renders to preserve layout; only the image itself is conditionally present.

**Change 3 — `loading="lazy"`:** Add `loading="lazy"` to all `<img>` tags in the carousel. This is redundant with conditional rendering for non-active slides, but covers any edge cases and is a good default.

### ProductListing Component (`src/components/ProductListing/ProductListing.js`)

**Change 1 — Smaller image size:** Switch the single-image `<img>` from `props.photos[0].sizes.medium_large` to `props.photos[0].sizes.medium` (225px vs 768px).

**Change 2 — Pass `imageSize` to Carousel:** Pass `imageSize="medium"` to the `<Carousel>` component so carousel slides in listing context also use the smaller size.

**Change 3 — `loading="lazy"`:** Add `loading="lazy"` to the single-image `<img>` tag.

### ProductDetails Container (`src/containers/ProductDetails/index.js`)

**Change 1 — Single-image quality upgrade:** The single-image fallback path currently uses `sizes.medium_large` (768px). Switch to `sizes['1536x1536']` (1151px) for a genuine quality improvement on the detail view.

**No change to Carousel usage in ProductDetails:** The `<Carousel>` component is called without an `imageSize` prop, so it uses the default `medium_large`. This is intentional — the detail carousel keeps current quality.

### What Is Not Changed

- `MainScreen/index.js` — passes image data through unchanged; no modifications needed
- `services/api/apiService.js` — API layer untouched
- Pagination logic — untouched
- `ProductDetails` carousel — keeps `medium_large` default

## File Change Summary

| File | Changes |
|------|---------|
| `src/components/Carousel/Carousel.js` | Add `imageSize` prop, conditional image render, `loading="lazy"` |
| `src/components/ProductListing/ProductListing.js` | Switch to `sizes.medium`, pass `imageSize="medium"` to Carousel, add `loading="lazy"` |
| `src/containers/ProductDetails/index.js` | Single-image fallback: `sizes.medium_large` → `sizes['1536x1536']` |

## Expected Outcome

- Listing image payload drops from 768px to 225px per image (~10× smaller file size)
- Non-visible carousel slides no longer trigger image fetches
- Images below the fold defer loading until the user scrolls
- ProductDetails single-image view improves from 768px to 1151px
- No backend changes required
