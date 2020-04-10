<?php 
	
	/*
		This is the template for the hedaer
		
		@package sunsettheme
	*/
	
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<title><?php bloginfo( 'name' ); wp_title(); ?></title>
		<meta name="description" content="<?php bloginfo( 'description' ); ?>">
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<?php if( is_singular() && pings_open( get_queried_object() ) ): ?>
			<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
		<?php endif; ?>
		<?php wp_head(); ?>
		
		<?php 
			$custom_css = esc_attr( get_option( 'sunset_css' ) );
			if( !empty( $custom_css ) ):
				echo '<style>' . $custom_css . '</style>';
			endif;
		?>
		
	</head>

<body <?php body_class(); ?>>

	
		
			<div class="sidebar-scroll">
				
				<?php get_sidebar(); ?>
				
			</div><!-- .sidebar-scroll -->
		
		
	
	<div class="container-fluid">
		
		<div class="row">
				
		<header>
         <div class="header">
            
            <div class="topbar">
			<div id="logo">
               <a href="#"><img src='<?php echo get_template_directory_uri(); ?>/img/LogoBusiness.png' alt="Logo" /></a>
            </div>
              <div class="menu-cover top-nav">
                <div class="menus">
                  <div class="menu-res">
                     <h2><i class="fa fa-bars"></i></h2> 
                    <input id="menu-toggle" type="checkbox" />
                   
                  </div>
                  <ul id="menu" class=" menu animated slideInDown">
                    <li ><a >Home</a></li>
                    <li ><a >About</a></li>
                    <li ><a >Career</a></li>
                    <li ><a >Contact</a></li>
					<a class="login-b" href="true" >Login</a>
				    <div class="searchbox-slide-menu">
						<?php get_search_form(); ?>
					</div>
					
				</ul>
			   
				  
			</div>
			<div class="searchbox">
			   <?php get_search_form(); ?>
			</div>
		
              </div>
            </div>
            <div class="clearfix"></div>
          </div>
          
        </header><!-- .header-container -->

		</div><!-- .row -->
		
	</div><!-- .container-fluid -->
	
	
	
	
	
	
	
	
	
	
	
	
	