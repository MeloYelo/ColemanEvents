

$(document).ready(function () {
	$(".datepicker").datepicker();
	$(".confirm").on("click", function () {
		var confirmText = $(this).data("confirmText");
		return confirm(confirmText);
	});
	$(".button").button();
});