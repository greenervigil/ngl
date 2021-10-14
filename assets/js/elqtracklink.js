// JavaScript Document

var trackOutboundLink = function(url, new_window) {
  ga('send', 'event', 'outbound', 'click', url, {'hitCallback':
    function () {
      if (!new_window) {
        document.location = url;
      }
    }
  });
  if (new_window){
    window.open(url);
  }
}