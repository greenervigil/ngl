yepnope([ 
  { 
    load: [
      "/jscript/jquery.typeAhead.js",
      "/jscript/jquery.zrssfeed_ngl.js",
      "/jscript/isbnHyphenation.js",
      "/jscript/cartridge/RedesignNGLResultsList.js"
    ],
    complete: function () {
    	yepnope({
	        test: $("#RefSearchTXT").length,
	        yep: "/jscript/cartridge/nglRefineSearch.js"
      	});

		yepnope({
			test: $(".ngl #filterMenuMainContainer").length,
			yep: "/jscript/cartridge/RedesignGuidedNavigation.js"
		});
    }
  },
  {
    load: [
      "/jscript/ngl.js",      
      "/jscript/search/NGLRedesign_common.js"
    ]
  }
]);