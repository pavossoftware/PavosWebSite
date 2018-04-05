// faq
$(document).ready(function (e) {
    if ($(".MainProduct ul li a").html() != null) {
            $(".FAQ .ui-accordion-header").eq(getIndex).trigger("click");
            $(".FAQ .ui-accordion-header").eq(getIndex).focus();
    }
    var qParam = getParameterByName('q');
    if (qParam != "") {
        $(".FAQ .ui-accordion-header").eq(qParam).focus();
    }
	$(function () {
	    if ($(".accordion").length) {
	        $(".accordion").accordion({
	            collapsible: true,
	            autoHeight: false,
	            navigation: true,
	            heightStyle: "content",
	            icons: { "header": "ui-icon-plus", "headerSelected": "ui-icon-minus" },
	            active: parseInt(qParam)
	        });
	    }
    });
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

jQuery(document).ready(function($){
	var overlayNav = $('.cd-overlay-nav'),
		overlayContent = $('.cd-overlay-content'),
		navigation = $('.cd-primary-nav'),
		toggleNav = $('.cd-nav-trigger');

	//inizialize navigation and content layers
	layerInit();
	$(window).on('resize', function(){
		window.requestAnimationFrame(layerInit);
	});

	//open/close the menu and cover layers
	toggleNav.on('click', function(){
		if(!toggleNav.hasClass('close-nav')) {
			//it means navigation is not visible yet - open it and animate navigation layer
			toggleNav.addClass('close-nav');

			overlayNav.children('span').velocity({
				translateZ: 0,
				scaleX: 1,
				scaleY: 1,
			}, 500, 'easeInCubic', function(){
				navigation.addClass('fade-in');
			});
		} else {
			//navigation is open - close it and remove navigation layer
			toggleNav.removeClass('close-nav');

			overlayContent.children('span').velocity({
				translateZ: 0,
				scaleX: 1,
				scaleY: 1,
			}, 500, 'easeInCubic', function(){
				navigation.removeClass('fade-in');

				overlayNav.children('span').velocity({
					translateZ: 0,
					scaleX: 0,
					scaleY: 0,
				}, 0);

				overlayContent.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					overlayContent.children('span').velocity({
						translateZ: 0,
						scaleX: 0,
						scaleY: 0,
					}, 0, function(){overlayContent.removeClass('is-hidden')});
				});
				if($('html').hasClass('no-csstransitions')) {
					overlayContent.children('span').velocity({
						translateZ: 0,
						scaleX: 0,
						scaleY: 0,
					}, 0, function(){overlayContent.removeClass('is-hidden')});
				}
			});
		}
	});

	function layerInit(){
		var diameterValue = (Math.sqrt( Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2))*2);
		overlayNav.children('span').velocity({
			scaleX: 0,
			scaleY: 0,
			translateZ: 0,
		}, 50).velocity({
			height : diameterValue+'px',
			width : diameterValue+'px',
			top : -(diameterValue/2)+'px',
			left : -(diameterValue/2)+'px',
		}, 0);

		overlayContent.children('span').velocity({
			scaleX: 0,
			scaleY: 0,
			translateZ: 0,
		}, 50).velocity({
			height : diameterValue+'px',
			width : diameterValue+'px',
			top : -(diameterValue/2)+'px',
			left : -(diameterValue/2)+'px',
		}, 0);
	}
});

// password
$(document).ready(function($) {
    $('#ksifre').strength({
        strengthClass: 'strength',
        strengthMeterClass: 'strength_meter',
        strengthButtonClass: 'button_strength',
    });
    $('#ysifre').strength({
        strengthClass: 'strength',
        strengthMeterClass: 'strength_meter',
        strengthButtonClass: 'button_strength',
    });
    $('#newpassword').strength({
        strengthClass: 'strength',
        strengthMeterClass: 'strength_meter',
        strengthButtonClass: 'button_strength',
    });
    $('.menu a[href="/<?php echo $mPage; ?>"], #footer-linkler a[href="/<?php echo $mPage; ?>"]').addClass('secili');

    $(window).bind("capsOn", function(event) {
        if ($('input[type="password"]:focus').length > 0) {
            $('input[type="password"]').after('<div class="capsWarning">Caps Lock aÃƒÂ§Ã„Â±k</div>');
        }
    });
    $(window).bind("capsOff capsUnknown", function(event) {
        $(".capsWarning").hide();
    });
    $('input[type="password"]').bind("focusout", function(event) {
        $(".capsWarning").hide();
    });
    $('input[type="password"]').bind("focusin", function(event) {
        if ($(window).capslockstate("state") === true) {
            $('input[type="password"]').after('<div class="capsWarning">Caps Lock aÃƒÂ§Ã„Â±k</div>');
        }
    });
    $(window).capslockstate();
});

// scroll
$(function() {
    $('.scrollBox').enscroll({
        showOnHover: true,
        verticalTrackClass: 'track3',
        verticalHandleClass: 'handle3'
    });
});

// girisForm
var validator = $("#girisForm").validate({
    rules: {
        username: "required",
        password: "required"
    },
    messages: {
        username: "HATA",
        password: "HATA"
    },
    // specifying a submitHandler prevents the default submit, good for the demo
    // set this class to error-labels to indicate valid fields

   highlight: function(element, errorClass) {
        $(element).parent().next().find("." + errorClass).removeClass("checked");
    }
});

// iletisimForm
var validator = $("#iletisimForm").validate({
    rules: {
        adsoyad: "required",
        gondereneposta: {
            required: true,
            email: true
        },
        mesaj: "required"
    },
    messages: {
        adsoyad: "HATA",
        gondereneposta: "HATA",
        mesaj: "HATA"
    },
    // specifying a submitHandler prevents the default submit, good for the demo
    // set this class to error-labels to indicate valid fields

    highlight: function(element, errorClass) {
        $(element).parent().next().find("." + errorClass).removeClass("checked");
    }
});

// kayitForm
var validator = $("#kayitForm").validate({
    rules: {
        username: "required",
        fullname: "required",
        email: {
            required: true,
            email: true
        },
        password: "required"
    },
    messages: {
        username: "HATA",
        fullname: "HATA",
        email: "HATA",
        password: "HATA"
    },
    // specifying a submitHandler prevents the default submit, good for the demo
    // set this class to error-labels to indicate valid fields

    highlight: function(element, errorClass) {
        $(element).parent().next().find("." + errorClass).removeClass("checked");
    }
});

// teklifForm
var validator = $("#teklifForm").validate({
    rules: {
        adsoyad: "required",
        telefon: "required",
        email: {
            required: true,
            email: true
        },
        adres: "required",
        aciklama: "required"
    },
    messages: {
        adsoyad: "HATA",
        telefon: "HATA",
        email: "HATA",
        adres: "HATA",
        aciklama: "HATA"
    },
    // specifying a submitHandler prevents the default submit, good for the demo
    // set this class to error-labels to indicate valid fields

    highlight: function(element, errorClass) {
        $(element).parent().next().find("." + errorClass).removeClass("checked");
    }
});

// sifreForm
var validator = $("#sifreForm").validate({
    rules: {
        email: {
            required: true,
            email: true
        }
    },
    messages: {
        email: "HATA"
    },
    // specifying a submitHandler prevents the default submit, good for the demo
    // set this class to error-labels to indicate valid fields

    highlight: function(element, errorClass) {
        $(element).parent().next().find("." + errorClass).removeClass("checked");
    }
});

// placeholder
if ($.browser.msie) {
    $('input[placeholder]').each(function() {

        var input = $(this);

        $(input).val(input.attr('placeholder'));

        $(input).focus(function() {
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        });

        $(input).blur(function() {
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        });
    });
};

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

// dropdownMenu
$(function() {

    $('.userLogin > a').click(function() {
        $(this).next('.dropdownMenu').toggle();
    });

    $(document).click(function(e) {
        var target = e.target;
        if (!$(target).is('.userLogin > a') && !$(target).parents().is('.userLogin > a')) {
            $('.dropdownMenu').hide();
        }
    });

});

// dropdownLogin
$('html').click(function() {
   $('.dropdownLogin').hide();
});

$('.loginClick').click(function(event){
     event.stopPropagation();
});

$('.login').click(function(event){
     $('.dropdownLogin').toggle();
});

// buyuk harf
function buyukHarf(iObj) {
    iObj.value = iObj.value.replace(/(^|\s)([ÃƒÂ¶ÃƒÂ§Ã…Å¸Ã„Å¸ÃƒÂ¼Ã„Â±a-hj-z])/g,
        function(met, gr1, gr2) {
            return gr1 + gr2.toUpperCase();
        }).replace(/(^|\s)([i])/g,
        function(met, gr1, gr2) {
            return gr1 + "Ã„Â°";
        });
}

// fancybox
$('[data-fancybox]').fancybox({
	youtube : {
		controls : 0,
		showinfo : 0
	},
	vimeo : {
		color : 'f00'
	}
});

// readMore
$(".read-more").click(function() {
    $(this).next('.readMoreContent').slideToggle("fast");
});

// fiyat
$(document).ready(function() {
  $('.pricing-table:nth-child(2)').addClass('pop-out');

  $('.pricing-table').hover(
    function() {
      if ( $(this).hasClass('pop-out') ) {
        /* do nothing */
      } else {
        $('.pricing-table').removeClass('pop-out');
        $(this).addClass('pop-out');
      }
    }, function() {
      $(this).removeClass('pop-out');
      $('.pricing-table:nth-child(2)').addClass('pop-out');
    }
  );
});

// fiyatliste
jQuery(document).ready(function($){
	//hide the subtle gradient layer (.cd-pricing-list > li::after) when pricing table has been scrolled to the end (mobile version only)
	checkScrolling($('.cd-pricing-body'));
	$(window).on('resize', function(){
		window.requestAnimationFrame(function(){checkScrolling($('.cd-pricing-body'))});
	});
	$('.cd-pricing-body').on('scroll', function(){
		var selected = $(this);
		window.requestAnimationFrame(function(){checkScrolling(selected)});
	});

	function checkScrolling(tables){
		tables.each(function(){
			var table= $(this),
				totalTableWidth = parseInt(table.children('.cd-pricing-features').width()),
		 		tableViewport = parseInt(table.width());
			if( table.scrollLeft() >= totalTableWidth - tableViewport -1 ) {
				table.parent('li').addClass('is-ended');
			} else {
				table.parent('li').removeClass('is-ended');
			}
		});
	}

	//switch from monthly to annual pricing tables
	bouncy_filter($('.cd-pricing-container'));

	function bouncy_filter(container) {
		container.each(function(){
			var pricing_table = $(this);
			var filter_list_container = pricing_table.children('.cd-pricing-switcher'),
				filter_radios = filter_list_container.find('input[type="radio"]'),
				pricing_table_wrapper = pricing_table.find('.cd-pricing-wrapper');

			//store pricing table items
			var table_elements = {};
			filter_radios.each(function(){
				var filter_type = $(this).val();
				table_elements[filter_type] = pricing_table_wrapper.find('li[data-type="'+filter_type+'"]');
			});

			//detect input change event
			filter_radios.on('change', function(event){
				event.preventDefault();
				//detect which radio input item was checked
				var selected_filter = $(event.target).val();

				//give higher z-index to the pricing table items selected by the radio input
				show_selected_items(table_elements[selected_filter]);

				//rotate each cd-pricing-wrapper
				//at the end of the animation hide the not-selected pricing tables and rotate back the .cd-pricing-wrapper

				if( !Modernizr.cssanimations ) {
					hide_not_selected_items(table_elements, selected_filter);
					pricing_table_wrapper.removeClass('is-switched');
				} else {
					pricing_table_wrapper.addClass('is-switched').eq(0).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
						hide_not_selected_items(table_elements, selected_filter);
						pricing_table_wrapper.removeClass('is-switched');
						//change rotation direction if .cd-pricing-list has the .cd-bounce-invert class
						if(pricing_table.find('.cd-pricing-list').hasClass('cd-bounce-invert')) pricing_table_wrapper.toggleClass('reverse-animation');
					});
				}
			});
		});
	}
	function show_selected_items(selected_elements) {
		selected_elements.addClass('is-selected');
	}

	function hide_not_selected_items(table_containers, filter) {
		$.each(table_containers, function(key, value){
	  		if ( key != filter ) {
				$(this).removeClass('is-visible is-selected').addClass('is-hidden');

			} else {
				$(this).addClass('is-visible').removeClass('is-hidden is-selected');
			}
		});
	}
});
