// NGL's new code 

$(document).ready(function() {
// equlizes the heightts of the divs so they ware the same dispite the content. 
var $write14= $('<div id="RecordNum4" ><ul><li>1</li><li>to</li><li>3</li><li>of</li><li></li></ul></div>');
var $Xli= $('<li class="RSB_li">  </li>');
var $Xli2= $('<li class="RSB_li">  </li>');

var $write13= $('<div id="RecordNum3" ><ul><li>1</li><li>to</li><li>3</li><li>of</li><li></li></ul></div>');
var $X3li= $('<li class="RSB_li">  </li>');
var $X3li2= $('<li class="RSB_li">  </li>');

var $write12= $('<div id="RecordNum2" ><ul><li>1</li><li>to</li><li>3</li><li>of</li><li></li></ul></div>');
var $X2li= $('<li class="RSB_li">  </li>');
var $X2li2= $('<li class="RSB_li">  </li>');

var $write11= $('<div id="RecordNum" ><ul><li>1</li><li>to</li><li>3</li><li>of</li><li></li></ul></div>');
var $X1li= $('<li class="RSB_li">  </li>');
var $X1li2= $('<li class="RSB_li">  </li>');

	
// fixes chrome height bug on slideshow 
$(window).load(function() {
var RN1H=($('.RN1 >a >img').height());
//alert('RN1H is '+RN1H);
 $('.RotatingImage').height(RN1H);	
$('.RNImageSlides').height(RN1H);

}); 		
  
// fixes chrome height bug on slideshow
//$(window).load(function() {
//var SN1H=($('.f1 >a >img').height());
//alert('SN1H is '+SN1H);
//$('.slideWrap').height(SN1H);	
//$('.slideshow').height(SN1H);
//}); 		





	// navagtion includes for the home page		
//	$("#header_include").load("/static/ngl_header.tmpl");
		$("#header_include").load("http://s-cdn.cengage.com/static/cengage/header.html");
	$("#supperFish_include").load("/static/supperfishMega3.tmpl");	
	$("#footer_include").load("/static/ngl_footer.tmp");	
	$("#metrics_include").load("/static/metrics.tmpl");
	

//		$.cookie('the_cookie'); // => 'the_value'
//		$.cookie('countryName');
//		var COOK=($.cookie('countryName'));
			var $cook =($.cookie('countryName'));
//		alert('COOK is '+COOK); curntly this apears to not work when the alert is removed not sure why. 
			$('#country_links ul li').first().append($cook);


	// iniates the supper fish maega menue 
	
	$('ul.sf-menu').superfish(
		 //hoverClass:    'sfHover',          // the class applied to hovered list items 
		 //pathClass:     'overideThisToUse', // the class you have applied to list items that lead to the current page 
		 //pathLevels:    1  
		);
	// font resizer intator 	
	$('#fontSize').fontResize();	
	
	
	$('.sub-container').css({'width' : '975px'});
	$('.row').css({'width' : '975px'});
	
// sets the country value from cookie
	

// this initiates the RotatingBanner Cartridge 
$('.slideshow').after('<div class="SliderNavL" />').cycle({
	 fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
	 random: 1,
	 speed: 4000,
	 pause: 1, 
	 pagerAnchorBuilder: function(index, el) {return '<a href="#">&bull;</a>';},
         pager: '.SliderNavL'
	});


// this is the sam,e cartdige as on the landing page	
// right navagation cartidge slide show
	$('.RNImageSlides').after('<div class="SliderNav">').cycle({
	 fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
	 speed: 4000,
	 pause: 1, 
	 pagerAnchorBuilder: function(index, el) {return '<a href="#">&bull;</a>';},
         pager: '.SliderNav'
	});


// Start the block that drives the 4th record scrool banner 

// start the intal counts and set the varables for 
//var n_rsb4 = $("#mycarousel4 >li").size(); // Counts number of first child div in c1
var blockCount4 =(1);
// alert('blockCount is  '+blockCount4);
var ct4mod = $('#mycarousel4').children().size(); 

//alert('ct4mod is '+ct4mod);


if (ct4mod< 4){
//	alert('ct is less than 4');
	//var ct4a= (ct4 - 2)
//	 $('#RecordNum4 ul li').last().append(ct4mod);
	 
}else{

var mod4 =(ct4mod % 3);

switch (mod4)
{
case 0:
	  	  //	  	 do nothing 
  break;
case 1:// this writes 2 items to the ul to balance out the blocks in to groups of three 
//   	  alert('mod1 is '+ mod4);
 	  	 $('#mycarousel4 li').last().after($Xli);
	  	 $('#mycarousel4 li').last().after($Xli2);
	  	 var mod4Add =(2);
  break;
case 2: // this wirtes 1 item to the ul to balance out the blocks in to groups of three
//	alert('mod1 is '+ mod4);
	  	 $('#mycarousel4 li').last().after($Xli);
	  	 var mod4Add =(1);	
  break;  
default:// we dont know what this is 

}
};
// this calls the carrosell 

$('#mycarousel4').jcarousel({
        // Configuration goes here
});

//This writes the navagtion to the code
$('#RecordScrollBanner4 >div >div >div').before($write14);


// starts the second record scrool banner call r of first child div in c1
var ct4 = $('#mycarousel4').children().size(); 
var blocks4 =(ct4/3);
//alert('blocks4 is  '+blocks4);

if (ct4 > 3){
	var count4 = (3);

	//var ct4a= (ct4 - 2)
	 $('#RecordNum4 ul li').last().append(ct4mod);
	 
}else{ // if the record number is 2 then do this 

	switch(ct4)
		{
		case 1:
			$('#RecordScrollBanner4 >div').css('padding-left','214px');
			$('#RecordScrollBanner4 >div >div').css('width','300px');
		  break;
		case 2:
			$('#RecordScrollBanner4 >div').css('padding-left','135px');
			$('#RecordScrollBanner4 >div >div').css('width','300px'); 
		   break;
		default:

		}
	$('#RecordNum4').css('position','absolute').css('left','-2000px');
	$('#RecordScrollBanner4 #rsbPrev').css('position','absolute').css('left','-2000px');
	$('#RecordScrollBanner4 #rsbNext').css('position','absolute').css('left','-2000px');
};
	
	// increments the numbers up //
$('#RecordScrollBanner4 #rsbNext').click(function(){
			var count4 = parseFloat( $('#RecordNum4 ul li').first().html());
			var lastnum4 = parseFloat( $('#RecordNum4 ul li:nth-child(3)').html());
			
			blockCount4 ++; // incrments block count by 1 with every click
			
if (blockCount4 == blocks4){
// set max 1 to be 1 
var max4 =(1);

};

if (lastnum4 >= ct4){
// do nothing and set it so the switch is doing nothing  
var max4 =(0);
};
	
	switch(max4)
		{
	case 0:
	 break;
 	case 1:
			var count4d =(count4+3);
			
			$('#RecordNum4 ul li').first().replaceWith('<li></li>');
			$('#RecordNum4 ul li').first().append(count4d);

//			var count4d = parseFloat( $('#RecordNum4 ul li:nth-child(3)').html());
//			var count5d =(count4d+3);		

			$('#RecordNum4 ul li:nth-child(3)').replaceWith('<li></li>');
			$('#RecordNum4 ul li:nth-child(3)').append(ct4mod);

		break;
     default:
			var count4d =(count4+3);

			$('#RecordNum4 ul li').first().replaceWith('<li></li>');
			$('#RecordNum4 ul li').first().append(count4d);

			var count4d = parseFloat( $('#RecordNum4 ul li:nth-child(3)').html());
			var count5d =(count4d+3);		

			$('#RecordNum4 ul li:nth-child(3)').replaceWith('<li></li>');
			$('#RecordNum4 ul li:nth-child(3)').append(count5d);
		}
    
});

// incraements the numbers down //
$('#RecordScrollBanner4 #rsbPrev').click(function(){
// this resetes the call gloabal since the functions are not click independent. 			
if (blockCount4 == blocks4){
//  if these two gloabals are eq then we need max4 to be one for the switch  
var max4 =(1);
};

var countDownd = parseFloat( $('#RecordNum4 ul li').first().html());
	blockCount4 --; // incrments the block count down by 1 with every click
	
		if (blockCount4 == 0){
			// do nothing checks to make sure you dont get numbers going down in after you hit 0 
			var max4 =(0);
		};	
		
		
if (countDownd == 1){
var max4 =(0);
}else{
	
switch(max4)
		{
	case 0:
	break;
		
	case 1:	
		var count4d =(countDownd-3);

		$('#RecordNum4 ul li').first().replaceWith('<li></li>');
		$('#RecordNum4 ul li').first().append(count4d);
		
//		var countDown2d = parseFloat( $('#RecordNum4 ul li:nth-child(3)').html());
		
		var count5d =(ct4-3);		
		// replace the third number with the correct inncrment down in the loop
		$('#RecordNum4 ul li:nth-child(3)').replaceWith('<li></li>');
		$('#RecordNum4 ul li:nth-child(3)').append(count5d);
			
	break;
	default:
		var count4d =(countDownd-3);
		
		$('#RecordNum4 ul li').first().replaceWith('<li></li>');
		$('#RecordNum4 ul li').first().append(count4d);
		
		var countDown2d = parseFloat( $('#RecordNum4 ul li:nth-child(3)').html());
		var count5d =(countDown2d-3);		
		
		$('#RecordNum4 ul li:nth-child(3)').replaceWith('<li></li>');
		$('#RecordNum4 ul li:nth-child(3)').append(count5d);
					
		}
};

});

// end the block that drives the 4th reccord scrool banner 

// Start the block that drives the 3rd record scrool banner 

// start the intal counts and set the varables for 
//var n_rsb4 = $("#mycarousel4 >li").size(); // Counts number of first child div in c1
var blockCount3 =(1);
// alert('blockCount is  '+blockCount3);
var ct3mod = $('#mycarousel3').children().size(); 

//alert('ct3mod is '+ct3mod);


if (ct3mod< 4){
//	alert('ct is less than 4');
	//var ct4a= (ct4 - 2)
//	 $('#RecordNum3 ul li').last().append(ct3mod);
	 
}else{

var mod3 =(ct3mod % 3);

switch (mod3)
{
case 0:
	  	  //	  	 do nothing 
  break;
case 1:// this writes 2 items to the ul to balance out the blocks in to groups of three 
//   	  alert('mod1 is '+ mod3);
 	  	 $('#mycarousel3 li').last().after($X3li);
	  	 $('#mycarousel3 li').last().after($X3li2);
	  	 var mod3Add =(2);
  break;
case 2: // this wirtes 1 item to the ul to balance out the blocks in to groups of three
//	alert('mod1 is '+ mod3);
	  	 $('#mycarousel3 li').last().after($X3li);
	  	 var mod3Add =(1);	
  break;  
default:// we dont know what this is 

}
};
// this calls the carrosell 

$('#mycarousel3').jcarousel({
        // Configuration goes here
});

//This writes the navagtion to the code
$('#RecordScrollBanner3 >div >div >div').before($write13);


// starts the second record scrool banner call r of first child div in c1
var ct3 = $('#mycarousel3').children().size(); 
var blocks3 =(ct3/3);
//alert('blocks3 is  '+blocks3);

if (ct3 > 3){
	var count3 = (3);

	//var ct4a= (ct4 - 2)
	 $('#RecordNum3 ul li').last().append(ct3mod);
	 
}else{ // if the record number is 2 then do this 

	switch(ct3)
		{
		case 1:
			$('#RecordScrollBanner3 >div').css('padding-left','214px');
			$('#RecordScrollBanner3 >div >div').css('width','300px');
		  break;
		case 2:
			$('#RecordScrollBanner3 >div').css('padding-left','135px');
			$('#RecordScrollBanner3 >div >div').css('width','300px'); 
		   break;
		default:

		}
	$('#RecordNum3').css('position','absolute').css('left','-2000px');
	$('#RecordScrollBanner3 #rsbPrev').css('position','absolute').css('left','-2000px');
	$('#RecordScrollBanner3 #rsbNext').css('position','absolute').css('left','-2000px');
};
	
	// increments the numbers up //
$('#RecordScrollBanner3 #rsbNext').click(function(){
			var count3 = parseFloat( $('#RecordNum3 ul li').first().html());
			var lastnum3 = parseFloat( $('#RecordNum3 ul li:nth-child(3)').html());
			
			blockCount3 ++; // incrments block count by 1 with every click
			
if (blockCount3 == blocks3){
// set max 1 to be 1 
var max3 =(1);

};

if (lastnum3 >= ct3){
// do nothing and set it so the switch is doing nothing  
var max3 =(0);
};
	
	switch(max3)
		{
	case 0:
	 break;
 	case 1:
			var count4c =(count3+3);
			
			$('#RecordNum3 ul li').first().replaceWith('<li></li>');
			$('#RecordNum3 ul li').first().append(count4c);

//			var count3c = parseFloat( $('#RecordNum3 ul li:nth-child(3)').html());
//			var count5c =(count3c+3);		

			$('#RecordNum3 ul li:nth-child(3)').replaceWith('<li></li>');
			$('#RecordNum3 ul li:nth-child(3)').append(ct3mod);

		break;
     default:
			var count4c =(count3+3);

			$('#RecordNum3 ul li').first().replaceWith('<li></li>');
			$('#RecordNum3 ul li').first().append(count4c);

			var count3c = parseFloat( $('#RecordNum3 ul li:nth-child(3)').html());
			var count5c =(count3c+3);		

			$('#RecordNum3 ul li:nth-child(3)').replaceWith('<li></li>');
			$('#RecordNum3 ul li:nth-child(3)').append(count5c);
		}
    
});

// incraements the numbers down //
$('#RecordScrollBanner3 #rsbPrev').click(function(){
// this resetes the call gloabal since the functions are not click independent. 			
if (blockCount3 == blocks3){
//  if these two gloabals are eq then we need max3 to be one for the switch  
var max3 =(1);
};

var countDownc = parseFloat( $('#RecordNum3 ul li').first().html());
	blockCount3 --; // incrments the block count down by 1 with every click
	
		if (blockCount3 == 0){
			// do nothing checks to make sure you dont get numbers going down in after you hit 0 
			var max3 =(0);
		};	
		
		
if (countDownc == 1){
var max3 =(0);
}else{
	
switch(max3)
		{
	case 0:
	break;
		
	case 1:	
		var count4c =(countDownc-3);

		$('#RecordNum3 ul li').first().replaceWith('<li></li>');
		$('#RecordNum3 ul li').first().append(count4c);
		
//		var countDown2c = parseFloat( $('#RecordNum3 ul li:nth-child(3)').html());
		
		var count5c =(ct3-3);		
		// replace the third number with the correct inncrment down in the loop
		$('#RecordNum3 ul li:nth-child(3)').replaceWith('<li></li>');
		$('#RecordNum3 ul li:nth-child(3)').append(count5c);
			
	break;
	default:
		var count4c =(countDownc-3);
		
		$('#RecordNum3 ul li').first().replaceWith('<li></li>');
		$('#RecordNum3 ul li').first().append(count4c);
		
		var countDown2c = parseFloat( $('#RecordNum3 ul li:nth-child(3)').html());
		var count5c =(countDown2c-3);		
		
		$('#RecordNum3 ul li:nth-child(3)').replaceWith('<li></li>');
		$('#RecordNum3 ul li:nth-child(3)').append(count5c);
					
		}
};

});

// end the block that drives the 3rd reccord scrool banner 

// Start the block that drives the 2nd record scrool banner 

// start the intal counts and set the varables for 
//var n_rsb4 = $("#mycarousel4 >li").size(); // Counts number of first child div in c1
var blockCount2 =(1);
// alert('blockCount is  '+blockCount2);
var ct2mod = $('#mycarousel2').children().size(); 

//alert('ct2mod is '+ct2mod);


if (ct2mod< 4){
//	alert('ct is less than 4');
	//var ct4a= (ct4 - 2)
//	 $('#RecordNum2 ul li').last().append(ct2mod);
	 
}else{

var mod2 =(ct2mod % 3);

switch (mod2)
{
case 0:
  // var zeroItm =(0);
//	  	  alert('mod1 is '+ mod2);
//	  	  alert( 'there is an even block of li in RSB 1');
	  	  //	  	 do nothing 
  break;
case 1:// this writes 2 items to the ul to balance out the blocks in to groups of three 
//   	  alert('mod1 is '+ mod2);
 	  	 $('#mycarousel2 li').last().after($X2li);
	  	 $('#mycarousel2 li').last().after($X2li2);
	  	 var mod2Add =(2);
  break;
case 2: // this wirtes 1 item to the ul to balance out the blocks in to groups of three
//	alert('mod1 is '+ mod2);
	  	 $('#mycarousel2 li').last().after($X2li);
	  	 var mod2Add =(1);	
  break;  
default:// we dont know what this is 

}
};
// this calls the carrosell 

$('#mycarousel2').jcarousel({
        // Configuration goes here
});

//This writes the navagtion to the code
$('#RecordScrollBanner2 >div >div >div').before($write12);


// starts the second record scrool banner call r of first child div in c1
var ct2 = $('#mycarousel2').children().size(); 
var blocks2 =(ct2/3);
//alert('blocks2 is  '+blocks2);

if (ct2 > 3){
	var count2 = (3);
//	alert('first if stament');
	//var ct4a= (ct4 - 2)
	 $('#RecordNum2 ul li').last().append(ct2mod);
	 
}else{ // if the record number is 2 then do this 
//	alert('enting the switch ' +ct2);
	switch(ct2)
		{
		case 1:
			$('#RecordScrollBanner2 >div').css('padding-left','214px');
			$('#RecordScrollBanner2 >div >div').css('width','300px');
		  break;
		case 2:
			$('#RecordScrollBanner2 >div').css('padding-left','135px');
			$('#RecordScrollBanner2 >div >div').css('width','300px'); 
		   break;
		default:

		}
	$('#RecordNum2').css('position','absolute').css('left','-2000px');
	$('#RecordScrollBanner2 #rsbPrev').css('position','absolute').css('left','-2000px');
	$('#RecordScrollBanner2 #rsbNext').css('position','absolute').css('left','-2000px');
};
	
	// increments the numbers up //
$('#RecordScrollBanner2 #rsbNext').click(function(){
			var count2 = parseFloat( $('#RecordNum2 ul li').first().html());
			var lastnum2 = parseFloat( $('#RecordNum2 ul li:nth-child(3)').html());
			
			blockCount2 ++; // incrments block count by 1 with every click
			
if (blockCount2 == blocks2){
// set max 1 to be 1 
var max2 =(1);

};

if (lastnum2 >= ct2){
// do nothing and set it so the switch is doing nothing  
var max2 =(0);
};
	
	switch(max2)
		{
	case 0:
	 break;
 	case 1:
			var count4b =(count2+3);
			
			$('#RecordNum2 ul li').first().replaceWith('<li></li>');
			$('#RecordNum2 ul li').first().append(count4b);

//			var count3b = parseFloat( $('#RecordNum2 ul li:nth-child(3)').html());
//			var count5b =(count3b+3);		

			$('#RecordNum2 ul li:nth-child(3)').replaceWith('<li></li>');
			$('#RecordNum2 ul li:nth-child(3)').append(ct2mod);

		break;
     default:
			var count4b =(count2+3);

			$('#RecordNum2 ul li').first().replaceWith('<li></li>');
			$('#RecordNum2 ul li').first().append(count4b);

			var count3b = parseFloat( $('#RecordNum2 ul li:nth-child(3)').html());
			var count5b =(count3b+3);		

			$('#RecordNum2 ul li:nth-child(3)').replaceWith('<li></li>');
			$('#RecordNum2 ul li:nth-child(3)').append(count5b);
		}
    
});

// incraements the numbers down //
$('#RecordScrollBanner2 #rsbPrev').click(function(){
// this resetes the call gloabal since the functions are not click independent. 			
if (blockCount2 == blocks2){
//  if these two gloabals are eq then we need max2 to be one for the switch  
var max2 =(1);
};

var countDownb = parseFloat( $('#RecordNum2 ul li').first().html());
	blockCount2 --; // incrments the block count down by 1 with every click
	
		if (blockCount2 == 0){
			// do nothing checks to make sure you dont get numbers going down in after you hit 0 
			var max2 =(0);
		};	
		
		
if (countDownb == 1){
var max2 =(0);
}else{
	
switch(max2)
		{
	case 0:
	break;
		
	case 1:	
		var count4b =(countDownb-3);

		$('#RecordNum2 ul li').first().replaceWith('<li></li>');
		$('#RecordNum2 ul li').first().append(count4b);
		
//		var countDown2b = parseFloat( $('#RecordNum2 ul li:nth-child(3)').html());
		
		var count5b =(ct2-3);		
		// replace the third number with the correct inncrment down in the loop
		$('#RecordNum2 ul li:nth-child(3)').replaceWith('<li></li>');
		$('#RecordNum2 ul li:nth-child(3)').append(count5b);
			
	break;
	default:
		var count4b =(countDownb-3);
		
		$('#RecordNum2 ul li').first().replaceWith('<li></li>');
		$('#RecordNum2 ul li').first().append(count4b);
		
		var countDown2b = parseFloat( $('#RecordNum2 ul li:nth-child(3)').html());
		var count5b =(countDown2b-3);		
		
		$('#RecordNum2 ul li:nth-child(3)').replaceWith('<li></li>');
		$('#RecordNum2 ul li:nth-child(3)').append(count5b);
					
		}
};

});

// end the block that drives the 2nd reccord scrool banner 

// Start the block that drives the 1st record scrool banner 

// start the intal counts and set the varables for 
//var n_rsb4 = $("#mycarousel4 >li").size(); // Counts number of first child div in c1
var blockCount1 =(1);
// alert('blockCount is  '+blockCount1);
var ct1mod = $('#mycarousel1').children().size(); 

//alert('ct1mod is '+ct1mod);


if (ct1mod< 4){
//	alert('ct is less than 4');
	//var ct4a= (ct4 - 2)
//	 $('#RecordNum ul li').last().append(ct1mod);
	 
}else{

var mod1 =(ct1mod % 3);

switch (mod1)
{
case 0:
  // var zeroItm =(0);
//	  	  alert('mod1 is '+ mod1);
//	  	  alert( 'there is an even block of li in RSB 1');
	  	  //	  	 do nothing 
  break;
case 1:// this writes 2 items to the ul to balance out the blocks in to groups of three 
//   	  alert('mod1 is '+ mod1);
 	  	 $('#mycarousel1 li').last().after($X1li);
	  	 $('#mycarousel1 li').last().after($X1li2);
	  	 var modAdd =(2);
  break;
case 2: // this wirtes 1 item to the ul to balance out the blocks in to groups of three
//	alert('mod1 is '+ mod1);
	  	 $('#mycarousel1 li').last().after($X1li);
	  	 var modAdd =(1);	
  break;  
default:// we dont know what this is 

}
};
// this calls the carrosell 

$('#mycarousel1').jcarousel({
        // Configuration goes here
});

//This writes the navagtion to the code
$('#RecordScrollBanner1 >div >div >div').before($write11);


// starts the second record scrool banner call r of first child div in c1
var ct1 = $('#mycarousel1').children().size(); 
var blocks1 =(ct1/3);
//alert('blocks1 is  '+blocks1);

if (ct1 > 3){
	var count1 = (3);
//	alert('first if stament');
	//var ct4a= (ct4 - 2)
	 $('#RecordNum ul li').last().append(ct1mod);
	 
}else{ // if the record number is 2 then do this 
//	alert('enting the switch ' +ct1);
	switch(ct1)
		{
		case 1:
			$('#RecordScrollBanner1 >div').css('padding-left','214px');
			$('#RecordScrollBanner1 >div >div').css('width','300px');
		  break;
		case 2:
			$('#RecordScrollBanner1 >div').css('padding-left','135px');
			$('#RecordScrollBanner1 >div >div').css('width','300px'); 
		   break;
		default:
//		 
		}
	$('#RecordNum').css('position','absolute').css('left','-2000px');
	$('#RecordScrollBanner1 #rsbPrev').css('position','absolute').css('left','-2000px');
	$('#RecordScrollBanner1 #rsbNext').css('position','absolute').css('left','-2000px');
};
	
	// increments the numbers up //
$('#RecordScrollBanner1 #rsbNext').click(function(){
			var count1 = parseFloat( $('#RecordNum ul li').first().html());
			var lastnum1 = parseFloat( $('#RecordNum ul li:nth-child(3)').html());
			
			blockCount1 ++; // incrments block count by 1 with every click
			
if (blockCount1 == blocks1){
// set max 1 to be 1 
var max1 =(1);

};

if (lastnum1 >= ct1){
// do nothing and set it so the switch is doing nothing  
var max1 =(0);
};
	
	switch(max1)
		{
	case 0:
	 break;
 	case 1:
			var count4a =(count1+3);
			
			$('#RecordNum ul li').first().replaceWith('<li></li>');
			$('#RecordNum ul li').first().append(count4a);

//			var count3a = parseFloat( $('#RecordNum ul li:nth-child(3)').html());
//			var count5a =(count3a+3);		

			$('#RecordNum ul li:nth-child(3)').replaceWith('<li></li>');
			$('#RecordNum ul li:nth-child(3)').append(ct1mod);

		break;
     default:
			var count4a =(count1+3);

			$('#RecordNum ul li').first().replaceWith('<li></li>');
			$('#RecordNum ul li').first().append(count4a);

			var count3a = parseFloat( $('#RecordNum ul li:nth-child(3)').html());
			var count5a =(count3a+3);		

			$('#RecordNum ul li:nth-child(3)').replaceWith('<li></li>');
			$('#RecordNum ul li:nth-child(3)').append(count5a);
		}
    
});

// incraements the numbers down //
$('#RecordScrollBanner1 #rsbPrev').click(function(){
// this resetes the call gloabal since the functions are not click independent. 			
if (blockCount1 == blocks1){
//  if these two gloabals are eq then we need max1 to be one for the switch  
var max1 =(1);
};

var countDowna = parseFloat( $('#RecordNum ul li').first().html());
	blockCount1 --; // incrments the block count down by 1 with every click
	
		if (blockCount1 == 0){
			// do nothing checks to make sure you dont get numbers going down in after you hit 0 
			var max1 =(0);
		};	
		
		
if (countDowna == 1){
var max1 =(0);
}else{
	
switch(max1)
		{
	case 0:
	break;
		
	case 1:	
		var count4a =(countDowna-3);

		$('#RecordNum ul li').first().replaceWith('<li></li>');
		$('#RecordNum ul li').first().append(count4a);
		
//		var countDown2a = parseFloat( $('#RecordNum ul li:nth-child(3)').html());
		
		var count5a =(ct1-3);		
		// replace the third number with the correct inncrment down in the loop
		$('#RecordNum ul li:nth-child(3)').replaceWith('<li></li>');
		$('#RecordNum ul li:nth-child(3)').append(count5a);
			
	break;
	default:
		var count4a =(countDowna-3);
		
		$('#RecordNum ul li').first().replaceWith('<li></li>');
		$('#RecordNum ul li').first().append(count4a);
		
		var countDown2a = parseFloat( $('#RecordNum ul li:nth-child(3)').html());
		var count5a =(countDown2a-3);		
		
		$('#RecordNum ul li:nth-child(3)').replaceWith('<li></li>');
		$('#RecordNum ul li:nth-child(3)').append(count5a);
					
		}
};

});

// end the block that drives the 1st reccord scrool banner 
		


	
//RSS feeds appears that we can move these intot the functions - 
// test on all browsers before comitting possable issue with code not beeing used causing the JS to brake code not eeing uses causs this to brake for example, if there are three rss in top and 3 in the narrow . if only two are used intop all thre below brake. can be verrified by reversing the code.  
	$('#rssFeed1').rssfeed(rssFeed_1, {
    limit: rssFeed_1_limit
  });	
	$('#rssFeed2').rssfeed(rssFeed_2, {
    limit: rssFeed_2_limit
  });
	$('#rssFeed3').rssfeed(rssFeed_3, {
    limit: rssFeed_3_limit
  });
	$('#rssFeed4').rssfeed(rssFeed_4, {
    limit: rssFeed_4_limit
  });
 
  	

// this initiates the RotatingImage Cartidge in the right Nav - has no navagtion under it. 

$('.RNImageSlides').cycle({
	 fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
	 random: 1,
	 speed: 4000,
	 pause: 1 
      
	});




});

