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
 * It also serves /sitemap.xml and /robots.txt for those pages, takes the
 * contact form (see "contact form" below), and keeps WordPress's public
 * defaults (feeds, the user list, XML-RPC) switched off.
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

	if ( ! empty( $GLOBALS['tm_force_404'] ) || '404' === $key || ! preg_match( '/^[a-z0-9_-]+$/', $key ) || ! is_readable( $dir . $key . '.json' ) ) {
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
 * Pages that moved, old path => new path (one 301 hop each). The three sample
 * case studies from round 6 were indexed before the real ones replaced them.
 */
function tm_moved() {
	return array(
		'/services'                              => '/#services',
		'/case-studies/b2b-saas-ai-visibility'   => '/case-studies',
		'/case-studies/ecommerce-gulf-authority' => '/case-studies',
		'/case-studies/home-services-local-pack' => '/industries/home-services',
	);
}

/**
 * One hostname: www.editorialhq.com 301s to editorialhq.com (or the other way
 * round, whichever Settings > General uses). WordPress would normally do this
 * in redirect_canonical, which this theme switches off (see below).
 */
function tm_canonical_host() {
	$want = strtolower( (string) wp_parse_url( home_url(), PHP_URL_HOST ) );
	$have = isset( $_SERVER['HTTP_HOST'] ) ? strtolower( wp_unslash( $_SERVER['HTTP_HOST'] ) ) : '';
	$have = preg_replace( '/:\d+$/', '', $have );
	if ( '' === $want || '' === $have || $have === $want ) {
		return;
	}
	// only www <-> bare domain; anything else is left alone
	if ( 'www.' . $want !== $have && 'www.' . $have !== $want ) {
		return;
	}
	$uri    = isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '/';
	$scheme = (string) wp_parse_url( home_url(), PHP_URL_SCHEME );
	wp_safe_redirect( ( $scheme ? $scheme : 'https' ) . '://' . $want . '/' . ltrim( $uri, '/' ), 301 );
	exit;
}

/**
 * Runs before WordPress picks a template: hostname, moved pages, sitemap, one
 * URL per page (no trailing slash), and the right status code.
 */
function tm_route() {
	tm_canonical_host();

	// robots.txt and /favicon.ico are answered by WordPress itself
	if ( is_robots() || is_favicon() ) {
		return;
	}

	// Feeds and trackbacks are off: the feed listed the default post and the
	// admin's login name. They get the site's 404 page.
	if ( is_feed() || is_trackback() ) {
		$GLOBALS['tm_force_404'] = true;
		status_header( 404 );
		nocache_headers();
		include get_template_directory() . '/index.php';
		exit;
	}

	$path = tm_request_path();

	if ( '/sitemap.xml' === $path ) {
		tm_sitemap();
		exit;
	}

	$moved = tm_moved();
	$clean = '/' === $path ? '/' : untrailingslashit( $path );
	if ( isset( $moved[ $clean ] ) ) {
		wp_safe_redirect( home_url( $moved[ $clean ] ), 301 );
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
		'window.__SITE_URL__=' . wp_json_encode( untrailingslashit( home_url() ) ) . ';' .
		'window.__TM_CONTACT_API__=' . wp_json_encode( rest_url( 'editorialhq/v1/contact' ) ) . ';' .
		'window.__GA4_ID__=' . wp_json_encode( tm_ga4_id() ) . ';',
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

/* ----------------------------------------------- WordPress public defaults */

/*
 * XML-RPC is a common target for password guessing, and nothing on this site
 * uses it (the Jetpack and mobile apps would; this site has neither).
 */
add_filter( 'xmlrpc_enabled', '__return_false' );
add_filter( 'xmlrpc_methods', '__return_empty_array' );

/** No X-Pingback header pointing at xmlrpc.php. */
function tm_no_pingback_header( $headers ) {
	unset( $headers['X-Pingback'] );
	return $headers;
}
add_filter( 'wp_headers', 'tm_no_pingback_header' );

/**
 * /wp-json/wp/v2/users lists every author's login name to anyone. Keep it for
 * logged-in users (the editor needs it), hide it from everyone else.
 */
function tm_hide_rest_users( $endpoints ) {
	if ( ! is_user_logged_in() ) {
		unset( $endpoints['/wp/v2/users'], $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
	}
	return $endpoints;
}
add_filter( 'rest_endpoints', 'tm_hide_rest_users' );

/** oEmbed responses would also carry the author's name and profile URL. */
function tm_oembed_no_author( $data ) {
	unset( $data['author_name'], $data['author_url'] );
	return $data;
}
add_filter( 'oembed_response_data', 'tm_oembed_no_author' );

/* ----------------------------------------------------------------- settings */

/**
 * Two fields under Settings > General, so the owner can change them without a
 * new theme build: the GA4 Measurement ID and the contact form's inbox.
 */
function tm_ga4_id() {
	$id = strtoupper( trim( (string) get_option( 'tm_ga4_id', '' ) ) );
	return preg_match( '/^G-[A-Z0-9]{4,20}$/', $id ) ? $id : '';
}

function tm_contact_to() {
	$to = sanitize_email( (string) get_option( 'tm_contact_email', '' ) );
	return $to ? $to : 'contact@editorialhq.com';
}

function tm_clean_ga4( $value ) {
	$value = strtoupper( trim( (string) $value ) );
	return preg_match( '/^G-[A-Z0-9]{4,20}$/', $value ) ? $value : '';
}

function tm_clean_email( $value ) {
	return sanitize_email( (string) $value );
}

function tm_ga4_field() {
	printf(
		'<input name="tm_ga4_id" id="tm_ga4_id" type="text" class="regular-text code" placeholder="G-XXXXXXXXXX" value="%s" />' .
		'<p class="description">From Google Analytics: Admin, Data streams, your web stream. Leave empty to switch analytics off. Visitors in the UK and EU are asked first.</p>',
		esc_attr( tm_ga4_id() )
	);
}

function tm_contact_email_field() {
	printf(
		'<input name="tm_contact_email" id="tm_contact_email" type="email" class="regular-text" placeholder="contact@editorialhq.com" value="%s" />' .
		'<p class="description">Where contact form enquiries are emailed. A copy of each is also kept under Enquiries in this dashboard.</p>',
		esc_attr( (string) get_option( 'tm_contact_email', '' ) )
	);
}

function tm_settings() {
	register_setting( 'general', 'tm_ga4_id', array( 'type' => 'string', 'sanitize_callback' => 'tm_clean_ga4', 'default' => '' ) );
	register_setting( 'general', 'tm_contact_email', array( 'type' => 'string', 'sanitize_callback' => 'tm_clean_email', 'default' => '' ) );
	add_settings_field( 'tm_ga4_id', 'GA4 Measurement ID', 'tm_ga4_field', 'general', 'default', array( 'label_for' => 'tm_ga4_id' ) );
	add_settings_field( 'tm_contact_email', 'Contact form sends to', 'tm_contact_email_field', 'general', 'default', array( 'label_for' => 'tm_contact_email' ) );
}
add_action( 'admin_init', 'tm_settings' );

/* ------------------------------------------------------------- contact form */

/**
 * The /contact form posts JSON to /wp-json/editorialhq/v1/contact. Each
 * enquiry is emailed to tm_contact_to() (WP Mail SMTP makes that reliable) and
 * saved as a private "Enquiry" in the dashboard, so nothing is lost if an
 * email bounces.
 */
function tm_register_inquiries() {
	register_post_type(
		'tm_inquiry',
		array(
			'labels'              => array(
				'name'          => 'Enquiries',
				'singular_name' => 'Enquiry',
				'all_items'     => 'All enquiries',
				'edit_item'     => 'Enquiry',
				'search_items'  => 'Search enquiries',
				'not_found'     => 'No enquiries yet',
			),
			'public'              => false,
			'publicly_queryable'  => false,
			'exclude_from_search' => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_rest'        => false,
			'menu_position'       => 3,
			'menu_icon'           => 'dashicons-email-alt',
			'supports'            => array( 'title', 'editor' ),
			'capability_type'     => 'post',
			'capabilities'        => array( 'create_posts' => 'do_not_allow' ),
			'map_meta_cap'        => true,
			'rewrite'             => false,
			'query_var'           => false,
		)
	);
}
add_action( 'init', 'tm_register_inquiries' );

function tm_register_contact_route() {
	register_rest_route(
		'editorialhq/v1',
		'/contact',
		array(
			'methods'             => 'POST',
			'callback'            => 'tm_contact',
			'permission_callback' => '__return_true',
		)
	);
}
add_action( 'rest_api_init', 'tm_register_contact_route' );

/** A short, single-line, trimmed field. */
function tm_field( $params, $key, $max = 200 ) {
	$v = isset( $params[ $key ] ) && is_scalar( $params[ $key ] ) ? (string) $params[ $key ] : '';
	return mb_substr( trim( sanitize_text_field( $v ) ), 0, $max );
}

function tm_contact( $request ) {
	$p = (array) $request->get_json_params();

	// bots fill every field, people never see this one
	if ( '' !== tm_field( $p, 'company_site' ) ) {
		return new WP_REST_Response( array( 'ok' => true ), 200 );
	}

	$name    = tm_field( $p, 'name', 100 );
	$email   = sanitize_email( tm_field( $p, 'email', 150 ) );
	$website = tm_field( $p, 'website', 200 );
	$service = tm_field( $p, 'service', 100 );
	$package = tm_field( $p, 'package', 100 );
	$found   = tm_field( $p, 'found', 100 );
	$source  = tm_field( $p, 'source', 300 );
	$page    = tm_field( $p, 'page', 200 );
	$message = isset( $p['message'] ) && is_scalar( $p['message'] )
		? mb_substr( trim( sanitize_textarea_field( (string) $p['message'] ) ), 0, 5000 )
		: '';

	if ( '' === $name || ! is_email( $email ) ) {
		return new WP_REST_Response( array( 'ok' => false, 'error' => 'Please add your name and a valid email.' ), 400 );
	}

	// at most 5 enquiries an hour from one address
	$ip   = isset( $_SERVER['REMOTE_ADDR'] ) ? (string) wp_unslash( $_SERVER['REMOTE_ADDR'] ) : '';
	$slot = 'tm_contact_' . md5( $ip );
	$sent = (int) get_transient( $slot );
	if ( $sent >= 5 ) {
		return new WP_REST_Response( array( 'ok' => false, 'error' => 'Too many messages. Please email us instead.' ), 429 );
	}
	set_transient( $slot, $sent + 1, HOUR_IN_SECONDS );

	$lines = array(
		'Name: ' . $name,
		'Email: ' . $email,
		'Website: ' . ( $website ? $website : '-' ),
		'Service: ' . ( $service ? $service : '-' ),
		'Package: ' . ( $package ? $package : '-' ),
		'Found us via: ' . ( $found ? $found : '-' ),
		'First visit: ' . ( $source ? $source : '-' ),
		'Sent from: ' . ( $page ? $page : '/contact' ),
		'',
		$message ? $message : '(no message)',
	);
	$body  = implode( "\n", $lines );
	$title = $name . ( $website ? ' (' . $website . ')' : '' );

	$saved = wp_insert_post(
		array(
			'post_type'    => 'tm_inquiry',
			'post_status'  => 'private',
			'post_title'   => $title,
			'post_content' => $body,
		),
		true
	);
	$saved = ! is_wp_error( $saved ) && $saved > 0;

	$mailed = wp_mail(
		tm_contact_to(),
		'New enquiry: ' . ( $service ? $service : 'website' ) . ' - ' . $title,
		$body . "\n\n-- \nSent by the contact form on " . home_url( '/' ),
		array( 'Reply-To: ' . str_replace( array( "\r", "\n", '<', '>' ), '', $name ) . ' <' . $email . '>' )
	);

	if ( ! $saved && ! $mailed ) {
		return new WP_REST_Response( array( 'ok' => false, 'error' => 'We could not send that. Please email us instead.' ), 500 );
	}
	return new WP_REST_Response( array( 'ok' => true ), 200 );
}
