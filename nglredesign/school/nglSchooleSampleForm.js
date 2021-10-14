/* Form validators */
$("#eSampleForm").bootstrapValidator({
	fields: {
		zip: {
			validators: {
				notEmpty: {
					message: 'Please supply your zip code'
				},
				zipCode: {
					country: 'US',
					message: 'Please supply a vaild zip code'
				}
			}
		},
		email: {
			validators: {
				notEmpty: {
					message: 'Please supply your email address'
				},
				emailAddress: {
					message: 'Please supply a valid email address'
				}
			}
		},
		age: {
			validators: {
				notEmpty: {
					message: 'Please confirm your Age'
				}
			}
		}
	}
});

/* Post form submission */
$('#eSampleForm').on('submit', function (event) {
	var empty = false;
	$(".required").each(function () {
		if (!$(this).val().length > 0) {
			empty = true;
		}
	});
	if (empty) {
		$('#formSubmit').attr('disabled', 'disabled');
		event.preventDefault();
	} else {
		$('#eSampleForm').unbind('submit').submit();

		/* Close modal on submitting form */
		$('#viewesamleModal').modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();

		setTimeout(function () {
			/* Reset form */
			$('.form-group').removeClass('has-success');
			$('#eSampleForm')[0].reset();
		}, 200);

	}
});

/* Seeting value to ip field */
$.get("https://ipinfo.io", function (response) {
	$("#ip").val(response.country);
}, "jsonp");

/* Setting value to isbn field */
function setISBN13(isbn13) {
	$("#bookisbn").val(isbn13);
}

var _elqQ = _elqQ || [];
var timerId = null, timeout = 5;
function WaitUntilCustomerGUIDIsRetrieved() {
	if (!!(timerId)) {
		if (timeout == 0) {
			return;
		}
		if (typeof this.GetElqCustomerGUID === 'function') {
			$("#elqCustomerGUID").val(GetElqCustomerGUID());
			return;
		}
		timeout -= 1;
	}
	timerId = setTimeout("WaitUntilCustomerGUIDIsRetrieved()", 500);
	return;
};
window.onload = WaitUntilCustomerGUIDIsRetrieved;
_elqQ.push(['elqGetCustomerGUID']);



