$(document).ready(function() {

//$('#mainTabSelect_5').click(function() {		
var tab5 = function(){ // alert('Handler for .click() called.');

 // removes the sub nav  
	//alert('Handler for mainTabSelect_5 .click() called.');
    
	$('#subNav').removeClass('c1_Subnav');
	$('#subNav').addClass(syleClassName);
	
// this function hids the other main content  div's so that only the selected one is showing 		


	$('#mainTab_1_m').addClass(syleClassName);
	$('#mainTab_3_m  > div').addClass(syleClassName);
	$('#mainTab_4_m  > div').addClass(syleClassName);
	$('#mainTab_5_1_s  > div').removeClass(syleClassName);
	$('#mainTab_2_m  > div').addClass(syleClassName);
	$('#mainTab_6_m  > div').addClass(syleClassName); 
	$('#mainTab_7_m  > div').addClass(syleClassName);
	

//makes the link in the nav "selected"
	$('#mainTabSelect_5').removeClass('nav_mid');
	$('#mainTabSelect_5').addClass('nav_mid_slected');	
	
// makes all links in the main nav "unselected". 

	$('#mainTabSelect_1').removeClass('nav_left');
	$('#mainTabSelect_1').addClass('nav_left_unslected');	
	$('#mainTabSelect_2').addClass('nav_mid');
	$('#mainTabSelect_2').removeClass('nav_mid_slected');
	$('#mainTabSelect_3').addClass('nav_mid');
	$('#mainTabSelect_3').removeClass('nav_mid_slected');	
	$('#mainTabSelect_4').addClass('nav_mid');
	$('#mainTabSelect_4').removeClass('nav_mid_slected');				
	$('#mainTabSelect_6').addClass('nav_mid');
	$('#mainTabSelect_6').removeClass('nav_mid_slected');	
	$('#mainTabSelect_7').addClass('nav_mid');
	$('#mainTabSelect_7').removeClass('nav_mid_slected');	



// alert('class added to mainTab2.');
	

};
		
//$('#mainTabSelect_7').click(function() {		
var tab7 = function(){ 
// removes the sub nav  
	//alert('Handler for mainTabSelect_7 .click() called.');
	$('#subNav').removeClass('c1_Subnav');
	$('#subNav').addClass(syleClassName);
	
// this function hids the other main content  div's so that only the selected one is showing 
	$('#mainTab_1_m').addClass(syleClassName);
	$('#mainTab_2_m  > div').addClass(syleClassName);
	$('#mainTab_3_m  > div').addClass(syleClassName);
	$('#mainTab_4_m  > div').addClass(syleClassName);
	$('#mainTab_5_1_s  > div').addClass(syleClassName);
	$('#mainTab_6_m  > div').addClass(syleClassName);
	$('#mainTab_7_m > div').removeClass(syleClassName);


//makes the target div "selected"
	$('#mainTabSelect_7').removeClass('nav_mid');
	$('#mainTabSelect_7').addClass('nav_mid_slected');

	
// makes all links in the main nav "unselected". 

	$('#mainTabSelect_1').removeClass('nav_left');
	$('#mainTabSelect_1').addClass('nav_left_unslected');	
	$('#mainTabSelect_2').addClass('nav_mid');
	$('#mainTabSelect_2').removeClass('nav_mid_slected');	
	$('#mainTabSelect_3').addClass('nav_mid');
	$('#mainTabSelect_3').removeClass('nav_mid_slected');	
	$('#mainTabSelect_4').addClass('nav_mid');
	$('#mainTabSelect_4').removeClass('nav_mid_slected');			
	$('#mainTabSelect_5').addClass('nav_mid');
	$('#mainTabSelect_5').removeClass('nav_mid_slected');	
	$('#mainTabSelect_6').addClass('nav_mid');
	$('#mainTabSelect_6').removeClass('nav_mid_slected');			



};


//$('#mainTabSelect_6').click(function() {		
var tab6 = function(){ 
//alert('Handler for mainTabSelect_6 .click() called.');

// removes the sub nav   
	$('#subNav').removeClass('c1_Subnav');
	$('#subNav').addClass(syleClassName);
	
// this function hids the other main content  div's so that only the selected one is showing 	


	$('#mainTab_1_m').addClass(syleClassName);
	$('#mainTab_2_m  > div').addClass(syleClassName);
	$('#mainTab_3_m  > div').addClass(syleClassName);
	$('#mainTab_4_m  > div').addClass(syleClassName);
	$('#mainTab_5_1_s  > div').addClass(syleClassName);
	$('#mainTab_6_m  > div').removeClass(syleClassName);
	$('#mainTab_7_m > div').addClass(syleClassName);

	
//makes the link in the nav "selected"
	$('#mainTabSelect_6').removeClass('nav_mid');
	$('#mainTabSelect_6').addClass('nav_mid_slected');
	
// makes all links in the main nav "unselected". 

	
	$('#mainTabSelect_1').removeClass('nav_left');
	$('#mainTabSelect_1').addClass('nav_left_unslected');	
	$('#mainTabSelect_2').addClass('nav_mid');
	$('#mainTabSelect_2').removeClass('nav_mid_slected');	
	$('#mainTabSelect_3').addClass('nav_mid');
	$('#mainTabSelect_3').removeClass('nav_mid_slected');	
	$('#mainTabSelect_4').addClass('nav_mid');
	$('#mainTabSelect_4').removeClass('nav_mid_slected');			
	$('#mainTabSelect_5').addClass('nav_mid');
	$('#mainTabSelect_5').removeClass('nav_mid_slected');	
	$('#mainTabSelect_7').addClass('nav_mid');
	$('#mainTabSelect_7').removeClass('nav_mid_slected');			




};

 // starts the #2 click function 
//$('#mainTabSelect_1').click(function() {		
    var tab1 = function(){		
 // this function shows the subnavagation for the #1 div
    
	$('#subNav').removeClass(syleClassName);
 	$('#subNav').addClass('c1_Subnav');
// this is suposd to set it to show the first sub tab	
 
//    shows the conmtent for the selected subtab
//	$('#subTab_1_con').removeClass(syleClassName);
//	$('#subTab_1_s > div').addClass('c3_wrap');
	
//	$('#subTab_1_con').removeClass(syleClassName);
//	$('#subTab_1_con').addClass('c3_wrap');
		
// this function hids the other main content  div's so that only the selected one is showing 

	$('#mainTab_2_m  > div').addClass(syleClassName);
	$('#mainTab_3_m  > div').addClass(syleClassName);
	$('#mainTab_4_m  > div').addClass(syleClassName);
	$('#mainTab_5_1_s  > div').addClass(syleClassName);
	$('#mainTab_6_m  > div').addClass(syleClassName);
	$('#mainTab_7_m  > div').addClass(syleClassName);

// turns on the Main content for the selected navagation div 
	$('#mainTab_1_m').removeClass(syleClassName);
//	$('div.subTab_1_con').addClass('c3_wrap');

//makes the link in the nav "selected"

	$('#mainTabSelect_1').removeClass('nav_left_unslected');
	$('#mainTabSelect_1').addClass('nav_left');

// makes all the remaining links in the main nav "unselected".  

	
	$('#mainTabSelect_2').addClass('nav_mid');
	$('#mainTabSelect_2').removeClass('nav_mid_slected');
	$('#mainTabSelect_3').addClass('nav_mid');
	$('#mainTabSelect_3').removeClass('nav_mid_slected');
	$('#mainTabSelect_4').addClass('nav_mid');
	$('#mainTabSelect_4').removeClass('nav_mid_slected');			
	$('#mainTabSelect_5').addClass('nav_mid');
	$('#mainTabSelect_5').removeClass('nav_mid_slected');			
	$('#mainTabSelect_6').addClass('nav_mid');
	$('#mainTabSelect_6').removeClass('nav_mid_slected');
	$('#mainTabSelect_7').addClass('nav_mid');
	$('#mainTabSelect_7').removeClass('nav_mid_slected');

// sub tab shut off needed for this function 

};	
	
  
// starts the #2 click function 
//$('#mainTabSelect_2').click(function() {		
var tab2 = function(){
		//	 alert('Handler for mainTabSelect_2 .click() called.');	
 // this function hides the subnavagation for the #1 div
    
	$('#subNav').removeClass('c1_Subnav');
	$('#subNav').addClass(syleClassName);
		
// this function hids the other main content  div's so that only the selected one is showing 
//	$('#subTab_1_con ').removeClass('c3_wrap');
//	$('#subTab_1_con').addClass(syleClassName);

	$('#mainTab_1_m').addClass(syleClassName);
	$('#mainTab_3_m  > div').addClass(syleClassName);
	$('#mainTab_4_m  > div').addClass(syleClassName);
	$('#mainTab_5_1_s  > div').addClass(syleClassName);
	$('#mainTab_6_m  > div').addClass(syleClassName);
	$('#mainTab_7_m  > div').addClass(syleClassName);

// turns on the Main content for the selected navagation div 
$('#mainTab_2_m  > div').removeClass(syleClassName);

//makes the link in the nav "selected"

	$('#mainTabSelect_2').removeClass('nav_mid');
	$('#mainTabSelect_2').addClass('nav_mid_slected');	

// makes all the remaining links in the main nav "unselected".  

	$('#mainTabSelect_1').removeClass('nav_left');
	$('#mainTabSelect_1').addClass('nav_left_unslected');	
	$('#mainTabSelect_3').addClass('nav_mid');
	$('#mainTabSelect_3').removeClass('nav_mid_slected');
	$('#mainTabSelect_4').addClass('nav_mid');
	$('#mainTabSelect_4').removeClass('nav_mid_slected');			
	$('#mainTabSelect_5').addClass('nav_mid');
	$('#mainTabSelect_5').removeClass('nav_mid_slected');			
	$('#mainTabSelect_6').addClass('nav_mid');
	$('#mainTabSelect_6').removeClass('nav_mid_slected');
	$('#mainTabSelect_7').addClass('nav_mid');
	$('#mainTabSelect_7').removeClass('nav_mid_slected');



};	



// starts the #3 click function
//$('#mainTabSelect_3').click(function() {		
var tab3 = function(){
    //alert('Handler for mainTabSelect_3 .click() called.');
   // this function hides the subnavagation for the #1 div
   
	$('#subNav').removeClass('c1_Subnav');
	$('#subNav').addClass(syleClassName);
	
// this function hids the other main content  div's so that only the selected one is showing 
//	$('#subTab_1_s > div').removeClass('c3_wrap');
//	$('#subTab_1_s > div').addClass(syleClassName);

	$('#mainTab_1_m').addClass(syleClassName);
	$('#mainTab_2_m  > div').addClass(syleClassName);
	$('#mainTab_4_m  > div').addClass(syleClassName);
	$('#mainTab_5_1_s  > div').addClass(syleClassName);
	$('#mainTab_6_m  > div').addClass(syleClassName);
	$('#mainTab_7_m  > div').addClass(syleClassName);

// turns on the Main content for the selected navagation div 
	$('#mainTab_3_m  > div').removeClass(syleClassName);	

//makes the link in the nav "selected"
	$('#mainTabSelect_3').removeClass('nav_mid');
	$('#mainTabSelect_3').addClass('nav_mid_slected');	

// makes all links in the main nav "unselected". 

	$('#mainTabSelect_1').removeClass('nav_left');
	$('#mainTabSelect_1').addClass('nav_left_unslected');	
	$('#mainTabSelect_2').addClass('nav_mid');
	$('#mainTabSelect_2').removeClass('nav_mid_slected');			
	$('#mainTabSelect_4').addClass('nav_mid');
	$('#mainTabSelect_4').removeClass('nav_mid_slected');			
	$('#mainTabSelect_5').addClass('nav_mid');
	$('#mainTabSelect_5').removeClass('nav_mid_slected');			
	$('#mainTabSelect_6').addClass('nav_mid');
	$('#mainTabSelect_6').removeClass('nav_mid_slected');	
	$('#mainTabSelect_7').addClass('nav_mid');
	$('#mainTabSelect_7').removeClass('nav_mid_slected');
	

};


//$('#mainTabSelect_4').click(function() {		
var tab4 = function(){// removes the sub nav  
	//alert('Handler for mainTabSelect_4 .click() called.');
    
	$('#subNav').removeClass('c1_Subnav');
	$('#subNav').addClass(syleClassName);

// this function hids the other main content  div's so that only the selected one is showing 


	$('#mainTab_1_m').addClass(syleClassName);
	$('#mainTab_3_m  > div').addClass(syleClassName);
	$('#mainTab_2_m  > div').addClass(syleClassName);
	$('#mainTab_4_m  > div').removeClass(syleClassName);
	$('#mainTab_5_1_s  > div').addClass(syleClassName);
	$('#mainTab_6_m  > div').addClass(syleClassName);
	$('#mainTab_7_m  > div').addClass(syleClassName);

//makes the link in the nav "selected"
	$('#mainTabSelect_4').removeClass('nav_mid');
	$('#mainTabSelect_4').addClass('nav_mid_slected');

// makes all links in the main nav "unselected". 

	$('#mainTabSelect_1').removeClass('nav_left');
	$('#mainTabSelect_1').addClass('nav_left_unslected');	
	$('#mainTabSelect_2').addClass('nav_mid');
	$('#mainTabSelect_2').removeClass('nav_mid_slected');			
	$('#mainTabSelect_3').addClass('nav_mid');
	$('#mainTabSelect_3').removeClass('nav_mid_slected');			
	$('#mainTabSelect_5').addClass('nav_mid');
	$('#mainTabSelect_5').removeClass('nav_mid_slected');			
	$('#mainTabSelect_6').addClass('nav_mid');
	$('#mainTabSelect_6').removeClass('nav_mid_slected');	
	$('#mainTabSelect_7').addClass('nav_mid');
	$('#mainTabSelect_7').removeClass('nav_mid_slected');



// alert('class added to mainTab2.');
};






// overvew subtab functions yes I know this is not pretty


//$('#subTabSelection_1').click(function() {		
var subTab1 = function(){
// on functions 
//	alert('Handler for subTabSelection_1 .click() called.');

//    shows the conmtent for the selected subtab
	$('#subTab_1_con').removeClass(syleClassName);
	$('#subTab_1_s > div').addClass('c3_wrap');
	
// hides the content fot the other subtabs 
	$('#subTab_2_s >div').addClass(syleClassName);	
	$('#subTab_2_s >div').removeClass('c3_wrap');
	$('#subTab_3_s >div').addClass(syleClassName);
	$('#subTab_3_s >div').removeClass('c3_wrap');
	$('#subTab_4_s >div').addClass(syleClassName);
	$('#subTab_4_s >div').removeClass('c3_wrap');
	$('#subTab_5_s >div').addClass(syleClassName);
	$('#subTab_5_s >div').removeClass('c3_wrap');

// makes the subtab link "selected" 
	$('#subTabSelection_1').addClass('subnav_curent');
	$('#subTabSelection_1').removeClass('subnav_link');	

// makes all other sub tab links "unselected"  
	$('#subTabSelection_2').removeClass('subnav_curent');
	$('#subTabSelection_2').addClass('subnav_link');
	$('#subTabSelection_3').removeClass('subnav_curent');
	$('#subTabSelection_3').addClass('subnav_link');
	$('#subTabSelection_4').removeClass('subnav_curent');
	$('#subTabSelection_4').addClass('subnav_link');
	$('#subTabSelection_5').removeClass('subnav_curent');
	$('#subTabSelection_5').addClass('subnav_link');
};
	


//$('#subTabSelection_2').click(function() {		
var subTab2 = function(){
// on functions 
//	alert('Handler for subTabSelection_2 .click() called.');
//  	alert('syleClassName is ' + syleClassName);
//alert('removed c3_wrap from subTab_1_con');
//alert('added syleClassName to subTab_1_s > div class added is ' + syleClassName);
//	$('#subTab_2_s > div').addClass(syleClassName);	

// shows content for the seltected tab 
$('#subTab_2_s > div').removeClass(syleClassName);
$('#subTab_2_s > div').addClass('c3_wrap');
// hides content for the other tabs 
	$('#subTab_1_con').removeClass('c3_wrap');
	$('#subTab_1_con').addClass(syleClassName);	
//	$('#subTab_2_s >div').addClass(syleClassName);	
//	$('#subTab_2_s >div').removeClass('c3_wrap');
	$('#subTab_3_s >div').addClass(syleClassName);
	$('#subTab_3_s >div').removeClass('c3_wrap');
	$('#subTab_4_s >div').addClass(syleClassName);
	$('#subTab_4_s >div').removeClass('c3_wrap');
	$('#subTab_5_s >div').addClass(syleClassName);
	$('#subTab_5_s >div').removeClass('c3_wrap');
	
//Makes subtab link "selected" 
	$('#subTabSelection_2').addClass('subnav_curent');
	$('#subTabSelection_2').removeClass('subnav_link');	

// makes allother sutab links "unselected". 
	$('#subTabSelection_1').removeClass('subnav_curent');
	$('#subTabSelection_1').addClass('subnav_link');
	$('#subTabSelection_3').removeClass('subnav_curent');
	$('#subTabSelection_3').addClass('subnav_link');
	$('#subTabSelection_4').removeClass('subnav_curent');
	$('#subTabSelection_4').addClass('subnav_link');
	$('#subTabSelection_5').removeClass('subnav_curent');
	$('#subTabSelection_5').addClass('subnav_link');
};
	


//$('#subTabSelection_3').click(function() {	
var subTab3 = function(){
// on functions 
//	alert('Handler for subTabSelection_2 .click() called.');
//  	alert('syleClassName is ' + syleClassName);
//alert('removed c3_wrap from subTab_1_con');
//alert('added syleClassName to subTab_1_s > div class added is ' + syleClassName);
//	$('#subTab_2_s > div').addClass(syleClassName);	

// shows content for the seltected tab 
$('#subTab_3_s > div').removeClass(syleClassName);
$('#subTab_3_s > div').addClass('c3_wrap');
// hides content for the other tabs 
	$('#subTab_1_con').removeClass('c3_wrap');
	$('#subTab_1_con').addClass(syleClassName);	
	$('#subTab_2_s >div').addClass(syleClassName);	
	$('#subTab_2_s >div').removeClass('c3_wrap');
//	$('#subTab_3_s >div').addClass(syleClassName);
//	$('#subTab_3_s >div').removeClass('c3_wrap');
	$('#subTab_4_s >div').addClass(syleClassName);
	$('#subTab_4_s >div').removeClass('c3_wrap');
	$('#subTab_5_s >div').addClass(syleClassName);
	$('#subTab_5_s >div').removeClass('c3_wrap');

//Makes subtab link "selected" 
	$('#subTabSelection_3').addClass('subnav_curent');
	$('#subTabSelection_3').removeClass('subnav_link');	

// makes allother sutab links "unselected". 
	$('#subTabSelection_1').removeClass('subnav_curent');
	$('#subTabSelection_1').addClass('subnav_link');
	$('#subTabSelection_2').removeClass('subnav_curent');
	$('#subTabSelection_2').addClass('subnav_link');
	$('#subTabSelection_4').removeClass('subnav_curent');
	$('#subTabSelection_4').addClass('subnav_link');
	$('#subTabSelection_5').removeClass('subnav_curent');
	$('#subTabSelection_5').addClass('subnav_link');
};



//$('#subTabSelection_4').click(function() {	
var subTab4 = function(){
// on functions 
//	alert('Handler for subTabSelection_2 .click() called.');
//  	alert('syleClassName is ' + syleClassName);
//alert('removed c3_wrap from subTab_1_con');
//alert('added syleClassName to subTab_1_s > div class added is ' + syleClassName);
//	$('#subTab_2_s > div').addClass(syleClassName);	

// shows content for the seltected tab 
$('#subTab_4_s > div').removeClass(syleClassName);
$('#subTab_4_s > div').addClass('c3_wrap');
// hides content for the other tabs 
	$('#subTab_1_con').removeClass('c3_wrap');
	$('#subTab_1_con').addClass(syleClassName);	
	$('#subTab_2_s >div').addClass(syleClassName);	
	$('#subTab_2_s >div').removeClass('c3_wrap');
	$('#subTab_3_s >div').addClass(syleClassName);
	$('#subTab_3_s >div').removeClass('c3_wrap');
//	$('#subTab_4_s >div').addClass(syleClassName);
//	$('#subTab_4_s >div').removeClass('c3_wrap');
	$('#subTab_5_s >div').addClass(syleClassName);
	$('#subTab_5_s >div').removeClass('c3_wrap');

//Makes subtab link "selected" 
	$('#subTabSelection_4').addClass('subnav_curent');
	$('#subTabSelection_4').removeClass('subnav_link');	

// makes allother sutab links "unselected". 
	$('#subTabSelection_1').removeClass('subnav_curent');
	$('#subTabSelection_1').addClass('subnav_link');
	$('#subTabSelection_2').removeClass('subnav_curent');
	$('#subTabSelection_2').addClass('subnav_link');
	$('#subTabSelection_3').removeClass('subnav_curent');
	$('#subTabSelection_3').addClass('subnav_link');
	$('#subTabSelection_5').removeClass('subnav_curent');
	$('#subTabSelection_5').addClass('subnav_link');
};	



//$('#subTabSelection_5').click(function() {	
var subTab5 = function(){
// on functions 
//	alert('Handler for subTabSelection_2 .click() called.');
//  	alert('syleClassName is ' + syleClassName);
//alert('removed c3_wrap from subTab_1_con');
//alert('added syleClassName to subTab_1_s > div class added is ' + syleClassName);
//	$('#subTab_2_s > div').addClass(syleClassName);	

// shows content for the seltected tab 
$('#subTab_5_s > div').removeClass(syleClassName);
$('#subTab_5_s > div').addClass('c3_wrap');

// hides content for the other tabs 
	$('#subTab_1_con').removeClass('c3_wrap');
	$('#subTab_1_con').addClass(syleClassName);	
	$('#subTab_2_s >div').addClass(syleClassName);	
	$('#subTab_2_s >div').removeClass('c3_wrap');
	$('#subTab_3_s >div').addClass(syleClassName);
	$('#subTab_3_s >div').removeClass('c3_wrap');
	$('#subTab_4_s >div').addClass(syleClassName);
	$('#subTab_4_s >div').removeClass('c3_wrap');
//	$('#subTab_5_s >div').addClass(syleClassName);
//	$('#subTab_5_s >div').removeClass('c3_wrap');

//Makes subtab link "selected" 
	$('#subTabSelection_5').addClass('subnav_curent');
	$('#subTabSelection_5').removeClass('subnav_link');	

// makes allother sutab links "unselected". 
	$('#subTabSelection_1').removeClass('subnav_curent');
	$('#subTabSelection_1').addClass('subnav_link');
	$('#subTabSelection_2').removeClass('subnav_curent');
	$('#subTabSelection_2').addClass('subnav_link');
	$('#subTabSelection_3').removeClass('subnav_curent');
	$('#subTabSelection_3').addClass('subnav_link');
	$('#subTabSelection_4').removeClass('subnav_curent');
	$('#subTabSelection_4').addClass('subnav_link');
};

// start the Deep link fix		

	
//	var deepL = $.url.attr('source')
	//attr('fragment'); 
	
//	alert('deepL is'+ deepL );
// this next section grabs the hash from the url
	var deepL = $.url.attr('anchor');
	//attr('fragment'); 
//	alert('dL fragment is '+ deepL );	
	if(deepL == 'mainTab_7'){
		var dLfrag = deepL;
//	alert('lets go to the tab! '+ dLfrag);	
	tab7();
	
	}else if(deepL == 'mainTab_6'){
		var dLfrag = deepL;
//	alert('lets go to the tab! '+ dLfrag);	
	tab6();

	}else if(deepL == 'mainTab_5'){
		var dLfrag = deepL;
//	alert('lets go to the tab! '+ dLfrag);	
	tab5();

	}else if(deepL == 'mainTab_4'){
		var dLfrag = deepL;
//	alert('lets go to the tab! '+ dLfrag);	
	tab4();

	}else if(deepL == 'mainTab_3'){
		var dLfrag = deepL;
//	alert('lets go to the tab! '+ dLfrag);	
	tab3();

	}else if(deepL == 'mainTab_2'){
		var dLfrag = deepL;
//	alert('lets go to the tab! '+ dLfrag);	
	tab2();

	}else if(deepL == 'mainTab_1'){
		var dLfrag = deepL;
//	alert('lets go to the tab! '+ dLfrag);	
	tab1();

	}else if(deepL == 'subTab_1'){
		var dLfrag = deepL;
//	alert('lets go to the tab! '+ dLfrag);
	
	subTab1();
	}else if(deepL == 'subTab_2'){
		var dLfrag = deepL;
//	alert('lets go to the tab! '+ dLfrag);
	
	subTab2();
	}else if(deepL == 'subTab_3'){
		var dLfrag = deepL;
//	alert('lets go to the tab! '+ dLfrag);
	
	subTab3();
	}else if(deepL == 'subTab_4'){
		var dLfrag = deepL;
//	alert('lets go to the tab! '+ dLfrag);
	
	subTab4();
	}else if(deepL == 'subTab_5'){
		var dLfrag = deepL;
//	alert('lets go to the tab! '+ dLfrag);
	
	subTab5();
	}
		
	else{
 // 	alert(' what??? No hash? ' );
   	}
   		  
	  });			