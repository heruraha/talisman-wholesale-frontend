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
