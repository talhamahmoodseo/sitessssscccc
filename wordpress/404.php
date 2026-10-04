<?php
/**
 * A URL WordPress does not know is almost always a client-side route, so serve
 * the app shell. functions.php has already rewritten the status to 200.
 */
require get_template_directory() . '/index.php';
