$(document).ready(function () {
    $("#countryselector").change(function () {

        var selectedVal = document.getElementsByName("Country")[0].value;
        if (selectedVal == "") {
            $("#goButton").attr('disabled', 'disabled');
        } else {
            $(".goButton").removeAttr('disabled');
        }
    });
    //setSortParamDropDown();
});

function getCountryUrl(urlString){
var parmaters = urlString.split("?");
var url = parmaters[0];
return url;
}

function getUrlParameter(urlString,urlparam) { 
	var parmaters = urlString.split("&")
	var url ="";
	for (i=0;i<parmaters.length;i++){
		
		if(parmaters[i].match("^" + urlparam)){
			url = parmaters[i];
		}
	}
	return url;
}


//To Load The Country Dimension Dynamically 
function getActionurl()
{
  var forwardurl = document.location.href;
  var selectedVal = document.getElementsByName("Country")[0].value;
  var countryCode = document.getElementById("countryselector").options[document.getElementById("countryselector").selectedIndex].id;
  document.cookie="countryName=" + selectedVal;
  document.cookie="P_Country_Code=" + countryCode;
  var urlState ='showresults.do'+'?N=185+'+selectedVal;	
  document.selectCountry.action = urlState;
  document.selectCountry.submit();
}

//TO Get The Cookie From The Browser 
function getCookieValue(key)
{
    currentcookie = document.cookie;
    if (currentcookie.length > 0)
    {
        firstidx = currentcookie.indexOf(key + "=");
        if (firstidx != -1)
        {
            firstidx = firstidx + key.length + 1;
            lastidx = currentcookie.indexOf(";",firstidx);
            if (lastidx == -1)
            {
                lastidx = currentcookie.length;
            }
            return unescape(currentcookie.substring(firstidx, lastidx));
        }
    }
    return "";
}
function submitChooseCountryPage(){
	var forwardurl = document.location.href;
	document.getElementsByName("changeCountry")[0].value = "FromFooter";
	var urlState =getCountryUrl(forwardurl)+'?N=185';	
	document.globalSearchForm.action = urlState;
	document.globalSearchForm.submit();
}
function setValueinHidden(selectedindex){
var countryListbeab = document.getElementsByName("countryList")[0].value;
alert(countryListbeab);
var val = selectedindex;
var country  = countryListbeab.split(",");
var ss = country[val];
alert("ss"+ss.countryCode);
}
/*function setSortParamDropDown(){
	var urlQueryString = getQueryString();
	var ns = getUrlParameter(urlQueryString,"Ns");
	if(ns != ""){
		ns = ns.replace("Ns=","");
		var dropdowns = document.getElementsByName("sortParam")
		for(var dropdowncount=0;dropdowncount <dropdowns.length;dropdowns++){
			for (var i = 0; i < dropdowns[dropdowncount].options.length; i++ ) {
			     if ( dropdowns[dropdowncount].options[i].value == ns ) {
		            dropdowns[dropdowncount].options[i].selected = true;
		            break;
		        }
		    }
		}
	}
}*/


function printSearchResultsPage(cssPath) {
    var windowObject = window.open('', 'PrintWindow', 'toolbars=no,scrollbars=yes,status=no,resizable=yes');
    windowObject.document.writeln('<HTML>\n<HEAD>\n<style>@media print {a[href]:after {content: none !important;}}.searchResultsListBtn{bottom: 0px !important;position:relative!important;}</style><link href="//cdn.cengage.com/css/apps/search/reset.css" rel="stylesheet" type="text/css" /><link href="//cdn.cengage.com/css/sites/cengage/header_footer.css" rel="stylesheet" type="text/css" /><link href="/css/search/style.css" rel="stylesheet" type="text/css" /><link href="' + cssPath + '" rel="stylesheet" type="text/css" /> \n </HEAD> \n <BODY><header>');
    var divContent = document.getElementById("printHeader");
    if (divContent) {
        windowObject.document.writeln(divContent.innerHTML);
    }
    windowObject.document.writeln('</header><hr/><aside class="breadCrumbs">');
    divContent = getClass("breadCrumbs");
    if (divContent) {
        windowObject.document.writeln(divContent.innerHTML);
    }
    windowObject.document.writeln('</aside><section id="searchresultstitleContainer">');
    divContent = document.getElementById("searchresultstitleContainer");
    if (divContent) {
        windowObject.document.writeln(divContent.innerHTML);
    }

    windowObject.document.writeln('</section><section id="searchresultsSeries">');
    divContent = document.getElementById("searchresultsSeries");
    if (divContent) {
        windowObject.document.writeln(divContent.innerHTML);
    }
    windowObject.document.writeln('</section><hr/><section id="searchresultsSingleItemtitleContainer">');
    divContent = document.getElementById("searchresultsSingleItemtitleContainer");
    if (divContent) {
        windowObject.document.writeln(divContent.innerHTML);
    }

    windowObject.document.writeln('</section><section id="searchresultsSingleItem">');
    divContent = document.getElementById("searchresultsSingleItem");
    if (divContent) {
        windowObject.document.writeln(divContent.innerHTML);
    }
    windowObject.document.writeln('</section></BODY>\n</HTML>');
    windowObject.document.close();
    windowObject.focus();
    console.log(windowObject.document);
    setTimeout(function(){
        windowObject.print();
        windowObject.close(); 
    }, 5000);
}

function getClass(matchClass) {
    var elems = document.getElementsByTagName('*');
    for (i = 0; i < elems.length; i++) {
        if (elems[i].className.toUpperCase() == matchClass.toUpperCase()) {
            return elems[i];
        }
    }
    return null;
}

function printProductDetailsPage() {
		var windowObject = window.open('', 'PrintWindow', 'toolbars=no,scrollbars=yes,status=no,resizable=yes');
		windowObject.document.writeln('<HTML>\n<HEAD>\n <link href="/css/product_overviewPrint.css" rel="stylesheet" type="text/css" /> \n </HEAD> \n <BODY><div id="global">');	
		var divContent = document.getElementById("printDivHeader");	
		if(divContent){
			windowObject.document.writeln(divContent.innerHTML);	
		}		
		windowObject.document.writeln('<div id="content_wrap"><div id="content_wrap_right"><div id="content"><div id="c1_ins"> \n <div id="CoverImage"> \n<div id="prod_image_ins">');
		
		divContent = document.getElementById("printCoverImage");
		if(divContent){
			windowObject.document.writeln(divContent.innerHTML);
		}
		windowObject.document.writeln('</div></div>');
		divContent = document.getElementById("printProductInfo");
		if(divContent){
			windowObject.document.writeln(divContent.innerHTML); 
		}
		windowObject.document.writeln('</div></div>');
		windowObject.document.writeln('<div class="TabWrap"><div id="MainTabs"><div id="NarrowWrap">');
		divContent = document.getElementById("custom1");
		if(divContent){
			windowObject.document.writeln('<div id="custom1">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		
		divContent = document.getElementById("Overview");
		if(divContent){
		    windowObject.document.writeln('<div id="Overview"><h2 class="offLeft">Overview</h2><div id="SubTab1" class="SubTabs">');
			divContent = document.getElementById("AboutTheProduct");
			if(divContent){
			    windowObject.document.writeln('<div id="AboutTheProduct" class="tab_wrap">');
				windowObject.document.writeln(divContent.innerHTML); 
				windowObject.document.writeln('</div>');
			}
			divContent = document.getElementById("Features");
			if(divContent){
			    windowObject.document.writeln('<div id="Features" class="tab_wrap">');
				windowObject.document.writeln(divContent.innerHTML); 
				windowObject.document.writeln('</div>');
			}
			divContent = document.getElementById("AboutTheAuthor");
			if(divContent){
			    windowObject.document.writeln('<div id="AboutTheAuthor" class="tab_wrap">');
				windowObject.document.writeln(divContent.innerHTML); 
				windowObject.document.writeln('</div>');
			}			
			windowObject.document.writeln('</div></div>');
		}
		divContent = document.getElementById("TableofContents");
		if(divContent){
		    windowObject.document.writeln('<div id="TableofContents" class="tab_wrap">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		divContent = document.getElementById("NewToThisEdition");
		if(divContent){
		    windowObject.document.writeln('<div id="NewToThisEdition" class="tab_wrap">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		divContent = document.getElementById("Components");
		if(divContent){
		    windowObject.document.writeln('<div id="Components"><div id="SubTab2" class="SubTabs">');
		    divContent = document.getElementById("Instructor");
		    if (divContent) {
		        windowObject.document.writeln('<div id="Instructor" class="tab_wrap">');
		        windowObject.document.writeln(divContent.innerHTML);
		        windowObject.document.writeln('</div>');
		    }
		    divContent = document.getElementById("Student");
		    if (divContent) {
		        windowObject.document.writeln('<div id="Student" class="tab_wrap">');
		        windowObject.document.writeln(divContent.innerHTML);
		        windowObject.document.writeln('</div>');
		    }
			windowObject.document.writeln('</div></div>');
		}

		divContent = document.getElementById("AlternateFormats");
		if(divContent){
		    windowObject.document.writeln('<div id="AlternateFormats" class="tab_wrap">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		divContent = document.getElementById("BestBuyPackages");
		if(divContent){
		    windowObject.document.writeln('<div id="BestBuyPackages" class="tab_wrap">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		divContent = document.getElementById("RelatedProducts");
		if(divContent){
		    windowObject.document.writeln('<div id="RelatedProducts" class="tab_wrap">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		divContent = document.getElementById("Downloads");
		if(divContent){
		    windowObject.document.writeln('<div id="Downloads" class="tab_wrap">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		divContent = document.getElementById("custom2");
		if(divContent){
			windowObject.document.writeln('<div id="custom2">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
}

        $(".tab_header", windowObject.document).each(function () {
            if ($(this).text().toUpperCase() === $(this).parent(".tab").siblings(".offLeft").text().toUpperCase()) {
                $(this).hide();
            }
        });

        $(".pricing", windowObject.document).html('Check <a href=\'http://www.cengage.com/\'>www.cengage.com</a> for up-to-date pricing.');

					
		windowObject.document.writeln('</div></div></div>');		
		windowObject.document.writeln('</div>\n</div>');	
		windowObject.document.writeln('</div>\n</div><div id="footer_include"></div><div id="metrics_include"></BODY>\n</HTML>');		
		windowObject.document.close();
		windowObject.focus();
		windowObject.print();  
}

function printProgramDetailsPage() {
    var windowObject = window.open('', 'PrintWindow', 'toolbars=no,scrollbars=yes,status=no,resizable=yes');
    windowObject.document.writeln('<HTML>\n<HEAD>\n <link href="/css/product_overviewPrint.css" rel="stylesheet" type="text/css" /> \n </HEAD> \n <BODY><div id="global">');
    var divContent = document.getElementById("printDivHeader");
    if (divContent) {
        windowObject.document.writeln(divContent.innerHTML);
    }
    windowObject.document.writeln('<div id="content_wrap"><div id="content_wrap_right"><div id="content"><div id="c1_ins"><div id="prod_bookSpecs">');

    divContent = document.getElementById("prod_bookSpecs");
    if (divContent) {
        windowObject.document.writeln(divContent.innerHTML);
    }
    windowObject.document.writeln('</div></div>');
    windowObject.document.writeln('<div id="MainTabs"><div id="NarrowWrap">');
    divContent = document.getElementById("custom1");
    if (divContent) {
        windowObject.document.writeln('<div id="custom1">');
        windowObject.document.writeln(divContent.innerHTML);
        windowObject.document.writeln('</div>');
    }
    divContent = document.getElementById("Overview");
    if (divContent) {
        windowObject.document.writeln('<div id="Overview"><h2 class="offLeft">Overview</h2><div id="SubTab1" class="SubTabs demoWidget">');

        divContent = document.getElementById("AboutTheProgram");
        if (divContent) {
            windowObject.document.writeln('<div id="AboutTheProgram" class="tab_wrap">');
            windowObject.document.writeln(divContent.innerHTML);
            windowObject.document.writeln('</div>');
        }
        divContent = document.getElementById("AboutTheAuthor");
        if (divContent) {
            windowObject.document.writeln('<div id="AboutTheAuthor" class="tab_wrap">');
            windowObject.document.writeln(divContent.innerHTML);
            windowObject.document.writeln('</div>');
        }
        windowObject.document.writeln('</div></div>');
    }
    divContent = document.getElementById("ProductsIncluded");
    if (divContent) {
        windowObject.document.writeln('<div id="ProductsIncluded">');
        windowObject.document.writeln(divContent.innerHTML);
        windowObject.document.writeln('</div>');
    }
    divContent = document.getElementById("Assessment");
    if (divContent) {
        windowObject.document.writeln('<div id="Assessment">');
        windowObject.document.writeln(divContent.innerHTML);
        windowObject.document.writeln('</div>');
    }
    divContent = document.getElementById("Technology");
    if (divContent) {
        windowObject.document.writeln('<div id="Technology">');
        windowObject.document.writeln(divContent.innerHTML);
        windowObject.document.writeln('</div>');
    }
    divContent = document.getElementById("RelatedPrograms");
    if (divContent) {
        windowObject.document.writeln('<div id="RelatedPrograms">');
        windowObject.document.writeln(divContent.innerHTML);
        windowObject.document.writeln('</div>');
    }
    divContent = document.getElementById("Downloads");
    if (divContent) {
        windowObject.document.writeln('<div id="Downloads">');
        windowObject.document.writeln(divContent.innerHTML);
        windowObject.document.writeln('</div>');
    }
    divContent = document.getElementById("custom2");
    if (divContent) {
        windowObject.document.writeln('<div id="custom2">');
        windowObject.document.writeln(divContent.innerHTML);
        windowObject.document.writeln('</div>');
    }

    $(".tab_header", windowObject.document).each(function () {
        if ($(this).text().toUpperCase() === $(this).parent(".tab").siblings(".offLeft").text().toUpperCase()) {
            $(this).hide();
        }
    });

    windowObject.document.writeln('</div></div></div>');
    windowObject.document.writeln('</div>\n</div>');
    windowObject.document.writeln('</div>\n<div id="footer_include"></div><div id="metrics_include"></BODY>\n</HTML>');
    windowObject.document.close();
    windowObject.focus();
    setTimeout(function(){
        windowObject.print();
        windowObject.close(); 
    }, 1000);
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

	function submitSBTypeNgl(form,event){
		if((event.keyCode==13))
		{
			mainNglSearch(form);
		}
	}
	function mainNglSearch(form){	
		var	url = document.URL;				
		var n = validateISBN2($.trim($("#search_textField2").val()));
		if (n[0]==true){$('#search_textField2').val(n[1]);}
		var Ntt = $('#search_textField2').val().replace(/^\s+|\s+$/g,'');
		if (Ntt==null || Ntt.length== 0) 
			location.reload();
		else{
			$('#search_textField2').val(Ntt);
			url = replaceUrlParam(url,"Ntt",Ntt);
			form.action = url;						
			form.submit();
		}
	}
	
	function clearDefault(textField) {
		if (textField.defaultValue==textField.value) textField.value = ""
	}
	
	function getDefault(textField){
	if(textField.value=='')textField.value=textField.defaultValue
	}
	
		
function printProductDetailsPageAPG() {
		var windowObject = window.open('', 'PrintWindow', 'toolbars=no,scrollbars=yes,status=no,resizable=yes');
		windowObject.document.writeln('<HTML>\n<HEAD>\n <link href="/css/search/product_overviewPrint.css" rel="stylesheet" type="text/css" /> \n </HEAD> \n <BODY><div id="global">');	
		var divContent = document.getElementById("printDivHeader");	
		if(divContent){
			windowObject.document.writeln(divContent.innerHTML);	
		}		
		windowObject.document.writeln('<div id="content_wrap"><div id="content_wrap_right"><div id="content"><div id="c1_ins"> \n <div id="CoverImage"> \n<div id="prod_image_ins">');
		
		divContent = document.getElementById("printCoverImage");
		if(divContent){
			windowObject.document.writeln(divContent.innerHTML);
		}
		windowObject.document.writeln('</div></div></div><div id="prod_bookSpecs"><div id="Book_title">');		
		var idCBWPContent = document.getElementById("printReplacePriceArea").innerHTML;
			document.getElementById("printReplacePriceArea").innerHTML = '<li class="CBWP">Check <a href="http://www.cengage.com/">www.cengage.com</a> for up-to-date pricing.</li>';
			divContent = document.getElementById("printProductInfo");
		if(divContent){
			windowObject.document.writeln(divContent.innerHTML); 			
		}
		document.getElementById("printReplacePriceArea").innerHTML = idCBWPContent;
		windowObject.document.writeln('</div></div></div></div>');
		windowObject.document.writeln('<div id="c1"><div id="SRcenter_nav"><div id="centerNavWrap"><div class="TabWrap"><div id="NarrowWrap">');
		divContent = document.getElementById("custom1");
		if(divContent){
			windowObject.document.writeln('<div id="custom1">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		
		divContent = document.getElementById("printOverview");
		if(divContent){
				windowObject.document.writeln('<div id="Overview"><h2 class="offLeft">Overview</h2><div class="SubTabs" class="demoWidget">');
				windowObject.document.writeln(divContent.innerHTML); 
				
				divContent = document.getElementById("AboutTheProduct");
				if(divContent){
					windowObject.document.writeln('<div id="AboutTheProduct" class="c3_wrap_long">');
					windowObject.document.writeln(divContent.innerHTML); 
					windowObject.document.writeln('</div>');
				}
				divContent = document.getElementById("Features");
				if(divContent){
					windowObject.document.writeln('<div id="Features">');
					windowObject.document.writeln(divContent.innerHTML); 
					windowObject.document.writeln('</div>');
				}
				divContent = document.getElementById("ReviewersQuotes");
				if(divContent){
					windowObject.document.writeln('<div id="ReviewersQuotes">');
					windowObject.document.writeln(divContent.innerHTML); 
					windowObject.document.writeln('</div>');
				}
				divContent = document.getElementById("AboutTheAuthor");
				if(divContent){
					windowObject.document.writeln('<div id="AboutTheAuthor">');
					windowObject.document.writeln(divContent.innerHTML); 
					windowObject.document.writeln('</div>');
				}
							
				windowObject.document.writeln('</div></div>');
		}
		divContent = document.getElementById("TableofContents");
		if(divContent){
			windowObject.document.writeln('<div id="TableofContents">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		divContent = document.getElementById("NewToThisEdition");
		if(divContent){
			windowObject.document.writeln('<div id="NewToThisEdition">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		divContent = document.getElementById("AlternateFormats");
		if(divContent){
			windowObject.document.writeln('<div id="AlternateFormats">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		divContent = document.getElementById("Supplements");
		if(divContent){
			windowObject.document.writeln('<div id="Supplements">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		divContent = document.getElementById("BestBuyPackages");
		if(divContent){
			windowObject.document.writeln('<div id="BestBuyPackages">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		divContent = document.getElementById("RelatedLinks");
		if(divContent){
			windowObject.document.writeln('<div id="RelatedLinks">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
		
		divContent = document.getElementById("custom2");
		if(divContent){
			windowObject.document.writeln('<div id="custom2">');
			windowObject.document.writeln(divContent.innerHTML); 
			windowObject.document.writeln('</div>');
		}
					
		windowObject.document.writeln('</div></div></div></div>');		
		windowObject.document.writeln('</div>\n</div>');	
		windowObject.document.writeln('</div>\n<div id="footer_include"></div><div id="metrics_include"></div></BODY>\n</HTML>');		
		windowObject.document.close();
		windowObject.focus();
		windowObject.print();  
	}
