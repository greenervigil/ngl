$.ajax({
	type : "POST",
	url : "exportAction" + location.search + "&runQuery=true",
	success : function(c) {
		var timer = setInterval(function() {
			$.ajax({
				type : "POST",
				url : "exportAction" + location.search + "&status=cheskStatus",
				success : function(d) {
					var a = $.parseJSON(d);
					if (typeof a != "null" && a.status == "complete") {
						clearInterval(timer);
						document.location.reload();
						setTimeout(function() {
							window.close();
						}, 5000);
					}
					else if (typeof a != "null" && a.status == "error") {
						clearInterval(timer);
						$("h4").html("An error occured, to many files requested for download.");
						spinner.stop();
					}
				}
			});
		}, 2000);
	}
});