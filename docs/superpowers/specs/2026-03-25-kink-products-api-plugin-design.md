# Design: kink-products-api WordPress Plugin

**Date:** 2026-03-25
**Status:** Draft

## Problem

After a WordPress update (including ACF and ACF to REST API plugins), the `GET_PRODUCTS` endpoint `/kink_products/v1/post` returns 404. This endpoint was originally registered in the active theme's `functions.php`, which was deleted during the update. The ACF plugin itself is fine — the `/acf/v3/posts/{id}` single-product endpoint still works.

## Solution

Create a small, standalone WordPress plugin that re-registers the missing REST route and returns the exact data shape the frontend already expects. No frontend changes required.

## Plugin Details

**File:** `wp-content/plugins/kink-products-api/kink-products-api.php`
**Route:** `GET /wp-json/kink_products/v1/post`
**Plugin Name:** Kink Products API
**Version:** 1.0.0
**Requires at least:** 5.0
**Requires PHP:** 7.4

## Data

- All posts on the site are products (post type `post`)
- ACF fields are attached via the field group `group_5dec0004358e7`
- ACF's `get_fields($id)` returns the full field array for each post

## Implementation

1. Add standard WordPress plugin header (Plugin Name, Description, Version, Author, Requires at least, Requires PHP)
2. Hook a registration function into `rest_api_init`
3. Register route `kink_products/v1/post` with:
   - Method: `GET`
   - Permission callback: `__return_true` (public, no authentication required)
   - Handler callback: see below
4. Handler:
   - Run `WP_Query` with `post_type => 'post'`, `posts_per_page => -1`, `post_status => 'publish'`
   - If `$query->posts` is empty, return an empty array `[]` with HTTP 200 (the frontend renders nothing gracefully)
   - For each post, call `get_fields($post->ID)` to retrieve all ACF fields
   - If `get_fields()` returns `false` (no fields found for a post), substitute an empty array `[]` to prevent null-shape errors in the frontend
   - Build response array: `[ ['ID' => $post->ID, 'acf' => $fields], ... ]`
   - Return a `WP_REST_Response` with the array and HTTP 200
5. Pagination is not required at current catalog scale. If product count ever exceeds ~200, a paginated approach should be revisited.

## CORS

CORS headers for the REST API are already handled by the existing WordPress configuration (plugin or server-level). No additional CORS configuration is required in this plugin. If after activation the frontend receives CORS errors, verify that the existing CORS mechanism (e.g. a CORS plugin) is still active and covers the new route namespace.

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
      "price": "...",
      "category": ["Harnesses"],
      "color": ["Black", "Brown"],
      "color_alt": ["Natural"],
      "sizes": ["S", "M", "L"],
      "img": [...]
    }
  }
]
```

**Notes on specific fields:**
- `category` — array field used by `Category/index.js` to filter products by category (`tmp.category[0] === category`). Must be present.
- `price` — ACF field used by `MainScreen` and `Category` containers for display in `ProductListing`. If this field does not exist in ACF, `ProductListing` will receive `undefined` for price (existing behaviour before the breakage). `get_fields()` will include it automatically if it is defined.
- `price_nickel`, `price_brass`, `price_gold` — used by `ProductDetails` for hardware-specific pricing.

This matches exactly what `Categories/index.js` maps over (`e.acf`, `e.ID`) and what `Category/index.js` filters on (`e.category[0]`).

## Frontend Impact

None. `src/config.js`, `src/services/api/apiService.js`, and all containers remain unchanged.

## Activation Steps

1. Create folder `wp-content/plugins/kink-products-api/`
2. Upload `kink-products-api.php` into that folder
3. In WP Admin → Plugins, activate "Kink Products API"
4. Verify: visit `https://talisman.newaeoncreative.com/wp-json/kink_products/v1/post`
   - Confirm the response is a JSON array (not a 404 or error object)
   - Confirm the first element has both an `ID` key (integer) and an `acf` key (object with product fields)
   - Confirm `acf.category` is a non-empty array on at least one product
