// NGL's new code
var productsIncludedUrl;
var originalProductsIncludedUrl;
$(document).ready(function () {
	productsIncludedUrl = $("#products-included-tab").val();
    originalProductsIncludedUrl = productsIncludedUrl;
	productsIncluded(productsIncludedUrl);
	
    // start the tab functionality 
	var url = $("#iframe").attr("src");
    $("#MainTabs").tabs({});
    $(".Subtabs").tabs({ cookie: { expires: 30} });

    // iniates the superfish mega menue 

    $('.sub-container').css({ 'width': '975px' });
    $('.row').css({ 'width': '975px' });

    $('.sub-container').css({ 'width': '975px' });
    $('.row').css({ 'width': '975px' });

    /*$("#MainTabs [aria-selected=true]").each(function(){ 
    	var tabName = $(this).attr("href");
    	if($("#MainTabs").find(tabName).children("#SubTab").length > 0 && $("#MainTabs aside").length > 0){
        	$("#MainTabs aside").addClass("subtab-height");
        }else if($("#MainTabs aside").length > 0 && $(this).parents("#SubTab").length == 0){
        	$("#MainTabs aside").removeClass("subtab-height");
        }
    });*/
    
    //control custom tab functionality
	$("[role=tab]").click(function (e) { 
		location.hash = $(this).attr("href");
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (!(msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))){      // If Internet Explorer, return version number
            window.scrollTo(0, 0);
        }
        var tabName = $(this).attr("href");
        var child = $("#MainTabs").find(tabName).find("[role=tablist]").children(":first").children("a");
        if (child) {
            child.click();
        }
        e.stopPropagation();
        if($("#MainTabs").find(tabName).children("#SubTab").length > 0 && $("#MainTabs aside").length > 0){
            $("#MainTabs aside").addClass("subtab-height");
        }else if($("#MainTabs aside").length > 0 && $(this).parents("#SubTab").length == 0){
            $("#MainTabs aside").removeClass("subtab-height"); 
        }
    });
	//correctly select subtabs in hashtag
    var hash = location.hash;
    if(hash != ""){
    	$(hash).each(function(){
    		if($(this).parents("[role=tabpanel]").length > 0){
    			$("#MainTabs a[href=#" + $(this).parents("[role=tabpanel]").attr("id") + "]").click();
    		}
    	});
    }
	

    // this is the sam,e cartdige as on the landing page	
    // right navagation cartidge slide show
    if (navigator.appName == "Microsoft Internet Explorer") {
        $(window).load(startCycle());
    }
    else {
        window.addEventListener('load', startCycle(), false);
    }
    function startCycle() {
        if ($('.rotatingImage ul').length) {
            var RB = $('.rotatingImage').find("img").height();
            $('.rotatingImage ul').height(RB);
            $('.rotatingImage ul').after('<div class="slider-nav" />').cycle({
                fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
                speed: 4000,
                pause: 1,
                pagerAnchorBuilder: function (index, el) { return '<a href="#">&bull;</a>'; },
                pager: '.slider-nav'
            });
        }
    }

	$(".request a:nth-child(2)").click(function (e) {
        if ($(".request").hasClass("closed")) 
        {
            $(".request ul").slideDown("fast");
            $(".request").removeClass("closed");
        }
        else 
        {
            $(".request ul").slideUp("fast");
            $(".request").addClass("closed");
        }
        e.stopPropagation();
        e.preventDefault();
    });

	$(".wish-list a:first").click(function(e){
		if($(".wish-list").hasClass("closed"))
		{
			$(".wish-list ul").slideDown("fast");
			$(".wish-list").removeClass("closed");
		}
		e.stopPropagation();
	});
	
	$(".wish-list a:nth-child(2)").click(function(e){
		if(!$(".wish-list").hasClass("closed"))
		{
			$(".wish-list ul").slideUp("fast", function(){
				$(".wish-list").addClass("closed");
			});
		}
		e.stopPropagation();
	});
	
	$(".request-a-copy .button").click(function(e){
		if ($(".request-a-copy").hasClass("closed")) 
        {
            $(".request-a-copy ul").fadeIn();
            $(".request-a-copy").removeClass("closed");
        }
        else 
        {
            $(".request-a-copy ul").fadeOut(function(){
            	$(".request-a-copy").addClass("closed");
            });
        }
        e.stopPropagation();
	});
	
	$(".look-inside").click(function(e){
		if($("#lookInsideContent").length)
		{
			if ($("#coverImage").hasClass("closed")) 
	        {
	        	$("#coverImage").removeClass("closed");
	            $("#lookInsideContent").fadeIn();
	        }
	        e.preventDefault();
	        e.stopPropagation();
        }
	});
	
	$("#lookInsideContent a:first").click(function(e){
		if (!$("#coverImage").hasClass("closed")) 
        {
        	$("#coverImage").addClass("closed");
            $("#lookInsideContent").fadeOut();
        }
        e.preventDefault();
        e.stopPropagation();
	});
	
    //  this initiates the on click  for show all series pages

    $('#seeEntireP').click(function (e) {
        if(!$(e.target).hasClass("programCoverLinks")) {
	    	$('div', this).fadeToggle('slow', 'linear');
	        e.preventDefault();
	        e.stopPropagation();
    	}
    });
    
    $("a.iframe").fancybox(
    {
    type: "iframe",
    autoSize: false,
    autoWidth: true,
    height: 500,
    iframe: {
      preload: true
    }
    });
    $(".video-container").each(function () {
    var xml = $(this).data("xml");
    var $this = this;
    var changeFunction = function(event) {
      if(event.originalEvent !== undefined) {
        scrollToPanel($this);
      }
    };
        if(xml != undefined)
        {
      xml = (xml.indexOf("l-ngl") == -1) ? xml.replace("ngl.cengage.com", env + "ngl.cengage.com") : xml;
      if($(this).hasClass('vidyard-video')){
        $(this).vidyard({
          xml: xml,
          changeVideo: changeFunction
        });
      } else {
        $(this).player({
          xml: xml,
          stream:true,
          key:"yi3O3eWtkupFILhRcDNc/TZS2WnJg6o3kRjUMIQlEDQ=",
          changeVideo: changeFunction
        });
      }
        }
    });
});


function productsIncluded(url, data){
    productsIncludedUrl = url;
	$("#ProductsIncluded").html('<div class="please-wait-body">' +
			'<i class="icon-spinner icon-spin icon-2x"></i> &nbsp;Processing Please wait...' +
			'</div>');
	if($("#ProductsIncluded").length > 0){
    	$.ajax({
    		type: "POST",
    		url: url,
    		data: data,
    		success: function(d){
    			$("#ProductsIncluded").html(d);
    			$.getScript("/jscript/imports/NGLProductsIncludedPage.js");
    		}
    	});
    }
}