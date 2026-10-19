<?php
/**
 * Editorial HQ — Link Building & AI Visibility
 * Theme glue: serve the prerendered React site through WordPress.
 *
 * How a request is answered
 * -------------------------
 * `npm run build:wp` prerenders every page of the React app into
 * prerender/<key>.json (head tags, page HTML, critical CSS, the page's
 * JavaScript chunks). For each request this theme:
 *   1. maps the URL to a key (/services/link-building -> services__link-building),
 *   2. answers 200 with that page, or 404 with the not-found page,
 *   3. fills in the real domain (home_url) and theme URL, so nothing about the
 *      domain is hard-coded in the build,
 *   4. loads the React app on top, which takes over for animations and
 *      navigation.
 * It also serves /sitemap.xml and /robots.txt for those pages.
 *
 * No SEO plugin is needed (or wanted): titles, descriptions, canonicals,
 * Open Graph and schema are already in each page. Yoast or Rank Math would add
 * a second, conflicting set.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ------------------------------------------------------------------ routing */

/** The request path relative to the WordPress home, always starting with "/". */
function tm_request_path() {
	$uri  = isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '/';
	$path = (string) wp_parse_url( $uri, PHP_URL_PATH );
	$base = untrailingslashit( (string) wp_parse_url( home_url( '/' ), PHP_URL_PATH ) );
	if ( $base && 0 === strpos( $path, $base ) ) {
		$path = substr( $path, strlen( $base ) );
	}
	return '/' . ltrim( rawurldecode( $path ), '/' );
}

/**
 * The prerendered page for this request: head, body, scripts, critical, status.
 * Unknown URLs get the 404 page and a 404 status.
 */
function tm_page() {
	static $page = null;
	if ( null !== $page ) {
		return $page;
	}

	$path   = trim( tm_request_path(), '/' );
	$key    = '' === $path ? 'index' : str_replace( '/', '__', $path );
	$dir    = get_template_directory() . '/prerender/';
	$status = 200;

	if ( '404' === $key || ! preg_match( '/^[a-z0-9_-]+$/', $key ) || ! is_readable( $dir . $key . '.json' ) ) {
		$key    = '404';
		$status = 404;
	}

	$data = is_readable( $dir . $key . '.json' )
		? json_decode( (string) file_get_contents( $dir . $key . '.json' ), true )
		: null;
	if ( ! is_array( $data ) ) {
		$data = array();
	}

	$page = array_merge(
		array(
			'head'     => '',
			'body'     => '',
			'scripts'  => array(),
			'critical' => '',
		),
		$data,
		array( 'status' => $status )
	);
	return $page;
}

/** Replace the build's placeholders with this site's real URLs. */
function tm_fill( $html ) {
	return str_replace(
		array( '__SITE_URL__', '__ASSET_BASE__' ),
		array( untrailingslashit( home_url() ), untrailingslashit( get_template_directory_uri() ) ),
		$html
	);
}

/**
 * Runs before WordPress picks a template: sitemap, one URL per page (no
 * trailing slash), and the right status code.
 */
function tm_route() {
	// robots.txt, /favicon.ico and feeds are answered by WordPress itself
	if ( is_robots() || is_favicon() || is_feed() || is_trackback() ) {
		return;
	}

	$path = tm_request_path();

	if ( '/sitemap.xml' === $path ) {
		tm_sitemap();
		exit;
	}

	// the old services index now lives on the homepage
	if ( '/services' === untrailingslashit( $path ) ) {
		wp_safe_redirect( home_url( '/#services' ), 301 );
		exit;
	}

	if ( '/' !== $path && '/' === substr( $path, -1 ) ) {
		$query = isset( $_SERVER['QUERY_STRING'] ) && '' !== $_SERVER['QUERY_STRING']
			? '?' . wp_unslash( $_SERVER['QUERY_STRING'] )
			: '';
		wp_safe_redirect( home_url( untrailingslashit( $path ) ) . $query, 301 );
		exit;
	}

	$page = tm_page();
	status_header( $page['status'] );
	if ( 404 === $page['status'] ) {
		nocache_headers();
	}
}
add_action( 'template_redirect', 'tm_route', 1 );

/* WordPress's own URL guessing would send unknown URLs to random posts. */
add_filter( 'redirect_canonical', '__return_false' );
add_filter( 'do_redirect_guess_404_permalink', '__return_false' );

/* ---------------------------------------------------------- sitemap, robots */

/** /sitemap.xml: every indexable page from the build. */
function tm_sitemap() {
	$file   = get_template_directory() . '/prerender/routes.json';
	$routes = is_readable( $file ) ? json_decode( (string) file_get_contents( $file ), true ) : null;
	$paths  = isset( $routes['paths'] ) && is_array( $routes['paths'] ) ? $routes['paths'] : array( '/' );
	$mod    = isset( $routes['lastmod'] ) ? $routes['lastmod'] : gmdate( 'Y-m-d' );

	status_header( 200 );
	header( 'Content-Type: application/xml; charset=UTF-8' );
	header( 'X-Robots-Tag: noindex' );
	echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
	echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
	foreach ( $paths as $p ) {
		$loc = '/' === $p ? home_url( '/' ) : home_url( $p );
		echo '  <url><loc>' . esc_url( $loc ) . '</loc><lastmod>' . esc_html( $mod ) . "</lastmod></url>\n";
	}
	echo "</urlset>\n";
}

/* Our sitemap replaces WordPress's wp-sitemap.xml, which can't see these pages. */
add_filter( 'wp_sitemaps_enabled', '__return_false' );

/** robots.txt (served virtually by WordPress). Respects "Discourage search engines". */
function tm_robots( $output, $public ) {
	if ( ! $public ) {
		return $output;
	}
	return "User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\n\nSitemap: " . home_url( '/sitemap.xml' ) . "\n";
}
add_filter( 'robots_txt', 'tm_robots', 10, 2 );

/** /favicon.ico would otherwise show the WordPress logo. */
function tm_favicon() {
	wp_safe_redirect( get_template_directory_uri() . '/favicon-32.png', 301 );
	exit;
}
add_action( 'do_faviconico', 'tm_favicon' );

/* ------------------------------------------------------------------- assets */

/**
 * The app is an ES module; every JavaScript file name carries a content hash,
 * so a new upload never mixes with cached old files.
 */
function tm_enqueue_app() {
	$dir   = get_template_directory();
	$uri   = get_template_directory_uri();
	$entry = glob( $dir . '/assets/app-*.js' );
	if ( ! $entry ) {
		return;
	}

	// The entry's name carries a content hash. No ?ver= query: page chunks
	// import it by its bare URL, and a query would load a second copy.
	wp_enqueue_script(
		'tm-app',
		$uri . '/assets/' . basename( $entry[0] ),
		array(),
		null,
		true
	);

	// The bundle resolves /images/..., router paths and absolute URLs with these.
	$base = wp_parse_url( home_url( '/' ), PHP_URL_PATH );
	if ( ! $base ) {
		$base = '/';
	}

	wp_add_inline_script(
		'tm-app',
		'window.__TM_BASE_PATH__=' . wp_json_encode( $base ) . ';' .
		'window.__TM_ASSET_BASE__=' . wp_json_encode( untrailingslashit( $uri ) ) . ';' .
		'window.__SITE_URL__=' . wp_json_encode( untrailingslashit( home_url() ) ) . ';',
		'before'
	);

	// block-editor styles this theme never uses
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'wp-block-library-theme' );
	wp_dequeue_style( 'classic-theme-styles' );
	wp_dequeue_style( 'global-styles' );
}
add_action( 'wp_enqueue_scripts', 'tm_enqueue_app', 100 );

/** wp_enqueue_script emits a classic script tag; the bundle needs type="module". */
function tm_module_tag( $tag, $handle ) {
	if ( 'tm-app' !== $handle ) {
		return $tag;
	}
	$tag = str_replace( '<script ', '<script type="module" crossorigin ', $tag );
	return str_replace( " type='text/javascript'", '', $tag );
}
add_filter( 'script_loader_tag', 'tm_module_tag', 10, 2 );

/* ------------------------------------------------------------- <head> tidy */

/**
 * Each page brings its own title, description, canonical, robots and social
 * tags. Remove WordPress's versions so nothing is duplicated.
 */
function tm_trim_head() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'wp_head', 'wp_generator' );
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'wlwmanifest_link' );
	remove_action( 'wp_head', 'wp_shortlink_wp_head' );
	remove_action( 'wp_head', 'rel_canonical' );
	remove_action( 'wp_head', 'feed_links', 2 );
	remove_action( 'wp_head', 'feed_links_extra', 3 );
	remove_action( 'wp_head', 'rest_output_link_wp_head' );
	remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
	remove_action( 'wp_head', 'wp_site_icon', 99 );
	// keep WordPress's noindex when "Discourage search engines" is ticked
	if ( get_option( 'blog_public' ) ) {
		remove_action( 'wp_head', 'wp_robots', 1 );
	}
}
add_action( 'wp', 'tm_trim_head' );

function tm_theme_support() {
	// no 'title-tag': every prerendered page carries its own <title>
	add_theme_support( 'html5', array( 'style', 'script' ) );
}
add_action( 'after_setup_theme', 'tm_theme_support' );

/**
 * The admin bar offsets the viewport by 32px, which fights the fixed header.
 * Hide it on the front end; it stays available in /wp-admin.
 */
add_filter( 'show_admin_bar', '__return_false' );
