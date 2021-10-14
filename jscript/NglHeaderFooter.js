// you need to have the fol;owing plugin's linked up in your page.
// they are on trhe cdn here at these addresses. 


$(document).ready(function(){
		// header and footer Jacascript file for making the cengage header and footer work corectly this has the following jquerry files combined in to this one: 
		// superfish.js
		//jquery.font.Resize.js
		//
	
			
	// navagtion includes for the home page	these allow the files to be loaded and eenif there are no server side incldes	
	$("#header_include").load("/static/cengage/header.tmpl");	
	$("#footer_include").load("/static/cengage/footer.tmpl");	
//	$("#metrics_include").load("/static/cengage/metrics.tmpl");
	
		
	$('ul.sf-menu').superfish(
	 //hoverClass:    'sfHover',          // the class applied to hovered list items 
	 //pathClass:     'overideThisToUse', // the class you have applied to list items that lead to the current page 
	 //pathLevels:    1  
	);

	$('.sub-container').css({'width' : '975px'});
	$('.row').css({'width' : '975px'});

	$('#fontSize').fontResize();	


	
// these are the beheivhaors for the search box

		/*set up behavior of the search text box*/
		var defaultValue='Search entire catalog by author, title, keyword or ISBN';
		$('#search_text').focus(function(){
			if(this.value==defaultValue){this.value='';}
		});
/*temporary, to remove with the next build*/
		$('input[name=Ns]').remove();
		$('#search_text').blur(function(){
			if($.trim(this.value)==''){this.value=defaultValue;}
		});
		
		/*add lightbox feature to the frontdoor login*/
		
	// this aprently does not work on the market segment pages in page builder it has to be called in the MarketSegment.js file. leaving here so that it wrorks on the product pages which it does. 	
	$("#signin a.pub_list").fancybox({
			'hideOnContentClick': false, 
			'frameWidth':475,
			'frameHeight':500
			}); 	


	//	$('.pub_list').openDOMWindow({ 
	//		height:300, 
	//		width:475, 
	//		eventType:'click', 
	//		windowSource:'ajax', 
	//		windowHTTPType:'post' 
	//	});

		var nUrl = $.url.param("N");
		var nMatches = nUrl.match(/(0|14|15|16)/i);
		if(nMatches[1].length > 0){$("#N").val(nMatches[1]);}
	

		/*form submit behavior*/
//		$("#submit_button_header").click(function(){
//			
//			var n = validateISBN2($.trim($("#search_text").val()));
//			if (n[0]==true){$('#search_text').val(n[1]);}
//			var q = $('#search_text').val().replace(/^\s+|\s+$/g,'');
//			if (q==null || q.length== 0 ||q =='Enter author, title or keyword')
//				return false;
//			else{
//				$('#search_text').val(q);
//				$('#CenSearch').submit();
//				}
						
//		});

var addthis_config =
  {
    pubid: 'clwebmktgja',
	services_exclude: 'more',
	data_track_clickback: 'true'
  }

 /*  clear form */

function clearDefault(el) {
  if (el.defaultValue==el.value) el.value = ""
}

		/*form submit behavior*/
function headSearch(){
		var n = validateISBN2($.trim($("#search_text").val()));
			if (n[0]==true){$('#search_text').val(n[1]);}
			var q = $('#search_text').val().replace(/^\s+|\s+$/g,'');
			if (q==null || q.length== 0 ||q =='Enter author, title or keyword')
				return false;
			else{
				$('#search_text').val(q);
				$('#CenSearch').submit();
				}
}
	
	
});
// you need to have the fol;owing plugin's linked up in your page.
// they are on trhe cdn here at these addresses. 


$(document).ready(function(){
		// header and footer Jacascript file for making the cengage header and footer work corectly this has the following jquerry files combined in to this one: 
		// superfish.js
		//jquery.font.Resize.js
		//
	
			
	// navagtion includes for the home page	these allow the files to be loaded and eenif there are no server side incldes	
	$("#header_include").load("/static/cengage/header.tmpl");	
	$("#footer_include").load("/static/cengage/footer.tmpl");	
//	$("#metrics_include").load("/static/cengage/metrics.tmpl");
	
		
	$('ul.sf-menu').superfish(
	 //hoverClass:    'sfHover',          // the class applied to hovered list items 
	 //pathClass:     'overideThisToUse', // the class you have applied to list items that lead to the current page 
	 //pathLevels:    1  
	);

	$('.sub-container').css({'width' : '975px'});
	$('.row').css({'width' : '975px'});

	$('#fontSize').fontResize();	


	
// these are the beheivhaors for the search box

		/*set up behavior of the search text box*/
		var defaultValue='Search entire catalog by author, title, keyword or ISBN';
		$('#search_text').focus(function(){
			if(this.value==defaultValue){this.value='';}
		});
/*temporary, to remove with the next build*/
		$('input[name=Ns]').remove();
		$('#search_text').blur(function(){
			if($.trim(this.value)==''){this.value=defaultValue;}
		});
		
		/*add lightbox feature to the frontdoor login*/
		
	// this aprently does not work on the market segment pages in page builder it has to be called in the MarketSegment.js file. leaving here so that it wrorks on the product pages which it does. 	
	$("#signin a.pub_list").fancybox({
			'hideOnContentClick': false, 
			'frameWidth':475,
			'frameHeight':500
			}); 	


	//	$('.pub_list').openDOMWindow({ 
	//		height:300, 
	//		width:475, 
	//		eventType:'click', 
	//		windowSource:'ajax', 
	//		windowHTTPType:'post' 
	//	});

		var nUrl = $.url.param("N");
		var nMatches = nUrl.match(/(0|14|15|16)/i);
		if(nMatches[1].length > 0){$("#N").val(nMatches[1]);}
	

		/*form submit behavior*/
//		$("#submit_button_header").click(function(){
//			
//			var n = validateISBN2($.trim($("#search_text").val()));
//			if (n[0]==true){$('#search_text').val(n[1]);}
//			var q = $('#search_text').val().replace(/^\s+|\s+$/g,'');
//			if (q==null || q.length== 0 ||q =='Enter author, title or keyword')
//				return false;
//			else{
//				$('#search_text').val(q);
//				$('#CenSearch').submit();
//				}
						
//		});

var addthis_config =
  {
    pubid: 'clwebmktgja',
	services_exclude: 'more',
	data_track_clickback: 'true'
  }

 /*  clear form */

function clearDefault(el) {
  if (el.defaultValue==el.value) el.value = ""
}

		/*form submit behavior*/
function headSearch(){
		var n = validateISBN2($.trim($("#search_text").val()));
			if (n[0]==true){$('#search_text').val(n[1]);}
			var q = $('#search_text').val().replace(/^\s+|\s+$/g,'');
			if (q==null || q.length== 0 ||q =='Enter author, title or keyword')
				return false;
			else{
				$('#search_text').val(q);
				$('#CenSearch').submit();
				}
}
	
	
});
