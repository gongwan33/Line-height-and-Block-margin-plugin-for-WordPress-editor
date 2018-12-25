<?php

/*
Plugin Name: Tinymce Enhancer 
Plugin URI: https://www.joybin.cn
Description: Add functions to tinymce editor
Version: 1.0.0
Author: Wagner
Author URI: https://www.joybin.cn
License: GPLv2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: tinymce-enhancer
Network: true
*/

define( 'TE_VERSION', '1.0.0' );

/**
 * Stores the path.
 *
 * @since 6.4.4
 */
define( 'TE_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Stores the URL.
 *
 * @since 7.0
 */
define( 'TE_URL',  plugin_dir_url( __FILE__ ) );

add_action( 'admin_init', 'te_tinymce_button' );

function te_tinymce_button() {
    if ( current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' ) ) {
        add_filter( 'mce_buttons', 'te_register_tinymce_button' );
        add_filter( 'mce_external_plugins', 'te_add_tinymce_button' );
    }
}

function te_register_tinymce_button( $buttons ) {
    array_push( $buttons, "sel_line_height", "sel_block_margin" );
    return $buttons;
}

function te_add_tinymce_button( $plugin_array ) {
    //$plugin_array['my_button_script'] = TE_URL.'/js/tinymce_plugin_te.js';    //For debug only
    $plugin_array['my_button_script'] = TE_URL.'/js/tinymce_plugin_te.min.js';
    return $plugin_array;
}
