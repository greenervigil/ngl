// NGL's new code

$(document).ready(function () {

    // navagtion includes for the home page		
    $("#header_include").load("/static/ngl_header.tmpl", function () {


        var addthis_config = {
            pubid: 'clwebmktgja',
            services_exclude: 'more',
            data_track_clickback: 'true'
        }

        //NGL Search Functionality
        var defaultValue = 'Search entire catalog by author, title, keyword or ISBN';
        $('#search_text').keyup(function (event) {
            if (event.keyCode == 13) {
                $("#submit_button_header").click();
            }
        });
        $('#search_text').focus(function () {
            if (this.value == defaultValue) { this.value = ''; }
        });
        $('#search_text').blur(function () {
            if ($.trim(this.value) == '') { this.value = defaultValue; }
        });

        $("#submit_button_header").click(function () {
            var n = validateISBN2($.trim($("#search_text").val()));
            if (n[0] == true) { $('#search_text').val(n[1]); }
            var q = $('#search_text').val().replace(/^\s+|\s+$/g, '');
            if (q == null || q.length == 0 || q == 'Search entire catalog by author, title, keyword or ISBN')
                return false;
            else {
                $('#search_text').val(q);
                var CNAME = ($.cookie('countryName'));
                var N = "185+" + CNAME;
                if ($.cookie('P_Country_Code') == "US")
                    N += "+" + $.cookie('schoolCode');
                $('#CenSearch').attr('action', 'showresults.do?N=' + N + '&Ntk=NGL&Ntt=' + $('#search_text').val());
                $('#CenSearch').submit();
            }
        });

        $(".boldSpanlink").parent("a").click(function (event) {
            if ($.cookie("countryName"))
                var url = "/search/showresults.do?N=185+" + $.cookie("countryName") + "+" + $(this).attr("link");
            else
                var url = "/search/chooseCountry.do?N=185";
            var code;
            var header_link;
            if ($(this).hasClass("school")) {
                var split = $(this).attr("link").split("+");
                code = split[0];
                header_link = split[1];
            }
            else if ($(this).hasClass("ELT")) {
                var split = $(this).attr("link").split("+");
                code = split[0];
                header_link = split[1];
            }
            $.cookie("header_link", header_link, { path: "/search" });
            $.cookie("schoolCode", code, { path: "/search" });
            window.location.href = url;
            event.stopPropagation();
        });
    });
    $("#footer_include").load("/static/ngl_footer.tmpl", function () {
        //Capture the Country Country Code to display in the footer
        var CCODE = ($.cookie('P_Country_Code'));
        $('#country_links ul li').first().append(CCODE);

        $("#country_links ul li:nth-child(2)").click(function () {
            $.cookie("header_link", null);
            window.location.href = "/search/chooseCountry.do?N=185";
        });
    });
    $("#metrics_include").load("/static/metrics.tmpl");

});