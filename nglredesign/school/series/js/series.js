function relatedProgram(){
	var owl = $('#relatedProgramsContainer');

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
		        loop:$("#relatedProgramsContainer > .item").length <= 1 ? false : true,
		        nav: $("#relatedProgramsContainer > .item").length <= 1 ? false : true,
		    },
		    768:{
		        items: 2,
		        loop:$("#relatedProgramsContainer > .item").length <= 2 ? false : true,
		        nav: $("#relatedProgramsContainer > .item").length <= 2 ? false : true,
		    },
		    992:{
		        items:3,
		        loop:$("#relatedProgramsContainer > .item").length <= 3 ? false : true,
		        nav: $("#relatedProgramsContainer > .item").length <= 3 ? false : true,
		    }
		}
	});

	// Go to the next item
	$('#relatedProgramsContainer .customNextBtn').click(function() {
	    owl.trigger('next.owl.carousel');
	})
	// Go to the previous item
	$('#relatedProgramsContainer .customPrevBtn').click(function() {
	    owl.trigger('prev.owl.carousel', [300]);
	})
}

function seelevelCarousel(){
	var owl = $('#seeLevelContainer');

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
		        loop:$("#seeLevelContainer > .item").length <= 1 ? false : true,
		        nav: $("#seeLevelContainer > .item").length <= 1 ? false : true,
		    },
		    768:{
		        items: 2,
		        loop:$("#seeLevelContainer > .item").length <= 2 ? false : true,
		        nav: $("#seeLevelContainer > .item").length <= 2 ? false : true,
		    },
		    992:{
		        items:3,
		        loop:$("#seeLevelContainer > .item").length <= 3 ? false : true,
		        nav: $("#seeLevelContainer > .item").length <= 3 ? false : true,
		    }
		}
	});

	// Go to the next item
	$('#seeLevelContainer .customNextBtn').click(function() {
	    owl.trigger('next.owl.carousel');
	})
	// Go to the previous item
	$('#seeLevelContainer .customPrevBtn').click(function() {
	    owl.trigger('prev.owl.carousel', [300]);
	})
}

function initcarousel(){
	relatedProgram();
	seelevelCarousel();
}

setTimeout(function(){

	if( $('#seriesBanner').hasClass( "noimage" ) ){
		var bannerHeight = $( ".heroOverlay" ).height()+"px";
		$("#seriesBanner").animate({ height: bannerHeight});
	}
	
	$(function() {
	  $('#programInfoMenucontainer a[href*="#"]:not([href="javascript:void(0);"])').click(function() {

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

	/*-- COLLAPE MENU--*/
	$("#programInfoMenucontainer li a").on("click", function(e){
		var checkCollapse = $(this).attr("data-toggle");
		
		if( checkCollapse != "collapse"){
			$("#programInfoMenucontainer").collapse("hide");
		}
	});

	$("html").on("click", function(e){
		/*console.log(e);*/
		var target = $(e.target);
		$("#programInfoMenuMainContainer .collapse").each(function(){
		  if(!$(e.target).parents(".collapse").is(this) && !$(e.target).is(this) && ($(this).hasClass('"collapsing') || ($(this).hasClass('collapse') && $(this).hasClass('in')))){
		    $(this).collapse("toggle");
		    var id = $("[data-target=#" + $(this).attr("id") + "]");
		    id.addClass("collapsed");
		  }
		});
	});  
		
},1000);