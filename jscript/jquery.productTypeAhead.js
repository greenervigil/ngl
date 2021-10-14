(function ($) {
    $.fn.extend({
        productTypeAhead: function (options) {
            var defaults = {
                textBox: this,
                suggestions: "#suggestions",
                data: new Array(),
                scroll: true,
                height: "400px",
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
                var autoSuggestions;
                var searchBox;

                autoSuggestions = $(o.suggestions);
                searchBox = $(o.textBox);

                autoSuggestions.hide();

                autoSuggestions.click(function (event) {
                    event.stopPropagation();
                });

                searchBox.click(function () {
                    autoSuggestions.hide();
                });

                $("html").click(function () {
                    autoSuggestions.hide();
                });

                searchBox.keyup(function (e) {
                    searchString = searchBox.val();
                    if (e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 39 && e.keyCode != 37) {
                        if (searchBox.val() != "") {

                            
                            autoSuggestions.children().remove();
                            autoSuggestions.hide();
                            matches = 0;
                            selected = 0;
                            down = false;

                            for (i = 0; i < o.data.length; i++) {
                                if (o.data[i].toUpperCase().indexOf(searchBox.val().toUpperCase()) >= 0) {
                                    console.log("matched");
                                    autoSuggestions.append(
                     			        "<div id='suggestion" + matches + "' class='suggestion' >" + o.data[i] + "</div>"
                     		        );
                                    matches++;
                                }
                            }

                            autoSuggestions.show();
                            //place the suggestions under the country textbox
                            autoSuggestions.width((searchBox.width() - 50));
                            autoSuggestions.position({
                                my: "left top",
                                at: "left bottom",
                                of: o.textBox,
                                collision: "none"
                            });

                            if (o.scroll && autoSuggestions.height > 400)
                                autoSuggestions.attr("style", ("overflow-y:scroll; max-height:" + o.height));
                            else
                                autoSuggestions.attr("style", ("overflow-y:auto; max-height:" + o.height));

                            $(".suggestion").click(function () {
                                searchBox.val($(this).text());
                                autoSuggestions.hide();
                                searchBox.focus();
                                selected = 0;
                                down = false;
                            });
                        }
                        else {
                            autoSuggestions.hide();
                        }
                    }
                });




                //controls for the up arrow, down arrow, and enter key
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
                        searchBox.focus();
                        down = false;
                        selected = 0;
                        return false;

                    }
                });
            });
        }
    });
})(jQuery);
