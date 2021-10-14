var protocol = location.protocol;
var env;
if (window.location.hostname.toUpperCase().indexOf("S-") != -1)
    env = "s-";
else if(window.location.hostname.toUpperCase().indexOf("D-") != -1 || window.location.hostname.toUpperCase().indexOf("L-") != -1)
    env = "d-";
else
  env = "";

yepnope({load:[ protocol + "//" + env + "cdn.cengage.com/js/jquery/jquery-latest.min.js",
        protocol + "//" + env + "cdn.cengage.com/js/jquery-ui/jquery-ui-latest.min.js",
        "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css",
        "/jscript/search/common.js",
        "/jscript/ngl.js",
        protocol + "//" + env + "cdn.cengage.com/js/contrib/jquery.cookie.min.js"],
    complete: function () {
        yepnope({load:["/jscript/gateway.js", 
		  "/jscript/search/customLinkTracking.js", 
		  "/jscript/ngl.js"]});
    } 
});