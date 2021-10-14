// NGL's new code

$(document).ready(function () {
    // equlizes the heightts of the divs so they ware the same dispite the content. 
    var $write14 = $('<div id="RecordNum4" ><ul><li>1</li><li>to</li><li>3</li><li>of</li><li></li></ul></div>');
    var $Xli = $('<li class="RSB_li">  </li>');
    var $Xli2 = $('<li class="RSB_li">  </li>');

    var $write13 = $('<div id="RecordNum3" ><ul><li>1</li><li>to</li><li>3</li><li>of</li><li></li></ul></div>');
    var $X3li = $('<li class="RSB_li">  </li>');
    var $X3li2 = $('<li class="RSB_li">  </li>');

    var $write12 = $('<div id="RecordNum2" ><ul><li>1</li><li>to</li><li>3</li><li>of</li><li></li></ul></div>');
    var $X2li = $('<li class="RSB_li">  </li>');
    var $X2li2 = $('<li class="RSB_li">  </li>');

    var $write11 = $('<div id="RecordNum" ><ul><li>1</li><li>to</li><li>3</li><li>of</li><li></li></ul></div>');
    var $X1li = $('<li class="RSB_li">  </li>');
    var $X1li2 = $('<li class="RSB_li">  </li>');


    // fixes chrome height bug on slideshow


    // fixes chrome height bug on slideshow
    //$(window).load(function() {
    //var SN1H=($('.f1 >a >img').height());
    //alert('SN1H is '+SN1H);
    //$('.slideWrap').height(SN1H);
    //$('.slideshow').height(SN1H);
    //});

    $('.sub-container').css({ 'width': '975px' });
    $('.row').css({ 'width': '975px' });

    // sets the country value from cookie
    if ($("#RecordScrollBanner1").length) {
        $("[id^=RecordScrollBanner]").each(function () {
            if ($(this).find("ul").children().size() < 4)
                $(this).height(243);
        });
    }
    
    //see more/less in guided navigation
    $(".more-button").on("click", function(e){
		$(this).parents("ul").children(".more-menu").slideToggle("fast");
		if($(this).text().indexOf("more") > -1){
			$("b",this).text("See less...");
		}else{
			$("b",this).text("See more...");
		}
		e.preventDefault();
		e.stopPropagation();
	});
    
    $(".content-options li:first-child a").on("click", function(e){
		var results = parseInt($(".sub_h1").text().replace("(",""));
		if(results > 9000)	{
			$('<div id="dialog" title="Info"><p><b>Cannot create list:</b> This list exceeds the maximum 9,000 product results per single spreadsheet.</p></div>').dialog({
				modal: true,
		        buttons: {
			        Close: function() {
			          $(this).dialog( "close" );
			        }
		        }
			});
			e.preventDefault();
		}
	});
    
    // this initiates the RotatingBanner Cartridge 
    if (navigator.appName == "Microsoft Internet Explorer") {
        $(window).load(startCycle());
    }
    else {
        window.addEventListener('load', startCycle(), false);
    }
    function startCycle() {
        if ($('.rotatingImage').length) {
            var RNH = $('.rotatingImage').find("img").height();
            var RNW = $('.rotatingImage').find("img").width();
	        $('.rotatingImage ul').height(RNH);
            $('.rotatingImage ul').after('<div class="SliderNavL" />').cycle({
                fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
                speed: 4000,
                pause: 1,
                pagerAnchorBuilder: function (index, el) { return '<a href="#">&bull;</a>'; },
                pager: '.SliderNavL'
            });
	        $('.SliderNavL').width(RNW);
        }
        if ($('.rotatingBanner').length) {
            var RB = $('.rotatingBanner').find("img").height();
	        $('.rotatingBanner ul').height(RB);
	        $('.rotatingBanner ul').after('<div class="sliderNav" />').cycle({
	            fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
	            speed: 4000,
	            pause: 1,
	            pagerAnchorBuilder: function (index, el) { return '<a href="#">&bull;</a>'; },
	            pager: '.sliderNav'
	        });
        }
    }
    // this is the same cartridge  as on the landing page	
    // right navagation cartidge slide show

 //    $(".recordScrollBanner").each(function(){
	// 	var numRecords = $(".mycarousel li", this).size();
	// 	var rsb = this;
	// 	var animating = false;
		
	// 	function callback1(){
	// 		animating = true;
	// 	}
	// 	function callback2(){
	// 		animating = false;
	// 	}
		
	// 	$("ul:first", this).jcarousel({
	// 		buttonNextHTML:'<button class="next"></button>',
 //    		buttonPrevHTML:'<button class="prev"></button>',
 //    		itemVisibleOutCallback: {onBeforeAnimation: callback1, onAfterAnimation:callback2}
	// 	});
		
	// 	$(".nav ul li:nth-child(2)", this).text(1);
	// 	if(numRecords > 3)
	// 		$(".nav ul li:nth-child(4)", this).text(3);
	// 	else
	// 		$(".nav", this).hide();
	// 	$(".nav ul li:nth-child(6)", this).text(numRecords);
		
	// 	$(".next", this).click(function () {
	// 		var first = parseInt($(".nav ul li:nth-child(2)", rsb).text());
	// 		var last = parseInt($(".nav ul li:nth-child(4)", rsb).text());
			
	// 		if(numRecords > 3)
	// 		{
	// 			if(first + 3 <= numRecords && last + 3 <= numRecords)
	// 				$(".nav ul li:nth-child(2)", rsb).text(first + 3);
	// 			else
	// 				$(".nav ul li:nth-child(2)", rsb).text(first + (numRecords - last));
	// 			if(last + 3 <= numRecords)
	// 				$(".nav ul li:nth-child(4)", rsb).text(last + 3);
	// 			else
	// 				$(".nav ul li:nth-child(4)", rsb).text(numRecords);
	// 		}
	// 	});
		
	// 	$(".prev", this).click(function () {
	// 		var first = parseInt($(".nav ul li:nth-child(2)", rsb).text());
	// 		var last = parseInt($(".nav ul li:nth-child(4)", rsb).text());
			
	// 		if(numRecords > 3)
	// 		{
	// 			if(first - 3 >= 1)
	// 				$(".nav ul li:nth-child(2)", rsb).text(first - 3);
	// 			else
	// 				$(".nav ul li:nth-child(2)", rsb).text(1);
	// 			if(last - 3 >= 3)
	// 				$(".nav ul li:nth-child(4)", rsb).text(last - 3);
	// 			else
	// 				$(".nav ul li:nth-child(4)", rsb).text(3);
	// 		}
	// 	});
		
	// 	$(".nav ul li button:first", this).click(function (){
	// 		if(!$(".prev", rsb).is(":disabled") && !animating)
	// 			$(".prev", rsb).click();
	// 	});
	// 	$(".nav ul li button:last", this).click(function (){
	// 		if(!$(".next", rsb).is(":disabled") && parseInt($(".nav ul li:nth-child(4)", rsb).text()) != numRecords && !animating)
	// 			$(".next", rsb).click();
	// 	});
	// });
	if($(".record-scroll-banner").length > 0){ //need to fix this tomorrow
        		$(".record-scroll-banner").each(function(){
        			var banner = this;

		        	var owl = $(".mycarousel", banner);
						  //var widthElement = parseInt($(".mycarousel .item", banner).css('min-width')) + parseInt($(".mycarousel .item", banner).css('margin-right')) + parseInt($(".mycarousel .item", banner).css('margin-left'));
						  owl.owlCarousel({
						  	items: 3,
						   // itemsCustom: [[0, 1],[widthElement*2, 2], [widthElement*3, 3],[widthElement*4, 4],[widthElement*5, 5]],
						    scrollPerPage: true,
						    pagination: false,
						    // navigation: true,
						    // navigationText: ['<button class="prev">previous items</button>','<button class="next">next items</button>'],
						    afterAction: function(){
						    	$(".first-item", banner).text(this.owl.currentItem+1);
							  	$(".last-item", banner).text(this.owl.currentItem+this.owl.visibleItems.length);
							  	$(".num-records", banner).text(this.owl.owlItems.length);
						    },
						    rewindNav: false						  
						  });

						  // Custom Navigation Events
						  $(".next", banner).click(function(){
						    owl.trigger('owl.next');
						  });
						  $(".prev", banner).click(function(){
						    owl.trigger('owl.prev');
						  });
						});

						var interval = setInterval(function(){
							if(typeof $().collapse != "undefined"){
								$("#guided-navigation-content").on("hidden.bs.collapse", function(){
									$(".record-scroll-banner .mycarousel").each(function(){
										var owldata = $(this).data('owlCarousel');
										owldata.updateVars();
									});
								});

								$("#guided-navigation-content").on("shown.bs.collapse", function(){
									$(".record-scroll-banner .mycarousel").each(function(){
										var owldata = $(this).data('owlCarousel');
										owldata.updateVars();
									});
								});

								window.clearInterval(interval);
							}
						}, 100);
				 	}

    // end the block that drives the 1st reccord scrool banner 




    //RSS feeds appears that we can move these intot the functions - 
    // test on all browsers before comitting possable issue with code not beeing used causing the JS to brake code not eeing uses causs this to brake for example, if there are three rss in top and 3 in the narrow . if only two are used intop all thre below brake. can be verrified by reversing the code.  
    if ($('#rssFeed1').length) {
        $('#rssFeed1').rssfeed(rssFeed_1, {
            limit: rssFeed_1_limit
        });
    }
    if ($('#rssFeed2').length) {
        $('#rssFeed2').rssfeed(rssFeed_2, {
            limit: rssFeed_2_limit
        });
    }
    if ($('#rssFeed3').length) {
        $('#rssFeed3').rssfeed(rssFeed_3, {
            limit: rssFeed_3_limit
        });
    }
    if ($('#rssFeed4').length) {
        $('#rssFeed4').rssfeed(rssFeed_4, {
            limit: rssFeed_4_limit
        });
    }



    // this initiates the RotatingImage Cartidge in the right Nav - has no navagtion under it. Might need to be updated to the newest version
    if ($('.RNImageSlides').length) {
        $('.RNImageSlides').cycle({
            fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
            random: 1,
            speed: 4000,
            pause: 1

        });
    }

    $(".video-container").each(function () {
		var player = $(this).attr("player");
		var container = $(this);
		var xml = $(this).data("xml");
		if(xml != undefined) {
	      xml = (xml.indexOf("l-www") == -1) ? xml.replace("www.cengage.com", env + "www.cengage.com") : xml;
	      if($(this).hasClass('vidyard-video')){
	        $(this).vidyard({
	          xml: xml,
	          single: true,
						details: ((container.parents(".videoHero").length > 0) ? false : true),
	        });
	      } else {
	        $(this).player({
	          xml: xml,
	          stream:true,
	          single: true,
						details: ((container.parents(".videoHero").length > 0) ? false : true),
	          key:"yi3O3eWtkupFILhRcDNc/TZS2WnJg6o3kRjUMIQlEDQ="
	        });
	      }
		}
	});	
		
		$("a").click(function (e) {
		if (e.target && ($(e.target).hasClass('videoHero') || $(e.target).hasClass('video-container'))) {
		  e.preventDefault();
		}
	});

    $("#jwp6Hero_wrapper").remove();

    $("a").click(function (e) {
        if (e.target.id) {
            if (e.target.id.indexOf("jwp6Hero") > -1 && e.target.id.indexOf("jwp6Hero_wrapper") == -1)
                e.preventDefault();
        }

        if ($(e.target).is("button"))
            e.preventDefault();
    });
	
	if(($('.nav-tabs a[href="#uscontact"]').tab != null) && ($('.nav-tabs a[href="#canadacontact"]').tab != null) && ($('.nav-tabs a[href="#othercontact"]').tab != null))
	{
		if(($.cookie != null) && ($.cookie('P_Country_Code') == 'US'))
			$('.nav-tabs a[href="#uscontact"]').tab('show');
		else if(($.cookie != null) && ($.cookie('P_Country_Code') == 'CA'))
			$('.nav-tabs a[href="#canadacontact"]').tab('show');
		else
			$('.nav-tabs a[href="#othercontact"]').tab('show');
	}
});

