$(document).ready(function () {
    var grid = $("#grid");
    $.getAllProducts(false, function () {
        $.getAllStandards(true, function () {
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
            var code = grid.jqGrid('getCell', selRowId, 'Standard_Code');
            var name = grid.jqGrid('getCell', selRowId, 'Standard_Name');
            var aka = grid.jqGrid('getCell', selRowId, 'Standard_Aka');
            var type = grid.jqGrid('getCell', selRowId, 'Standard_Type');
            var cSelect = '<select id="typeText" name="typeText" class="inputs" >';
            for (i = 0; i < types.length; i++) {
                if (type == types[i])
                    cSelect += '<option selected="selected">' + types[i] + '</option>';
                else
                    cSelect += '<option>' + types[i] + '</option>';
            }
            cSelect += '</select>';
            var popup = '<div id="standardWrapper">' +
                            '<div class="names">' +
                                '<div class="texts">Standard Name: </div>' +
                                '<div class="otherInputs">' +
                                    '<input type="text" id="addText" name="nameText" value="' + name + '" maxlength="99" class="inputs" autocomplete="off" />' +
                                '</div>' +
                            '</div>' +
                            '<div class="names">' +
                                '<div class="texts">Standard Aka: </div>' +
                                '<div class="otherInputs">' +
                                    '<input type="text" id="akaText" name="akaText" value="' + aka + '" maxlength="25" class="inputs" autocomplete="off" />' +
                                    '<div class="inputs subtext">Seperate multiple with commas</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="names">' +
                                '<div class="texts">Standard Type: </div>' +
                                '<div class="otherInputs">' + cSelect + '</div>' +
                            '</div>' +
                        '</div>';
            if (selRowId) {
                function update(event, bVal, form, vals) {
                    if (bVal) {
                        fName = $('#addText');
                        fType = $('#typeText');
                        var akaText;

                        fName.keyup(function () {
                            if ($(this).css("border").indexOf("1px solid") >= 0)
                                $(this).removeAttr("style");
                        });

                        fType.change(function () {
                            if ($(this).css("border").indexOf("1px solid") >= 0)
                                $(this).removeAttr("style");
                        });

                        if (vals.nameText == "") {
                            fName.css("border", "solid #ff0000 1px");
                            fName.focus();
                            return false;
                        }
                        else if (vals.typeText == "Please select") {
                            fType.css("border", "solid #ff0000 1px");
                            fType.focus();
                            return false;
                        }

                        for (i = 0; i < standards.length; i++) {
                            if (code == standards[i].Standard_Code) {
                                var match = false;
                                for (j = 0; j < standards.length; j++) {
                                    if (vals.nameText.toUpperCase() == standards[j].Standard_Name.toUpperCase() && vals.typeText.toUpperCase() == standards[j].Standard_Type.toUpperCase() && vals.akaText.toUpperCase() == standards[j].Standard_Aka.toUpperCase()) {
                                        match = true;
                                        break;
                                    }
                                }

                                if (!match)
                                    $.updateStandard(standards[i].Standard_Code, standards[i].Standard_Name, vals.nameText, vals.akaText, vals.typeText);
                                else {
                                    alert("Standard: \"" + vals.nameText + "\" already exists");
                                    return false;
                                }
                                break;
                            }
                        }
                    }
                    return true;
                }

                $.prompt(popup, {
                    submit: update,
                    loaded: setupPrompt,
                    buttons: { Save: true, Cancel: false }
                });
            }
            else
                alert("Please select a row");
        });

        $("#delete").click(function () {
            var selRowId = grid.jqGrid('getGridParam', 'selrow');
            var code = grid.jqGrid('getCell', selRowId, 'Standard_Code');
            var name = grid.jqGrid('getCell', selRowId, 'Standard_Name');
            var aka = grid.jqGrid('getCell', selRowId, 'Standard_Aka');
            var type = grid.jqGrid('getCell', selRowId, 'Standard_Type');
            var match = false;
            if (selRowId) {
                for (i = 0; i < standards.length; i++) {
                    if (code == standards[i].Standard_Code) {
                        for (j = 0; j < documents.length; j++) {
                            if (code == documents[j].Standard_Code)
                                match = true;
                        }
                        if (!match) {
                            if (confirm("Delete: \"" + name + "\"?"))
                                $.deleteStandard(standards[i].Standard_Code, standards[i].Standard_Name, standards[i].Standard_Type, standards[i].Standard_Aka, selRowId);
                        }
                        else
                            alert("Cannot delete, standard has an attatched document.");
                        break;
                    }
                }
            }
            else
                alert("Please select a row");
        });

        $("#add").click(function () {
            var popup = '<div id="standardWrapper">' +
                            '<div class="names">' +
                                '<div class="texts">Standard Name: </div>' +
                                '<div class="otherInputs">' +
                                    '<input type="text" id="addText" name="nameText" maxlength="99" class="inputs" autocomplete="off" />' +
                                '</div>' +
                            '</div>' +
                            '<div class="names">' +
                                '<div class="texts">Standard Aka: </div>' +
                                '<div class="otherInputs">' +
                                    '<input type="text" id="akaText" name="akaText" maxlength="25" class="inputs" autocomplete="off" />' +
                                    '<div class="inputs subtext">Seperate multiple with commas</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="names">' +
                                '<div class="texts">Standard Type: </div>' +
                                '<div class="otherInputs">' + select + '</div>' +
                            '</div>' +
                        '</div>';

            $.prompt(popup, {
                submit: callback,
                loaded: setupPrompt,
                buttons: { Save: true, Cancel: false }
            });

            function callback(event, bVal, form, vals) {
                if (bVal) {
                    fName = $('#addText');
                    fType = $('#typeText');
                    fAka = $('#akaText');
                    var akaText;

                    fName.keyup(function () {
                        if ($(this).css("border").indexOf("1px solid") >= 0)
                            fName.removeAttr("style");
                    });

                    fType.change(function () {
                        if ($(this).css("border").indexOf("1px solid") >= 0)
                            $(this).removeAttr("style");
                    });

                    if (vals.nameText == "") {
                        fName.css("border", "solid #ff0000 1px");
                        fName.focus();
                        return false;
                    }
                    else if (vals.typeText == "Please select") {
                        fType.css("border", "solid #ff0000 1px");
                        fType.focus();
                        return false;
                    }
                    var match = false;
                    for (i = 0; i < standards.length; i++) {
                        if (vals.nameText.toUpperCase() == standards[i].Standard_Name.toUpperCase() && vals.typeText.toUpperCase() == standards[i].Standard_Type.toUpperCase() && vals.akaText.toUpperCase() == standards[j].Standard_Aka.toUpperCase()) {
                            match = true;
                            break;
                        }
                    }

                    if (!match)
                        $.insertStandard(vals.nameText, vals.typeText, vals.akaText);
                    else {
                        alert("Standard: \"" + vals.nameText + "\" already exists");
                        return false;
                    }

                    return true;
                }
            }
        });

        $("#searchBox").keyup(function () {
            grid.jqGrid('clearGridData', false);
            if ($(this).val() != "") {
                var match = false;
                for (i = 0; i < standards.length; i++) {
                    if (standards[i].Standard_Name.toUpperCase().indexOf($(this).val().toUpperCase()) >= 0) {
                        var data = [{ "Standard_Code": standards[i].Standard_Code,
                            "Standard_Name": standards[i].Standard_Name,
                            "Standard_Type": standards[i].Standard_Type
                        }];

                        grid.jqGrid("addRowData", i, data);
                        match = true;
                    }
                }

                if (!match) {
                    var data = [{
                        "Standard_Name": "No Results"
                    }];
                    grid.jqGrid("addRowData", i, data);
                }
            }
            else {
                for (var i = 0; i < standards.length; i++)
                    grid.jqGrid('addRowData', i, standards[i]);
            }
        });
    }

    function setupPrompt() {
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
            if ($(this).css("border").indexOf("1px solid") >= 0)
                fName.removeAttr("style");
        });
        
        $("#akaText").keyup(function () {
        	if($(this).val().length > 24)
        	{
        		alert("Standard name cannot exceed 25 characters")
        	}
        });
    }
});