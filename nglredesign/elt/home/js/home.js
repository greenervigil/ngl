function initcarousel(){
	var owl = $('#superHeroContainer');
	console.log('elt home');
	owl.owlCarousel({
		/*autoplay: 1000, //Set AutoPlay to 3 seconds
		autoplayHoverPause: true,*/
		navText: [
		"<a class='left carousel-control'><i class='fa fa-angle-left'></i></a>",
		"<a class='right carousel-control'><i class='fa fa-angle-right'></i></a>"
		],
		responsiveClass:true,
		responsive:{
		    0:{
		        items:1,
		        loop:$("#superHeroContainer > .item").length <= 1 ? false : true,
		        nav: $("#superHeroContainer > .item").length <= 1 ? false : true,
		    },
		    768:{
		        items: 1,
		        loop:$("#superHeroContainer > .item").length <= 1 ? false : true,
		        nav: $("#superHeroContainer > .item").length <= 1 ? false : true,
		    },
		    992:{
		        items:1,
		        loop:$("#superHeroContainer > .item").length <= 1 ? false : true,
		        nav: $("#superHeroContainer > .item").length <= 1 ? false : true,
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

/*setTimeout(function(){
	initcarousel();
},1250);*/
