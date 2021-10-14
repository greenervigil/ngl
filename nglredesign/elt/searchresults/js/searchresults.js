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

function addConainer(){
	$(".heroOverlayText").addClass('container');
}

function getSeriesBannerImg(){
	var imageUrl = $.trim($(".superheroImg").attr("src"));
	if( imageUrl!= ""){
		$('#seriesBanner').css('background-image', 'url("' + imageUrl + '")');
	}
}

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

function initcarousel(){	
	var owl = $('#recordCarouselContainer');

	owl.owlCarousel({
		autoPlay: false, //Set AutoPlay to 3 seconds		
		navText: [
		"<a class='left carousel-control'><i class='fa fa-angle-left'></i></a>",
		"<a class='right carousel-control'><i class='fa fa-angle-right'></i></a>"
		],		
		responsiveClass:true,
		responsive:{
		    0:{
		        items:1,
		        loop:$("#recordCarouselContainer > .item").length <= 1 ? false : true,
		        nav: $("#recordCarouselContainer > .item").length <= 1 ? false : true,		        
		    },
		    768:{
		        items: 2,
		        loop:$("#recordCarouselContainer > .item").length <= 2 ? false : true,
		        nav: $("#recordCarouselContainer > .item").length <= 2 ? false : true,
		        margin:30
		    },
		    992:{
		        items:3,
		        loop:$("#recordCarouselContainer > .item").length <= 3 ? false : true,
		        nav: $("#recordCarouselContainer > .item").length <= 3 ? false : true,
		        margin:30
		    }
		}
		
	});

	// Go to the next item
	$('.customNextBtn').click(function() {
	    owl.trigger('next.owl.carousel');
	})
	// Go to the previous item
	$('.customPrevBtn').click(function() {
	    owl.trigger('prev.owl.carousel', [300]);
	})
}

//initcarousel();