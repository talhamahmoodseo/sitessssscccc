<?php
/**
 * Single template for the whole site: WordPress hands every request here and
 * React Router decides what to render from the URL.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&display=swap"
		rel="stylesheet"
	/>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div id="root"></div>
	<?php wp_footer(); ?>
</body>
</html>
