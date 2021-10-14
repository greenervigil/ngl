  setTimeout(function(){

    $('.authorMoreBtn').click( function() {
		if( $(this).hasClass( "closed" ) ){
			$(this).removeClass( "closed" );
			$(this).prev( ".moreAuthorDescription" ).animate({ height: "100%"},"slow");
			$(this).html("less");
		}else{
			$(this).addClass( "closed" );
			$(this).prev( ".moreAuthorDescription" ).animate({ height: "108px"},"slow");
			$(this).html("...more");
		}
	}); 

	$('.tableOfContentsBtn').click( function() {
		if( $(this).hasClass( "closed" ) ){
			$(this).removeClass( "closed" );
			$(this).prev( ".tableOfContentsDescription" ).animate({ height: "100%"},"slow");
			$(this).html("less");
		}else{
			$(this).addClass( "closed" );
			$(this).prev( ".tableOfContentsDescription" ).animate({ height: "108px"},"slow");
			$(this).html("...more");
		}
	});
	
    /*-- COLLAPE MENU--*/

	$("html").on("click", function(e){
		var target = $(e.target);
		$("#productDetailsMenuMainContainer .collapse").each(function(){
		  if(!$(e.target).parents(".collapse").is(this) && !$(e.target).is(this) && ($(this).hasClass('"collapsing') || ($(this).hasClass('collapse') && $(this).hasClass('in')))){
		    $(this).collapse("toggle");
		    var id = $("[data-target=#" + $(this).attr("id") + "]");
		    id.addClass("collapsed");
		  }
		});
	});  

	$("#productDetailsMenucontainer li a").on("click", function(e){
		var checkCollapse = $(this).attr("data-toggle");
		
		if( checkCollapse != "collapse"){
			$("#productDetailsMenucontainer").collapse("hide");
		}
	});

	$(function() {
	  $('#productDetailsMenucontainer a[href*="#"]:not([href="javascript:void(0);"])').click(function() {

	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html, body').animate({
	          scrollTop: target.offset().top-115
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});


/*function swapCompanionText(){
	$("#companionSiteSubmenu1 .productDetailsPadding li").each(function(){
		var companionMenuItem = $(this).children('a').children('span').text();
		if(companionMenuItem.indexOf('Teacher') > -1){
			$(this).children('a').children('span').text("Student companion site");
		}
		if(companionMenuItem.indexOf('Student') > -1){
			$(this).children('a').children('span').text("Teacher companion site");
		}
	})
}

swapCompanionText();*/

 },1000);   

function initcarousel(){
	productScroll();
	relatedProgramScroll();
}

function productScroll(){
	var owl = $('#productScrollContainer');

	owl.owlCarousel({
		//autoPlay: 3000, //Set AutoPlay to 3 seconds
		navText: [
		"<a class='left carousel-control'><i class='fa fa-angle-left'></i></a>",
		"<a class='right carousel-control'><i class='fa fa-angle-right'></i></a>"
		],
		responsiveClass:true,
		responsive:{
		    0:{
		        items:1,
		        loop:$("#productScrollContainer > .item").length <= 1 ? false : true,
		        nav: $("#productScrollContainer > .item").length <= 1 ? false : true,
		    },
		    768:{
		        items: 2,
		        loop:$("#productScrollContainer > .item").length <= 2 ? false : true,
		        nav: $("#productScrollContainer > .item").length <= 2 ? false : true,
		    },
		    992:{
		        items:3,
		        loop:$("#productScrollContainer > .item").length <= 3 ? false : true,
		        nav: $("#productScrollContainer > .item").length <= 3 ? false : true,
		    }
		}
	});

	// Go to the next item
	$('#productScrollContainer .customNextBtn').click(function() {
	    owl.trigger('next.owl.carousel');
	})
	// Go to the previous item
	$('#productScrollContainer .customPrevBtn').click(function() {
	    owl.trigger('prev.owl.carousel', [300]);
	})
}

function relatedProgramScroll(){
	var owl = $('#relatedProgramCarouselContainer');

	owl.owlCarousel({
		//autoPlay: 3000, //Set AutoPlay to 3 seconds
		navText: [
		"<a class='left carousel-control'><i class='fa fa-angle-left'></i></a>",
		"<a class='right carousel-control'><i class='fa fa-angle-right'></i></a>"
		],
		responsiveClass:true,
		responsive:{
		    0:{
		        items:1,
		        loop:$("#relatedProgramCarouselContainer > .item").length <= 1 ? false : true,
		        nav: $("#relatedProgramCarouselContainer > .item").length <= 1 ? false : true,
		    },
		    768:{
		        items: 2,
		        loop:$("#relatedProgramCarouselContainer > .item").length <= 2 ? false : true,
		        nav: $("#relatedProgramCarouselContainer > .item").length <= 2 ? false : true,
		    },
		    992:{
		        items:3,
		        loop:$("#relatedProgramCarouselContainer > .item").length <= 3 ? false : true,
		        nav: $("#relatedProgramCarouselContainer > .item").length <= 3 ? false : true,
		    }
		}
	});

	// Go to the next item
	$('#relatedProgramCarouselContainer .customNextBtn').click(function() {
	    owl.trigger('next.owl.carousel');
	})
	// Go to the previous item
	$('#relatedProgramCarouselContainer .customPrevBtn').click(function() {
	    owl.trigger('prev.owl.carousel', [300]);
	})
}