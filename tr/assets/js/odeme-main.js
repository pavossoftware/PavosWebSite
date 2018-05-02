// total
$(document).ready(function() {
	
	console.log($("#order_agreement").is(":checked"));
	calculateTotal();
	$(".kargoFiyat-li").hide();
	$(".kapidaOdemeFiyat-li").hide();

    $(".decrease").click(function() {
        var num_input = $(this).next('#number');
        var num = parseInt(num_input.val(), 10);
        num = isNaN(num) ? 0 : num;
        num < 1 ? num = 1 : '';
        num--;
        num_input.val(num);
    });

    $(".increase").click(function() {
        var num_input = $(this).prev('#number');
        var num = num_input.val();
        num = isNaN(num) ? 0 : num;
        num++;
        num_input.val(num);
    });
	
	var $myGroup = $('#accordion');
	
	$myGroup.on('hide.bs.collapse', '.collapse', function() {
		var pb = $myGroup.find('.collapse.in');
		
		if (pb.attr("id") != "collapsePayment") {
			if (checkPayBox(pb.attr("id")) == false) {
				return false
			}
		}
	});
	
	$myGroup.on('show.bs.collapse','.collapse', function() {		
		var pb = $myGroup.find('.collapse.in');

		$(pb.attr("id")).collapse({
			toggle: false
		});
		
		if (pb.attr("id") == "collapsePayment") {
			$myGroup.find('.collapse.in').prev('.checkoutBoxHeader').removeClass('active');
			$(this).prev('.checkoutBoxHeader').addClass('active');
			$myGroup.find('.collapse.in').collapse('hide');
			
			return true;
		} else {
			
			if (checkPayBox(pb.attr("id")) == false) {
				return false
			} else {
				$myGroup.find('.collapse.in').prev('.checkoutBoxHeader').removeClass('active');
				$(this).prev('.checkoutBoxHeader').addClass('active');
				$myGroup.find('.collapse.in').collapse('hide');
			}
		}
	});
	
	$('.collapse').on('shown.bs.collapse', function(){
		if ($(this).parent().find("a span").hasClass("toggleHeader") == false)
			$(this).parent().find("a").append('<span class="toggleHeader toggleHeaderOff"></span>');
		else
			$(this).parent().find(".toggleHeader").addClass("toggleHeaderOff");
	}).on('hidden.bs.collapse', function(){
		$(this).parent().find(".toggleHeader").removeClass("toggleHeaderOff");
	});
	
	$(".next-level").on("click", function(event) {
		event.preventDefault();
		var pb = $(this).closest("section");
		
		if (checkPayBox(pb.attr("id")) == false) {
			return false
		}
		
		scrollWindowToElement(pb);
	});

	// kargo kaldırırsan önüne // koy
	$('#collapseCargo .checkBoxSelect').find("input[type='checkbox']").change(function() {
		var kargoID = $(this).attr("id");
		if (kargoID === "surat" || kargoID === "mng") {
			$("#payment-kapi").prop("disabled", true);
			$("#payment-kapi").next(".checkTitle").css("text-decoration", "line-through");

			if ($(".paymentDoor").hasClass('active')) {
				$(".paymentDoor").removeClass('active');
				$(".paymentCreditCard").addClass('active');
				
				if ($("#payment-kapi").prop('checked')) {
					$("#payment-kapi").prop('checked', false);
					$("#payment-kk").prop('checked', true);
				}
			}
		} else {
			$("#payment-kapi").prop("disabled", false);
			$("#payment-kapi").next(".checkTitle").css("text-decoration", "none");
		}
		
		var kargoFiyat = $("#kargoFiyat-" + kargoID).val();
		
		$(".kargoFiyat-li .payment-discount").text(parseFloat(kargoFiyat).toFixed(2));
		$(".kargoFiyat-li .payment-discount").data("amount", parseFloat(kargoFiyat).toFixed(2));
		$(".kargoFiyat-li").show();

		$(".payment-list li.last .payment-num").text(calculateTotal());
		$('input[name="total"]').val(calculateTotal());
	});
	// kargo kaldırırsan önüne // koy
	
	$('.paymentTypesContainer .checkBoxSelect').find("input[type='checkbox']").change(function() {
		console.log($(this));
		var odemeID = $(this).attr("id");
		console.log(odemeID);
		
		if (odemeID == "kapidaOdemeFiyat-kk" || odemeID == "kapidaOdemeFiyat-nakit") {
			if ($(this).is(":checked")) {
				var odemeFiyat = $("#" + odemeID + "-input").val();
				
				$(".kapidaOdemeFiyat-li .payment-discount").text(parseFloat(odemeFiyat).toFixed(2));
				$(".kapidaOdemeFiyat-li .payment-discount").data("amount", parseFloat(odemeFiyat).toFixed(2));
				$(".kapidaOdemeFiyat-li").show();

				$(".payment-list li.last .payment-num").text(calculateTotal());
				$('input[name="total"]').val(calculateTotal());
			} else {
				$(".kapidaOdemeFiyat-li .payment-discount").text("0.00");
				$(".kapidaOdemeFiyat-li .payment-discount").data("amount", "0.00");
				$(".kapidaOdemeFiyat-li").hide();

				$(".payment-list li.last .payment-num").text(calculateTotal());
				$('input[name="total"]').val(calculateTotal());
			}
		} else {
			$(".kapidaOdemeFiyat-li .payment-discount").text("0.00");
			$(".kapidaOdemeFiyat-li .payment-discount").data("amount", "0.00");
			$(".kapidaOdemeFiyat-li").hide();

			$(".payment-list li.last .payment-num").text(calculateTotal());
			$('input[name="total"]').val(calculateTotal());
		}
	});
	

	$('.paymentTypesWrapper').find("input[type='checkbox']").change(function() {
		var igID = $(this).data("ig");
		
		$('.paymentTypesContainer .active').removeClass('active');
		$('.paymentTypesContainer .' + igID).addClass('active');
		
		if (igID == "paymentCreditCard") {
			$(".paymentTypesContainer input:checked").prop("checked", false).trigger("change");
		}
	});
	
	
	$('input[type=radio][name=address_type]').change(function() {
		$('.company-options').toggleClass('show', 'hide');
	});
	
	$('#accept-agreement').click(function() {
		$('#order_agreement').prop('checked', true);
		$('#agreementModal').modal('hide');
	});
	
	$('#print-agreement').click(function() {
		$('iframe[name="print_agreement_modal"]').remove();
		var $iframe = $('<iframe name="print_agreement_modal" class="sr-only" />').appendTo("#agreementModal");
		var html = $("#agreementModal").find(".agreement-box > .inner").html();
		var styles = ["<style>"];
		styles.push("body{padding:30px}");
		styles.push("table{width:100%;margin:30px 0;font-family:verdana,arial,sans-serif;font-size:11px;color:#333;border-width:1px;border-color:#666;border-collapse:collapse}table th{border-width:1px;padding:8px;border-style:solid;border-color:#666;background-color:#dedede}table td{border-width:1px;padding:8px;border-style:solid;border-color:#666;background-color:#fff}");
		styles.push(".pagebreak{page-break-before:always}");
		styles.push("</style>");
		$iframe.contents().find("head").append(styles.join("\n"));
		$iframe.contents().find("title").text("Mesafeli SatÄ±ÅŸ SÃ¶zleÅŸmesi");
		$iframe.contents().find("body").html(html);
		$iframe.contents().find(".ng-hide").remove();
		window.frames["print_agreement_modal"].focus();
		window.frames["print_agreement_modal"].print()
	});
});

// toggleAdress
$(".toggleAdress").click(function() {
    $(this).next('.adressListBottom').slideToggle("fast");
    $(this).toggleClass('toggleAdressoff');
});

// tooltip
$(document).ready(function() {
    $('body').tooltip({
        selector: '[data-toggle=\'tooltip\']',
        container: 'body'
    }).popover({
        selector: '[data-toggle=\'popover\']',
        container: 'body',
        html: true
    });
});

// phone
jQuery(function($) {
    $("#address_telephone").mask("0(999) 999 99 99");
    $("#address_gsm").mask("0(599) 999 99 99");
});

// cart
$(function() {
    var offset = $(".checkoutRight").offset();
    var topPadding = 30;
    $(window).scroll(function() {
    	if ($(window).scrollTop() > offset.top) {
    		$(".checkoutRight").stop().animate({
    			marginTop: $(window).scrollTop() - offset.top + topPadding
    		});
    	} else {
    		$(".checkoutRight").stop().animate({
    			marginTop: 0
    		});
    	};
    });
});

// checkbox
$("input:checkbox").on('click', function() {
  var $box = $(this);
  if ($box.is(":checked")) {
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    $(group).prop("checked", false);
    $box.prop("checked", true);
  } else {
    $box.prop("checked", false);
  }
});


function checkPayBox(id) {
    var $id = $("#" + id);
    switch (id) {
        case "collapseDelivery":
        case "collapseBilling":
			if ($id.find("input[type='checkbox']").is(':checked')) {
				return true
			} else {
				var message = id == "collapseDelivery" ? "Teslimat adresi seçmelisiniz!" : "Fatura adresi seçmelisiniz!";
				$("#modal-hata .modal-body p").text(message);
				$("#modal-hata").modal("show");
				return false
            }
            break;
		// kargo kaldırırsan önüne // koy
        case "collapseCargo":
            if ($id.find("input[type='checkbox']").is(':checked')) {
                return true
            } else {
                var message = "Bir kargo firması seçmelisiniz.";
				$("#modal-hata .modal-body p").text(message);
				$("#modal-hata").modal("show");
                return false
            }
            break;
		// kargo kaldırırsan önüne // koy
        case "collapsePayment":
            if ($id.find(".paymentTypesWrapper").find("input[type='checkbox']").is(':checked')) {
				if ($id.find(".paymentCreditCard").hasClass("active")) {
					if ($id.find("input[name='name']").val().length === 0) {					
						var message = "Kart Üzerindeki İsim boş kalamaz.";
						$("#modal-hata .modal-body p").text(message);
						$("#modal-hata").modal("show");
						$id.find("input[name='name']").addClass('input-hata');
						setTimeout(function() { $id.find("input[name='name']").removeClass('input-hata'); }, 2000);
						return false
					}
					if ($id.find("input[name='number']").val().length === 0) {					
						var message = "Kart Numarası boş kalamaz.";
						$("#modal-hata .modal-body p").text(message);
						$("#modal-hata").modal("show");
						$id.find("input[name='number']").addClass('input-hata');
						setTimeout(function() { $id.find("input[name='number']").removeClass('input-hata'); }, 2000);
						return false
					}
					if ($id.find("input[name='cvc']").val().length === 0) {					
						var message = "CVV2 boş kalamaz.";
						$("#modal-hata .modal-body p").text(message);
						$("#modal-hata").modal("show");
						$id.find("input[name='cvc']").addClass('input-hata');
						setTimeout(function() { $id.find("input[name='cvc']").removeClass('input-hata'); }, 2000);
						return false
					}
				}
				
				if ($id.find(".paymentTransfer").hasClass("active")) {
					if ($id.find(".paymentTransfer").find("input[type='checkbox']").is(':checked') == false) {
						// return true
					// } else {
						var message = "Banka seçmelisiniz.";
						$("#modal-hata .modal-body p").text(message);
						$("#modal-hata").modal("show");
						return false
					}
				}
				
				if ($id.find(".paymentDoor").hasClass("active")) {
					if ($id.find(".paymentDoor").find("input[type='checkbox']").is(':checked') == false) {
						// return true
					// } else {
						var message = "Kapıda ödeme yöntemi seçmelisiniz.";
						$("#modal-hata .modal-body p").text(message);
						$("#modal-hata").modal("show");
						return false
					}
				}
				
				if ($("#order_agreement").is(":checked") == false) {
					// return true
				// } else {
					var message = "Mesafeli satış sözleşmesini onaylamalısınız.";
					$("#modal-hata .modal-body p").text(message);
					$("#modal-hata").modal("show");
					return false
				}

                return true
            } else {
                var message = "Bir ödeme yöntemi seçmelisiniz.";
				$("#modal-hata .modal-body p").text(message);
				$("#modal-hata").modal("show");
                return false
            }

            break;
    }
}

function scrollWindowToElement (el) {
	$("html, body").animate({ scrollTop: el.offset().top }, 200)
}

function calculateTotal() {
	var total = parseFloat($('input[name="subtotal"]').val());
	
	$('.payment-list .payment-discount').each(function(el) {
		if ($(this).attr('data-amount')) {
			total = total + + parseFloat($(this).data("amount"));
		}
	});
	
	return parseFloat(total).toFixed(2);
}