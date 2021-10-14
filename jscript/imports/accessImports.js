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
        s.src = '//img.en25.com/i/elqCfg.min.js';
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    }
    if (window.addEventListener) window.addEventListener('DOMContentLoaded', async_load, false);
    else if (window.attachEvent) window.attachEvent('onload', async_load);
})(); 

yepnope({
    load: [protocol + "//" + env + "cdn.cengage.com/js/jquery/jquery-latest.min.js", //needs to be cdn latest jQuery 
            protocol + "//" + env + "cdn.cengage.com/js/jquery-ui/jquery-ui-latest.min.js", //latest jQuery UI on cdn 
            protocol + "//" + env + "cdn.cengage.com/js/jquery-ui/themes/base/jquery-ui.css"],
    complete: function () {
        yepnope({
            load: [protocol + "//" + env + "cdn.cengage.com/js/sites/ngl/headerfooterloader.js",
                "/jscript/access.js"]
        });
    }
});
