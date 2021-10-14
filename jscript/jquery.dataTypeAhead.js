(function ($) {
    $.fn.extend({
        dataTypeAhead: function (options) {
            var defaults = {
                textBox: this,
                suggestions: "#suggestions",
                data: new Array(),
                standards: new Array(),
                products: new Array(),
                documents: new Array(),
                scroll: true,
                height: "400px",
                delay: 250,
                value: ""
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
                var timeout = null;

                autoSuggestions = $(o.suggestions);
                searchBox = $(o.textBox);

                autoSuggestions.hide();
                searchBox.val(o.value);

                $(o.suggestions).click(function (event) {
                    event.stopPropagation();
                });

                searchBox.click(function () {
                    if (searchBox.val() == o.value)
                        searchBox.val("");
                    autoSuggestions.hide();
                });

                $("html").click(function () {
                    autoSuggestions.hide();
                });

                searchBox.keyup(function (e) {
                    searchString = searchBox.val();
                    if(timeout != null)
                		clearTimeout(timeout);
                	timeout = setTimeout(function(){
	                    if (e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 39 && e.keyCode != 37) {
	                        if (searchBox.val() != "") {
	
	                            //delete the current suggestions
	                            if (matches > 0) {
	                                autoSuggestions.children().remove();
	                                autoSuggestions.hide();
	                                matches = 0;
	                                selected = 0;
	                                down = false;
	                            }
	
	                            product = null;
	                            if ($("#programText").length > 0 && $("#programText").val() != "") {
	                                for (i = 0; i < o.products.length; i++) {
	                                    if (o.products[i].Product_Name.toUpperCase().indexOf($("#programText").val().toUpperCase()) >= 0) {
	                                        product = o.products[i];
	                                        break;
	                                    }
	                                }
	                                if(product == null){
	                                	product = { "Product_Code": "" };
	                                }
	                            }
	
	                            standard = null;
	                            if ($("#standardText").length > 0 && $("#standardText").val() != "" && $("#standardText").val() != "All standards") {
	                                for (i = 0; i < o.standards.length; i++) {
	                                    if (o.standards[i].Standard_Name.toUpperCase().indexOf($("#standardText").val().toUpperCase()) >= 0 || o.data[i].Standard_Aka.toUpperCase().indexOf(searchBox.val().toUpperCase()) >= 0) {
	                                        standard = o.standards[i];
	                                        break;
	                                    }
	                                }
	                                if(standard == null){
	                                	standard = { "Standard_Code": "" };
	                                }
	                            }
	
	                            //add suggestions by looping through the array
	                            for (i = 0; i < o.data.length; i++) {
	                                if (o.data[i].Standard_Name) {
	                                    if (product != null) {
	                                        for (j = 0; j < o.documents.length; j++) {
	                                            if ((o.data[i].Standard_Name.toUpperCase().indexOf(searchBox.val().toUpperCase()) >= 0 || o.data[i].Standard_Aka.toUpperCase().indexOf(searchBox.val().toUpperCase()) >= 0) && o.data[i].Standard_Code == o.documents[j].Standard_Code && o.documents[j].Product_Code == product.Product_Code) {
	                                                autoSuggestions.append(
	                     			                    "<div id='suggestion" + matches + "' class='suggestion' >" + o.data[i].Standard_Name + "</div>"
	                     		                    );
	                                                matches++;
	                                                break;
	                                            }
	                                        }
	                                    }
	                                    else {
	                                        for (j = 0; j < o.documents.length; j++) {
	                                            if ((o.data[i].Standard_Name.toUpperCase().indexOf(searchBox.val().toUpperCase()) >= 0 || o.data[i].Standard_Aka.toUpperCase().indexOf(searchBox.val().toUpperCase()) >= 0) && o.data[i].Standard_Code == o.documents[j].Standard_Code) {
	                                                autoSuggestions.append(
	                     			                    "<div id='suggestion" + matches + "' class='suggestion' >" + o.data[i].Standard_Name + "</div>"
	                     		                    );
	                                                matches++;
	                                                break;
	                                            }
	                                        }
	                                    }
	                                }
	                                else if (o.data[i].Product_Name) {
	                                    if (standard != null) {
	                                        for (j = 0; j < o.documents.length; j++) {
	                                            if (o.data[i].Product_Name.toUpperCase().indexOf(searchBox.val().toUpperCase()) >= 0 && o.data[i].Product_Code == o.documents[j].Product_Code && o.documents[j].Standard_Code == standard.Standard_Code) {
	                                                autoSuggestions.append(
	                     			                    "<div id='suggestion" + matches + "' class='suggestion' >" + o.data[i].Product_Name + "</div>"
	                     		                    );
	                                                matches++;
	                                                break;
	                                            }
	                                        }
	                                    }
	                                    else {
	                                        for (j = 0; j < o.documents.length; j++) {
	                                            if (o.data[i].Product_Name.toUpperCase().indexOf(searchBox.val().toUpperCase()) >= 0 && o.data[i].Product_Code == o.documents[j].Product_Code) {
	                                                autoSuggestions.append(
	                     			                    "<div id='suggestion" + matches + "' class='suggestion' >" + o.data[i].Product_Name + "</div>"
	                     		                    );
	                                                matches++;
	                                                break;
	                                            }
	                                        }
	                                    }
	                                }
	                            }
	
	                            autoSuggestions.show();
	                            //place the suggestions under the country textbox
	                            autoSuggestions.width((searchBox.width() + 7));
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
	                                selected = 0;
	                                down = false;
	                            });
	                        }
	                        else {
	                            autoSuggestions.hide();
	                        }
	                    }
                	}, o.delay);
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
                        down = false;
                        selected = 0;
                        return false;

                    }
                });
            });
        }
    });
})(jQuery);
