
if(typeof jwplayer != "function"){
	var fileref = document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", location.protocol + "//cdn.cengage.com/js/jwplayer/6.8/jwplayer.js");
  document.getElementsByTagName("head")[0].appendChild(fileref);
}
(function ($) {
  $.fn.extend({
    player: function (options) { 
      var defaults = {
       	container: this,
        xml: null,
        json: null,
        width: 640,
        height: 360,
        key: null,
        stream: null,
        single: false,
        details: true,
        loop: false,
        callback:function(){}
    	};
      var opts = $.extend(defaults, options); 
      return this.each(function () {
        var o = $.meta ? $.extend({}, opts, $this.data()) : opts; 
        //Globals
				var container = o.container;
      	var tabs = false;
      	var playerSetup = false;
      	var display = "";
      	$(container).append('<div id="' + $(container).attr("player") + '"></div>');
				if(o.xml != null)
				{
					$.get(o.xml, function (xml) {
						if($("title", xml).length >= 1 && o.details){
							$(container).append('<h2></h2>');
						}
						if($("desc", xml).length >= 1 && o.details){
							$(container).append('<p class="vidDesc"></p>'); 
						}
						if($("video", xml).length == 1 || o.single)
						{
							display = 'style="display:none"';
						}
		        $('tab', xml).each(function (i) {
		          tab = $(this);
		          if($('tab', xml).length > 1 && !o.single)
		          {
		            if(i == 0 && $("video", xml).length > 1)
		            {
		            	tabs = true;
									$(container).append('<ul class="nav"></ul>');
		           	}
		            $(".nav", container).append('<li><a href="#tab' + i + '">' + tab.attr("title") + '</a></li>');
		          }
							$(container).append('<ul id="tab' + i +'" ' + display + ' class="tabPanel"></ul>');
		          $("video", this).each(function (j) {
              	var output = "";
              	if($("mp4", this).length > 0)
              	{
                	output += '<input type="hidden" class="mp4" name="' + $("mp4", this).text() + '" />';
                }
                if($("webm", this).length > 0)
                {
                	output += '<input type="hidden" class="webm" name="' + $("webm", this).text() + '" />';
                }
                if($("youtube", this).length > 0)
                {
                	output += '<input type="hidden" class="youtube" name="' + $("youtube", this).text() + '" />';
                }
                if($("srt", this).length > 0)
                {
                	output += '<input type="hidden" class="srt" name="' + $("srt", this).text() + '" />';
                }
                if($("txt", this).length > 0)
                {
                	output += '<input type="hidden" class="txt" name="' + $("txt", this).text() + '" />';
                }
                output += '<a href="#">';
                if($("img", this).length > 0)
                {
                	output += '<img title="Image of video" src="' + $("img", this).text() + '"  width="140px" height="79px" border="0">';
                }
                else if($("youtube", this).length > 0)
                {
                	output += '<img title="Image of video" src="' + getYoutubeImage($("youtube", this).text()) + '"  width="140px" height="79px" border="0">';
                }
                else
                {
                	output += '<img title="Image of video" src="//cdn.cengage.com/images/jwplayer/no_video_image.jpg"  width="140px" height="79px" border="0">';
                }
                if($("title", this).length > 0 && o.details)
                {
                	output += '<h3 title="' + $("title", this).text() + '">' + $("title", this).text() + '</h3>';
                }
                output += '</a>';
                if($("desc", this).length > 0 && o.details)
                {
                	output += '<p style="display:none" class="desc">' + $("desc", this).text() + "</p>";
                }
                if($("time", this).length > 0)
                {
                	output += '<p title="Length of video">' + $("time", this).text() + '</p>';
                }

                $("#tab" + i, container).append(
                  '<li class="jwplayer-video-thumbnail">' +
                   	output +
                  '</li>'
                );
              });
		        });
		        if(tabs)
		        {
		          $(container).tabs();
		        }
		        setup();
		      }).fail(function(){
			 			alert("Error occured when loading XML file");
			 		});
				}
				else if(o.json != null)
				{
					var output = "";
					$(container).append('<ul id="tab0" class="tabPanel" style="display:none"></ul>');
					if(o.json.mp4 != undefined)
					{
          	output += '<input type="hidden" class="mp4" name="' + o.json.mp4 + '" />';
          }
          if(o.json.webm != undefined)
          {
          	output += '<input type="hidden" class="webm" name="' + o.json.webm + '" />';
          }
          if(o.json.youtube != undefined)
          {
          	output += '<input type="hidden" class="youtube" name="' + o.json.youtube + '" />';
          }
          if(o.json.srt != undefined)
          {
          	output += '<input type="hidden" class="srt" name="' + o.json.srt + '" />';
          }
          if(o.json.txt != undefined)
          {
          	output += '<input type="hidden" class="txt" name="' + o.json.txt + '" />';
          }
          output += '<a href="#">';
          if(o.json.img != undefined)
          {
          	output += '<img title="Image of video" src="' + o.json.img + '"  width="140px" height="79px" border="0">';
          }
          else if(o.json.youtube != undefined)
          {
          	output += '<img title="Image of video" src="' + getYoutubeImage(o.json.youtube) + '"  width="140px" height="79px" border="0">';
          }
          else
          {
          	output += '<img title="Image of video" src="//cdn.cengage.com/images/jwplayer/no_video_image.jpg"  width="140px" height="79px" border="0">';
          }
          if(o.json.title != undefined && o.details)
          {
          	$(container).append('<h2></h2>');
          	output += '<h3 title="' + o.json.title + '">' + o.json.title + '</h3>';
          }
          output += '</a>';
          if(o.json.desc != undefined  && o.details)
          {
          	$(container).append('<p class="vidDesc"></p>'); 
          	output += '<p style="display:none" class="desc">' + o.json.desc + "</p>";
          }	
          $(".tabPanel", container).append(
            '<li class="jwplayer-video-thumbnail">' +
                  	output +
              '</li>'
          );
          setup();
				}
			
				function setup()
				{
          $(".jwplayer-video-thumbnail a h3").each(function () {
            if ($(this).text().length > 43) {
              $(this).html($(this).text().substring(0, 40) + "...");
            }
          });
          $(" .jwplayer-video-thumbnail a", o.container).click(function (e) {
          	$(this).parents("ul[id^=tab]").parent().find(".jwplayer-video-thumbnail").each(function(){
          		if($(this).hasClass("active-video-state"))
          			$(this).removeClass("active-video-state");
          	});
          	if(!$(this).parents(".jwplayer-video-thumbnail").hasClass("active-video-state")){
          		$(this).parents(".jwplayer-video-thumbnail").addClass("active-video-state");
          	}
            var video = $(this).parent(".jwplayer-video-thumbnail");
            var mp4 = $(".mp4", video).attr("name");
            var webm = $(".webm", video).attr("name");
            var youtube = $(".youtube", video).attr("name");
            var srt = $(".srt", video).attr("name");
            var txt = $(".txt", video).attr("name");
            var image = $("a img", video).attr("src");
            var title = $("a h3", video).attr("title");
            var desc = $(".desc", video).html();
            var playerId = $(video).parents($(o.container)).find("div[id^=jwplayer]").attr("id");
            var rtmp;
            if(o.stream == true)
            {
            	rtmp = getRtmp(mp4);
            }
            else if(o.stream != null && o.stream != false)
            {
            	rtmp = o.stream;
            }
            var playlist = new Array();
            var array = {};
            var sources = new Array();
						if(rtmp != undefined && youtube == undefined)
						{
							sources.push({file:rtmp});
						}
						if(mp4 != undefined)
						{
							sources.push({file:mp4});
						}
						if(webm != undefined)
						{
							sources.push({file:webm});
						}
						if(youtube != undefined)
						{
							sources.push({file:youtube});
						}
						array["sources"] = sources;
						if(srt != undefined)
						{
							var captions = new Array();
							captions.push({file:srt, label:"english", state:true});
							array["captions"] = captions;
						}
						if(image != undefined)
						{
							array["image"] = image;
						}
						else if(youtube == undefined)
						{
							array["image"] = location.protocol + "//cdn.cengage.com/images/jwplayer/no_video_image.jpg";
						}
						playlist.push(array);
		        $(this).parents("ul[id^=tab]").parent().find("h2").html(title);
	          $(this).parents("ul[id^=tab]").parent().find(".vidDesc").html(desc);

	          setupPlayer(playlist, txt, title, playerId); 
						e.preventDefault();
	        });
					
					if(typeof jwplayer == "function"){
	        	initVideo();
	        }else {
	        	var interval = setInterval(function(){
          		if(typeof jwplayer == "function"){
          			clearInterval(interval);
          			initVideo();
          		}
          	}, 500);
	        }
          o.callback();
        }

        function initVideo(){
        	var found = false;
          if(location.hash != "")
          {
          	$(".jwplayer-video-thumbnail").each(function(){
          		if($("a h3", this).text() != ""){
            		if(("#" + $("a h3", this).text().replace(/ /g, "").toUpperCase()).indexOf(location.hash.toUpperCase()) > -1){ 
            			var hash = location.hash;
            			$("a", this).click();
                  $("a", this).focus();
            			found = true;
            			if($("ul[id^=tab]").length > 0)
            			{
            				$("#" + $(this).parents("ul[id^=tab]").attr("id") + "-tab").click();
            				location.hash = hash;
            			}
            		}
          		}
          	});
          }
          if(!found)
          {
	          $(o.container).find(".jwplayer-video-thumbnail:first").children("a").click();
          }
        }

        function setupPlayer(playlist, txt, title, playerId) {
        	if(o.key != null)
	        {
	        	jwplayer.key = o.key;
	        }
        	var protocol = location.protocol;
          jwplayer(playerId).setup({
          	title: title,
          	//flashplayer: "//cdn.cengage.com/js/jwplayer/6.8/jwplayer.flash.swf",
          	//html5player: "//cdn.cengage.com/js/jwplayer/6.8/jwplayer.html5.js",
          	id:playerId,
            width: o.width,
            height: o.height,
            repeat: o.loop,
            //skin: protocol + '//s-cdn.cengage.com/js/jwplayer/skins/six-6.8.xml',
            primary: 'flash',
            playlist: playlist
	      	});
				  
          //pause other players when playing one
          jwplayer(playerId).onPlay(function(){
            $(".video-container").each(function(){
              console.log($(this).attr("player"));
              if($(this).attr("player") != playerId){
                jwplayer($(this).attr("player")).pause(true);
              }
            });
          });
					//Add transcript button
					if(txt != undefined)
					{
            jwplayer(playerId).onPlay(function(){
              jwplayer(playerId).addButton(
                protocol + "//cdn.cengage.com/images/jwplayer/transcriptIcon.png",
                "Download Transcript",
                function () {
                  window.open(txt);
                },
                "download"
              );
            });
          }

          if(title != undefined)
	        {
		        jwplayer(playerId).onReady(function () {
		  	      $("#jwp6").attr("title", title);
		        });
	        }
        }
            
        function getRtmp(val) {
         	if(val == undefined){ return null };
			    var string = val.split("/");
			    var rtmp = "rtmp://wowza.cengage.com:443/"+string[3]+"/mp4:";
			    for (i = 4; i < string.length; i++) {
			        rtmp += "/" + string[i];
			    }
			    return rtmp;
				}
				function gup(name, url) { name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]"); var regexS = "[\\?&]" + name + "=([^&#]*)"; var regex = new RegExp(regexS); var results = regex.exec(url); if (results == null) return ""; else return results[1]; }

				function getYoutubeImage(val) {
          if(val == undefined){ return null };
			    var string = gup("v", val);
			    var image = "http://img.youtube.com/vi/" + string + "/0.jpg";
			    return image;
				}
      });
    }
  });
})(jQuery);
