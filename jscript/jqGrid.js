$(document).ready(function () {
    var productServiceUrl = 'http://localhost:7001/CorrelationsWebService/CorrelationsWebService?WSDL';
    var response;
    var standards;
    var products;
    var documents;
    var json;
    getAll('<web:getAllStandardsOrderByName/>', '<web:getAllProductsOrderByName/>', '<web:getAllDocumentsOrderByName/>');
    function getAll(message1, message2, message3)
    {
        var soapMessage ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
            + ' xmlns:web="http://com/cengage/ngl/correlations/webservices">'
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
            complete: function(xmlHttpRequest){
                standards = new Array();
                json = $.xmlToJSON(xmlHttpRequest.responseXML);
                var tempStandards = json.Body[0].getAllStandardsOrderByNameResponse[0].return[0].Standards;
                if(tempStandards)
                {
                    for(i = 0; i < tempStandards.length; i++)
                    {
                        standards.push({
                            "Standard_Code": tempStandards[i].Standard_Code[0].Text,
                            "Standard_Name": tempStandards[i].Standard_Name[0].Text,
                            "Standard_Type": tempStandards[i].Standard_Type[0].Text
                        });
                    }
                    console.log(standards);
                    var matches = 0;
                }
            }
        });     

        soapMessage ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
           + ' xmlns:web="http://com/cengage/ngl/correlations/webservices">'
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
            complete: function(xmlHttpRequest){
                documents = new Array();
                json = $.xmlToJSON(xmlHttpRequest.responseXML);
                var tempDocuments = json.Body[0].getAllDocumentsOrderByNameResponse[0].return[0].Documents;
                if(tempDocuments)
                {
                    for(i = 0; i < tempDocuments.length; i++)
                    {
                        documents.push({
                            "Document_Code": tempDocuments[i].Document_Code[0].Text,
                            "Document_Name": tempDocuments[i].Document_Name[0].Text,
                            "Document_URI": tempDocuments[i].Document_URI[0].Text,
                            "Product_Code": tempDocuments[i].Product_Code[0].Text,
                            "Standard_Code": tempDocuments[i].Standard_Code[0].Text
                        });
                    }
                }
                console.log(documents);
            }
        });

        getAllProductsAndReload();
    } 
    
    function getAllProductsAndReload()
    {
        soapMessage ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'
           + ' xmlns:web="http://com/cengage/ngl/correlations/webservices">'
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
           complete: function(xmlHttpRequest){
                products = new Array();
                json = $.xmlToJSON(xmlHttpRequest.responseXML);
                var tempProducts = json.Body[0].getAllProductsOrderByNameResponse[0].return[0].Products;
                
                if(tempProducts)
                {
                    for(i = 0; i < tempProducts.length; i++)
                    {
                        products.push({
                            //"Product_Code": tempDocuments[i].Document_Code[0].Text,
                            Product_Name: tempProducts[i].Product_Name[0].Text,
                            updateButton: '<input type="button" class="updateButton" value="Update" />',
                            deleteButton: '<input type="button" class="deleteButton" value="Delete" />'
                        });
                    }
                    console.log(products);

                    jQuery("#grid").jqGrid({
	                    datatype: "local",
	                    height: 250,
   	                    colNames:['Product Name','Update', 'Delete'],
   	                    colModel:[
   		                    {name:'Product_Name',index:'Product_Name', width:200},
   		                    {name:'updateButton',index:'updateButton', width:100, sortable:false},
   		                    {name:'deleteButton',index:'deleteButton', width:100, sortable:false}	
   	                    ],
   	                    caption: '<input type="button" id="addButton" value="+ Add"/> Products'
                    });
                   
                    for(var i=0;i<=products.length;i++)
	                    jQuery("#grid").jqGrid('addRowData',i+1,products[i]);

                }
            }
        });
    }
});