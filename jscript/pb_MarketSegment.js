
$(document).ready(function () {
    // these are the base varable that are used to write html in to the sections if there is more than 3 ellments.  
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

    var player = 'http://cdn.cengage.com/js/jwplayer/6.1/jwplayer.flash.swf';

    $(".video-container").each(function () {
		var mp4 = $(".mp4", this).attr("name");
		var webm = $(".webm", this).attr("name");
		var txt = $(".txt", this).attr("name");
		var srt = $(".srt", this).attr("name");
		var desc = $(".desc", this).attr("name");
		var img = $(".img", this).attr("name");
		var title = $(".title", this).attr("name");
		var width = $(".width", this).attr("name");
		var height = $(".height", this).attr("name");
		json = {};

		if(mp4){json["mp4"] = mp4;}
		if(webm){json["webm"] = webm;}
		if(txt){json["txt"] = txt;}
		if(srt){json["srt"] = srt;}
		if(desc){json["desc"] = desc;}
		if(img){json["img"] = img;}
		if(title){json["title"] = title;}
		$(this).player({
			json:json,
			width:width,
			height:height,
			stream:true,
			key:"yi3O3eWtkupFILhRcDNc/TZS2WnJg6o3kRjUMIQlEDQ="
		});
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

    // this gets the heights of the image ellmet from the first Image in the slider set  and sets the height of the sournding div to be that height. 
    //- because they are all suposd to be the same height and since we cannot put the image height in the code we need to calculate it on the fly. 
    // this also fixes an chrome bug that causes colaping div's 
    if (navigator.appName == "Microsoft Internet Explorer") {
        $(window).load(startCycle());
    }
    else {
        window.addEventListener('load', startCycle(), false);
    }
    function startCycle() {
        var RN1H = ($('.RN1').children("a").children("img").height());
        $('.RNImageSlides').height(RN1H);

        $('.RNImageSlides').cycle({
            fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
            speed: 4000,
            //	 containerResize: 1,   // resize container to fit largest slide 
            //	 fit:	      1, 
            pause: 1
            //	 pagerAnchorBuilder: function(index, el) {return '<a href="#">&bull;</a>';},
            //	 pager: '.SliderNav'
        });

        $('.slideshow').after('<div class="SliderNavL" />').cycle({
            fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
            random: 1,
            speed: 4000,
            pause: 1,
            pagerAnchorBuilder: function (index, el) { return '<a href="#">&bull;</a>'; },
            pager: '.SliderNavL'
        });
    }
    // $("#signin a.pub_list").css('font-size','30px');


    $("#signin a.pub_list").fancybox({
        'hideOnContentClick': false,
        'frameWidth': 475,
        'frameHeight': 300
    });

    $(".recordScrollBanner").each(function(){
		var numRecords = $(".mycarousel li", this).size();
		var rsb = this;
		var animating = false;
		
		function callback1(){
			animating = true;
		}
		function callback2(){
			animating = false;
		}
		
		$("ul:first", this).jcarousel({
			buttonNextHTML:'<button class="next"></button>',
    		buttonPrevHTML:'<button class="prev"></button>',
    		itemVisibleOutCallback: {onBeforeAnimation: callback1, onAfterAnimation:callback2}
		});
		
		$(".nav ul li:nth-child(2)", this).text(1);
		if(numRecords > 3)
			$(".nav ul li:nth-child(4)", this).text(3);
		else
			$(".nav", this).hide();
		$(".nav ul li:nth-child(6)", this).text(numRecords);
		
		$(".next", this).click(function () {
			var first = parseInt($(".nav ul li:nth-child(2)", rsb).text());
			var last = parseInt($(".nav ul li:nth-child(4)", rsb).text());
			
			if(numRecords > 3)
			{
				if(first + 3 <= numRecords && last + 3 <= numRecords)
					$(".nav ul li:nth-child(2)", rsb).text(first + 3);
				else
					$(".nav ul li:nth-child(2)", rsb).text(first + (numRecords - last));
				if(last + 3 <= numRecords)
					$(".nav ul li:nth-child(4)", rsb).text(last + 3);
				else
					$(".nav ul li:nth-child(4)", rsb).text(numRecords);
			}
		});
		
		$(".prev", this).click(function () {
			var first = parseInt($(".nav ul li:nth-child(2)", rsb).text());
			var last = parseInt($(".nav ul li:nth-child(4)", rsb).text());
			
			if(numRecords > 3)
			{
				if(first - 3 >= 1)
					$(".nav ul li:nth-child(2)", rsb).text(first - 3);
				else
					$(".nav ul li:nth-child(2)", rsb).text(1);
				if(last - 3 >= 3)
					$(".nav ul li:nth-child(4)", rsb).text(last - 3);
				else
					$(".nav ul li:nth-child(4)", rsb).text(3);
			}
		});
		
		$(".nav ul li button:first", this).click(function (){
			if(!$(".prev", rsb).is(":disabled") && !animating)
				$(".prev", rsb).click();
		});
		$(".nav ul li button:last", this).click(function (){
			if(!$(".next", rsb).is(":disabled") && parseInt($(".nav ul li:nth-child(4)", rsb).text()) != numRecords && !animating)
				$(".next", rsb).click();
		});
	});

    //	$('#f1 a').focus(function(){ this needs to be replaced when the link is placed back in to the image 
    $('#f1 a').focus(function () {
        $('#slideshow').cycle(0);
        return false;
    });

    $('#f2 a').focus(function () {
        $('#slideshow').cycle(1);
        return false;
    });

    $('#f3 a').focus(function () {
        $('#slideshow').cycle(2);
        return false;
    });

    $('#f4 a').focus(function () {
        $('#slideshow').cycle(3);
        return false;
    });
    $('#f5 a').focus(function () {
        $('#slideshow').cycle(4);
        return false;
    });
    $('#f6 a').focus(function () {
        $('#slideshow').cycle(5);
        return false;
    });

    $('#f7 a').focus(function () {
        $('#slideshow').cycle(6);
        return false;
    });


    // this gets the heights of the image ellmet fomr the first Image in and sets the heigt of the sournding div to be that height.  - because they are all suposd to be the same height
    // there is no need to get the others. 

    // var RN1H=($('#RN1 >a >img').height());
    //   alert('RN1H is '+RN1H);
    //     $('.RNImageSlides').height(RN1H);	


    // fixes the hard coded image height in the search cartidge    
    // removed $('#rightTopAdCar >a >img').height(188);	


    // this initiates the RotatingImage Cartidge in the right Nav - has no navagtion under it. 

    /*$('.RNImageSlides').cycle({
    fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
    random: 1,
    speed: 4000,
    pause: 1 
      
    });*/

    // sets the focus for tab ontrool - has no aria 

    $('#RN1 a').focus(function () {
        $('#RNImageSlides').cycle(0);
        return false;
    });

    $('#RN2 a').focus(function () {
        $('#RNImageSlides').cycle(0);
        return false;
    });

    $('#RN3 a').focus(function () {
        $('#RNImageSlides').cycle(0);
        return false;
    });



    // these set the links to report to Sprops in the Omniture code

    $("#rightTopAdCar a").click(function () {
        var ObId = $(this).get(0).id;

        s = s_gi('cengagesearch');
        s.linkTrackVars = 'prop2,prop4,eVar4,events';
        s.linkTrackEvents = 'event4';
        s.prop4 = ObId;
        s.eVar4 = ObId;
        s.events = 'event4';
        s.tl(this, 'o', 'ObId');
    });

    $(".Rnav_content a").click(function () {
        var ObId = $(this).get(0).id;
        s = s_gi('cengagesearch');
        s.linkTrackVars = 'prop2,prop4,eVar4,events';
        s.linkTrackEvents = 'event4';
        s.prop4 = ObId;
        s.eVar4 = ObId;
        s.events = 'event4';
        s.tl(this, 'o', 'ObId');

    });

    $(".Rnav_content_html a").click(function () {
        var ObId = $(this).get(0).id;
        s = s_gi('cengagesearch');
        s.linkTrackVars = 'prop2,prop4,eVar4,events';
        s.linkTrackEvents = 'event4';
        s.prop4 = ObId;
        s.eVar4 = ObId;
        s.events = 'event4';
        s.tl(this, 'o', 'ObId');

    });

    // this one set the search box inthe middel still needs to capture the value of the submit and pass that to an sprop.
    $("#submit_search_learning_products_button").click(function () {

        var ObId = $(this).get(0).id;
        //			alert(ObId);
        s = s_gi('cengagesearch');
        s.linkTrackVars = 'prop2,prop4,eVar4,events';
        s.linkTrackEvents = 'event4';
        s.prop4 = ObId;
        s.eVar4 = ObId;
        s.events = 'event4';
        s.tl(this, 'o', 'ObId');

    });



    $('#FooterWrap').wrap('<div id="footer" />');
    // fixes the missing footer div in the code



    //RSS feeds appears that we can move these into the functions - 
    // test on all browsers before comitting possable issue with code not beeing used causing the JS to brake code not seeing uses causs this to brake for example, 
    //if there are three rss in top and 3 in the narrow . 
    //if only two are used intop all thre below brake. can be verrified by reversing the code.  

});
// end document.ready 
