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

**Change 1 — `imageSize` prop:** Accept an optional `imageSize` prop (string). Use `img.sizes[props.imageSize || 'medium_large']` as an inline fallback, consistent with the existing `props.color || '#bfad86'` fallback pattern already in the component. This allows callers to control image quality without duplicating the component.

**Change 2 — `loading="lazy"` on all carousel images:** Add `loading="lazy"` to every `<img>` tag in the carousel map. Bootstrap 4's carousel hides inactive slides via `display: none` (via the `.carousel-item` class, which is `display: none` unless the `active` class is also present). Browsers do not fetch `loading="lazy"` images that are `display: none`, so only the active slide's image loads eagerly. No conditional rendering of `<img>` elements is needed — keeping all `<img>` elements in the DOM avoids layout shift when advancing slides, since `Carousel.scss` does not define a fixed height on `.carousel-item` (height is derived from image content).

### ProductListing Component (`src/components/ProductListing/ProductListing.js`)

**Change 1 — Smaller image size with fallback:** Switch the single-image `<img>` src from `props.photos[0].sizes.medium_large` to `props.photos[0].sizes.medium || props.photos[0].sizes.medium_large`. The fallback guards against products whose images were uploaded before the `medium` size was configured in WordPress, or images smaller than 225px that WordPress would not upscale.

**Change 2 — Pass `imageSize` to Carousel:** Pass `imageSize="medium"` to the `<Carousel>` component so carousel slides in listing context also use the smaller size.

**Change 3 — `loading="lazy"`:** Add `loading="lazy"` to the single-image `<img>` tag to defer loading for cards below the fold.

### ProductDetails Container (`src/containers/ProductDetails/index.js`)

**Change 1 — Single-image quality upgrade (line 242 only):** The single-image fallback path currently uses `sizes.medium_large` (768px). Switch to `sizes['1536x1536']` (1151px) for a genuine quality improvement on the detail view.

**Naming note:** In ProductDetails, `img[n].sizes` refers to the WordPress image size map returned by the API — a plain object with keys like `medium`, `medium_large`, `1536x1536`, etc. This is entirely separate from the React state variable `sizes` (line 22), which holds product size options such as "S", "M", "L". They share no connection.

**No change to Carousel usage in ProductDetails:** The `<Carousel>` component is called without an `imageSize` prop, so it uses the `medium_large` default. This is intentional — the detail carousel keeps current quality.

### What Is Not Changed

- `MainScreen/index.js` — passes image data through unchanged; no modifications needed
- `services/api/apiService.js` — API layer untouched
- Pagination logic — untouched
- `alt=""` attributes on `<img>` tags — pre-existing empty alt text is out of scope for this change

## File Change Summary

| File | Changes |
|------|---------|
| `src/components/Carousel/Carousel.js` | Add `imageSize` prop (inline fallback), `loading="lazy"` on all images |
| `src/components/ProductListing/ProductListing.js` | Switch to `sizes.medium \|\| sizes.medium_large`, pass `imageSize="medium"` to Carousel, add `loading="lazy"` |
| `src/containers/ProductDetails/index.js` | Line 242 only: `sizes.medium_large` → `sizes['1536x1536']` |

## Expected Outcome

- Listing image payload drops from 768px to 225px per image (~10× smaller file size)
- Non-active carousel slides do not trigger image fetches (via `loading="lazy"` + Bootstrap `display: none`)
- Images below the fold defer loading until the user scrolls
- No layout shift during carousel slide transitions
- ProductDetails single-image view improves from 768px to 1151px
- No backend changes required
