$(document).ready(function () {
    // New -- by tjw 
    // Changing to data-track / data-track-ext = 'title-value'
    if ($('a[data-track!=""]')) {
        $("a[data-track]").click(function () {
            var cus_link_name = $(this).attr('data-track');
            //alert(cus_link_name);	

            //Omniture code
            var s = s_gi('cengagengl');
            s.linkTrackVars = 'None';
            s.linkTrackEvents = 'None';
            s.tl($(this), 'o', cus_link_name);
        });
    }

    if ($('a[data-track-ext!=""]')) {
        $("a[data-track-ext]").click(function () {
            var cus_link_name = $(this).attr('data-track-ext');

            //Omniture code
            var s = s_gi('cengagengl');
            s.linkTrackVars = 'None';
            s.linkTrackEvents = 'None';
            s.tl($(this), 'o', cus_link_name);

            window.open($(this).attr('href'));
            return false;
        });
    }

    // New -- by tjw 
    // Changing to data-track / data-track-ext = 'title-value'
    if ($('img[data-track!=""]')) {
        $("img[data-track]").click(function () {
            var cus_link_name = $(this).attr('data-track');
            //alert(cus_link_name);	

            //Omniture code
            var s = s_gi('cengagengl');
            s.linkTrackVars = 'None';
            s.linkTrackEvents = 'None';
            s.tl($(this), 'o', cus_link_name);
        });
    }

    if ($('img[data-track-ext!=""]')) {
        $("img[data-track-ext]").click(function () {
            var cus_link_name = $(this).attr('data-track-ext');

            //Omniture code
            var s = s_gi('cengagengl');
            s.linkTrackVars = 'None';
            s.linkTrackEvents = 'None';
            s.tl($(this), 'o', cus_link_name);

            window.open($(this).attr('href'));
            return false;
        });
    }

    

});  // end document.ready