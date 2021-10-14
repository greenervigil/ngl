function f_clientWidth()
{
	var myWidth = 0;

	//Non-IE
	if ( typeof( window.innerWidth ) == 'number' )
    	myWidth = window.innerWidth;
    //IE 6+ in 'standards compliant mode'
	else if ( document.documentElement && document.documentElement.clientWidth )
		myWidth = document.documentElement.clientWidth;
    //IE 4 compatible
	else if ( document.body && document.body.clientWidth )
		myWidth = document.body.clientWidth;

	return myWidth;

	return f_filterResults (
		window.innerWidth ? window.innerWidth : 0,
		document.documentElement ? document.documentElement.clientWidth : 0,
		document.body ? document.body.clientWidth : 0
	);
}
function f_clientHeight()
{
	var myHeight = 0;

    //Non-IE
	if ( typeof( window.innerWidth ) == 'number' )
		myHeight = window.innerHeight;
    //IE 6+ in 'standards compliant mode'
	else if ( document.documentElement && document.documentElement.clientHeight )
		myHeight = document.documentElement.clientHeight;
    //IE 4 compatible
	else if ( document.body && document.body.clientHeight )
		myHeight = document.body.clientHeight;

	return myHeight;

	return f_filterResults (
		window.innerHeight ? window.innerHeight : 0,
		document.documentElement ? document.documentElement.clientHeight : 0,
		document.body ? document.body.clientHeight : 0
	);
}
function f_filterResults(n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function f_scrollTop() {
	return f_filterResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
}

function f_wPadding(obj)
{
	if ( obj.currentStyle ) //IE
		return parseInt(obj.currentStyle.paddingLeft) + parseInt(obj.currentStyle.paddingRight);
	else if ( window.getComputedStyle ) //W3C
		return parseInt(window.getComputedStyle(obj,"").getPropertyValue("padding-left")) + parseInt(window.getComputedStyle(obj,"").getPropertyValue("padding-right")) + parseInt(window.getComputedStyle(obj,"").getPropertyValue("margin-left")) + parseInt(window.getComputedStyle(obj,"").getPropertyValue("margin-right"));
}

function f_hPadding(obj)
{
	if ( obj.currentStyle ) //IE
		return parseInt(obj.currentStyle.paddingTop) + parseInt(obj.currentStyle.paddingBottom);
	else if ( window.getComputedStyle ) //W3C
		return parseInt(window.getComputedStyle(obj,"").getPropertyValue("padding-top")) + parseInt(window.getComputedStyle(obj,"").getPropertyValue("padding-bottom"));
}

function OpenModalPopup(flvFile)
{
	var w = f_clientWidth();
	var h = f_clientHeight();
    document.getElementById ('ModalPopupDiv').style.visibility='visible';
    document.getElementById ('ModalPopupDiv').style.display='';
//    document.getElementById ('ModalPopupDiv').style.top= Math.round ((document.documentElement.clientHeight/2)+ document.documentElement.scrollTop)-240 + 'px';
//    document.getElementById ('ModalPopupDiv').style.left=Math.round ((document.documentElement.clientWidth/2)+ document.documentElement.scrollTop)-320 + 'px';
    document.getElementById ('ModalPopupDiv').style.top= Math.round ((h/2)-240)+f_scrollTop() + 'px';
    document.getElementById ('ModalPopupDiv').style.left=Math.round (w/2)-320 + 'px';

    document.getElementById ('MaskedDiv').style.display='';
    document.getElementById ('MaskedDiv').style.visibility='visible';

    document.getElementById ('MaskedDiv').style.top='0px';
    document.getElementById ('MaskedDiv').style.left='0px';
	var wPadding = f_wPadding(document.getElementById ('MaskedDiv'));
	var hPadding = f_hPadding(document.getElementById ('MaskedDiv'));
    document.getElementById ('MaskedDiv').style.width= (w - wPadding) + 'px';
    document.getElementById ('MaskedDiv').style.height= ((h+f_scrollTop()) - hPadding)+ 'px';
//    document.getElementById ('MaskedDiv').style.width=  document.documentElement.clientWidth + 'px';
//    document.getElementById ('MaskedDiv').style.height= document.documentElement.clientHeight+ 'px';
//    document.getElementById ('MaskedDiv').style.width= (w - 100) + 'px';
//    document.getElementById ('MaskedDiv').style.height= ((h+ f_scrollTop()) - 100)+ 'px';

	var c = document.getElementById("mycontent");
	if (!c)
	{
		var d = document.createElement("div");
		d.setAttribute("id", "mycontent");
		document.getElementById("mycontent-container").appendChild(d);
	}

//	flvFile = "/DotNetNuke/Portals/0/Video/" + flvFile;
//	var att = { data:flvFile, width:"640", height:"480" };
//	var att = { width:"640", height:"480" };
//	var par = { menu:"true" };
	var id = "mycontent";

//	swfobject.createSWF(att, par, id);

	var flashvars            = {};
    flashvars.file       = flvFile;
	flashvars.autostart  = 'true';
    
    var params               = {};
    params.allowfullscreen   = 'true'; 
    params.allowscriptaccess = 'never';
    params.menu              = 'false'; 
    params.bufferlength      = '10';

    var attributes           = {};
    attributes.id            = 'player';  
    attributes.name          = 'player';

	var width                = '100%';
	var height               = '100%';

	if ( !BrowserSupportsPercentage() )
	{
		width = '600';
		height = '400';
	}

	swfobject.embedSWF('http://www.ngspvideo.com/mediaplayer/player.swf', id, width, height, '9.0.115', false, flashvars, params, attributes);
}

function BrowserSupportsPercentage()
{
	return 0;
	if ( navigator.userAgent.indexOf("MSIE 8") != -1 )
		return 1;
	if ( navigator.userAgent.indexOf("Firefox") != -1 )
		return 0;
	if ( navigator.userAgent.indexOf("MSIE") != -1 )
		return 0;

	return 1;
}

function CloseModalPopup()
{
	swfobject.removeSWF("mycontent");
	document.getElementById("mycontent-container").innerHTML = "<DIV id=mycontent></DIV>";
    document.getElementById ('MaskedDiv').style.display='none';
    document.getElementById ('ModalPopupDiv').style.display='none';
}
    
function OpenModalHelp()
{        
	var tblBody = document.getElementById('helpTbl').tBodies[0];

	if ( tblBody.rows.length == 0 )
	{
		var tn;
		var newRow = tblBody.insertRow(-1);
		var newCell = newRow.insertCell(0);

		newCell.appendChild(document.createTextNode('System requirements:'));
		newCell.colSpan = 3;

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell.colSpan = 3;

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = '<b>Windows</b>';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'Minumum OS';
		newCell = newRow.insertCell(2);
		newCell.innerHTML ='Windows XP&reg; with SP3';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'Processor speed';
		newCell = newRow.insertCell(2);
		newCell.innerHTML ='Pentium III 667 MHz or equivalent processor';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'RAM';
		newCell = newRow.insertCell(2);
		newCell.innerHTML ='256 MB RAM';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'Screen display';
		newCell = newRow.insertCell(2);
		newCell.innerHTML ='1024 x 768 resolution, 16-bit color';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'Web Browser';
		newCell = newRow.insertCell(2);
		newCell.innerHTML ='Internet Explorer 6.0, 7.0, 8.0 or Firefox 2, 3 or 3.5 or Google Chrome';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell.colSpan = 3;

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = '<b>Macintosh</b>';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'Minumum OS';
		newCell = newRow.insertCell(2);
		newCell.innerHTML ='OS 10.4.11';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'Processor speed';
		newCell = newRow.insertCell(2);
		newCell.innerHTML ='G4 processor, 500 MHz';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'RAM';
		newCell = newRow.insertCell(2);
		newCell.innerHTML ='512 MB RAM';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'Screen display';
		newCell = newRow.insertCell(2);
		newCell.innerHTML ='1024 x 768 resolution, 16-bit color';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'Web Browser';
		newCell = newRow.insertCell(2);
		newCell.innerHTML ='Safari 3.0, 4.0 or Firefox 2, 3 or 3.5';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell.colSpan = 3;

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = '<b>Other</b>';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'Internet connection';
		newCell = newRow.insertCell(2);
		newCell.innerHTML ='768 Kbps connection; 10/100 Mb Ethernet LAN port (minimum)';

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'QuickTime 7.6 plugin (required for the Tour)';
		newCell.colSpan = 3;

		newRow = tblBody.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = 'Adobe Acrobat Reader 9 plugin (required for the PDFs)';
		newCell.colSpan = 3;
	}

	var w = f_clientWidth();
	var h = f_clientHeight();

    document.getElementById ('ModalHelpDiv').style.visibility='visible';
    document.getElementById ('ModalHelpDiv').style.display='';
//    document.getElementById ('ModalHelpDiv').style.top= Math.round ((document.documentElement.clientHeight/2)+ document.documentElement.scrollTop)-240 + 'px';
//    document.getElementById ('ModalHelpDiv').style.left=Math.round ((document.documentElement.clientWidth/2)+ document.documentElement.scrollTop)-320 + 'px';
    document.getElementById ('ModalHelpDiv').style.top= Math.round ((h/2)-240)+f_scrollTop() + 'px';
    document.getElementById ('ModalHelpDiv').style.left=Math.round (w/2)-320 + 'px';

    document.getElementById ('MaskedDiv').style.display='';
    document.getElementById ('MaskedDiv').style.visibility='visible';
    document.getElementById ('MaskedDiv').style.top='0px';
    document.getElementById ('MaskedDiv').style.left='0px';
	var wPadding = f_wPadding(document.getElementById ('MaskedDiv'));
	var hPadding = f_hPadding(document.getElementById ('MaskedDiv'));
    document.getElementById ('MaskedDiv').style.width= (w - wPadding) + 'px';
    document.getElementById ('MaskedDiv').style.height= ((h+f_scrollTop()) - hPadding)+ 'px';
//    document.getElementById ('MaskedDiv').style.width=  document.documentElement.clientWidth + 'px';
//    document.getElementById ('MaskedDiv').style.height= document.documentElement.clientHeight+ 'px';
//    document.getElementById ('MaskedDiv').style.width= (w - 100) + 'px';
//    document.getElementById ('MaskedDiv').style.height= ((h+ f_scrollTop()) - 100)+ 'px';
}

function CloseModalHelp()
{
    document.getElementById ('MaskedDiv').style.display='none';
    document.getElementById ('ModalHelpDiv').style.display='none';
}
    
function OpenTermsOfUse()
{ 
	var w = f_clientWidth();
	var h = f_clientHeight();

    document.getElementById ('ModalTermsDiv').style.visibility='visible';
    document.getElementById ('ModalTermsDiv').style.display='';
    document.getElementById ('ModalTermsDiv').style.top= 50 + f_scrollTop() + 'px';
    document.getElementById ('ModalTermsDiv').style.left=Math.round (w/2)-320 + 'px';
    document.getElementById ('TermsOfUse').style.height= (h - 125) + 'px';

    document.getElementById ('MaskedDiv').style.display='';
    document.getElementById ('MaskedDiv').style.visibility='visible';

    document.getElementById ('MaskedDiv').style.top='0px';
    document.getElementById ('MaskedDiv').style.left='0px';
	var wPadding = f_wPadding(document.getElementById ('MaskedDiv'));
	var hPadding = f_hPadding(document.getElementById ('MaskedDiv'));
    document.getElementById ('MaskedDiv').style.width= (w - wPadding) + 'px';
    document.getElementById ('MaskedDiv').style.height= ((h+f_scrollTop()) - hPadding)+ 'px';
    var url = "Portals/0/TermsOfUse.htm"
    xmlHttp = GetXmlHttpObject(stateChangeHandler); 
    xmlHttp_Get(xmlHttp, url); 
} 

function CloseTermsOfUse()
{
    document.getElementById ('MaskedDiv').style.display='none';
    document.getElementById ('ModalTermsDiv').style.display='none';
}
    
var xmlHttp; 
var is_ie = (navigator.userAgent.indexOf('MSIE') >= 0) ? 1 : 0; 
var is_ie5 = (navigator.appVersion.indexOf("MSIE 5.5")!=-1) ? 1 : 0; 
var is_opera = ((navigator.userAgent.indexOf("Opera6")!=-1)||(navigator.userAgent.indexOf("Opera/6")!=-1)) ? 1 : 0; 
//netscape, safari, mozilla behave the same??? 
var is_netscape = (navigator.userAgent.indexOf('Netscape') >= 0) ? 1 : 0; 

//stateChangeHandler will fire when the state has changed, i.e. data is received back 
// This is non-blocking (asynchronous) 
function stateChangeHandler() 
{ 
    //readyState of 4 or 'complete' represents that data has been returned 
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 'complete')
    { 
        //Gather the results from the callback 
        var str = xmlHttp.responseText; 

        //Populate the innerHTML of the div with the results 
        document.getElementById('TermsOfUse').innerHTML = str; 
    } 
} 

// XMLHttp send GET request 
function xmlHttp_Get(xmlhttp, url) 
{ 
    xmlhttp.open('GET', url, true); 
    xmlhttp.send(null); 
} 

// XMLHttp send GET request 
function xmlHttp_Post(xmlhttp, url) 
{ 
    xmlhttp.open('POST', url, true); 
    xmlhttp.send(null); 
} 

function GetXmlHttpObject(handler) 
{ 
    var objXmlHttp = null;    //Holds the local xmlHTTP object instance 

    //Depending on the browser, try to create the xmlHttp object 
    if (is_ie)
    { 
		try
		{
	        objXmlHttp = new XMLHttpRequest(); 
	        objXmlHttp.onreadystatechange = handler; 
		}
        catch(e)
        { 
	        //The object to create depends on version of IE 
	        //If it isn't ie5, then default to the Msxml2.XMLHTTP object 
	        var strObjName = (is_ie5) ? 'Microsoft.XMLHTTP' : 'Msxml2.XMLHTTP'; 
	         
	        //Attempt to create the object 
	        try
	        { 
	            objXmlHttp = new ActiveXObject(strObjName); 
	            objXmlHttp.onreadystatechange = handler; 
	        } 
	        catch(e)
	        { 
	        	//Object creation errored 
	            alert('IE detected, but object could not be created. Verify that active scripting and activeX controls are enabled'); 
	            return; 
	        } 
		}
    } 
    else if (is_opera)
    { 
        //Opera has some issues with xmlHttp object functionality 
        alert('Opera detected. The page may not behave as expected.'); 
        return; 
    } 
    else
    { 
        // Mozilla | Netscape | Safari 
        objXmlHttp = new XMLHttpRequest(); 
        objXmlHttp.onload = handler; 
        objXmlHttp.onerror = handler; 
    } 
     
    //Return the instantiated object 
    return objXmlHttp; 
} 
