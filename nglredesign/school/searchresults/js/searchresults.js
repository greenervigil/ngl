$("html").on("click", function(e){
	var target = $(e.target);
	$("#filterMenuMainContainer .collapse").each(function(){
	  if(!$(e.target).parents(".collapse").is(this) && !$(e.target).is(this) && ($(this).hasClass('"collapsing') || ($(this).hasClass('collapse') && $(this).hasClass('in')))){
	    $(this).collapse("toggle");
	    var id = $("[data-target=#" + $(this).attr("id") + "]");
	    id.addClass("collapsed");
	  }
	});
});


/* show/hide for series search result page */
$(".seriesSearchResultShowHideIcon").on("click", function(e){
	if($("#searchresultsSeries").hasClass("show")){
		$("#searchresultsSeries").removeClass("show");
		$("#searchresultsSeries").addClass("hide");	
		$(".seriesSearchResultShowHideIcon").addClass("collapsed");	
	}else{
		$("#searchresultsSeries").removeClass("hide");
		$("#searchresultsSeries").addClass("show");	
		$(".seriesSearchResultShowHideIcon").removeClass("collapsed");
	}

});

/* show/hide for prouct search result page */
$(".productSearchResultShowHideIcon").on("click", function(e){
	if($("#searchresultsSingleItem").hasClass("show")){
		$("#searchresultsSingleItem").removeClass("show");
		$("#searchresultsSingleItem").addClass("hide");	
		$(".productSearchResultShowHideIcon").addClass("collapsed");	
	}else{
		$("#searchresultsSingleItem").removeClass("hide");
		$("#searchresultsSingleItem").addClass("show");	
		$(".productSearchResultShowHideIcon").removeClass("collapsed");
	}

});



function addConainer(){
	$(".heroOverlayText").addClass('container');
}

function getSeriesBannerImg(){
	var imageUrl = $.trim($(".superheroImg").attr("src"));
	if( imageUrl!= ""){
		console.log(imageUrl);
		$('#seriesBanner').css('background-image', 'url("' + imageUrl + '")');
	}
}

/*$(document).on("click", '.searchMenuMoreLink', function(){
	var menuListId = $(this).closest('ul').attr('id');
	var innerHtml = '<li class="searchMenuLessLink searchResultRefinements" ><a href="#"><span class="menuLinksText">Show Less Refinements...</span></a></li>';
	$('ul#'+menuListId+' li:last').after(innerHtml);
	$('ul#'+menuListId).removeClass("searchMenuOverflowHidden");
	$(this).addClass("searchMenuHideLink");
});

$(document).on("click", '.searchMenuLessLink', function(){
	var menuListId = $(this).closest('ul').attr('id');
	var innerHtml = '<li class="searchMenuMoreLink searchResultRefinements" ><a href="#"><span class="menuLinksText">Show More Refinements...</span></a></li>';
	$('ul#'+menuListId+' li:eq(10)').before(innerHtml);
	$('ul#'+menuListId).addClass("searchMenuOverflowHidden");
	$(this).addClass("searchMenuHideLink");
});

function searchMenuListHideShow(){
	$( 'ul#filterMenucontainer ul' ).each(function() {
		var menuListId  = $( this ).attr('id');
		var menuLength = $('ul#'+menuListId+' li').length;
		if (menuLength > 10) {
			var innerHtml = '<li class="searchMenuMoreLink searchResultRefinements" ><a href="#"><span class="menuLinksText">Show More Refinements...</span></a></li>';
			$('ul#'+menuListId+' li:eq(10)').before(innerHtml);
			$('ul#'+menuListId).addClass("searchMenuOverflowHidden");
		}
	  
	});	
}*/

addConainer();
getSeriesBannerImg();
/*searchMenuListHideShow();*/