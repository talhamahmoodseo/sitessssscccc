<?php
/**
 * Outreachr — Link Building & AI Visibility
 * Theme glue: serve the React build through WordPress.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The app is an ES module and its filenames are stable (no content hash), so
 * versions come from file mtime to defeat browser caching after a redeploy.
 */
function tm_enqueue_app() {
	$dir = get_template_directory();
	$uri = get_template_directory_uri();

	$css = $dir . '/assets/app.css';
	$js  = $dir . '/assets/app.js';

	wp_enqueue_style(
		'tm-app',
		$uri . '/assets/app.css',
		array(),
		file_exists( $css ) ? filemtime( $css ) : null
	);

	wp_enqueue_script(
		'tm-app',
		$uri . '/assets/app.js',
		array(),
		file_exists( $js ) ? filemtime( $js ) : null,
		true
	);

	// The bundle resolves /images/... and router paths against these.
	$base = parse_url( home_url( '/' ), PHP_URL_PATH );
	if ( ! $base ) {
		$base = '/';
	}

	wp_add_inline_script(
		'tm-app',
		'window.__TM_BASE_PATH__=' . wp_json_encode( $base ) . ';' .
		'window.__TM_ASSET_BASE__=' . wp_json_encode( untrailingslashit( $uri ) ) . ';',
		'before'
	);
}
add_action( 'wp_enqueue_scripts', 'tm_enqueue_app' );

/**
 * wp_enqueue_script emits a classic script tag; the bundle needs type="module".
 */
function tm_module_tag( $tag, $handle ) {
	if ( 'tm-app' !== $handle ) {
		return $tag;
	}
	$tag = str_replace( '<script ', '<script type="module" crossorigin ', $tag );
	return str_replace( " type='text/javascript'", '', $tag );
}
add_filter( 'script_loader_tag', 'tm_module_tag', 10, 2 );

/**
 * Client-side routes such as /services/digital-pr match no WordPress post, so
 * WordPress would 404 them. 404.php renders the app instead and this makes the
 * response a 200 so search engines index the route normally.
 */
function tm_spa_200() {
	if ( is_404() ) {
		status_header( 200 );
		nocache_headers();
	}
}
add_action( 'template_redirect', 'tm_spa_200' );

/** Trim output this site does not use. */
function tm_trim_head() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'wp_head', 'wp_generator' );
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'wlwmanifest_link' );
	remove_action( 'wp_head', 'wp_shortlink_wp_head' );
}
add_action( 'init', 'tm_trim_head' );

function tm_theme_support() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'html5', array( 'style', 'script' ) );
}
add_action( 'after_setup_theme', 'tm_theme_support' );

/**
 * The admin bar offsets the viewport by 32px, which fights the fixed header.
 * Hide it on the front end; it stays available in /wp-admin.
 */
add_filter( 'show_admin_bar', '__return_false' );
