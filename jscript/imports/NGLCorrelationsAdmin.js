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
        yepnope({load:[ protocol + "//" + env + "cdn.cengage.com/js/contrib/jqgrid/js/jquery.jqGrid.min.js",
                 "/jscript/jquery.xmlToJSON.js",
                 "/jscript/jquery.form.js",
                 "/jscript/jquery-impromptu.js",
                 "/jscript/correlationsWebService.js",
                 "/jscript/jquery.arrayTypeAhead.js"],
	        complete:function(){
	        	$(document).ready(function(){
	        		yepnope({
	        			test:$("#admin-documents").length > 0,
	        			yep:"/jscript/correlationsDocuments.js"
	        		});	
	        		
	        		yepnope({
	        			test:$("#admin-products").length > 0,
	        			yep:"/jscript/correlationsProducts.js"
	        		});
	        		
	        		yepnope({
	        			test:$("#admin-standards").length > 0,
	        			yep:"/jscript/correlationsStandards.js"
	        		});
	        		
	        		yepnope({
	        			test:$("#login").length > 0,
	        			yep:"/jscript/correlationsLogin.js"
	        		});
	        	});
	        }
        });
    }
});