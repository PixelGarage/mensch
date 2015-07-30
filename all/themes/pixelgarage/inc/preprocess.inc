<?php
/**
 * Created by PhpStorm.
 * User: ralph
 * Date: 06.02.15
 * Time: 17:23
 */

/**
 * Preprocess variables for the html template.
 */
function pixelgarage_preprocess_html(&$vars) {
  // make sure jQuery UI and effects is loaded for anonymous users
  drupal_add_library('system', 'ui');
  drupal_add_library('system', 'effects');

}

/**
 * Override or insert variables for the page templates.
 */
function pixelgarage_preprocess_page(&$vars) {
  // hide titles on login forms
  pg_login_preprocess_page($vars);


}

/**
 * Override or insert variables for the node templates.
 */
function pixelgarage_preprocess_node (&$vars) {
  $type = $vars['type'];
  $node = $vars['node'];

  if ($type == 'kfpage') {
    // handle background image
    if (!empty($node->field_image)) {
      $img_placement = $node->field_background_image_placement[LANGUAGE_NONE][0]['value'];
      $bg_image = file_create_url($node->field_image[LANGUAGE_NONE][0]['uri']);

      // webform bg-image
      if (!empty($node->webform) && $img_placement == 'webform') {
        $vars['content']['webform']['#prefix'] = '<div class="bg-image bg-image-' . $img_placement . '" style="background-image: url(' . $bg_image . ')">';
        $vars['content']['webform']['#suffix'] = '</div>';

      } else {
        $vars['bg_image'] = $bg_image;
        $vars['img_placement'] = ' bg-image-' . $img_placement;

      }
    }

    // add anchors to kfpage node
    $vars['attributes_array']['id'] = strtolower(drupal_clean_css_identifier($node->title));

  }
}



