function getQueryString() {
    var search = unescape(location.search);
    search = search.substr(1);
    return search;
}

function RemoveUrlParameter(urlString, removeParam) {
    var url = "";
    var parmaters = urlString.split("&")

    for (i = 0; i < parmaters.length; i++) {

        if (!parmaters[i].match("^" + removeParam)) {
            if (url.length > 0) {
                url = url + "&" + parmaters[i]
            }
            else {
                url = parmaters[i];
            }
        }
    }
    return url;
}

$(document).ready(function(){
	$(".resultsListHeader #CNS").on("change", function(){
		var urlQueryString = getQueryString();
		location.href = "?" + RemoveUrlParameter(urlQueryString, 'Nrpp') + '&Nrpp=' + $(this).val();
	});

	$(".resultsListHeader #SB").on("change", function(){
		var urlQueryString = getQueryString();
		var urlState;
		if($(this).val() != ""){
			urlState = RemoveUrlParameter(urlQueryString, 'Ns') + '&Ns=' + $(this).val();
		}else{
			urlState = RemoveUrlParameter(urlQueryString, 'Ns');
		}
		location.href = "?" + urlState;
	});
});