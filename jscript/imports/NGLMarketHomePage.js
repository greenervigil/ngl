var protocol = location.protocol;
var _elqQ = _elqQ || [];
_elqQ.push(['elqSetSiteId', '2138']);
_elqQ.push(['elqTrackPageView']);

var env;
if (window.location.hostname.toUpperCase().indexOf("S-") != -1)
    env = "s-";
else if(window.location.hostname.toUpperCase().indexOf("D-") != -1 || window.location.hostname.toUpperCase().indexOf("L-") != -1)
    env = "d-";
else
  env = "";

(function () {
    function async_load() {
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
        s.src = protocol + '//img.en25.com/i/elqCfg.min.js';
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    }
    if (window.addEventListener) window.addEventListener('DOMContentLoaded', async_load, false);
    else if (window.attachEvent) window.attachEvent('onload', async_load);
})(); 

//Import java and css
yepnope({ load: [protocol + "//" + env + "cdn.cengage.com/js/jquery/jquery-1.7.2.min.js", 
                    protocol + "//" + env + "cdn.cengage.com/js/sites/ngl/loader.js"],
    complete: function () {
    	loader.init({headerCSS:false, footerCSS:false}, function(){
    		loader.header().footer();
    	});
        yepnope({
        	load: ["/jscript/jquery.zrssfeed_ngl.js","/jscript/jquery.cycle.all.js"],
        	complete:function(){
        		yepnope({ 
        			load: ["/jscript/nglMarketHome.js"]
		        });
        	}
        })
        
    }
});
