<div class="email-popup-con">

     <div class="email-popup-inner-con">
          <div class="email-popup-img-con">
               <img src="LINK TO IMAGE HERE" alt="Email Subscribe Image">
               <div class="message-overlay-con">
                    <span class="message">Join Our Mailing List</span>
                    <span class="nothanks">No Thanks</span>
               </div>
          </div>
          <?php echo do_shortcode( 'SHORTCODE FOR YOUR FORM HERE' ); ?>
     </div>

</div>

<script>
jQuery(document).ready(function() {
  // Functionality that controls hiding/showing the email signup lightbox
  // Check to see if cookie is set prior to showing email signup after 5 second delay
  if( Cookies.get('noti') !== 'closed' ) {
    jQuery('.email-popup-con').delay(5000).fadeIn();
  }
  // If user closes lightbox set cookie for 30 days to not show again
  jQuery('.nothanks').click(function() {
    Cookies.set('noti', 'closed', { expires: 30 });
    jQuery('.email-popup-con').fadeOut();
  });
  // Hides the email submit form 3 seconds after a successful submission and sets 1 year cookie to disable popup
  jQuery(document).bind('gform_confirmation_loaded', function(event, formId){
    if(formId == 3) {
      Cookies.set('noti', 'closed', { expires: 365 });
      setTimeout(function() {
        jQuery('.email-popup-con').fadeOut();
      }, 3000);
    }
  });
});
</script>