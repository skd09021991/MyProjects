<?php

require get_template_directory().'/inc/vendor/Mobile_Detect.php';

require get_template_directory().'/inc/cleanup.php';
require get_template_directory().'/inc/function-admin.php';
require get_template_directory().'/inc/enqueue.php';
require get_template_directory().'/inc/theme-support.php';
require get_template_directory().'/inc/custom-post-type.php';
require get_template_directory().'/inc/walker.php';
require get_template_directory().'/inc/ajax.php';
require get_template_directory().'/inc/shortcodes.php';
require get_template_directory().'/inc/widgets.php';


function gt_setup(){
    wp_enqueue_style('google-fonts' , '//fonts.googleapis.com/css?family=Roboto|Roboto+Condensed|Roboto+Slab');
    wp_enqueue_style('fontawesome', '//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
   // wp_enqueue_style('fontawesome', ' //use.fontawesome.com/releases/v5.1.0/css/all.css');
    
    wp_enqueue_style('style' , get_stylesheet_uri(), NULL , microtime());
    wp_enqueue_script("main" , get_theme_file_uri('/js/main.js') , NULL ,microtime() , true);
}

add_action('wp_enqueue_scripts' , 'gt_setup');




//* GENESIS -- Add email subscription popup section
add_action( 'genesis_after_footer', 'wd_email_popup' );
function wd_email_popup() {
        if( is_single() ) { // Only show this on single blog posts
	        get_template_part( '/email-popup.php' );
        }
}

add_action( 'wp_enqueue_scripts', 'wd_enqueue_scripts' );
function wd_enqueue_scripts() {
	wp_register_script( 'wd-cookie', get_stylesheet_directory_uri() . '/js/jquery.cookie.js' );
	wp_enqueue_script( 'wd-cookie' );
}