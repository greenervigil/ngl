$(document).ready(function () {
    var matches = 0;
    var selected = 0;
    var down = false;
    var match = false;
    var count = 0;
    var searchString;
    var autoSuggestions;
    var searchBox;
    //var USBox;
    var countryCode = 0;
    var schoolCode = $.cookie("schoolCode");
    var showSchool = true;
    var header_link = $.cookie("header_link");
	if(header_link == null) {
		if(window.location.hostname.indexOf("ngl.cengage.com") > -1){
			header_link = '201';
			$.cookie("header_link", "201", { path: "/", expires: 0 });
		}
	}
    var previousQuery = $.cookie("previousQuery");
    autoSuggestions = $("#suggestions");
    searchBox = $("#countryText");
    //USBox = $("#USBox");
    searchBox.focus();
    autoSuggestions.hide();
    //USBox.hide();
    $("#countryselector").hide();
    $("#categoryselector").hide();
    searchBox.click(function () {
        autoSuggestions.hide();
    });

    if (header_link) {
        $("input[name='schoolType']").each(function () {
            if ($(this).attr("countryid") == schoolCode) {
                $(this).attr("checked", "checked");
                showSchool = false;
            }
        });
    }

    $("#CC").click(function () {
        submitCountry();
    });

    // var showUSBox = function () {
    //     if (searchBox.val().toUpperCase() == "UNITED STATES" || searchBox.val().toUpperCase() == "US" && showSchool) {
    //         autoSuggestions.hide();
    //         USBox.show();
    //     }
    //     else {
    //         USBox.hide();
    //     }

    //     autoSuggestions.width(searchBox.width() - 18);
    //     autoSuggestions.position({
    //         my: "left top",
    //         at: "left bottom",
    //         of: "#countryText",
    //         collision: "none"
    //     });

    //     USBox.width(searchBox.width() - 18);
    //     USBox.position({
    //         my: "left top",
    //         at: "left bottom",
    //         of: "#countryText",
    //         collision: "none"
    //     });
    // }

    function submitOmniture(selector) {
        //s.linkTrackVars = 'prop30,eVar30';
        //s.linkTrackEvents = 'None';
        //s.prop30 = selector.text();
        //s.eVar30 = selector.text();
        //s.tl(selector, 'o', selector.text());

        // if ($("#USBox input[type='radio']").is(":checked")) {
        //     var market = $("#USBox input[name='schoolType']:checked").siblings("label");
        //     s.linkTrackVars = 'prop23,eVar23';
        //     s.linkTrackEvents = 'None';
        //     s.channel = market.text();
        //     s.prop23 = market.text();
        //     s.eVar23 = market.text();
        //     s.tl(market, 'o', market.text());
        // }
    }

    var submitCountry = function () {
        $("#countryselector > option").each(function () {
            if (searchBox.val().toUpperCase() == $(this).text() || searchBox.val().toUpperCase() == $(this).attr("id").toUpperCase()) {
                $("#countryselector").val($(this).val());
            }
        });
        // if ($("#USBox input[type='radio']").is(":checked") && (searchBox.val().toUpperCase().indexOf("UNITED STATES") == 0 || searchBox.val().toUpperCase().indexOf("US") == 0)) {
        //     var forwardurl = document.location.href;
        //     var selectedVal = $("#countryselector option:selected").attr("id");
        //     var countryCode = $("#countryselector option:selected").val() + "+" + $("#USBox input[name='schoolType']:checked").attr("countryId");
        //     var urlState;
        //     if(previousQuery)
        //     {
        //     	urlState = previousQuery + "+" + $("#countryselector option:selected").val() + "+" + $("#USBox input[name='schoolType']:checked").attr("countryId");
        //     	$.cookie("previousQuery", null, {path:"/"});
        //     }
	       //  else {
	       //      if (header_link)
	       //          urlState = 'showresults.do' + '?N=' + $("#countryselector option:selected").val() + "+" + schoolCode + "+" + $.cookie("header_link");
	       //      else {
	       //          urlState = 'showresults.do' + '?N=' + countryCode + "+200";
	       //      }
        //     }
        //     $.cookie("countryName", $("#countryselector option:selected").val(), { path: "/", expires: 0 }); // needs to be removed in summer release
        //     $.cookie("P_Country_Code", $("#countryselector option:selected").attr("id"), { path: "/", expires: 0 }); // needs to be removed in summer release
        //     submitOmniture($("#countryselector option:selected")); 
        //     document.selectCountry.action = urlState;
        //     document.selectCountry.submit();
        // }
        // else if ($("#USBox input[type='radio']").is(":checked") == false && (searchBox.val().toUpperCase().indexOf("UNITED STATES") == 0 || searchBox.val().toUpperCase().indexOf("US") == 0)) {
        //     $("#USSelect").addClass("error");
        // }
        //else {
            $("#countryselector > option").each(function () {
                if ($(this).text().toUpperCase() == searchBox.val().toUpperCase() && searchBox.val() != "") {
                    $("#countryselector").val($(this).val());
                    var forwardurl = document.location.href;
                    var selectedVal = $("#countryselector option:selected").attr("id");
                    var countryCode = $("#countryselector option:selected").val();
                    var urlState;
                    if(previousQuery)
		            {
		            	urlState = previousQuery + "+" + $("#countryselector option:selected").val();
		            	$.cookie("previousQuery", null, {path:"/"});
		            }
		            else {
	                    if (header_link)
	                        urlState = 'showresults.do' + '?N=' + countryCode + "+" + $.cookie("header_link");
	                    else {
	                        urlState = 'showresults.do' + '?N=' + countryCode + "+200";
	                    }
                    }
                    $.cookie("countryName", $("#countryselector option:selected").val(), { path: "/", expires: 0 });
            		$.cookie("P_Country_Code", $("#countryselector option:selected").attr("id"), { path: "/", expires: 0 });
                    submitOmniture($("#countryselector option:selected"));
                    document.selectCountry.action = urlState;
                    match = true;
                    document.selectCountry.submit();
                    return;
                }
            });


            if (!match) {
                var exactCount = new Array();
                var exactMatch = new Array();
                var exactCC = new Array();
                var searchString = searchBox.val().toUpperCase().split("");
                var num = 0;
                $("#countryselector > option").each(function () {
                    var match = false;
                    var option = $(this).text().toUpperCase().split("");
                    var numMatches = 0;
                    var exactNum = 0;
                    for (i = 0; i < option.length; i++) {
                        for (j = 0; j < searchString.length; j++) {
                            if (i == j && option[i].toUpperCase() == searchString[j].toUpperCase()) {
                                exactNum++;
                                exactMatch[num] = $(this).text();
                                exactCount[num] = exactNum;
                                exactCC[num] = $(this).val()
                                match = true;
                            }
                        }
                    }
                    if (match)
                        num++;
                });
                var exactName;
                var CC;
                var high = 0;
                for (i = 0; i < exactMatch.length; i++) {
                    if (high < exactCount[i]) {
                        high = exactCount[i];
                        exactName = exactMatch[i];
                        CC = exactCC[i];
                    }
                }

                if (exactName) {
                    autoSuggestions.children().remove();
                    matches = 0
                    autoSuggestions.append(
                        "<div id='dum' >Did you mean:</div>" +
                        "<div id='suggestion" + matches + "' class='suggestionDum' countryCode='" + CC + "' >" + exactName + "</div>"
                    );
                }
                autoSuggestions.show();
                matches++;
                $("[class^='suggestion']").click(function (event) {
                    searchBox.val($(this).text());
                    searchBox.focus();
                    autoSuggestions.hide();
                    selected = 0;
                    down = false;
                    $("#countryselector").val($(this).attr("countryCode"));
                    //showUSBox();
                    submitCountry();
                });
                //showUSBox();
            }
       // }
    }

    $("#formWrap").click(function (event) {
        event.stopPropagation();
    });

    // $("#USBox input[type='radio']").click(function () {
    //     if ($("#USSelect").hasClass("error")) {
    //         $("#USSelect").removeClass("error");
    //     }
    //     searchBox.focus();
    // });

    $(document).click(function () {
        //USBox.hide();
        autoSuggestions.hide();
    });

    searchBox.keyup(function (e) {
        if (e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13) {

            if (matches > 0) {
                autoSuggestions.children().remove();
                matches = 0;
                selected = 0;
            }
            //add suggestions by looping through the array
            $("#countryselector > option").each(function () {
                if (($(this).text().toUpperCase().indexOf(searchBox.val().toUpperCase()) == 0 ||
                     $(this).attr("id").toUpperCase().indexOf(searchBox.val().toUpperCase()) == 0) &&
                     searchBox.val() != "") {
                    autoSuggestions.append(
                        "<div id='suggestion" + matches + "' class='suggestion' countryCode='" + $(this).val() + "' >" + $(this).text() + "</div>"
                    );
                    matches++;
                }
            });
            autoSuggestions.show();

            $("[class^='suggestion']").click(function (event) {
                searchBox.val($(this).text());
                searchBox.focus();
                autoSuggestions.hide();
                selected = 0;
                down = false;
                $("#countryselector").val($(this).attr("countryCode"));
                //showUSBox();
                submitCountry();
            });
            //showUSBox();
        }

        (e.keyCode == 13)
        {
            return false;
        }
    });

    searchBox.keydown(function (e) {

        if (e.keyCode == 40 && matches > 0 && (selected + 1 < matches || matches == 1)) {
            if (down && selected + 1 < matches) {
                selected++;
                $("#suggestion" + (selected - 1)).removeClass("hoverSuggestion");
                $("#suggestion" + selected).addClass("hoverSuggestion");
            }
            else {
                down = true;
                $("#suggestion" + selected).addClass("hoverSuggestion");
            }
        }
        else if (e.keyCode == 38 && matches > 0 && selected <= matches) {
            selected--;
            $("#suggestion" + (selected + 1)).removeClass("hoverSuggestion");

            if (selected > -1) {
                $("#suggestion" + selected).addClass("hoverSuggestion");
            }
            else {
                down = false;
                selected = 0;
            }
        }

        if (e.keyCode == 13 && down) {
            searchBox.val($("#suggestion" + selected).text());
            autoSuggestions.hide();
            //showUSBox();
            down = false;
            $("#countryselector").val($("#suggestion" + selected).attr("countryCode"));
            selected = 0;
            submitCountry();
            return false;
        }
        else if (e.keyCode == 13 && down == false) {
            submitCountry();
            return false;
        }
    });
});

