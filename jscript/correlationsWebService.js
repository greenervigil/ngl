var productServiceUrl = '/CorrelationsWebService/CorrelationsWebService?WSDL';
var standards;
var products;
var documents;
var types = ["Please select", "International", "National/Non-State", "State"];
var select;
var json;
var sList;
var pList;
var displayDocuments
var loaded = false;
var correlationsDeleteHandler = "/correlations/CorrelationsDeleteHandler";
var correlationsInsertHandler = "/correlations/CorrelationsInsertHandler";
var loading = 
	'<div class="please-wait-backdrop fade in"></div>' +
	'<div id="myModal" class="please-wait hide fade in">' +
		'<div class="please-wait-body">' +
			'<div class="progress progress-striped active">' +
				'<div class="bar"></div>' +
			'</div>' +
		'</div>' +
	'</div>';
$(document).ready(function () {
    var grid = $("#grid");
    //get all products
    $.getAllProducts = function(bAll, callback) {
        soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
            + ' xmlns:web="http://com/cengage/correlations/webservices">'
            + '<soapenv:Header/>'
            + '<soapenv:Body>'
            + '<web:getAllProductsOrderByName/>'
            + '</soapenv:Body></soapenv:Envelope>';

        $.ajax({
            url: productServiceUrl,
            type: "POST",
            dataType: "xml",
            contentType: "text/xml; charset=\"utf-8\"",
            data: soapMessage,
            success: function (xml) {
                products = new Array();
                pList = new Array();
                var productsData = new Array();
                json = $.xmlToJSON(xml);
                var tempProducts = json.Body[0].getAllProductsOrderByNameResponse[0]["return"][0].Products;
                if(tempProducts)
                {
                    for(i = 0; i < tempProducts.length; i++)
                    {
                        products.push({
                            "Product_Code": tempProducts[i].Product_Code[0].Text,
                            "Product_Name": tempProducts[i].Product_Name[0].Text,
                            "Product_App": tempProducts[i].Product_Application[0].Text
                        });
                    }

                    for (i = 0; i < products.length; i++) {
                        pList.push(products[i].Product_Name)
                    }
                }
                if (bAll) {
                    grid.jqGrid('clearGridData', false);
                    if(!loaded)
                    {
                        grid.jqGrid({
                            datatype: "local",
                            height: 250,
                            width: 400,
                            scrollOffset: 0,
                            loadonce:true,
                            rowNum: 10000000,
                            colNames: ['Product Code','Product Name','Product App'],
                            colModel: [
                                { name: 'Product_Code', index: 'Product_Code', hidden:true },
   		                        { name: 'Product_Name', index: 'Product_Name', width:200 },
   		                        { name: 'Product_App', index: 'Product_App', width:200 }
   	                        ],
                            sortname: 'Product_Name',
                            sortorder: "asc",
                            caption: '<div id="titleText">' +
                                        '<input type="button" id="add" value="+ Add"/>' +
                                        '<span id="titleMiddle">Products</span>' +
                                        '<div id="search">' +
                                            'Search: <input type="type" id="searchBox" />' +
                                        '</div>' +
                                     '</div>'
                        });
                        $(".HeaderButton").hide();
                        $.setupButtons();
                        loaded = true;
                    }

                    for(var i = 0; i < products.length; i++)
	                    grid.jqGrid('addRowData',i,products[i]);
                }

                callback();
            }
        });
    }

    //get all standards
    $.getAllStandards = function(bAll, callback) {
        var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
            + ' xmlns:web="http://com/cengage/correlations/webservices">'
            + '<soapenv:Header/>'
            + '<soapenv:Body>'
            + '<web:getAllStandardsOrderByName/>'
            + '</soapenv:Body></soapenv:Envelope>';

        $.ajax({
            url: productServiceUrl,
            type: "POST",
            dataType: "xml",
            contentType: "text/xml; charset=\"utf-8\"",
            data: soapMessage,
            success: function (xml) {
                standards = new Array();
                sList = new Array();
                json = $.xmlToJSON(xml);
                var tempStandards = json.Body[0].getAllStandardsOrderByNameResponse[0]["return"][0].Standards;
                if(tempStandards)
                {
                    for(i = 0; i < tempStandards.length; i++)
                    {
                        if(tempStandards[i].Standard_Aka[0].Text == undefined)
                        {
                            standards.push({
                                "Standard_Code": tempStandards[i].Standard_Code[0].Text,
                                "Standard_Name": tempStandards[i].Standard_Name[0].Text,
                                "Standard_Aka": "",
                                "Standard_Type": tempStandards[i].Standard_Type[0].Text
                            });
                        }
                        else
                        {
                            standards.push({
                                "Standard_Code": tempStandards[i].Standard_Code[0].Text,
                                "Standard_Name": tempStandards[i].Standard_Name[0].Text,
                                "Standard_Aka": tempStandards[i].Standard_Aka[0].Text,
                                "Standard_Type": tempStandards[i].Standard_Type[0].Text
                            });
                        }
                    }

                    for (i = 0; i < standards.length; i++) {
                        sList.push({
                            "name": standards[i].Standard_Name,
                            "aka": standards[i].Standard_Aka
                        });
                    }
                }
                
                select = '<select id="typeText" name="typeText" class="inputs" >';
                select += '<option selected="selected">' + types[0] + '</option>';
                for (j = 1; j < types.length; j++) {
                    select += '<option>' + types[j] + '</option>';
                }
                select += '</select>';

                if (bAll) {
                    grid.jqGrid('clearGridData', false);
                    if(!loaded)
                    {
                        grid.jqGrid({
                            datatype: "local",
                            height: 250,
                            width: 400,
                            scrollOffset: 0,
                            loadonce:true,
                            rowNum: 10000000,
                            colNames: ['Standard Code','Standard Name','Standard Aka', "Standard Type"],
                            colModel: [
                                { name: 'Standard_Code', index: 'Standard_Code', hidden:true },
   		                        { name: 'Standard_Name', index: 'Standard_Name', width:200 },
                                { name: 'Standard_Aka', index: 'Standard_Aka', width:200 },
                                { name: 'Standard_Type', index: 'Standard_Type', width:200 }
   	                        ],
                            sortname: 'Standard_Name',
                            sortorder: "asc",
                            caption: '<div id="titleText">' +
                                        '<input type="button" id="add" value="+ Add"/>' +
                                        '<span id="titleMiddle">Standards</span>' +
                                        '<div id="search">' +
                                            'Search: <input type="type" id="searchBox" />' +
                                        '</div>' +
                                     '</div>'
                        });
                        $(".HeaderButton").hide();
                        $.setupButtons();
                        loaded = true;
                    }

                    for(var i = 0; i < standards.length; i++)
	                    grid.jqGrid('addRowData',i,standards[i]);
                }

                callback();
            }
        });
    }

    //get all documents
    $.getAllDocuments = function(bAll) {
        var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
            + ' xmlns:web="http://com/cengage/correlations/webservices">'
            + '<soapenv:Header/>'
            + '<soapenv:Body>'
            + '<web:getAllDocumentsOrderByName/>'
            + '</soapenv:Body></soapenv:Envelope>';

        $.ajax({
            url: productServiceUrl,
            type: "POST",
            dataType: "xml",
            contentType: "text/xml; charset=\"utf-8\"",
            data: soapMessage,
            success: function (xml) {
                documents = new Array();
                displayDocuments = new Array();
                json = $.xmlToJSON(xml);
                var tempDocuments = json.Body[0].getAllDocumentsOrderByNameResponse[0]["return"][0].Documents;
                if(tempDocuments)
                {
                    for(i = 0; i < tempDocuments.length; i++)
                    {
                        documents.push({
                            "Document_Code": tempDocuments[i].Document_Code[0].Text,
                            "Document_Name": tempDocuments[i].Document_Name[0].Text,
                            "Document_URI": tempDocuments[i].Document_URI[0].Text,
                            "Product_Code": tempDocuments[i].Product_Code[0].Text,
                            "Standard_Code": tempDocuments[i].Standard_Code[0].Text,
                            "Document_App": tempDocuments[i].Document_Application[0].Text
                        });
                    }

                    for (i = 0; i < documents.length; i++) {
                        var sName = undefined;
                        var pName = undefined;
                        for (j = 0; j < products.length; j++) {
                            if (documents[i].Product_Code == products[j].Product_Code) {
                                pName = products[j].Product_Name
                                break;
                            }
                        }

                        for (j = 0; j < standards.length; j++) {
                            if (documents[i].Standard_Code == standards[j].Standard_Code) {
                                sName = standards[j].Standard_Name;
                                break;
                            }
                        }
                        if (pName == undefined)
                            pName = "";
                        if (sName == undefined)
                            sName = "";
                        
                        var uri = getFileName(documents[i].Document_URI);
                        displayDocuments.push({
                            "Document_Code": documents[i].Document_Code,
                            "Document_Name": documents[i].Document_Name,
                            "Document_URI": uri,
                            "Product_Name": pName,
                            "Standard_Name": sName,
                            "Document_App": documents[i].Document_App
                        });
                    }
                }
                if (bAll) {
                    grid.jqGrid('clearGridData', false);
                    if(!loaded)
                    {
                        grid.jqGrid({
                            datatype: "local",
                            height: 250,
                            width: 1000,
                            scrollOffset: 0,
                            loadonce:true,
                            rowNum: 10000000,
                            colNames: ['Document Code','Document Name', "Document URI", "Product Name", "Standard Name", "Document App"],
                            colModel: [
                                { name: 'Document_Code', index: 'Document_Code', hidden:true },
   		                        { name: 'Document_Name', index: 'Document_Name', width:200 },
                                { name: 'Document_URI', index: 'Document_URI', width:200 },
                                { name: 'Product_Name', index: 'Product_Name', width:200 },
                                { name: 'Standard_Name', index: 'Standard_Name', width:200 },
                                { name: 'Document_App', index: 'Document_App', width:200 }
   	                        ],
                            sortname: 'Document_Name',
                            sortorder: "asc",
                            caption: '<div id="titleText">' +
                                        '<input type="button" id="add" value="+ Add"/>' +
                                        '<span id="titleMiddle">Documents</span>' +
                                        '<div id="search">' +
                                            'Search: <input type="type" id="searchBox" />' +
                                        '</div>' +
                                     '</div>'
                        });
                        $(".HeaderButton").hide();
                        $.setupButtons();
                        loaded = true;
                    }

                    for(var i = 0; i < documents.length; i++)
	                    grid.jqGrid('addRowData',i, displayDocuments[i]);
                }
            }
        });
    }

    //update product
    $.updateProduct = function(code, previousName, name, app) {
        soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
            + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
            + '<soapenv:Header/>'
            + '<soapenv:Body>'
            + '<web:updateProductByApplication>'
            + '<web:product>'
            + '<java:Product_Code>' + code + '</java:Product_Code>'
            + '<java:Product_Name>' + name.trim() + '</java:Product_Name>'
            + '<java:Product_Application>' + app + '</java:Product_Application>'
            + '<java:ReturnCode />'
            + '</web:product>'
            + '</web:updateProductByApplication>'
            + '</soapenv:Body>'
            + '</soapenv:Envelope>';

        $.ajax({
            url: productServiceUrl,
            type: "POST",
            dataType: "xml",
            contentType: "text/xml; charset=\"utf-8\"",
            data: soapMessage,
            success: function (xml) {
                json = $.xmlToJSON(xml);
                var t = json.Body[0].updateProductByApplicationResponse[0].return[0];
                var response = responseStatus(t)
                if(response)
                {
                    var data = [{"Product_Code": code,
                                "Product_Name": name}];
                    $.getAllProducts(true, function () { });
                    alert("Product: " + previousName + "\n Updated to: " + name);
                }
            }
        });
    }

    //update standard
    $.updateStandard = function(code, previousName, name, aka, type) {
        soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
            + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
            + '<soapenv:Header/>'
            + '<soapenv:Body>'
            + '<web:updateStandard>'
            + '<web:standard>'
            + '<java:Standard_Code>' + code + '</java:Standard_Code>'
            + '<java:Standard_Name>' + name.trim() + '</java:Standard_Name>'
            + '<java:Standard_Type>' + type + '</java:Standard_Type>'
            + '<java:Standard_Aka>' + aka + '</java:Standard_Aka>'
            + '<java:ReturnCode />'
            + '</web:standard>'
            + '</web:updateStandard>'
            + '</soapenv:Body>'
            + '</soapenv:Envelope>';

        $.ajax({
            url: productServiceUrl,
            type: "POST",
            dataType: "xml",
            contentType: "text/xml; charset=\"utf-8\"",
            data: soapMessage,
            success: function (xml) {
                json = $.xmlToJSON(xml);
                var t = json.Body[0].updateStandardResponse[0].return[0];
                var response = responseStatus(t)
                if(response)
                {
                    $.getAllStandards(true, function () { });
                    alert("Product: " + previousName + "\n Updated to: " + name);
                }
            }
        });
    }

    //update product
    $.updateDocument = function(code, previousName, name, previousFile, file, previousPCode, previousSCode, pCode, sCode, fileChanged, nameChanged, appChanged, form, previousApp, app) {
        if(fileChanged && nameChanged)
        {
            
            form.ajaxSubmit({
                url: correlationsInsertHandler,
                beforeSubmit: function(arr, $form, options){
                	beforeSubmit(arr, $form, options);
                },
                uploadProgress: function(event, position, total, percentComplete){
                	loadingTick(event, position, total, percentComplete);
                },
                success: function (responseText) { 
                	uploadSuccess(responseText);
                    var aResponse = jQuery.parseJSON(responseText);    
                    if(aResponse.status != "exists")
                    {
	                    if(aResponse.status == "failed")
	                    {
	                        alert("Could not write file to server.");
	                        return false;
	                    }
	                    soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
	                        + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
	                        + '<soapenv:Header/>'
	                        + '<soapenv:Body>'
	                        + '<web:deleteDocumentByApplication>'
	                        + '<web:document>'
	                        + '<java:Document_Code>' + code + '</java:Document_Code>'
	                        + '<java:Document_Name>' + previousName.trim() + '</java:Document_Name>'
	                        + '<java:Document_URI>' +aResponse.uri + '</java:Document_URI>'
	                        + previousPCode
	                        + previousSCode
	                        + '<java:Document_Application>' + previousApp + '</java:Document_Application>'
	                        + '<java:ReturnCode />'
	                        + '</web:document>'
	                        + '</web:deleteDocumentByApplication>'
	                        + '</soapenv:Body>'
	                        + '</soapenv:Envelope>';
	
	                        $.ajax({
	                        url: productServiceUrl,
	                        type: "POST",
	                        dataType: "xml",
	                        contentType: "text/xml; charset=\"utf-8\"",
	                        data: soapMessage,
	                        success: function (xml) {
	                            json = $.xmlToJSON(xml);
	                            var t = json.Body[0].deleteDocumentByApplicationResponse[0].return[0];
	                            response = responseStatus(t);
	                            if(response)
	                            {
	                                soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
	                                    + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
	                                    + '<soapenv:Header/>'
	                                    + '<soapenv:Body>'
	                                    + '<web:insertDocumentByApplication>'
	                                    + '<web:document>'
	                                    + '<java:Document_Code>' + code + '</java:Document_Code>'
	                                    + '<java:Document_Name>' + name.trim() + '</java:Document_Name>'
	                                    + '<java:Document_URI>' + aResponse.uri + '</java:Document_URI>'
	                                    + pCode
	                                    + sCode
	                                    + '<java:Document_Application>' + app + '</java:Document_Application>'
	                                    + '<java:ReturnCode />'
	                                    + '</web:document>'
	                                    + '</web:insertDocumentByApplication>'
	                                    + '</soapenv:Body>'
	                                    + '</soapenv:Envelope>';
	
	                                $.ajax({
	                                    url: productServiceUrl,
	                                    type: "POST",
	                                    dataType: "xml",
	                                    contentType: "text/xml; charset=\"utf-8\"",
	                                    data: soapMessage,
	                                    success: function (xml) {
	                                    	removeStatus();
	                                        json = $.xmlToJSON(xml);
	                                        t = json.Body[0].insertDocumentByApplicationResponse[0].return[0];
	                                        response = responseStatus(t);
	                                        if(response)
	                                        {
	                                            $.getAllDocuments(true);
	                                            alert("Docuemnt: " + previousName + "\n Updated to: " + name);
	                                        }
	                                        else
	                                        {
	                                            docInsertDataFailed(file);
	                                        }
	                                        $.ajax({
	                                            url: correlationsDeleteHandler,
	                                            type: "POST",
	                                            data: { "delete": previousFile},
	                                            success: function (responseStat) {
	                                                var myResponse = jQuery.parseJSON(responseStat);
	                                                if (myResponse.status != "couldNotDelete") {
	                                                    if(myResponse.status == "failed")
	                                                    {
	                                                        alert("Could not delete file on server.");
	                                                        return false;
	                                                    }
	                                                }
	                                                else
	                                                    alert("Unable to update \"" + previousFile + "\" with \"" + file + "\".");
	                                            }
	                                        });
	                                    }
	                                });
	                            }
	                            else
	                            {
	                                alert("Failed to delete old data from server")
	                            }
	                        },
	                        error:function(){
	                        	removeStatus();
	                        	docInsertDataFailed(file);
	                        }
	                    });
                    }
                    else
                    {
                    	removeStatus();
	                    alert(file + " already exists");
                    }
                }
            });
                        
        }
        else if(!nameChanged && !appChanged && fileChanged)
        {
	        form.ajaxSubmit({
	            url: correlationsInsertHandler,
	            beforeSubmit: function(arr, $form, options){
	            	beforeSubmit(arr, $form, options);
	            },
	            uploadProgress: function(event, position, total, percentComplete){
	            	loadingTick(event, position, total, percentComplete);
	            },
	            success: function (responseText) {
	            	uploadSuccess(responseText);
	                var aResponse = jQuery.parseJSON(responseText);
	                if(aResponse.status != "exists")
	                {
		                if(aResponse.status == "failed")
		                {
		                    alert("Could not write file to server.");
		                    return false;
		                }
	                
		                soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
		                    + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
		                    + '<soapenv:Header/>'
		                    + '<soapenv:Body>'
		                    + '<web:updateDocumentByApplication>'
		                    + '<web:document>'
		                    + '<java:Document_Code>' + code + '</java:Document_Code>'
		                    + '<java:Document_Name>' + previousName.trim() + '</java:Document_Name>'
		                    + '<java:Document_URI>' + aResponse.uri + '</java:Document_URI>'
		                    + pCode
		                    + sCode
		                    + '<java:Document_Application>' + previousApp + '</java:Document_Application>'
		                    + '<java:ReturnCode />'
		                    + '</web:document>'
		                    + '</web:updateDocumentByApplication>'
		                    + '</soapenv:Body>'
		                    + '</soapenv:Envelope>';
		
		                $.ajax({
		                    url: productServiceUrl,
		                    type: "POST",
		                    dataType: "xml",
		                    contentType: "text/xml; charset=\"utf-8\"",
		                    data: soapMessage,
		                    success: function (xml) {
		                    	removeStatus();
		                        json = $.xmlToJSON(xml);
		                        var t = json.Body[0].updateDocumentByApplicationResponse[0].return[0];
		                        response = responseStatus(t);
		                        if(response)
		                        {
		                            $.getAllDocuments(true);
		                            alert("File: " + previousFile + "\n Updated to: " + file);
		                        }
		                        else
		                        {
		                            alert("Failed to update data on server");
		                        }
		                        $.ajax({
		                            url: correlationsDeleteHandler,
		                            type: "POST",
		                            data: { "delete": previousFile},
		                            success: function (responseStat) {
		                                var myResponse = jQuery.parseJSON(responseStat);
	                                    if (myResponse.status != "couldNotDelete") {
	                                        if(myResponse.status == "failed")
	                                        {
	                                            alert("Could not delete file to server.");
	                                            return false;
	                                        }
	                                    }
	                                    else
	                                        alert("Unable to update \"" + previousFile + "\" with \"" + file + "\".");
		                            }
		                        });
		                    },
		                    error:function(){
		                    	removeStatus();
		                    	docInsertDataFailed(file);
		                    }
		                });
	                }
	                else
	                {
	                	removeStatus();
	                    alert(file + " already exists");
	                }
	            }
	        });
                        
        }
        else if((nameChanged || appChanged) && !fileChanged)
        {
            var fileName = getFilePath();
            soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
                + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
                + '<soapenv:Header/>'
                + '<soapenv:Body>'
                + '<web:deleteDocumentByApplication>'
                + '<web:document>'
                + '<java:Document_Code>' + code + '</java:Document_Code>'
                + '<java:Document_Name>' + previousName.trim() + '</java:Document_Name>'
                + '<java:Document_URI>' + fileName + previousFile + '</java:Document_URI>'
                + previousPCode
                + previousSCode
                + '<java:Document_Application>' + previousApp + '</java:Document_Application>'
                + '<java:ReturnCode />'
                + '</web:document>'
                + '</web:deleteDocumentByApplication>'
                + '</soapenv:Body>'
                + '</soapenv:Envelope>';

                $.ajax({
                url: productServiceUrl,
                type: "POST",
                dataType: "xml",
                contentType: "text/xml; charset=\"utf-8\"",
                data: soapMessage,
                success: function (xml) {
                    json = $.xmlToJSON(xml);
                    var t = json.Body[0].deleteDocumentByApplicationResponse[0].return[0];
                    response = responseStatus(t);
                    if(response)
                    {
                        soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
                            + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
                            + '<soapenv:Header/>'
                            + '<soapenv:Body>'
                            + '<web:insertDocumentByApplication>'
                            + '<web:document>'
                            + '<java:Document_Code>' + code + '</java:Document_Code>'
                            + '<java:Document_Name>' + name.trim() + '</java:Document_Name>'
                            + '<java:Document_URI>' + fileName + previousFile + '</java:Document_URI>'
                            + pCode
                            + sCode
                            + '<java:Document_Application>' + app + '</java:Document_Application>'
                            + '<java:ReturnCode />'
                            + '</web:document>'
                            + '</web:insertDocumentByApplication>'
                            + '</soapenv:Body>'
                            + '</soapenv:Envelope>';

                        $.ajax({
                            url: productServiceUrl,
                            type: "POST",
                            dataType: "xml",
                            contentType: "text/xml; charset=\"utf-8\"",
                            data: soapMessage,
                            success: function (xml) {
                                json = $.xmlToJSON(xml);
                                t = json.Body[0].insertDocumentByApplicationResponse[0].return[0];
                                response = responseStatus(t);
                                if(response)
                                {
                                    $.getAllDocuments(true);
                                    alert("Docuemnt: " + previousName + "\n Updated to: " + name);
                                }
                                else
                                {
                                    docInsertDataFailed(file);
                                }
                            }
                        });
                    }
                    else
                    {
                        alert("failed to delete old data from server");
                    }
                }
            });
        }
        else if(!nameChanged && !appChanged && !fileChanged)
        {
            var fileName = getFilePath();
            soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
                + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
                + '<soapenv:Header/>'
                + '<soapenv:Body>'
                + '<web:updateDocumentByApplication>'
                + '<web:document>'
                + '<java:Document_Code>' + code + '</java:Document_Code>'
                + '<java:Document_Name>' + name.trim() + '</java:Document_Name>'
                + '<java:Document_URI>' + fileName + previousFile + '</java:Document_URI>'
                + pCode
                + sCode
                + '<java:Document_Application>' + app + '</java:Document_Application>'
                + '<java:ReturnCode />'
                + '</web:document>'
                + '</web:updateDocumentByApplication>'
                + '</soapenv:Body>'
                + '</soapenv:Envelope>';

            $.ajax({
                url: productServiceUrl,
                type: "POST",
                dataType: "xml",
                contentType: "text/xml; charset=\"utf-8\"",
                data: soapMessage,
                success: function (xml) {
                    json = $.xmlToJSON(xml);
                    var t = json.Body[0].updateDocumentByApplicationResponse[0].return[0];
                    response = responseStatus(t);
                    if(response)
                    {
                        $.getAllDocuments(true);
                        alert("Document: " + name + " updated.");
                    }
                    else
                    {
                        alert("Failed to update data on server");
                    }
                }
            });
        }
    }

    //delete product
    $.deleteProduct = function(code, name, rowId, app) {
        soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
            + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
            + '<soapenv:Header/>'
            + '<soapenv:Body>'
            + '<web:deleteProductByApplication>'
            + '<web:product>'
            + '<java:Product_Code>' + code + '</java:Product_Code>'
            + '<java:Product_Name>' + name.trim() + '</java:Product_Name>'
            + '<java:Product_Application>' + app + '</java:Product_Application>'
            + '<java:ReturnCode />'
            + '</web:product>'
            + '</web:deleteProductByApplication>'
            + '</soapenv:Body>'
            + '</soapenv:Envelope>';

        $.ajax({
            url: productServiceUrl,
            type: "POST",
            dataType: "xml",
            contentType: "text/xml; charset=\"utf-8\"",
            data: soapMessage,
            success: function (xml) {
                json = $.xmlToJSON(xml);
                var t = json.Body[0].deleteProductByApplicationResponse[0].return[0];
                var response = responseStatus(t)
                if(response)
                {
                    grid.jqGrid("delRowData", rowId);
                    $.getAllProducts(true, function () { });
                }
            }
        });
    }

    //delete standard
    $.deleteStandard = function(code, name, type, aka, rowId) {
        soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
            + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
            + '<soapenv:Header/>'
            + '<soapenv:Body>'
            + '<web:deleteStandard>'
            + '<web:standard>'
            + '<java:Standard_Code>' + code + '</java:Standard_Code>'
            + '<java:Standard_Name>' + name.trim() + '</java:Standard_Name>'
            + '<java:Standard_Aka>' + aka + '</java:Standard_Aka>'
            + '<java:Standard_Type>' + type + '</java:Standard_Type>'
            + '<java:ReturnCode />'
            + '</web:standard>'
            + '</web:deleteStandard>'
            + '</soapenv:Body>'
            + '</soapenv:Envelope>';

        $.ajax({
            url: productServiceUrl,
            type: "POST",
            dataType: "xml",
            contentType: "text/xml; charset=\"utf-8\"",
            data: soapMessage,
            success: function (xml) {
                json = $.xmlToJSON(xml);
                var t = json.Body[0].deleteStandardResponse[0].return[0];
                var response = responseStatus(t)
                if(response)
                {
                    grid.jqGrid("delRowData", rowId);
                    $.getAllStandards(true, function () { });
                }
            }
        });
    }

    //delete document
    $.deleteDocument = function(code, name, uri, pCode, sCode, rowId, app) {
        $.ajax({
            url: correlationsDeleteHandler,
            type: "POST",
            data: { "delete": uri },
            success: function (response) {
                var myResponse = jQuery.parseJSON(response);
                if(myResponse.status == "failed")
                {
                    alert("Could not delete file from server.");
                    return false;
                }
                soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
                    + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
                    + '<soapenv:Header/>'
                    + '<soapenv:Body>'
                    + '<web:deleteDocumentByApplication>'
                    + '<web:document>'
                    + '<java:Document_Code>' + code + '</java:Document_Code>'
                    + '<java:Document_Name>' + name.trim() + '</java:Document_Name>'
                    + '<java:Document_URI>' + myResponse.uri + '</java:Document_URI>'
                    + pCode
                    + sCode
                    + '<java:Document_Application>' + app + '</java:Document_Application>'
                    + '<java:ReturnCode />'
                    + '</web:document>'
                    + '</web:deleteDocumentByApplication>'
                    + '</soapenv:Body>'
                    + '</soapenv:Envelope>';

                $.ajax({
                    url: productServiceUrl,
                    type: "POST",
                    dataType: "xml",
                    contentType: "text/xml; charset=\"utf-8\"",
                    data: soapMessage,
                    success: function (xml) {
                        json = $.xmlToJSON(xml);
                        var t = json.Body[0].deleteDocumentByApplicationResponse[0].return[0];
                        var response = responseStatus(t)
                        if(response)
                        {
                            grid.jqGrid("delRowData", rowId);
                            $.getAllDocuments(true, function () { });
                        }
                    }
                });
            }
        });
    }

    //insert product
    $.insertProduct = function(name, app) {
        soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
            + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
            + '<soapenv:Header/>'
            + '<soapenv:Body>'
            + '<web:insertProductByApplication>'
            + '<web:product>'
            + '<java:Product_Code></java:Product_Code>'
            + '<java:Product_Name>' + name.trim() + '</java:Product_Name>'
            + '<java:Product_Application>' + app + '</java:Product_Application>'
            + '<java:ReturnCode />'
            + '</web:product>'
            + '</web:insertProductByApplication>'
            + '</soapenv:Body>'
            + '</soapenv:Envelope>';

        $.ajax({
            url: productServiceUrl,
            type: "POST",
            dataType: "xml",
            contentType: "text/xml; charset=\"utf-8\"",
            data: soapMessage,
            success: function (xml) {
                //alert("Product Added: " + name);
                json = $.xmlToJSON(xml);
                var t = json.Body[0].insertProductByApplicationResponse[0].return[0];
                
                var response = responseStatus(t);
                if(response)
                {
                    var r = [{"Product_Code": t.Product_Code[0].Text,
                              "Product_Name": t.Product_Name[0].Text}];
                    grid.jqGrid('addRowData', 0, r);
                    $.getAllProducts(true, function () { });
                    grid.trigger('reloadGrid');
                    alert("Product Added: " + name);
                }
            }
        });
    }

    //insert standard
    $.insertStandard = function(name, type, aka) {
        soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
            + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
            + '<soapenv:Header/>'
            + '<soapenv:Body>'
            + '<web:insertStandard>'
            + '<web:standard>'
            + '<java:Standard_Code></java:Standard_Code>'
            + '<java:Standard_Name>' + name.trim() + '</java:Standard_Name>'
            + '<java:Standard_Type>' + type + '</java:Standard_Type>'
            + '<java:Standard_Aka>' + aka + '</java:Standard_Aka>'
            + '<java:ReturnCode />'
            + '</web:standard>'
            + '</web:insertStandard>'
            + '</soapenv:Body>'
            + '</soapenv:Envelope>';

        $.ajax({
            url: productServiceUrl,
            type: "POST",
            dataType: "xml",
            contentType: "text/xml; charset=\"utf-8\"",
            data: soapMessage,
            success: function (xml) {
                json = $.xmlToJSON(xml);
                var t = json.Body[0].insertStandardResponse[0].return[0];
                
                var response = responseStatus(t);
                if(response)
                {
                    var r = [{"Standard_Code": t.Standard_Code[0].Text,
                              "Standard_Name": t.Standard_Name[0].Text,
                              "Standard_Aka": t.Standard_Aka[0].Text,
                              "Standard_Type": t.Standard_Type[0].Text}];
                    grid.jqGrid('addRowData', 0, r);
                    $.getAllStandards(true, function () { });
                    grid.trigger('reloadGrid');
                    alert("Standard Added: " + name);
                }
            }
        });
    }

    //insert document
    $.insertDocument = function(name, file, pCode, sCode, form, app) {
        form.ajaxSubmit({
            url: correlationsInsertHandler,
            beforeSubmit: function(arr, $form, options){
            	beforeSubmit(arr, $form, options);
            },
            uploadProgress: function(event, position, total, percentComplete){
            	loadingTick(event, position, total, percentComplete);
            },
            success: function (responseText) {
            	uploadSuccess(responseText);
                var myResponse = jQuery.parseJSON(responseText);
                console.log(myResponse);
                if (myResponse.status != "exists") {
                    if(myResponse.status != "added")
                    {
                        alert("Could not write file to server.");
                        return false;
                    }
                    soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
                        + 'xmlns:web="http://com/cengage/correlations/webservices" xmlns:java="java:com.cengage.correlations.database">'
                        + '<soapenv:Header/>'
                        + '<soapenv:Body>'
                        + '<web:insertDocumentByApplication>'
                        + '<web:document>'
                        + '<java:Document_Code></java:Document_Code>'
                        + '<java:Document_Name>' + name.trim() + '</java:Document_Name>'
                        + '<java:Document_URI>' + myResponse.uri + '</java:Document_URI>'
                        + pCode
                        + sCode
                        + '<java:Document_Application>' + app + '</java:Document_Application>'
                        + '<java:ReturnCode />'
                        + '</web:document>'
                        + '</web:insertDocumentByApplication>'
                        + '</soapenv:Body>'
                        + '</soapenv:Envelope>';

                    $.ajax({
                        url: productServiceUrl,
                        type: "POST",
                        dataType: "xml",
                        contentType: "text/xml; charset=\"utf-8\"",
                        data: soapMessage,
                        success: function (xml) {
                        	removeStatus();
                            json = $.xmlToJSON(xml);
                            var t = json.Body[0].insertDocumentByApplicationResponse[0].return[0];
                            response = responseStatus(t);
                            if(response)
                            {
                                var sName = undefined;
                                var pName = undefined;
                                for (i = 0; i < products.length; i++) {
                                    if (t.Product_Code[0].Text == products[i].Product_Code) {
                                        pName = products[i].Product_Name
                                        break;
                                    }
                                }

                                for (i = 0; i < standards.length; i++) {
                                    if (t.Standard_Code[0].Text == standards[i].Standard_Code) {
                                        sName = standards[i].Standard_Name;
                                        break;
                                    }
                                }
                                if (pName == undefined)
                                    pName = "";
                                if (sName == undefined)
                                    sName = "";
                                var uri = getFileName(t.Document_URI[0].Text);
                                var r = [{"Document_Code": t.Document_Code[0].Text,
                                          "Document_Name": t.Document_Name[0].Text,
                                          "Document_URI": uri,
                                          "Product_Name": pName,
                                          "Standard_Name": sName,
                                          "Document_App": t.Document_Application[0].Text}];
                                grid.jqGrid('addRowData', 0, r);
                                $.getAllDocuments(true, function () { });
                                grid.trigger('reloadGrid');
                                alert("Document Added: " + name);
                            }else{
                            	docInsertDataFailed(file);
                            }
                        },
	                    error:function(){
	                    	docInsertDataFailed(file);
	                    	removeStatus();
	                    }
                    });
                }
                else
                {
                	removeStatus();
                    alert(file + " already exists");
                }
            }
        });
    } 
    
    function responseStatus(response)
    {
        var r = response.ReturnCode[0].Text;
        if(r != undefined){
	        if(r.indexOf("OK") >= 0)
	            return true;
	        else{
	            alert("An error occured: " + r);
	            return false;
	        }
        }
        return true;
    } 
    
    function getFileName(path)
    {
        var uriFile = path;
        var uriName = uriFile.split("/");
        var fileName;
        for (i = 0; i < uriName.length; i++) {
            fileName = uriName[i];
        }
        return fileName;
    }  

    function getFilePath()
    {
        if(documents.length > 0)
        {
            var uriFile = documents[0].Document_URI;
            var uriName = uriFile.split("/");
            var fileName = "/";
            for (i = 0; i < uriName.length - 1; i++) {
                fileName += uriName[i] + "/";
            }

            return fileName;
        }
    }

    function docInsertDataFailed(file)
    {
        $.ajax({
            url: correlationsDeleteHandler,
            type: "POST",
            data: { "delete": file },
            success: function (responseStat) {
                alert("Failed to insert data to database, deleted file.");
            }
        });
    }
    
    function beforeSubmit() {
    	$("body").prepend(loading);
    }
    
    function loadingTick(event, position, total, percentComplete){
    	$(".progress .bar").width(percentComplete + '%');
    }
    
    function uploadSuccess(responseText){
    	$(".progress").remove();
    	$(".please-wait-body").append("<h4>Upload ---- complete</h4>");
    	$(".please-wait-body").append("<h4>Adding to database...</h4>");
    }

    
    function removeStatus() {
    	$(".please-wait-backdrop").remove();
    	$("#myModal").remove();
    }
});