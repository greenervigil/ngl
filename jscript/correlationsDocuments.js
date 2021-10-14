var popup = '<div id="docWrapper">' +
                '<div class="names">' +
                    '<div class="texts">Document Name: </div>' +
                    '<div class="otherInputs">' +
                        '<input type="text" class="inputs" id="nameText" name="name" maxlength="99" autocomplete="off" />' +
                    '</div>' +
                '</div>' +
                '<div class="names"><div class="texts">Document File: </div>' +
                    '<div class="otherInputs" name="uri">' +
                        '<form method="POST" enctype="multipart/form-data" name="uriForm" id="uriForm" >' +
                            '<input type="file" id="uriFile" name="uriFile" class="inputs" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />' +
                            '<input type="text" id="uriVal" name="uriVal" style="display:none" />' +
                        '</form>' +
                    '</div>' +
                '</div>' +
                '<div class="names">' +
                    '<div class="texts">Product Name: </div>' +
                    '<div class="otherInputs" >' +
                        '<input type="text" id="pCodeText" name="productName" class="inputs" autocomplete="off" />' +
                        '<div id="productsBox"></div>' +
                    '</div>' +
                '</div>' +
                '<div class="names">' +
                    '<div class="texts">Standard Name: </div>' +
                    '<div class="otherInputs" >' +
                        '<input type="text" id="sCodeText" name="standardName" class="inputs" autocomplete="off" />' +
                        '<div id="standardsBox"></div>' +
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
var fileChanged = false;
var nameChanged = false;
var appChanged = false;
var adding = false;
$(document).ready(function () {
    var grid = $("#grid");
    var app;
    $.getAllProducts(false, function () {
        $.getAllStandards(false, function () {
            $.getAllDocuments(true);
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
            fileChanged = false;
            nameChanged = false;
            var selRowId = grid.jqGrid('getGridParam', 'selrow');
            var code = grid.jqGrid('getCell', selRowId, 'Document_Code');
            var name = grid.jqGrid('getCell', selRowId, 'Document_Name');
            var uri = grid.jqGrid('getCell', selRowId, 'Document_URI');
            var pName = grid.jqGrid('getCell', selRowId, 'Product_Name');
            var sName = grid.jqGrid('getCell', selRowId, 'Standard_Name');
            app = grid.jqGrid('getCell', selRowId, 'Document_App');
            var uPopup = '<div id="docWrapper">' +
                    '<div class="names">' +
                        '<div class="texts">Document Name: </div>' +
                        '<div class="otherInputs">' +
                            '<input type="text" class="inputs" id="nameText" value="' + name + '" maxlength="99" name="name" autocomplete="off" />' +
                        '</div>' +
                    '</div>' +
                    '<div class="names"><div class="texts">Document File: </div>' +
                        '<div class="otherInputs" name="uri">' +
                            '<form method="POST" enctype="multipart/form-data" name="uriForm" id="uriForm" >' +
                                '<input type="file" id="uriFile" name="uriFile" class="inputs" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />' +
                                '<input type="text" id="uriVal" name="uriVal" style="display:none" />' +
                            '</form>' +
                        '</div>' +
                    '</div>' +
                    '<div class="names">' +
                        '<div class="texts">Product Name: </div>' +
                        '<div class="otherInputs" >' +
                            '<input type="text" id="pCodeText" name="productName" value="' + pName + '" class="inputs" autocomplete="off" />' +
                            '<div id="productsBox"></div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="names">' +
                        '<div class="texts">Standard Name: </div>' +
                        '<div class="otherInputs" >' +
                            '<input type="text" id="sCodeText" name="standardName" value="' + sName + '" class="inputs" autocomplete="off" />' +
                            '<div id="standardsBox"></div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="names">' +
		                '<div class="texts">Correlations App: </div>' +
		                '<div class="otherInputs">' +
		                    '<select id="correlations-app" name="correlationsApp">' +
			                    '<option value="correlations">Correlations</option>' +	
			                    '<option value="research">Research</option>' +
		                    '</select>' +
		                '</div>' +
		            '</div>' +
                 '</div>';

            if (selRowId) {
                function updatePrompt(event, bVal, form, vals) {
                    if (bVal) {
                        var pCode;
                        var sCode;
                        var pSubmit;
                        var sSubmit;
                        var sFound = false;
                        var pFound = false;
                        var previousPCode;
                        var previousSCode;
                        var previousPSubmit;
                        var previousSSubmit;
                        var previousPFound = false;
                        var previousSFound = false;
                        for (i = 0; i < products.length; i++) {
                            if (vals.productName.toUpperCase() == products[i].Product_Name.toUpperCase()) {
                                pFound = true;
                                pCode = products[i].Product_Code;
                                break;
                            }
                        }
                        
                        if(vals.standardName != undefined) {
	                        for (i = 0; i < standards.length; i++) {
	                            if (vals.standardName.toUpperCase() == standards[i].Standard_Name.toUpperCase() || standards[i].Standard_Aka.toUpperCase().indexOf(vals.standardName.toUpperCase()) > -1) {
	                                sFound = true;
	                                sCode = standards[i].Standard_Code;
	                                break;
	                            }
	                        }
                        }
                        
                        for (i = 0; i < products.length; i++) {
                            if (pName.toUpperCase() == products[i].Product_Name.toUpperCase()) {
                                previousPFound = true;
                                previousPCode = products[i].Product_Code
                                break;
                            }
                        }

                        for (i = 0; i < standards.length; i++) {
                            if (sName.toUpperCase() == standards[i].Standard_Name.toUpperCase()) {
                                previousSFound = true;
                                previousSCode = standards[i].Standard_Code;
                                break;
                            }
                        }

                        var docExists = verifyDocument(vals.name, vals.uriVal, vals.productName, (vals.standardName == undefined) ? "" : vals.standardName, pCode, sCode, pFound, sFound, vals.correlationsApp);
                        if (docExists == false)
                            return false;
                        else {
                            if (vals.productName == "")
                                pSubmit = '<java:Product_Code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />';
                            else
                                pSubmit = '<java:Product_Code>' + pCode + '</java:Product_Code>';
                            
                            if(vals.correlationsApp == "research"){
                            	sSubmit = "";
                            }else{
	                            if (vals.standardName == "" || vals.standardName == undefined)
	                                sSubmit = '<java:Standard_Code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />';
	                            else
	                                sSubmit = '<java:Standard_Code>' + sCode + '</java:Standard_Code>';
                            }

                            if (pName == "")
                                previousPSubmit = '<java:Product_Code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />';
                            else
                                previousPSubmit = '<java:Product_Code>' + previousPCode + '</java:Product_Code>';
                            
                            if(vals.correlationsApp == "research"){
                            	previousSSubmit = "";
                            }else{
	                            if (sName == "")
	                                previousSSubmit = '<java:Standard_Code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />';
	                            else
	                                previousSSubmit = '<java:Standard_Code>' + previousSCode + '</java:Standard_Code>';
                            }
                            $.updateDocument(code, name, vals.name, uri, vals.uriVal, previousPSubmit, previousSSubmit, pSubmit, sSubmit, fileChanged, nameChanged, appChanged, $("#uriForm"), app, vals.correlationsApp);
                            /*if (fileChanged && nameChanged)
                                $.updateDocument(code, name, vals.name, uri, vals.uriVal, previousPSubmit, previousSSubmit, pSubmit, sSubmit, true, true, $("#uriForm"), app, vals.correlationsApp);
                            else if (fileChanged)
                                $.updateDocument(code, name, vals.name, uri, vals.uriVal, previousPSubmit, previousSSubmit, pSubmit, sSubmit, true, false, $("#uriForm"), app, vals.correlationsApp);
                            else if (nameChanged)
                                $.updateDocument(code, name, vals.name, uri, vals.uriVal, previousPSubmit, previousSSubmit, pSubmit, sSubmit, false, true, $("#uriForm"), app, vals.correlationsApp);
                            else
                                $.updateDocument(code, name, vals.name, uri, vals.uriVal, previousPSubmit, previousSSubmit, pSubmit, sSubmit, false, false, $("#uriForm"), app, vals.correlationsApp);
                            */
                        }
                    }
                    return true;
                }

                $.prompt(uPopup, {
                    submit: updatePrompt,
                    loaded: setupPrompt,
                    buttons: { Update: true, Cancel: false }
                });


            }
            else
                alert("Please select a row");
        });

        $("#delete").click(function () {
            var selRowId = grid.jqGrid('getGridParam', 'selrow');
            var code = grid.jqGrid('getCell', selRowId, 'Document_Code');
            var name = grid.jqGrid('getCell', selRowId, 'Document_Name');
            var uri = grid.jqGrid('getCell', selRowId, 'Document_URI');
            var pName = grid.jqGrid('getCell', selRowId, 'Product_Name');
            var sName = grid.jqGrid('getCell', selRowId, 'Standard_Name');
            app = grid.jqGrid('getCell', selRowId, 'Document_App');
            var pCode;
            var sCode;
            var pSubmit;
            var sSubmit;
            var match = false;
            if (selRowId) {
                for (i = 0; i < products.length; i++) {
                    if (pName.toUpperCase() == products[i].Product_Name.toUpperCase()) {
                        pCode = products[i].Product_Code;
                    }
                }

                for (i = 0; i < standards.length; i++) {
                    if (sName.toUpperCase() == standards[i].Standard_Name.toUpperCase()) {
                        sCode = standards[i].Standard_Code;
                    }
                }

                if (pName == "")
                    pSubmit = '<java:Product_Code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />';
                else
                    pSubmit = '<java:Product_Code>' + pCode + '</java:Product_Code>';
                if(app == "research"){
                	sSubmit = "";
                }else{
                	if (sName == "")
                        sSubmit = '<java:Standard_Code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />';
                    else
                        sSubmit = '<java:Standard_Code>' + sCode + '</java:Standard_Code>';
                }
                if (confirm("Delete: \"" + name + "\"?"))
                    $.deleteDocument(code, name, uri, pSubmit, sSubmit, selRowId, app);
            }
            else
                alert("Please select a row");
        });

        $("#add").click(function () {
            adding = true;
            $.prompt(popup, {
                submit: callback,
                loaded: setupPrompt,
                buttons: { Save: true, Cancel: false }
            });

            function callback(event, bVal, form, vals) {
                if (bVal) {
                    var sFound = false;
                    var pFound = false;
                    var sCode;
                    var pCode;
                    for (i = 0; i < products.length; i++) {
                        if (vals.productName.toUpperCase() == products[i].Product_Name.toUpperCase()) {
                            pFound = true;
                            pCode = products[i].Product_Code;
                            break;
                        }
                    }
                    
                    if(vals.standardName != undefined){
		                for (i = 0; i < standards.length; i++) {
		                    if (vals.standardName.toUpperCase() == standards[i].Standard_Name.toUpperCase() || standards[i].Standard_Aka.toUpperCase().indexOf(vals.standardName.toUpperCase()) > -1) {
		                        sFound = true;
		                        sCode = standards[i].Standard_Code;
		                        break;
		                    }
		                }
                    }

                    var docExists = verifyDocument(vals.name, vals.uriVal, vals.productName, (vals.standardName == undefined) ? "" : vals.standardName, pCode, sCode, pFound, sFound, vals.correlationsApp);

                    if (docExists == false)
                        return false;
                    else {
                        if (vals.productName == "")
                            pSubmit = '<java:Product_Code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />';
                        else
                            pSubmit = '<java:Product_Code>' + pCode + '</java:Product_Code>';
                        
                        if(vals.correlationsApp == "research"){
                        	sSubmit = "";
                        }else{
	                        if (vals.standardName == "")
	                            sSubmit = '<java:Standard_Code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />';
	                        else
	                            sSubmit = '<java:Standard_Code>' + sCode + '</java:Standard_Code>';
                        }
                        $.insertDocument(vals.name, vals.uriVal, pSubmit, sSubmit, $("#uriForm"), vals.correlationsApp);
                    }
                    adding = false;
                }
                else
                    adding = false;
                return true;
            }
        });

        $("#searchBox").keyup(function () {
            grid.jqGrid('clearGridData', false);
            if ($(this).val() != "") {
                var match = false;
                for (i = 0; i < documents.length; i++) {
                    if (displayDocuments[i].Document_Name.toUpperCase().indexOf($(this).val().toUpperCase()) >= 0) {
                        data = ({
                            "Document_Code": displayDocuments[i].Document_Code,
                            "Document_Name": displayDocuments[i].Document_Name,
                            "Document_URI": displayDocuments[i].Document_URI,
                            "Product_Name": displayDocuments[i].Product_Name,
                            "Standard_Name": displayDocuments[i].Standard_Name,
                            "Document_App": displayDocuments[i].Document_App
                        });

                        grid.jqGrid("addRowData", i, data);
                        match = true;
                    }
                }

                if (!match) {
                    data = ({
                        "Document_Name": "No results"
                    });
                    grid.jqGrid("addRowData", i, data);
                }
            }
            else {
                for (var i = 0; i < documents.length; i++)
                    grid.jqGrid('addRowData', i, displayDocuments[i]);
            }
        });
    }

    function setupPrompt(event) {
        $("#nameText").focus();
        $("#correlations-app").val(app);
        $(".jqimessage input[type=text]").keydown(function (event) {
            if (event.keyCode == 13 && typeAhead == false)
                $(".jqidefaultbutton").click();
        });

        $("#pCodeText").arrayTypeAhead({
            suggestions: "#productsBox",
            data: pList
        });

        $("#sCodeText").arrayTypeAhead({
            suggestions: "#standardsBox",
            data: sList
        });

        $("#nameText").keydown(function () {
            nameChanged = true;
        });

        $("#nameText").keyup(function () {
        	if($(this).val().length > 98)
        	{
        		alert("Document Name cannot exceed 99 characters");
        	}
            if ($(this).css("border").indexOf("1px solid") >= 0)
                $(this).removeAttr("style");
        });
        
        $("#correlations-app").change(function(){
        	appChanged = true;
        	if($(this).val() == "research"){
        		$("#sCodeText").attr("disabled", true);
        	}else{
        		$("#sCodeText").attr("disabled", false);
        	}
        });

        $("#pCodeText").keyup(function () {
            if ($(this).css("border").indexOf("1px solid") >= 0 && $("#sCodeText").css("border").indexOf("1px solid") >= 0) {
                $(this).removeAttr("style");
                $("#sCodeText").removeAttr("style");
            }
            else if ($(this).css("border").indexOf("1px solid") >= 0)
                $(this).removeAttr("style")
        });

        $("#sCodeText").keyup(function () {
            if ($(this).css("border").indexOf("1px solid") >= 0 && $("#pCodeText").css("border").indexOf("1px solid") >= 0) {
                $(this).removeAttr("style")
                $("#pCodeText").removeAttr("style")
            }
            else if ($(this).css("border").indexOf("1px solid") >= 0)
                $(this).removeAttr("style")
        });

        $("#uriFile").change(function () {
            var uriFile = $(this).val();
            var uriName = uriFile.split("\\");
            var fileName;
            for (i = 0; i < uriName.length; i++) {
                fileName = uriName[i];
            }
            fileChanged = true;
            if ($(this).css("border").indexOf("1px solid") >= 0)
                $(this).removeAttr("style")
            $("#uriVal").val(fileName);
        });
    }

    function verifyDocument(name, uri, pName, sName, pCode, sCode, pFound, sFound, app) {
        if (name == "") {
            $("#nameText").css("border", "1px solid #ff0000");
            $("#nameText").focus()
            return false;
        }

        if (uri == "" && adding) {
            $("#uriFile").css("border", "1px solid #ff0000");
            adding = false;
            return false;
        }

        if (pName != "" && !pFound) {
            $("#pCodeText").css("border", "1px solid #ff0000");
            $("#pCodeText").focus();
            alert("Product not found");
            return false;
        }

        if (sName != "" && !sFound) {
            $("#sCodeText").css("border", "1px solid #ff0000");
            $("#sCodeText").focus();
            alert("Standard not found");
            return false;
        }

        if (pName == "" && sName == "") {
            $("#pCodeText").css("border", "1px solid #ff0000");
            $("#sCodeText").css("border", "1px solid #ff0000");
            $("#pCodeText").focus();
            alert("please enter a standard or product name, or both");
            return false;
        }

        var exists = doesDocumentExist(documents, name, uri, pCode, sCode, app);
        if (exists) {
            alert("Document already exists")
            return false;
        }

        return true;
    }

    function doesDocumentExist(array, name, uri, pCode, sCode, app) {
        var match = false;
        for (i = 0; i < array.length; i++) {
            if (array[i].Document_Name.toUpperCase() == name.toUpperCase() &&
                array[i].Document_URI.toUpperCase() == uri.toUpperCase() &&
                array[i].Product_Code.toUpperCase() == pCode.toUpperCase() &&
                array[i].Standard_Code.toUpperCase() == sCode.toUpperCase() && 
                array[i].Document_App == app) {
                match = true;
                break;
            }
        }
        return match;
    }
});