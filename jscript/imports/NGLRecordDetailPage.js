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
yepnope({ 
  load: [
    protocol + "//" + env + "cdn.cengage.com/js/jquery/jquery-2.1.4.min.js",
    protocol + "//" + env + "cdn.cengage.com/js/jquery-ui/jquery-ui-1.11.4.min.js"
  ],
    complete: function () {
      yepnope({
        load: protocol + "//" + env + "cdn.cengage.com/js/sites/ngl/loader.js",
        complete: function(){
          loader.init({headerCSS:true, footerCSS:true}, function(){
            loader.header().footer()
          });
        }
      });
      yepnope({
          test: $(".SlideWrap").length || $(".rotatingImage").length,
          yep: protocol + "//" + env + "cdn.cengage.com/js/contrib/jquery.cycle.all.min.js"
      });
      yepnope({ 
          load: [protocol + "//" + env + "cdn.cengage.com/js/contrib/jquery.jwplayer-impl.js",
                protocol + "//" + env + "cdn.cengage.com/js/vidyard/1.0/jquery.vidyard-plugin.js",
                protocol + "//" + env + "cdn.cengage.com/libs/fancybox/2.1.5/source/jquery.fancybox.js",
                  "/jscript/ui/jquery.ui.core.js"],
          complete: function () {
              yepnope({
                test: $(".st_sharethis").length,
                yep: protocol + "//w.sharethis.com/button/buttons.js",
                complete:function(){
                  if(typeof stLight != "undefined"){
                    var switchTo5x = true;
                    stLight.options({ publisher: "37c3f5ea-6a27-454d-be91-18f328e0a77a" });
                  }
                }
              });
              jwplayer.key = "yi3O3eWtkupFILhRcDNc/TZS2WnJg6o3kRjUMIQlEDQ=";
              yepnope({load:["/jscript/ProductResultsNgl.js",                              
                              "/jscript/search/common.js"]
              });
          }
      });
    }
});