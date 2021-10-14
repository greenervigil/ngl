var protocol = location.protocol;
var _elqQ = _elqQ || [];
_elqQ.push(['elqSetSiteId', '2138']);
_elqQ.push(['elqTrackPageView']);

var env;
var version = "1.2";
if (window.location.hostname.toUpperCase().indexOf("S-") != -1)
    env = "s-";
else if(window.location.hostname.toUpperCase().indexOf("D-") != -1 || window.location.hostname.toUpperCase().indexOf("L-") != -1)
    env = "d-";
else
  env = "";

//env = "d-";
/*document.write("<script src='http://cdn.cengage.com/js/jquery/jquery-2.1.4.min.js'></script>");*/
(function () {
    function async_load() {
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
        s.src = protocol + '//img.en25.com/i/elqCfg.min.js';
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    }
    if (window.addEventListener) window.addEventListener('DOMContentLoaded', async_load, false);
    else if (window.attachEvent) window.attachEvent('onload', async_load);
})();
  
  yepnope({
        load: [
			protocol + "//" + env + "cdn.cengage.com/js/jquery/jquery-2.1.4.min.js"			
      	],
        complete: function(){        	
			yepnope({
		        load: [
					protocol + "//" + env + "cdn.cengage.com/js/jquery-ui/jquery-ui-1.11.4.min.js",
					protocol + "//" + env + "cdn.cengage.com/static/sites/ngl/header-footer/"+version+"/js/loader.js",
					protocol + "//" + env + "cdn.cengage.com/libs/bootstrap/3.1.1/js/bootstrap.min.js",
					protocol + "//" + env + "cdn.cengage.com/libs/bootstrap/3.1.1/js/bootstrapValidator.min.js",
          			protocol + "//" + env + "cdn.cengage.com/libs/bootstrap/3.1.1/js/en_US.js",
					protocol + "//" + env + "cdn.cengage.com/libs/owlcarousel/2.0.0/js/owl.carousel.min.js"
		      	],
		        complete: function(){
				    //setTimeout(function(){
						loader.init({headerCSS:true, footerCSS:true}, function(){
							loader.header().footer();
						});
		            //}, 200);

		            if ( $( ".owl-carousel" ).length ) {
		            	setTimeout(function(){
							initcarousel();
						},500);
		        	}
		        }
		  	});

		  	yepnope({ 
		      	load: [
		      		protocol + "//" + env + "cdn.cengage.com/js/contrib/jquery.jwplayer-impl.js",
		          	protocol + "//play.vidyard.com/v0/api.js",
		            protocol + "//" + env + "cdn.cengage.com/js/vidyard/1.3/jquery.vidyard-plugin.js",
		            protocol + "//" + env + "cdn.cengage.com/libs/fancybox/2.1.5/source/jquery.fancybox.js",
		          	"/jscript/ui/jquery.ui.core.js"
		      	],
		      	complete: function () {
		      		/*if ( $( ".owl-carousel" ).length ) {
		            	
							initcarousel();
						
		        	}*/
		        }
		  	});
        }
  	});