$(document).ready(function() {                           
     $('a').click(function() {
         
          if ($(this).children('img').attr('alt') === "" || $(this).children('img').attr('alt') === 'undefined') {
               var cus_link_name = $(this).children("img").attr('src');
          }
          else if ($(this).children('img[alt]').length){
               var cus_link_name = $(this).children("img").attr('alt');
          }
          else {
               var cus_link_name = $(this).text();
          }
         
          s.linkTrackVars = 'prop16,eVar16';
          s.linkTrackEvents = 'None';
          s.prop16 = cus_link_name;
          s.eVar16 = cus_link_name;
          s.tl($(this),'o',cus_link_name);    
         
     });     // end a.click function

}); // end document.ready function