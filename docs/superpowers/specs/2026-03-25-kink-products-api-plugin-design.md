# Design: kink-products-api WordPress Plugin

**Date:** 2026-03-25
**Status:** Approved

## Problem

After a WordPress update (including ACF and ACF to REST API plugins), the `GET_PRODUCTS` endpoint `/kink_products/v1/post` returns 404. This endpoint was originally registered in the active theme's `functions.php`, which was deleted during the update. The ACF plugin itself is fine — the `/acf/v3/posts/{id}` single-product endpoint still works.

## Solution

Create a small, standalone WordPress plugin that re-registers the missing REST route and returns the exact data shape the frontend already expects. No frontend changes required.

## Plugin Details

**File:** `wp-content/plugins/kink-products-api/kink-products-api.php`
**Route:** `GET /wp-json/kink_products/v1/post`

## Data

- All posts on the site are products (post type `post`)
- ACF fields are attached via the field group `group_5dec0004358e7`
- ACF's `get_fields($id)` returns the full field array for each post

## Implementation

1. Add standard WordPress plugin header (Plugin Name, Description, Version, Author)
2. Hook a registration function into `rest_api_init`
3. Register route `kink_products/v1/post` with:
   - Method: `GET`
   - Permission callback: `__return_true` (public, no authentication required)
   - Handler callback: see below
4. Handler:
   - Run `WP_Query` with `post_type => 'post'`, `posts_per_page => -1`, `post_status => 'publish'`
   - For each post, call `get_fields($post->ID)` to retrieve all ACF fields
   - Build response array: `[ ['ID' => $post->ID, 'acf' => $fields], ... ]`
   - Return a `WP_REST_Response` with the array and HTTP 200

## Response Shape

```json
[
  {
    "ID": 123,
    "acf": {
      "name": "...",
      "description": "...",
      "price_nickel": "...",
      "price_brass": "...",
      "price_gold": "...",
      "color": [...],
      "color_alt": [...],
      "sizes": [...],
      "img": [...]
    }
  }
]
```

This matches exactly what `Categories/index.js` maps over (`e.acf`, `e.ID`).

## Frontend Impact

None. `src/config.js`, `src/services/api/apiService.js`, and all containers remain unchanged.

## Activation Steps

1. Create folder `wp-content/plugins/kink-products-api/`
2. Upload `kink-products-api.php` into that folder
3. In WP Admin → Plugins, activate "Kink Products API"
4. Verify: visit `https://talisman.newaeoncreative.com/wp-json/kink_products/v1/post` — should return JSON array of products
