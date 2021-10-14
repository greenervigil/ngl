$(document).ready(function(){
    $("#RefSearchTXT").typeAhead({
        value: "Search within results",
        scroll: false,
        height: "auto",
	    searchAll: false,
        submitButton: "#RefSearchBTN"
    });
});

function submitRFByType(formObject,event)
	{
		if((event.keyCode==13))
		{
		    submitRefineSearchForm(formObject);
		}
	}
	function getUrlParam(url,name)
{
    if(url.substr(0,1)!="&") url="&"+url;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec(url);
    if( results == null )
        return "";
    else
        return results[1];
}

function replaceUrlParam(url,name, newValue){
    var replacedUrl='';
    var pairs = url.split('&');
    for(var i=0;i<pairs.length;i++){
        var nameVal = pairs[i].split('=');
        if(nameVal[0] == name){
            if(replacedUrl!='' && replacedUrl!="undefined"){
                replacedUrl = replacedUrl +"&"+ nameVal[0]+"="+newValue;
            }
            else{
                replacedUrl = nameVal[0]+"="+newValue;
            }
        }else{
            if(replacedUrl!='' && replacedUrl!="undefined"){
                replacedUrl = replacedUrl +"&"+ pairs[i];
            }else{
                replacedUrl = pairs[i];
            }
        }
    }
    return replacedUrl;
}
function cleanupUrl(form){
    var actionUrl = form.action;
    if( actionUrl.indexOf('?') > -1){
        actionUrl=actionUrl.substr(0,actionUrl.indexOf('?'));
    }
    form.action=actionUrl
}

function submitRefineSearchForm(formObject) {
    //debugger;
    var form = formObject;
    var url = form.previousPageUrlState.value;
    var nttparam =getUrlParam(url,"Ntt");
	var temp = (form.refineParam.value).replace(/^[\s]+/,'').replace(/[\s]+$/,'').replace(/[\s]{2,}/,' ');
	var temp1 = temp.replace(/^\s+|\s+$/g,'');
    var ntkparam = document.getElementById("ntkVal").value;
    cleanupUrl(form);
   
    var n = validateISBN2(temp1);
    if (n[0]==true){
        form.refineParam.value = n[1];
    }
	var isbn = encodeURIComponent(n[1]);
    if(nttparam!="" && form.refineParam.value!="" && form.refineParam.value!=null){
        nttparam = nttparam + "|" + isbn; 
        url = replaceUrlParam(url,"Ntt",nttparam);
    }
    if(nttparam == "" && form.refineParam.value!="" && form.refineParam.value!=null){
        url = url + "&Ntt=" + isbn;
    }

	if(isbn == ""){
		url = document.URL;
	}else{
		url = url + ntkparam;
    }
    form.action = url;
    form.submit();
}
