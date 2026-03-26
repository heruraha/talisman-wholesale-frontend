# Kink Products API Plugin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a standalone WordPress plugin that re-registers the `GET /wp-json/kink_products/v1/post` REST route, restoring the broken product listing endpoint with zero frontend changes.

**Architecture:** A single PHP file registered as a WordPress plugin. On `rest_api_init` it registers the custom route. The handler runs a `WP_Query` for all published posts, calls ACF's `get_fields()` per post, and returns a `WP_REST_Response` in the exact shape the frontend already expects.

**Tech Stack:** PHP 7.4+, WordPress REST API (`register_rest_route`, `WP_REST_Response`), Advanced Custom Fields (`get_fields()`), WordPress `WP_Query`.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `wp-content/plugins/kink-products-api/kink-products-api.php` | Plugin header, route registration, handler |

This is a single-file plugin. No additional files are needed.

---

### Task 1: Create the plugin file

**Files:**
- Create: `wp-content/plugins/kink-products-api/kink-products-api.php`

> Note: This file lives in the WordPress installation, not in this frontend repo. Write it locally first so it can be reviewed and uploaded.

- [ ] **Step 1: Write the plugin file**

Create `wp-content/plugins/kink-products-api/kink-products-api.php` with the following content:

```php
<?php
/**
 * Plugin Name: Kink Products API
 * Description: Registers the kink_products/v1/post REST endpoint returning all published products with ACF fields.
 * Version:     1.0.0
 * Author:      Talisman Leather
 * Requires at least: 5.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'rest_api_init', 'kink_products_register_routes' );

function kink_products_register_routes() {
    register_rest_route(
        'kink_products/v1',
        '/post',
        array(
            'methods'             => 'GET',
            'callback'            => 'kink_products_get_all',
            'permission_callback' => '__return_true',
        )
    );
}

function kink_products_get_all( WP_REST_Request $request ) {
    $query = new WP_Query( array(
        'post_type'      => 'post',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
    ) );

    if ( empty( $query->posts ) ) {
        return new WP_REST_Response( array(), 200 );
    }

    $products = array();
    foreach ( $query->posts as $post ) {
        $fields = get_fields( $post->ID );
        if ( ! $fields ) {
            $fields = array();
        }
        $products[] = array(
            'ID'  => $post->ID,
            'acf' => $fields,
        );
    }

    return new WP_REST_Response( $products, 200 );
}
```

- [ ] **Step 2: Verify the file exists and looks correct**

Open `wp-content/plugins/kink-products-api/kink-products-api.php` and confirm:
- Plugin header block is present with all required fields
- `add_action( 'rest_api_init', ... )` is present
- Route namespace is `kink_products/v1`, path is `/post`
- `permission_callback` is `__return_true`
- Handler queries `post_type => 'post'`, `post_status => 'publish'`, `posts_per_page => -1`
- `get_fields()` result is guarded: if falsy, substitute `array()`
- Response is `new WP_REST_Response( $products, 200 )`

- [ ] **Step 3: Commit the plugin file**

```bash
git add wp-content/plugins/kink-products-api/kink-products-api.php
git commit -m "feat: add kink-products-api WordPress plugin restoring GET_PRODUCTS endpoint"
```

---

### Task 2: Deploy and activate

> These steps happen on the WordPress server, not in this repo.

- [ ] **Step 1: Upload plugin to WordPress**

Upload the folder `wp-content/plugins/kink-products-api/` (containing `kink-products-api.php`) to the WordPress installation at the same path.

Options:
- FTP/SFTP to `wp-content/plugins/kink-products-api/kink-products-api.php`
- Or use the WP Admin → Plugins → Add New → Upload Plugin flow (zip the folder first)

- [ ] **Step 2: Activate in WP Admin**

1. Go to WP Admin → Plugins
2. Find "Kink Products API" in the list
3. Click "Activate"
4. Confirm no error banner appears after activation

---

### Task 3: Verify the endpoint

- [ ] **Step 1: Hit the endpoint in a browser or with curl**

```bash
curl -s "https://talisman.newaeoncreative.com/wp-json/kink_products/v1/post" | head -c 500
```

Expected: A JSON array starting with `[{"ID":` — not a 404, not an error object.

- [ ] **Step 2: Confirm response shape**

Check the first element of the array:
- `ID` key is present and is an integer
- `acf` key is present and is an object
- `acf.category` is a non-empty array (e.g. `["Harnesses"]`)
- `acf.price_nickel` is present and non-null on at least one product

- [ ] **Step 3: Smoke test the frontend**

Open the frontend app in a browser and navigate to the product listing (main screen or a category page). Confirm:
- Products load (no "Loading..." spinner stuck)
- Product names and prices are visible
- Clicking a product navigates to the detail page without errors

- [ ] **Step 4: Check browser console for CORS errors**

Open DevTools → Console. If CORS errors appear on the `kink_products/v1/post` request, verify that the existing CORS plugin/configuration in WordPress is still active and covers the `kink_products` namespace.

---

## Done

The endpoint is restored, the frontend works unchanged, and the plugin is committed to version control.
