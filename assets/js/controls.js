var global_play_flag = false;

$(window).on("load",function(){
  if(global_play_flag)return;
  resize_play();
})

$(window).on("resize",function(){
  if(global_play_flag)return;
  resize_play();
})



function resize_play(){
  let x = $(".controller");
  x.each(function() {
    if (this.id == "play-pause") {
      return true;
    }
    $(this).hide();
  })
  let vid_height = $("#video-player").height();
  let vid_width = $("#video-player").width();
  let dyn_width = vid_width / 5;
  $(".video-controls").css({
    "bottom": vid_height / 2 + (dyn_width / 2),
    "width": dyn_width,
    "height": dyn_width,
    "left": (vid_width / 2) - (dyn_width / 2),
    "border-radius": "50%"
  });
}

$(document).ready(function() {
  let vid = $("#video-player").get(0);
  let muted_flag = false;
  hackflag = true;
  hackflag2 = true;
  let volume_bar = $("#volume-bar");
  volume_bar.prop("value", 1);

  let last_volume = volume_bar.prop("value");
  let seek_bar = $("#seek-bar");
  seek_bar.prop("value", 0);





  $(".video-controls").mouseover(function() {
    $(this).stop(true);
    $(".video-controls").animate({
      opacity: 1
    }, 0);
  });

  $("#video-player").mouseleave(function() {
    $(".video-controls").stop(true);
    if (vid.paused) return;
    $(".video-controls").animate({
      opacity: 0
    }, 750);
  });

  $(".video-controls").mouseleave(function() {
    $(this).stop(true);
    if (vid.paused) return;
    $(".video-controls").animate({
      opacity: 0
    }, 750);
  });

  $("#video-player").on("click", play_pause);


  $("#play-pause").on("click", play_pause);

  function play_pause() {

    if (vid.paused) {
      if(!global_play_flag){

        let x = $(".controller");

        // let vid_height = $("#video-player").height();
        // let vid_width = $("#video-player").width();
        // let dyn_width = vid_width / 5;
          $(".video-controls").css({
            "bottom": "64px",
            "width": "100%",
            "height": "60px",
            "left": "",
            "border-radius": "10px"
        });
        x.each(function() {
          if (this.id == "play-pause") {
            return true;
          }
          $(this).show(600);
        });
        global_play_flag = true;
      }
      else{

      }

      vid.play();

    } else {
      vid.pause();

    }
  }

  $("#mute").on("click", function() {
    toggleMute();

  });

  function toggleMute() {
    vid.muted = !vid.muted;
    $("#sound_on").toggle();
    $("#muted").toggle();
  }

  $("#full-screen").on("click", function() {
    if (vid.requestFullscreen) {
      vid.requestFullscreen();
    } else if (vid.mozRequestFullScreen) {
      vid.mozRequestFullScreen(); // Firefox
    } else if (vid.webkitRequestFullscreen) {
      vid.webkitRequestFullscreen(); // Chrome and Safari
    }
  });


  seek_bar.on("input", function() {
    let time = Math.floor(vid.duration) * (seek_bar.val() / 100);
    //alert(time);
    let mins = Math.floor(time / 60);
    let secs = Math.floor(time % 60);
    $("#min-time").text(mins);
    if (secs < 10) {
      $("#sec-time").text("0" + secs);
    } else {
      $("#sec-time").text(secs);
    }

    vid.currentTime = time;
  });
  //bool is whether or not this call came from a mute button onclick
  //mute is whether or not we need to mute the slider
  vid.onpause = function() {
    // alert("paused");
    $("#play_btn").show();
    $("#pause_btn").hide();
    $(".video-controls").stop(true);
    $(".video-controls").animate({
      opacity: 1
    }, 0);
    // $("#play_btn").toggle();
    // $("#pause_btn").toggle();
  }
  vid.onplay = function() {
    // $("#play_btn").toggle();
    // $("#pause_btn").toggle();
    if (hackflag) {
      $("#pause_btn").css("visibility", "visible");
      hackflag = false;

      if ($("#total-dur").text() == "0:00") {
        let dur = vid.duration;
        let mins = Math.floor(dur / 60);
        let secs = Math.round(dur % 60);

        if (secs < 10) {
          $("#total-dur").text(mins + ":0" + secs);
        } else {
          $("#total-dur").text(mins + ":" + secs);
        }
      }


    }

    $("#play_btn").hide();
    $("#pause_btn").show();
    $(".video-controls").stop(true);
    $(".video-controls").animate({
      opacity: 0
    }, 750);

  }

  volume_bar.on("input", function() {
    vid.volume = volume_bar.prop("value");


  });



  vid.ontimeupdate = function() {
    let ct = Math.floor(vid.currentTime);
    let value = Math.round((100 / vid.duration) * ct);
    let mins = Math.floor(ct / 60);
    let secs = Math.floor(ct % 60);
    $("#min-time").text(mins);
    if (secs < 10) {
      $("#sec-time").text("0" + secs);
    } else {
      $("#sec-time").text(secs);
    }

    seek_bar.prop("value", value);
  };




  vid.onvolumechange = function() {
    if (vid.muted) {
      if (hackflag2) {
        $("#muted").css("visibility", "visible");
        hackflag2 = false;
      }
      $("#sound_on").hide();
      $("#muted").show();
    } else {
      $("#sound_on").show();
      $("#muted").hide();
    }
    volume_bar.prop("value", vid.volume);


  };

  vid.ondurationchange = function() {
    let dur = vid.duration;
    let mins = Math.floor(dur / 60);
    let secs = Math.round(dur % 60);

    if (secs < 10) {
      $("#total-dur").text(mins + ":0" + secs);
    } else {
      $("#total-dur").text(mins + ":" + secs);
    }
  };





});
