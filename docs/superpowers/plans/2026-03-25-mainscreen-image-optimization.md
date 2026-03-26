# MainScreen Image Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 768px listing images with 225px images and add lazy loading, while upgrading the ProductDetails single-image view to 1151px.

**Architecture:** Three focused file edits — Carousel gets an `imageSize` prop and `loading="lazy"`, ProductListing passes `imageSize="medium"` and switches its single-image src, ProductDetails upgrades its single-image src to `1536x1536`. No backend changes, no new files.

**Tech Stack:** React 16, Create React App (no testing libraries installed — verification via browser DevTools Network tab)

**Spec:** `docs/superpowers/specs/2026-03-25-mainscreen-image-optimization-design.md`

---

## File Map

| File | Change |
|------|--------|
| `src/components/Carousel/Carousel.js` | Add `imageSize` prop + `loading="lazy"` on all `<img>` tags |
| `src/components/ProductListing/ProductListing.js` | `medium \|\| medium_large` fallback, pass `imageSize="medium"` to Carousel, `loading="lazy"` |
| `src/containers/ProductDetails/index.js` | Single-image branch: `medium_large` → `sizes['1536x1536']` |

---

## Task 1: Add `imageSize` prop and `loading="lazy"` to Carousel

**Files:**
- Modify: `src/components/Carousel/Carousel.js:30`

- [ ] **Step 1: Open `Carousel.js` and locate the image tag**

  The `<img>` is on line 30, inside the `props.img.map` callback:
  ```jsx
  <img className="d-block w-100" src={img.sizes.medium_large}  />
  ```

- [ ] **Step 2: Replace the image tag**

  Change line 30 from:
  ```jsx
  <img className="d-block w-100" src={img.sizes.medium_large}  />
  ```
  To:
  ```jsx
  <img className="d-block w-100" src={img.sizes[props.imageSize] || img.sizes.medium_large} loading="lazy" />
  ```

  - `props.imageSize` is the new optional prop. When a caller passes `imageSize="medium"`, slides use the 225px URL. When no prop is passed (e.g. ProductDetails), `props.imageSize` is `undefined`, so `img.sizes[undefined]` is `undefined`, and the fallback `|| img.sizes.medium_large` takes effect — preserving current behaviour.
  - `loading="lazy"` on inactive slides prevents image fetches because Bootstrap CSS sets `.carousel-item { display: none }`. Browsers do not fetch lazy images that are `display:none`. The active slide loads immediately when it is in the viewport regardless of the attribute.

- [ ] **Step 3: Verify visually**

  Run `yarn start`. Open the MainScreen. Open DevTools → Network → Img filter.
  - Confirm carousel images request URLs containing `/medium/` (225px) instead of `/medium_large/` (768px).
  - Advance the carousel to slide 2. Confirm slide 2's image request fires only after the slide becomes active.

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/Carousel/Carousel.js
  git commit -m "feat: add imageSize prop and loading=lazy to Carousel"
  ```

---

## Task 2: Switch ProductListing to smaller images

**Files:**
- Modify: `src/components/ProductListing/ProductListing.js:16,21`

- [ ] **Step 1: Pass `imageSize="medium"` to the Carousel**

  Line 16 currently:
  ```jsx
  <Carousel onClick={props.onClick} img={props.photos} className="product-carousel" />
  ```
  Change to:
  ```jsx
  <Carousel onClick={props.onClick} img={props.photos} className="product-carousel" imageSize="medium" />
  ```

- [ ] **Step 2: Switch the single-image `<img>` src and add `loading="lazy"`**

  Line 21 currently:
  ```jsx
  <img src={props.photos[0].sizes.medium_large} alt="" />
  ```
  Change to:
  ```jsx
  <img src={props.photos[0].sizes.medium || props.photos[0].sizes.medium_large} alt="" loading="lazy" />
  ```

  - The `|| props.photos[0].sizes.medium_large` fallback guards products whose images predate the `medium` size being configured in WordPress, or images smaller than 225px that WordPress would not upscale.
  - `loading="lazy"` defers images for cards below the fold.

- [ ] **Step 3: Verify visually**

  Reload the MainScreen. DevTools → Network → Img:
  - Single-image listing cards: confirm requests use the `medium` (225px) URL.
  - Multi-image listing cards: confirm the carousel's active slide also uses `medium` (225px) URL.
  - Scroll down past the first row. Confirm images below the fold are not requested until the user scrolls to them (requests appear in the Network tab only as they enter the viewport).

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/ProductListing/ProductListing.js
  git commit -m "feat: use medium images with lazy loading in ProductListing"
  ```

---

## Task 3: Upgrade ProductDetails single-image view

**Files:**
- Modify: `src/containers/ProductDetails/index.js:242`

- [ ] **Step 1: Locate the single-image `<img>` in ProductDetails**

  Inside the `col-sm-6 product-image-wrap` div, the branch `appState.activeProduct.img.length === 1` renders (line 242):
  ```jsx
  <img src={appState.activeProduct.img[0].sizes.medium_large} alt="" />
  ```

  **Naming note:** `img[0].sizes` here is the WordPress image size map (keys: `medium`, `medium_large`, `1536x1536`, etc.). It is entirely separate from the React state variable `sizes` (line 22) which holds product size options like "S"/"M"/"L".

- [ ] **Step 2: Switch to `1536x1536`**

  Change line 242 from:
  ```jsx
  <img src={appState.activeProduct.img[0].sizes.medium_large} alt="" />
  ```
  To:
  ```jsx
  <img src={appState.activeProduct.img[0].sizes['1536x1536']} alt="" />
  ```

  This upgrades the single-image detail view from 768px to 1151px. No fallback needed — every product that has at least one image will have the `1536x1536` size registered by WordPress. The Carousel in ProductDetails is called without an `imageSize` prop (line 237), so it continues to use `medium_large` — intentional per the spec.

- [ ] **Step 3: Verify visually**

  Navigate to a product detail page that has a single image. DevTools → Network → Img:
  - Confirm the image request URL contains `1536x1536` (1151px) rather than `medium_large` (768px).
  - Navigate to a product with multiple images. Confirm the carousel images still use `medium_large` URLs (unchanged).

- [ ] **Step 4: Commit**

  ```bash
  git add src/containers/ProductDetails/index.js
  git commit -m "feat: upgrade ProductDetails single-image to 1536x1536 size"
  ```
