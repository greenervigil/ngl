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
	
	String.prototype.toTitleCase = function(){	
	    return this.replace(/([^\W_]+[^\s-]|[^\,]*) */g, function(match) {	    	
	        return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();	        
	    });
	}

	String.prototype.formatPhoneNumber = function(){		
	  var s2 = (""+this).replace(/\D/g, '');	  
	  var m = s2.match(/^(\d{3})(\d{3})(\d{4})|(\d{4})$/);
	  if (s2.length == 10) {
	  	return (!m) ? null : m[1] + "-" + m[2] + "-" + m[3];
	  }else{
	  	return (!m) ? null : m[1] + "-" + m[2] + "-" + m[3]+" ext. "+s2.substring(10);
	  }
	  
	}

	$( document ).ready(function() {
		var stateurl = window.location.href;		
		var stateFromPath = stateurl.substr(stateurl.lastIndexOf('/') + 1);
		
		var user = 'finder';
		var pass = 'finderPassword';
	   $.ajax({
	    	/*url: "https://sites.cengage.com/repfinder/SalesRepSearch.asmx/GetNatGeoRepsByState?state="+stateFromPath, */			
			url: "https://www.cengage.com/repfinder/api/natgeoreps/"+stateFromPath,
			type: "GET",    
			dataType: "json",
			crossDomain: true,			                    
			async: false,
			beforeSend: function (xhr) {
				xhr.setRequestHeader ("Authorization", "Basic "+btoa(user+':'+pass));
			},
	    	success: function(result){							
	    		var totalCount = result.length;	        	
	        	var innerHtml = '<div class="row">';
	        	var count = 1;
	        	var ResponsibilityArr = ['School K-8','School K-12','Grades K-12','School 9-12'];
				$.each(ResponsibilityArr , function(index, val) {
					$.each(result, function( key, value ) {					 
						
					if((value.Responsibility.indexOf(val) > -1 || value.Responsibility == "") &&  value.InsideField == "Field"){			
	        						     		
		        		var gradeName = (val == 'Grades K-12') ? 'School K-12': val;						
		        		var name = value.Name;
		        		var email = value.Email;
						var phone = value.Phone;
						if(phone!=""){
		        		phone = value.Phone.formatPhoneNumber();
						}
		        		var country = value.County;	        		
		        		country = country.toTitleCase();
		        		country = country.replace(/^,/, '').replace(/\s*,\s*/g, ", ");
		        		innerHtml += '<div class="block"><p class="gradeName">'+gradeName+'</p><a href="mailto:'+email+'" class="salesConsultantsEmail">'+name+'</a><p class="salesConsultantsNumber">'+phone+'</p><p class="salesConsultantsCountry"><span>+</span> Counties</p><p class="salesConsultantsCountryToggle">'+country+'</p></div>';
		        		
		        		if ( (count%3) == 0 && ( count != totalCount ) ) {
		        			innerHtml += '</div> <div class="row">';	
		        		}else if ( count == totalCount){
	        				innerHtml += '</div>';
		        		}

	        			count += 1;
        			} 
					});
				});
				
	        	$('.salesConsultants-block').html(innerHtml);
	    	}
	    });

	    $('.salesConsultantsCountryToggle').hide();
	    $(document).on('click','.salesConsultantsCountry',function(e){
	        e.preventDefault();
	        var elem = $(this).next('.salesConsultantsCountryToggle');
	        $('.salesConsultantsCountryToggle').not(elem).hide();
	        elem.toggle();	   
	        var signelem = $('span',this);
	        $('.salesConsultantsCountry span').not(signelem).text('+');
	        $('span',this).text(function(i,txt) {	        	
	        	return txt === "+" ? "-" : "+";
	    	});
	    });

	});
},1000);