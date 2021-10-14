$(document).ready(function () {
    // this fixes webkit(chromes) not geting the height of the image before the jscript or css fires and retuning a null value 
    // if this is in a seperate file the window.onload may not be nessasary 		


    // checks the left navagation for hight exceding x pixles and then adds the correct funtionaluty to it. 


    // sets the country value from cookie

    //		$.cookie('the_cookie'); // => 'the_value'
    //		$.cookie('countryName');
    //		var COOK=($.cookie('countryName'));

    $('.sub-container').css({ 'width': '975px' });
    $('.row').css({ 'width': '975px' });

    if (navigator.appName == "Microsoft Internet Explorer") {
        $(window).load(startCycle());
    }
    else {
        window.addEventListener('load', startCycle(), false);
    }
    function startCycle()
    {
        // right navagation cartidge slide show
        var RN1H = ($('.RN').find("img").height());
        $('.RN').height(RN1H);
        $('.rotatingImage').after('<div class="SliderNav"></div>').cycle({
            fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
            speed: 4000,
            pause: 1,
            pagerAnchorBuilder: function (index, el) { return '<a href="#">&bull;</a>'; },
            pager: '.SliderNav'
        });
    }

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


});
