$(document).ready(function () {
    var productServiceUrl = '/CorrelationsWebService/CorrelationsWebService?WSDL';
    var response;
    var standards;
    var products;
    var documents;
    var json;
    var isResearch = false;
    
    if(location.pathname.indexOf("research") > -1){
    	isResearch = true;
    }
    $("#cantFind a").each(function () {
        $(this).attr("href", "http://" + $(this).attr("href"));
        if ($(this).attr("href").indexOf("elt") > -1) {
            $(this).attr("href", $(this).attr("href").replace("www.", ""))
        }
    });

    getAll(
    	'<web:getAllStandardsOrderByName/>', 
    	'<web:getAllProductsByApplicationOrderByName><web:Product_Application>' + ((isResearch) ? 'research' : 'correlations') + '</web:Product_Application></web:getAllProductsByApplicationOrderByName>',
        '<web:getAllDocumentsByApplicationOrderByName><web:Document_Application>' + ((isResearch) ? 'research' : 'correlations') + '</web:Document_Application></web:getAllDocumentsByApplicationOrderByName>'
    );
    function getAll(message1, message2, message3) {
        var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
        + ' xmlns:web="http://com/cengage/correlations/webservices">'
        + '<soapenv:Header/>'
        + '<soapenv:Body>'
        + message1
        + '</soapenv:Body></soapenv:Envelope>';

        $.ajax({
            url: productServiceUrl,
            type: "POST",
            dataType: "xml",
            contentType: "text/xml; charset=\"utf-8\"",
            data: soapMessage,
            complete: function (xmlHttpRequest) {
                standards = new Array();
                json = $.xmlToJSON(xmlHttpRequest.responseXML);
                var tempStandards = json.Body[0].getAllStandardsOrderByNameResponse[0]["return"][0].Standards;
                if (tempStandards) {
                    for (i = 0; i < tempStandards.length; i++) {
                        if (tempStandards[i].Standard_Aka[0].Text == undefined) {
                            standards.push({
                                "Standard_Code": tempStandards[i].Standard_Code[0].Text,
                                "Standard_Name": tempStandards[i].Standard_Name[0].Text,
                                "Standard_Type": tempStandards[i].Standard_Type[0].Text,
                                "Standard_Aka": ""
                            });
                        }
                        else {
                            standards.push({
                                "Standard_Code": tempStandards[i].Standard_Code[0].Text,
                                "Standard_Name": tempStandards[i].Standard_Name[0].Text,
                                "Standard_Type": tempStandards[i].Standard_Type[0].Text,
                                "Standard_Aka": tempStandards[i].Standard_Aka[0].Text
                            });
                        }
                    }
                }

                var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
                    + ' xmlns:web="http://com/cengage/correlations/webservices">'
                    + '<soapenv:Header/>'
                    + '<soapenv:Body>'
                    + message2
                    + '</soapenv:Body></soapenv:Envelope>';

                $.ajax({
                    url: productServiceUrl,
                    type: "POST",
                    dataType: "xml",
                    contentType: "text/xml; charset=\"utf-8\"",
                    data: soapMessage,
                    complete: function (xmlHttpRequest) {
                        products = new Array();
                        json = $.xmlToJSON(xmlHttpRequest.responseXML);
                        var tempProducts = json.Body[0].getAllProductsByApplicationOrderByNameResponse[0]["return"][0].Products;
                        if (tempProducts) {
                            for (i = 0; i < tempProducts.length; i++) {
                            	//if(tempProducts[i].Product_Application[0].Text != "research") {
	                                products.push({
	                                    "Product_Code": tempProducts[i].Product_Code[0].Text,
	                                    "Product_Name": tempProducts[i].Product_Name[0].Text,
	                                    "Product_App": tempProducts[i].Product_Application[0].Text
	                                });
                            	//}
                            }
                        }

                        var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
                            + ' xmlns:web="http://com/cengage/correlations/webservices">'
                            + '<soapenv:Header/>'
                            + '<soapenv:Body>'
                            + message3
                            + '</soapenv:Body></soapenv:Envelope>';

                        $.ajax({
                            url: productServiceUrl,
                            type: "POST",
                            dataType: "xml",
                            contentType: "text/xml; charset=\"utf-8\"",
                            data: soapMessage,
                            complete: function (xmlHttpRequest) {
                                documents = new Array();
                                json = $.xmlToJSON(xmlHttpRequest.responseXML);
                                var tempDocuments = json.Body[0].getAllDocumentsByApplicationOrderByNameResponse[0]["return"][0].Documents;
                                var document = "";
                                
                            	for (i = 0; i < tempDocuments.length; i++) {
                            		//if(tempDocuments[i].Document_Application[0].Text != "research") {
                                        documents.push({
                                            "Document_Code": tempDocuments[i].Document_Code[0].Text,
                                            "Document_Name": tempDocuments[i].Document_Name[0].Text,
                                            "Document_URI": tempDocuments[i].Document_URI[0].Text,
                                            "Product_Code": tempDocuments[i].Product_Code[0].Text,
                                            "Standard_Code": tempDocuments[i].Standard_Code[0].Text,
                                            "Document_App": tempDocuments[i].Document_Application[0].Text
                                        });
                            		//}
                                }

                                if ($("#standardText").length) {
                                    $("#standardText").dataTypeAhead({
                                        suggestions: "#standardSuggestions",
                                        data: standards,
                                        products: products,
                                        documents: documents,
                                        value: "All standards"
                                    });
                                }

                                if ($("#programText").length) {
                                    $("#programText").dataTypeAhead({
                                        suggestions: "#programSuggestions",
                                        data: products,
                                        standards: standards,
                                        documents: documents
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }

    $("#sShowAll").click(function (event) {
        if ($("#allPrograms").is(":visible"))
            $("#allPrograms").hide();
        $("#aStates").children().remove();
        $("#aCountries").children().remove();
        $("#aStandards").children().remove();
        $("#aStates").hide();
        $("#aCountries").hide();
        $("#aStandards").hide();
        var addedState = false;
        var addedStandard = false;
        var addedCountry = false;
        var match = false;
        if ($("#programText").val() != "") {
            var product;
            for (i = 0; i < products.length; i++) {
                if (products[i].Product_Name.toUpperCase().indexOf($("#programText").val().toUpperCase()) >= 0) {
                    product = products[i];
                    break;
                }
                else
                    product = { "Product_Code": "" };
            }
            for (i = 0; i < standards.length; i++) {
                for (j = 0; j < documents.length; j++) {
                    if (standards[i].Standard_Type.toUpperCase() == "STATE" && standards[i].Standard_Code == documents[j].Standard_Code && documents[j].Product_Code == product.Product_Code) {
                        if (!addedState) {
                            $("#aStates").append('<div class="aTitle">States</div>');
                            $("#aStates").show();
                            addedState = true;
                        }
                        $("#aStates").append(
                            '<div class="clickStandards">' + standards[i].Standard_Name + '</div>'
                        );
                        match = true;
                        break;
                    }
                    else if (standards[i].Standard_Type.toUpperCase().indexOf("COUNTRY") >= 0 && standards[i].Standard_Code == documents[j].Standard_Code && documents[j].Product_Code == product.Product_Code) {
                        if (!addedCountry) {
                            $("#aCountries").append('<div class="aTitle">Countries</div>');
                            $("#aCountries").show();
                            addedCountry = true;
                        }
                        $("#aCountries").append(
                            '<div class="clickStandards">' + standards[i].Standard_Name + '</div>'
                        );
                        match = true;
                        break;
                    }
                    else if (standards[i].Standard_Type.toUpperCase().indexOf("NATION") >= 0 && standards[i].Standard_Code == documents[j].Standard_Code && documents[j].Product_Code == product.Product_Code) {
                        if (!addedStandard) {
                            $("#aStandards").append('<div class="aTitle">Standards</div>');
                            $("#aStandards").show();
                            addedStandard = true;
                        }
                        $("#aStandards").append(
                            '<div class="clickStandards">' + standards[i].Standard_Name + '</div>'
                        );
                        match = true;
                        break;
                    }
                }
            }
        }
        else {
            for (i = 0; i < standards.length; i++) {
                for (j = 0; j < documents.length; j++) {
                    if (standards[i].Standard_Type.toUpperCase() == "STATE" && standards[i].Standard_Code == documents[j].Standard_Code) {
                        if (!addedState) {
                            $("#aStates").append('<div class="aTitle">States</div>');
                            $("#aStates").show();
                            addedState = true;
                        }
                        $("#aStates").append(
                            '<div class="clickStandards">' + standards[i].Standard_Name + '</div>'
                        );
                        match = true;
                        break;
                    }
                    else if (standards[i].Standard_Type.toUpperCase().indexOf("COUNTRY") >= 0 && standards[i].Standard_Code == documents[j].Standard_Code) {
                        if (!addedCountry) {
                            $("#aCountries").append('<div class="aTitle">Countries</div>');
                            $("#aCountries").show();
                            addedCountry = true;
                        }
                        $("#aCountries").append(
                            '<div class="clickStandards">' + standards[i].Standard_Name + '</div>'
                        );
                        match = true;
                        break;
                    }
                    else if (standards[i].Standard_Type.toUpperCase().indexOf("NATION") >= 0 && standards[i].Standard_Code == documents[j].Standard_Code) {
                        if (!addedStandard) {
                            $("#aStandards").append('<div class="aTitle">Standards</div>');
                            $("#aStandards").show();
                            addedStandard = true;
                        }
                        $("#aStandards").append(
                            '<div class="clickStandards">' + standards[i].Standard_Name + '</div>'
                        );
                        match = true;
                        break;
                    }
                }
            }
        }

        if (match) {
            $(".clickStandards").click(function () {
                $("#standardText").val($(this).text());
                $("#allStandards").hide();
            });

            $("#allStandards").toggle();
            $("#allStandards").center();
        }
        else {
            $("#sNoMatch").show();
        }
        event.stopPropagation();
        event.preventDefault();
    });

    $("#programText").keydown(function (e) {
        if ($("#pNoMatch").is(":visible"))
            $("#pNoMatch").hide();

        if (e.keyCode == 13) {
            $("#submit").click();
        }
    });
    $("#standardText").keydown(function (e) {
        if ($("#sNoMatch").is(":visible"))
            $("#sNoMatch").hide();

        if (e.keyCode == 13) {
            $("#submit").click();
        }
    });

    $("#pShowAll").click(function (event) {
        if ($("#allStandards").is(":visible"))
            $("#allStandards").hide();
        $("#allPrograms").children().remove();
        $("#allPrograms").append('<div class="aTitle">Programs</div>');
        var match = false;
        if ($("#standardText").length > 0 && $("#standardText").val() != "" && $("#standardText").val() != "All standards") {
            var standard;
            for (i = 0; i < standards.length; i++) {
                if (standards[i].Standard_Name.toUpperCase().indexOf($("#standardText").val().toUpperCase()) >= 0 || standards[i].Standard_Aka.toUpperCase().indexOf($("#standardText").val().toUpperCase()) >= 0) {
                    standard = standards[i];
                    break;
                }
                else
                    standard = { "Standard_Code": "" };
            }
            for (i = 0; i < products.length; i++) {
                for (j = 0; j < documents.length; j++) {
                    if (products[i].Product_Code == documents[j].Product_Code && documents[j].Standard_Code == standard.Standard_Code) {
                        $("#allPrograms").append(
                            '<div class="clickPrograms">' + products[i].Product_Name + '</div>'
                        );
                        match = true;
                        break;
                    }
                }
            }
        }
        else {
            for (i = 0; i < products.length; i++) {
                for (j = 0; j < documents.length; j++) {
                    if (products[i].Product_Code == documents[j].Product_Code) {
                        $("#allPrograms").append(
                            '<div class="clickPrograms">' + products[i].Product_Name + '</div>'
                        );
                        match = true;
                        break;
                    }
                }
            }
        }

        if (match) {
            $(".clickPrograms").click(function () {
                $("#programText").val($(this).text());
                $("#allPrograms").hide();
            });

            $("#allPrograms").toggle();
            $("#allPrograms").center();
        }
        else {
            $("#pNoMatch").show();
        }
        event.stopPropagation();
        event.preventDefault();
    });

    $(".clickStandards").click(function () {
        $("#standardText").val($(this).text());
        $("#allStandards").hide();
    });

    $(".clickPrograms").click(function () {
        $("#programText").val($(this).text());
        $("#allPrograms").hide();
    });

    $("#all").click(function (event) {
        event.stopPropagation();
    });

    $(document).click(function () {
        $("#allPrograms").hide();
        $("#allStandards").hide();
    });

    $("#submit").click(function () {
        $("#results").children().remove();
        $("#results").show();
        var product;
        var standard;
        var placed = false;

        if($("#programText").length > 0) {
	        for (i = 0; i < products.length; i++) {
	            if (products[i].Product_Name.toUpperCase().indexOf($("#programText").val().toUpperCase()) >= 0 && $("#programText").val() != "") {
	                product = products[i];
	                break;
	            }
	            else
	                product = { "Product_Code": "" };
	        }
        }
        
        if($("#standardText").length > 0) {
	        for (i = 0; i < standards.length; i++) {
	            if ((standards[i].Standard_Name.toUpperCase().indexOf($("#standardText").val().toUpperCase()) >= 0 || standards[i].Standard_Aka.toUpperCase().indexOf($("#standardText").val().toUpperCase()) >= 0) && ($("#standardText").val() != "" && $("#standardText").val() != "All standards")) {
	                standard = standards[i];
	                break;
	            }
	            else
	                standard = { "Standard_Code": "" };
	        }
        }

        if (($("#standardText").length > 0 && standard.Standard_Code != "") && ($("#programText").length > 0 && product.Product_Code != "")) {
            for (i = 0; i < documents.length; i++) {
                if (documents[i].Standard_Code == standard.Standard_Code && documents[i].Product_Code == product.Product_Code) {
                    var uriFile = documents[i].Document_URI;
                    var uriName = uriFile.split("/");
                    var fileName;
                    for (j = 0; j < uriName.length; j++) {
                        fileName = uriName[j];
                    }
                    if (!placed) {
                        $("#results").append("<hr /><div id='resultsLabel'>Results</div>");
                        placed = true;
                    }
                    $("#results").append(
                        "<div class='result'>" +
                            "<div class='resultName'>" + documents[i].Document_Name + "</div>" +
                    //"<div class='resultSize'>" + "112 K" + "</div>" +
                            "<div class='resultDownload' onclick='javascript:window.location.href=\"/correlationsdocs/" + fileName + "\"'>Download</div>" +
                        "</div>"
                    );
                }
            }
        }
        else if ($("#standardText").length > 0 && standard.Standard_Code != "") {
            for (i = 0; i < documents.length; i++) {
                if (documents[i].Standard_Code == standard.Standard_Code) {
                    var uriFile = documents[i].Document_URI;
                    var uriName = uriFile.split("/");
                    var fileName;
                    for (j = 0; j < uriName.length; j++) {
                        fileName = uriName[j];
                    }
                    if (!placed) {
                        $("#results").append("<hr /><div id='resultsLabel'>Results</div>");
                        placed = true;
                    }
                    $("#results").append(
                        "<div class='result'>" +
                            "<div class='resultName'>" + documents[i].Document_Name + "</div>" +
                    //"<div class='resultSize'>" + "112 K" + "</div>" +
                            "<div class='resultDownload' onclick='javascript:window.location.href=\"/correlationsdocs/" + fileName + "\"'>Download</div>" +
                        "</div>"
                    );
                }
            }
        }
        else if ($("#programText").length > 0 && product.Product_Code != "") {
            for (i = 0; i < documents.length; i++) {
                if (documents[i].Product_Code == product.Product_Code) {
                    var uriFile = documents[i].Document_URI;
                    var uriName = uriFile.split("/");
                    var fileName;
                    for (j = 0; j < uriName.length; j++) {
                        fileName = uriName[j];
                    }
                    if (!placed) {
                        $("#results").append("<hr /><div id='resultsLabel'>Results</div>");
                        placed = true;
                    }
                    $("#results").append(
                        "<div class='result'>" +
                            "<div class='resultName'>" + documents[i].Document_Name + "</div>" +
                    //"<div class='resultSize'>" + "112 K" + "</div>" +
                            "<div class='resultDownload' onclick='javascript:window.location.href=\"/correlationsdocs/" + fileName + "\"'>Download</div>" +
                        "</div>"
                    );
                }
            }
        }
        else if (($("#standardText").val() == "" || $("#standardText").val() == "All standards") && $("#programText").val() == "") {
            alert("Please make a selection");
        }
        else {
            $("#results").append("<hr /><div id='resultsLabel'>Results</div>" +
                "<div class='result'>" +
                    "<div class='noResults'>No Results</div>" +
                "</div>"
            );
        }
    });
});

jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - this.outerHeight()) / 2) +
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - this.outerWidth()) / 2) +
                                                $(window).scrollLeft()) + "px");
    return this;
}