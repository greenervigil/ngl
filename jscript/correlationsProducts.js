$(document).ready(function () {
	var app;
    var grid = $("#grid");
    $.getAllProducts(true, function () {
        $.getAllStandards(false, function () {
            $.getAllDocuments(false);
        });
    });

    $.setupButtons = function () {
        $("#footerRow").width($("#gbox_grid").width());
        $("#footerRow").show();
        $("#gbox_grid").append('<div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" id="resize" style="z-index: 1000;"></div>');
        $("#resize").mousedown(function(){
        	$(document).on("mousemove", function(e){
        		$("#footerRow").width(e.pageX);
        		grid.jqGrid("setGridWidth", e.pageX);
        		grid.jqGrid("setGridHeight", e.pageY - 72);
        	});
        });
        $(document).mouseup(function(){
        	$(document).off("mousemove");
        });
        $("#update").click(function () {
            var selRowId = grid.jqGrid('getGridParam', 'selrow');
            var code = grid.jqGrid('getCell', selRowId, 'Product_Code');
            var name = grid.jqGrid('getCell', selRowId, 'Product_Name');
            app = grid.jqGrid('getCell', selRowId, 'Product_App');
            var popup = 
		            '<div id="standardWrapper">' +
		            	'<div class="names">' +
				            '<div class="texts">Product Name: </div>' +
				            '<div class="otherInputs" >' +
				                '<input type="text" id="addText" name="nameText" value="' + name + '" maxlength="99" autocomplete="off" />' +
				            '</div>' +
				        '</div>' +
			            '<div class="names">' +
				            '<div class="texts">Correlations App: </div>' +
				            '<div class="otherInputs" >' +
				                '<select id="correlations-app" name="correlationsApp">' +
				                    '<option value="correlations">Correlations</option>' +	
				                    '<option value="research">Research</option>' +
				                '</select>' +
				            '</div>' +
				        '</div>' +
				    '</div>';
            if (selRowId) {
                function callback(event, bVal, form, vals) {
                	console.log(vals);
                    if (bVal) {
                        $("#addText").keyup(function () {
                            if ($(this).css("border").indexOf("1px solid") >= 0)
                                $(this).removeAttr("style");
                        });
                        $("#correlations-app").val("research");
                        if ($("#addText").val() == "") {
                            $("#addText").focus()
                            $("#addText").css("border", "solid #ff0000 1px");
                            return false;
                        }
                        
                        for (i = 0; i < products.length; i++) {
                            if (code == products[i].Product_Code) {
                                var match = false;
                                for (j = 0; j < products.length; j++) {
                                    if (vals.nameText.toUpperCase() == products[j].Product_Name.toUpperCase() && vals.correlationsApp == products[j].Product_App) {
                                        match = true;
                                        break;
                                    }
                                }

                                if (!match){
                                	console.log("sending");
                                    $.updateProduct(products[i].Product_Code, products[i].Product_Name, vals.nameText, vals.correlationsApp);
                                }
                                else {
                                    $("#addText").focus()
                                    $("#addText").css("border", "solid #ff0000 1px");
                                    alert("Product: \"" + vals.nameText + "\" already exists");
                                    return false;
                                }
                                break;
                            }
                        }
                    }
                    return true;
                }

                $.prompt(popup, {
                    submit: callback,
                    loaded: setupPrompt,
                    buttons: { Update: true, Cancel: false }
                });
            }
            else
                alert("Please select a row");
        });

        $("#delete").click(function () {
            var selRowId = grid.jqGrid('getGridParam', 'selrow');
            var code = grid.jqGrid('getCell', selRowId, 'Product_Code');
            var name = grid.jqGrid('getCell', selRowId, 'Product_Name');
            app = grid.jqGrid('getCell', selRowId, 'Product_App');
            var match = false;
            if (selRowId) {

                for (i = 0; i < products.length; i++) {
                    if (code == products[i].Product_Code) {
                        for (j = 0; j < documents.length; j++) {
                            if (code == documents[j].Product_Code)
                                match = true;
                        }
                        if (!match) {
                            if (confirm("Delete: \"" + name + "\"?"))
                                $.deleteProduct(products[i].Product_Code, products[i].Product_Name, selRowId, app);
                        }
                        else
                            alert("Cannot delete, product has an attatched document.");
                        break;
                    }
                }
            }
            else
                alert("Please select a row");
        });

        $("#add").click(function () {
            var popup = 
            	'<div id="standardWrapper">' +
	            	'<div class="names">' +
			            '<div class="texts">Product Name: </div>' +
			            '<div class="otherInputs" >' +
			                '<input type="text" id="addText" name="nameText" value="' + name + '" maxlength="99" autocomplete="off" />' +
			            '</div>' +
			        '</div>' +
		            '<div class="names">' +
			            '<div class="texts">Correlations App: </div>' +
			            '<div class="otherInputs" >' +
			                '<select id="correlations-app" name="correlationsApp">' +
			                    '<option value="correlations">Correlations</option>' +	
			                    '<option value="research">Research</option>' +
			                '</select>' +
			            '</div>' +
			        '</div>' +
			    '</div>';

            $.prompt(popup, {
                submit: callback,
                loaded: setupPrompt,
                buttons: { Save: true, Cancel: false }
            });

            function callback(event, bVal, form, vals) {
                if (bVal) {
                	console.log(vals);
                	console.log(products);
                    var match = false;
                    for (i = 0; i < products.length; i++) {
                        if (vals.nameText.toUpperCase() == products[i].Product_Name.toUpperCase() && vals.correlationsApp == products[i].Product_App) {
                            match = true;
                            break;
                        }
                    }

                    $("#addText").keyup(function () {
                        if ($(this).css("border").indexOf("1px solid") >= 0)
                            $(this).removeAttr("style");
                    });

                    if ($("#addText").val() == "") {
                        $("#addText").focus()
                        $("#addText").css("border", "solid #ff0000 1px");
                        return false;
                    }

                    if (!match)
                        $.insertProduct(vals.nameText, $("#correlations-app").val());
                    else {
                        $("#addText").focus()
                        $("#addText").css("border", "solid #ff0000 1px");
                        alert("Product: \"" + vals.nameText + "\" already exists");
                        return false;
                    }
                }
                return true;
            }
        });

        $("#searchBox").keyup(function () {
            grid.jqGrid('clearGridData', false);
            if ($(this).val() != "") {
                var match = false;
                for (i = 0; i < products.length; i++) {
                    if (products[i].Product_Name.toUpperCase().indexOf($(this).val().toUpperCase()) >= 0) {
                        var data = [{ 
                        	"Product_Code": products[i].Product_Code,
                            "Product_Name": products[i].Product_Name
                            //"Product_App": products[i].Product_App
                        }];

                        grid.jqGrid("addRowData", i, data);
                        match = true;
                    }
                }

                if (!match) {
                    var data = [{ "Product_Code": "0",
                        "Product_Name": "No Results"
                    }];
                    grid.jqGrid("addRowData", i, data);
                }
            }
            else {
                for (var i = 0; i < products.length; i++)
                    grid.jqGrid('addRowData', i, products[i]);
            }
        });
    }

    function setupPrompt() {
    	$("#correlations-app").val(app);
        $("#addText").focus();
        $(".jqimessage input[type=text]").keyup(function (event) {
            if (event.keyCode == 13)
                $(".jqidefaultbutton").click();
        });
        $("#addText").keyup(function () {
        	if($(this).val().length > 98)
        	{
        		alert("Standard name cannot exceed 99 characters")
        	}
        });
    }
});