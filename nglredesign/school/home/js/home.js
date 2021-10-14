function initcarousel(){
	var owl = $('.owl-carousel');

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
	$('.customNextBtn').click(function() {
	    owl.trigger('next.owl.carousel');
	})
	// Go to the previous item
	$('.customPrevBtn').click(function() {
	    owl.trigger('prev.owl.carousel', [300]);
	})
}