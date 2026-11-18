<?php
/**
 * Single template for the whole site. functions.php has already chosen the
 * prerendered page for this URL (tm_page) and set its status code; this file
 * prints it and loads the React app on top.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$tm      = tm_page();
$tm_uri  = get_template_directory_uri();
$tm_css  = get_template_directory() . '/assets/app.css';
$tm_href = $tm_uri . '/assets/app.css' . ( file_exists( $tm_css ) ? '?ver=' . filemtime( $tm_css ) : '' );
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#F7F6F4" />
	<?php echo tm_fill( $tm['head'] ); // phpcs:ignore WordPress.Security.EscapeOutput -- built by our own prerender step ?>

	<link rel="icon" href="<?php echo esc_url( $tm_uri . '/favicon.svg' ); ?>" type="image/svg+xml" />
	<link rel="icon" href="<?php echo esc_url( $tm_uri . '/favicon-32.png' ); ?>" sizes="32x32" type="image/png" />
	<link rel="apple-touch-icon" href="<?php echo esc_url( $tm_uri . '/apple-touch-icon.png' ); ?>" />
	<?php
	// the three faces the first screen is set in: fetched with the HTML instead
	// of after the stylesheet, so text doesn't re-flow when they arrive
	foreach ( array( 'plus-jakarta-sans-latin-400-normal', 'plus-jakarta-sans-latin-600-normal', 'plus-jakarta-sans-latin-500-italic' ) as $tm_font ) :
		if ( file_exists( get_template_directory() . '/assets/' . $tm_font . '.woff2' ) ) :
			?>
	<link rel="preload" href="<?php echo esc_url( $tm_uri . '/assets/' . $tm_font . '.woff2' ); ?>" as="font" type="font/woff2" crossorigin />
			<?php
		endif;
	endforeach;
	?>
	<?php foreach ( (array) $tm['scripts'] as $tm_chunk ) : ?>
		<?php if ( is_string( $tm_chunk ) && preg_match( '/^[\w.-]+\.js$/', $tm_chunk ) ) : ?>
	<link rel="modulepreload" crossorigin href="<?php echo esc_url( $tm_uri . '/assets/' . $tm_chunk ); ?>" />
		<?php endif; ?>
	<?php endforeach; ?>
	<?php if ( '' !== $tm['critical'] ) : ?>
	<style id="tm-critical"><?php echo $tm['critical']; // phpcs:ignore WordPress.Security.EscapeOutput -- our own CSS ?></style>
	<?php endif; ?>
	<link rel="stylesheet" href="<?php echo esc_url( $tm_href ); ?>" media="print" onload="this.media='all'" />
	<noscript><link rel="stylesheet" href="<?php echo esc_url( $tm_href ); ?>" /></noscript>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div id="root"><?php echo tm_fill( $tm['body'] ); // phpcs:ignore WordPress.Security.EscapeOutput -- built by our own prerender step ?></div>
	<?php wp_footer(); ?>
</body>
</html>
