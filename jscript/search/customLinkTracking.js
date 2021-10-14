$(document).ready(function () {
  //record which tab on Record Detail Page has been clicked
  $("form[id=CenSearch]").submit(function () {
      var search = "header search box";
      s.linkTrackVars = 'prop44,eVar44';
      s.linkTrackEvents = 'None';
      s.prop44 = search;
      s.eVar44 = search;
      s.tl($(this).children("#search_text"), 'o', search);
  });

  $("form[name=refineSearchForm]").submit(function () {
      var search = "refine search box";
      s.linkTrackVars = 'prop44,eVar44';
      s.linkTrackEvents = 'None';
      s.prop44 = search;
      s.eVar44 = search;
      s.tl($(this).children("#RefSearchTXT"), 'o', search);
  });

  $("form[id=ES2]").submit(function () {
      var search = "Search Again box";
      s.linkTrackVars = 'prop44,eVar44';
      s.linkTrackEvents = 'None';
      s.prop44 = search;
      s.eVar44 = search;
      s.tl($(this).children("#search_textField2"), 'o', search);
  });

   $("a[role=tab]").click(function () {
/*    var tabName = $(this).attr("href");
    if($(this).parents("#MainTabs").find(tabName).find("#SubTab").length == 0){*/
      s.linkTrackVars = 'prop16,eVar16,prop48,eVar48';
      s.linkTrackEvents = 'None';
      s.prop16 = $(this).text();
      s.eVar16 = $(this).text();
      s.prop48 = $(this).text();
      s.eVar48 = $(this).text();
      s.tl($(this), 'o', $(this).text());
    //}
  });

  $('a').click(function () {
  	if($(this).attr("role") != 'tab'){
      if ($(this).children('img').attr('alt') === "" || $(this).children('img').attr('alt') === 'undefined') {
          var cus_link_name = $(this).children("img").attr('src');
      }
      else if ($(this).children('img[alt]').length) {
          var cus_link_name = $(this).children("img").attr('alt');
      }
      else {
          var cus_link_name = $(this).text();
      }

      s.linkTrackVars = 'prop16,eVar16';
      s.linkTrackEvents = 'None';
      s.prop16 = cus_link_name;
      s.eVar16 = cus_link_name;
      s.tl($(this), 'o', cus_link_name);
  	}
  });     // end a.click function
});         // end document.ready function
