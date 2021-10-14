var _elqQ = _elqQ || [];
_elqQ.push(['elqSetSiteId', '2138']);
_elqQ.push(['elqTrackPageView']);

var env;
var version="1.1";
if (window.location.hostname.toUpperCase().indexOf("S-") != -1)
    env = "s-";
else if(window.location.hostname.toUpperCase().indexOf("D-") != -1 || window.location.hostname.toUpperCase().indexOf("L-") != -1)
    env = "d-";
else
  env = "";
env = "d-";
(function () {
    function async_load() {
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
        s.src = '//img.en25.com/i/elqCfg.min.js';
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    }
    if (window.addEventListener) window.addEventListener('DOMContentLoaded', async_load, false);
    else if (window.attachEvent) window.attachEvent('onload', async_load);
})(); 

yepnope({ 
    load: [
        location.protocol + "//" + env + "cdn.cengage.com/js/jquery/jquery-1.7.2.min.js", 
        location.protocol + "//" + env + "cdn.cengage.com/static/sites/ngl/header-footer/"+version+"/js/loader.js"
    ],
    complete: function () {
    	loader.init(function(){
    		loader.header().footer()
    	});
    }
});
