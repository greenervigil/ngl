$( document ).ready(function() {

    $('.scrollBtn').click( function() {
        if( $(this).hasClass( "closed" ) ){
            $(this).removeClass( "closed" );
            $(this).parent( ".scrollBtnContainer" ).prev( ".contentContainer" ).addClass( "max" );
            $(this).parent( ".scrollBtnContainer" ).prev( ".contentContainer" ).removeClass( "min" );
        }else{
            $(this).addClass( "closed" );
            $(this).parent( ".scrollBtnContainer" ).prev( ".contentContainer" ).addClass( "min" );
            $(this).parent( ".scrollBtnContainer" ).prev( ".contentContainer" ).removeClass( "max" );
        }
    });

    if ($(window).width() < 991) {
       $( ".contentContainer" ).addClass( "min" );
       $(".scrollBtn").addClass( "closed" );
    }
    
    loader.init({headerCSS:true, footerCSS:true}, function(){
        loader.footer()
    });

});
 