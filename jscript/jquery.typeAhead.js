    (function ($) {
        $.fn.extend({
            typeAhead: function (options) {
                var defaults = {
                    textBox: this,
                    suggestions: ".suggestions",
                    value: "Enter title, author, ISBN or keyword",
                    scroll: true,
                    height: "400px",
                    searchAll: true,
                    wrapper: ".refineSuggestions",
                    submitButton: "#searchParam",
                    delay: 250,
                    url: null
                };
                var opts = $.extend(defaults, options);
                return this.each(function () {
                    var o = $.meta ? $.extend({}, opts, $this.data()) : opts; //puts all the defaults into the variable o, supports the $.meta plugin for inline default changes if needed
                    //Globals

                    var matches = 0;
                    var selected = 0;
                    var down = false;
                    var count = 0;
                    var searchString;
                    var searchBox = $(o.textBox);
                    var wrapper = searchBox.siblings(o.wrapper);
                    var autoSuggestions = $(o.suggestions, wrapper);
                    var close = $(".control a:last", wrapper);
                    var viewAll = $(".control a:first", wrapper);
                    var sending = false;
                    var URL = "";
                    var timeout = null;
                    if(o.url != null) {
                    	URL = unescape(o.url);
                    }else{
                    	URL = unescape(window.location);
                    }
                    
                    if (o.searchAll) {
                        var URL = "?" + $("input[name=N]").attr("name") + "=" + $("input[name=N]").val();
                    }
                    
                    
                    if (o.scroll)
                        autoSuggestions.attr("style", ("overflow-y:scroll; max-height:" + o.height));
                    else
                        autoSuggestions.attr("style", ("overflow-y:auto; max-height:" + o.height));

                    //searchBox.attr("placeholder", o.value);
                    //searchBox.focus();
                    searchBox.val(o.value);
                    searchBox.blur(function(){
                    	if($(this).val() == "") {
                    		$(this).val(o.value);
                    	}
                    });

                    close.click(function () {
                        wrapper.hide();
                        searchBox.focus();
                    });

                    viewAll.click(function (event) {
                        $(o.submitButton).click();
                    });

                    $(o.wrapper).click(function (event) {
                        event.stopPropagation();
                    });

                    searchBox.click(function () {
                        if (searchBox.val() == o.value)
                            searchBox.val("");
                        wrapper.hide();
                    });

                    $("html").click(function () {
                        wrapper.hide();
                    });

                    searchBox.keyup(function (e) {
                        searchString = searchBox.val();
                        if (searchString.length >= 3) {
                        	if(timeout != null)
                        		clearTimeout(timeout);
                        	timeout = setTimeout(function(){
	                            if (e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 39 && e.keyCode != 37 && sending == false) {
	                                sending = true;
	                                $.ajax({
	                                    type: "POST",
	                                    url: "utils/type-ahead" + location.search,
                                        data: { "searchParam": searchString },
	                                    success: function (d) {
	                                        sending = false;
	                                        if(d != null)
	                                        {
	                                            if (e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && d.length > 0) {
	                                                //delete the current suggestions
	                                                if (matches > 0) {
	                                                    autoSuggestions.children().remove();
	                                                    wrapper.hide();
	                                                    matches = 0;
	                                                    selected = 0;
	                                                    down = false;
	                                                }
	                                                autoSuggestions.html("");
	                                                //add suggestions by looping through the array
	                                                for (i = 0; i < d.length; i++) {
	                                                    autoSuggestions.append(
	                     					                "<a id='suggestion" + i + "' href='" + d[i].link + "' >" +
	                                                            "<ul>" +
	                     						                    "<li>" +
                                                                        d[i].title + 
                                                                        (d[i].edition != "null" ? ", " + d[i].edition + " Edition" : "") + 
                                                                    "</li>" +
	                     						                    (d[i].authors != "null" ? "<li>" + d[i].authors + "</li>" : "") +
	                     						                    (d[i].isbn13.indexOf("PRO") > -1 ? "" : "<li>ISBN-13: " + hyphenate(d[i].isbn13) + "</li>") +
	                                                            "</ul>" +
	                     					                "</a>"
	                     				                );
	                                                    matches++;
	                                                }
	                                                wrapper.show();
	                                                //place the suggestions under the country textbox
	                                                wrapper.width((searchBox.width() + $(o.submitButton).width()));
	                                                wrapper.position({
	                                                    my: "left top",
	                                                    at: "left bottom",
	                                                    of: o.textBox,
	                                                    collision: "none"
	                                                });
	
	                                                $(".suggestions a", autoSuggestions).click(function () {
	                                                    if ($(this).parents(".omnitureForm").children("input[id=searchParam]").length) {
	                                                        var search = "center search box";
	                                                        s.linkTrackVars = 'prop32,eVar32';
	                                                        s.linkTrackEvents = 'None';
	                                                        s.prop32 = search;
	                                                        s.eVar32 = search;
	                                                        s.tl($(this).parents(".omnitureForm"), 'o', search);
	                                                    }
	                                                    else if ($(this).parents(".omnitureForm").children("input[id=RefSearchTXT]").length) {
	                                                        var search = "refine search box";
	                                                        s.linkTrackVars = 'prop32,eVar32';
	                                                        s.linkTrackEvents = 'None';
	                                                        s.prop32 = search;
	                                                        s.eVar32 = search;
	                                                        s.tl($(this).parents(".omnitureForm"), 'o', search);
	                                                    }
	                                                });
	                                            }
	                                            else
	                                                wrapper.hide();
	                                        }
	                                    }
	                                });
	                            }
                            }, o.delay)

                        }
                        else {
                            wrapper.hide();
                        }
                    });




                    //controls for the up arrow, down arrow, and enter key
                    searchBox.keydown(function (e) {

                        if (e.keyCode == 40 && matches > 0 && (selected + 1 < matches || matches == 1)) {
                            if (down && selected + 1 < matches) {
                                selected++;
                                $("#suggestion" + (selected - 1) + " ul", autoSuggestions).removeClass("hoverSuggestion");
                                $("#suggestion" + selected + " ul", autoSuggestions).addClass("hoverSuggestion");
                            }
                            else {
                                down = true;
                                $("#suggestion" + selected + " ul", autoSuggestions).addClass("hoverSuggestion");
                            }
                        }
                        else if (e.keyCode == 38 && matches > 0 && selected <= matches) {
                            selected--;
                            $("#suggestion" + (selected + 1) + " ul", autoSuggestions).removeClass("hoverSuggestion");

                            if (selected > -1) {
                                $("#suggestion" + selected + " ul", autoSuggestions).addClass("hoverSuggestion");
                            }
                            else {
                                down = false;
                                selected = 0;
                            }
                        }

                        if (e.keyCode == 13 && down) {
                        	if ($(this).parents(".omnitureForm").children("input[id=searchParam]").length) {
                                var search = "center search box";
                                s.linkTrackVars = 'prop32,eVar32';
                                s.linkTrackEvents = 'None';
                                s.prop32 = search;
                                s.eVar32 = search;
                                s.tl($(this).parents(".omnitureForm"), 'o', search);
                            }
                            else if ($(this).parents(".omnitureForm").children("input[id=RefSearchTXT]").length) {
                                var search = "refine search box";
                                s.linkTrackVars = 'prop32,eVar32';
                                s.linkTrackEvents = 'None';
                                s.prop32 = search;
                                s.eVar32 = search;
                                s.tl($(this).parents(".omnitureForm"), 'o', search);
                            }
                            searchBox.attr("onkeyup", "");
                            wrapper.hide();
                            down = false;
                            location.href = $("#suggestion" + selected, autoSuggestions).attr("href");
                            selected = 0;
                            return false;
                        }
                    });

                });
            }
        });
    })(jQuery);
