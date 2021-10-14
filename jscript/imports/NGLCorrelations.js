
var env;
if (window.location.hostname.toUpperCase().indexOf("S-") != -1)
    env = "s-";
else if(window.location.hostname.toUpperCase().indexOf("D-") != -1 || window.location.hostname.toUpperCase().indexOf("L-") != -1)
    env = "d-";
else
  env = "";

yepnope({ load: protocol + "//" + env + "cdn.cengage.com/js/jquery/jquery-1.7.2.min.js",
    complete: function () {
    	yepnope({load: protocol + "//" + env + "cdn.cengage.com/js/sites/ngl/loader.js",
    		complete:function(){
    			loader.init({headerCSS:true, footerCSS:true}, function(){
    	    		loader.header().footer()
    	    	});
    		}
    	});
        yepnope(["/jscript/jquery.xmlToJSON.js",
                 "/jscript/jquery.dataTypeAhead.js",
                 "/jscript/correlations.js"]);
    }
});