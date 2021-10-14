var env;
if (window.location.hostname.toUpperCase().indexOf("S-") != -1)
    env = "s-";
else if(window.location.hostname.toUpperCase().indexOf("D-") != -1 || window.location.hostname.toUpperCase().indexOf("L-") != -1)
    env = "d-";
else
  env = "";


function submitSearchByPageSize(pageDropdown) {
	selectedVal = pageDropdown.options[pageDropdown.selectedIndex].value;		
	productsIncluded(productsIncludedUrl, {Nrpp: selectedVal});
}

function getQueryString() {
    var search = unescape(location.search);
    search = search.substr(1);
    return search;
}

function submitSearchStatusForm(url, activityFlag) {		
	var form = document.getElementsByName('globalSearchForm')[0];
	form.action = window.location.pathname + "?" + url;
	form.submit();
}
function submitNavigationLink(url,inc){
	var Nrpp = document.getElementById("Nrpp");
	productsIncludedUrl = url;
	productsIncluded(url, {Nrpp: inc});
}
	
function getUrlParameter(urlString, urlparam) {
    var parmaters = urlString.split("&")
    var url = "";
    for (i = 0; i < parmaters.length; i++) {

        if (parmaters[i].match("^" + urlparam)) {
            url = parmaters[i];
        }
    }
    return url;
}

function changeSortingParameter(sortParameter) {
    var selectedVal = document.getElementsByName("pageDropdown")[0].value;
    if (sortParameter != "") {
        productsIncludedUrl = RemoveUrlParameter(productsIncludedUrl, 'Ns') + '&Ns=' + sortParameter; 
    } else {
        productsIncludedUrl = RemoveUrlParameter(productsIncludedUrl, 'Ns');
        productsIncludedUrl = productsIncludedUrl.replace("&Ns=", "");
    }

    submitNavigationLink(productsIncludedUrl, selectedVal);
}

function RemoveUrlParameter(urlString, removeParam) {
    var url = "";
    var parmaters = urlString.split("&")

    for (i = 0; i < parmaters.length; i++) {

        if (!parmaters[i].match("^" + removeParam)) {
            if (url.length > 0) {
                url = url + "&" + parmaters[i]
            }
            else {
                url = parmaters[i];
            }
        }
    }
    return url;
}

function submitBrowseFilter(url,formObject)
{
  for(var i=0;i<formObject.length;i++)
  {
  	if(formObject.elements[i].type == "checkbox")
  	{
  		if(formObject.elements[i].checked)
  		{ 	
  			productsIncludedUrl =productsIncludedUrl+"+"+formObject.elements[i].value;
  		} else{
			var removeId=new String(formObject.elements[i].value);
			productsIncludedUrl = productsIncludedUrl.replace(removeId,"");
		}
  	}  
  }
  productsIncluded(productsIncludedUrl);
}

function submitRFByType(url,formObject,event)
	{
		if((event.keyCode==13))
		{
		    submitRefineSearchForm(url, formObject);
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
	
function cleanupUrl(form){
    var actionUrl = form.action;
    if( actionUrl.indexOf('?') > -1){
        actionUrl=actionUrl.substr(0,actionUrl.indexOf('?'));
    }
    form.action=actionUrl
}

function submitRefineSearchForm(url,formObject) {
    //debugger;
    var form = formObject;
    var nttparam =getUrlParam(productsIncludedUrl,"Ntt");
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
        nttparam = nttparam + "||" + isbn;
        productsIncludedUrl = replaceUrlParam(productsIncludedUrl,"Ntt",nttparam);
    }
    if(nttparam == "" && form.refineParam.value!="" && form.refineParam.value!=null){
    	productsIncludedUrl = productsIncludedUrl + "&Ntt=" + isbn;
    }

	if(isbn == ""){
		productsIncludedUrl = document.URL;
	}else{
		productsIncludedUrl = RemoveUrlParameter(productsIncludedUrl, "Ntk");
		productsIncludedUrl = productsIncludedUrl + ntkparam;
    }
	console.log(productsIncludedUrl);
    productsIncluded(productsIncludedUrl);
}


//see more/less in guided navigation
$(".more-button").on("click", function(e){
	$(this).parents("ul").children(".more-menu").slideToggle("fast");
	if($(this).text().indexOf("more") > -1){
		$("b",this).text("See less...");
	}else{
		$("b",this).text("See more...");
	}
	e.preventDefault();
	e.stopPropagation();
});

function getQueryString() {
    var search = unescape(location.search);
    search = search.substr(1);
    return search;
}

function RemoveUrlParameter(urlString, removeParam) {
  var url = "";
  var parmaters = urlString.split("&")

  for (i = 0; i < parmaters.length; i++) {
    if (!parmaters[i].match("^" + removeParam)) {
      if (url.length > 0) {
        url = url + "&" + parmaters[i]
      }
      else {
        url = parmaters[i];
      }
    }
  }
  return url;
}

$(".resultsListHeader #CNS").on("change", function(){
  productsIncluded(RemoveUrlParameter(productsIncludedUrl, 'Nrpp') + '&Nrpp=' + $(this).val());
});

$(".resultsListHeader #SB").on("change", function(){
  var urlState;
  if($(this).val() != ""){
      urlState = RemoveUrlParameter(productsIncludedUrl, 'Ns') + '&Ns=' + $(this).val();
  }else{
      urlState = RemoveUrlParameter(productsIncludedUrl, 'Ns');
  }
  productsIncluded(urlState);
});

$("section ul.nav a").on("click", function(e){
	var url = productsIncludedUrl.split("?")[0];
	productsIncluded(url + $(this).attr("href"));

	e.preventDefault();
});

//redirect Guided Navigation links
if($("aside nav").length > 0) {
	$(" aside nav a").each(function(){
		var query = $(this).attr("href").split("?")[1];
		$(this).click(function(){
			if(!$(this).hasClass("more-button")){
				productsIncluded("/search/showresults.do?" + query);
			}
			return false;
		});
	});

	$("aside nav input[type='checkbox']").on("click", function(){
		var pageSize = $(".resultsListHeader #CNS").val();
		var sortBox = $(".resultsListHeader #SB").val();
		if(sortBox != "" && sortBox != "Sort By..."){
			productsIncluded($(this).val() + "&Nrpp=" + pageSize + "&Ns=" + sortBox);
		}else{
			productsIncluded($(this).val() + "&Nrpp=" + pageSize);
		}
	});
}

$("a[role='tab']").on('click', function(){
	if($(this).attr("href") == "#ProductsIncluded"){
		productsIncluded(originalProductsIncludedUrl);
	}
});

yepnope({ load: [protocol + "//" + env + "cdn.cengage.com/js/contrib/validation.js",
	  "/jscript/isbnHyphenation.js",
	  "/jscript/jquery.typeAhead.js"],
  complete: function () {
    if($("#RefSearchTXT").length > 0 && typeof $().typeAhead === "function") {
      $("#RefSearchTXT").typeAhead({
        value: "Search within results",
        scroll: false,
        height: "auto",
	      searchAll: false,
        submitButton: "#RefSearchBTN",
        url: productsIncludedUrl
      });
    }
  }
});
