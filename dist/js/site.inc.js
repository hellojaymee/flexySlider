// =============================================================================
//	Imports
// =============================================================================
/* Function that updates the value field of text inputs */
function updateValue(input, text) {
	input.val(text);

	if(input.val() === null) {
		input.val(text);
	}
	input.focus(function() {
		if(input.val() === text) {
			input.val("");
		}
	});
	input.blur(function() {
		if(input.val() === null || input.val() === "") {
			input.val(text);
		}
	});
}

// =============================================================================
//  Background Image
//  =================
//  Function that applies the first image to the background of the element with options
//  -----------------
/*

  element: class to target
  options: background options
  hide: 1 for <img> only, 2 for entire .image div

  examples:
  backgroundImage($(".has-bg"), "center center / cover no-repeat", 2);
  backgroundImage($(".has-bg__collection li"), "center center / cover no-repeat", 2);
  backgroundImage($(".has-bg-li__collection li .collection-item-image"), "center center / cover no-repeat", 1);

*/
//  -----------------
// ==============================================================================
function backgroundImage(element, options, hide) {
	$( element ).each(function() {
    var imgSrc = $(this).find('img').first().attr('src');

    if (imgSrc) {
      if ( hide == 1 ) {
        $(this).find('img').first('img').hide();
      }
      else {
        $(this).find('img').parent('.image, .spotlight-image').hide();
      }
      $(this).css('background', 'url('+imgSrc+')' + options);
    }

 });
}

// =============================================================================
//  Body Class Toggler
//  =================
//  function that takes an element and applies a class when clicked
//  -----------------
//  example:
//  bodyClassToggler('mobile_menu', 'mobile_menu_is_visible');
//  -----------------
// ==============================================================================
function bodyClassToggler(element, elemClass){
	$(element).on('click', function(){
		$('body').toggleClass(elemClass);
	});
}

/* Placeholders function that puts the label as a placeholder in input type text, textarea, and option 
/* To use replace 'form' with whatever you want to target, 'form' will do all forms on site:
//=============================================
/* placeHolders('form');
//=============================================*/

function placeHolders(form) {


  $(form).find('.portal-login div, .form-row, .e2ma_signup_form_row').each(function() {

    //if form has class
    if($(form).hasClass('fdpc_designready_order_form')) {
      return;
    }

    //if 'this' has class
    if($(this).hasClass('form-row--sub-options')) {
      return;
    }
    if($(this).hasClass('form-row--file')) {
      return;
    }
    if($(this).hasClass('form-row--date')) {
      return;
    }
    if($(this).hasClass('form-row--datetime')) {
      return;
    }
    if($(this).hasClass('form-row--time')) {
      return;
    }
    if($(this).hasClass('payment--cc-exp')) {
      return;
    }

    //if any parents have classes
    if ($(this).parents('.checkout_process, .event-calendar-search__jump').length) {
      return;
    }

    var label = $(this).find('.form-row__label label, .e2ma_signup_form_label');
    var input = $(this).find('.form-row__controls input[type="text"], .form-row__controls input[type="email"], .form-row__controls input[type="password"], .e2ma_signup_form_element input[type="text"]');
    var textarea = $(this).find('textarea');
    var text = $.trim(label.text()).replace(/ +(?= )/g,'');
    var isRequired = false;

    if($(this).hasClass('form-row--required')) {
      isRequired = true;
    }

    if(isRequired) {
      text = text + ' *';
    }

    if (!text) {
      return;
    }

    if(input.length) {
      $(input).attr("placeholder", text);
      label.hide();
      $(this).find('.form-row__label').hide();
    }

    if(textarea.length) {
      $(textarea).attr("placeholder", text);
      label.hide();
      $(this).find('.form-row__label').hide();
    }

    //show things that should be showing
    if( $(this).hasClass('payment--cc-csc') ){
      $(this).find('.form-row__label').show();  
    }

  });
}

// ================================================================================================
//  Accordian Menu
//  =================
//  applies accordian functionality to any nav with class accordian
// ================================================================================================
$(document).ready(function() {

	if( $('nav.accordian').length > 0 ) {

		$('nav.accordian').find('ul').children('li').has('ul').each(function() {
			$(this).children('a').append('<span class="accordian_toggle"></span>');
			if( $(this).hasClass('nav__list--here') ) {
				$(this).addClass('accordian_open');
				$(this).closest('li').children('ul').slideDown();
			}
		});

		$('span.accordian_toggle').click(function(n) {
			n.preventDefault();
			if (!$(this).closest('li').hasClass('accordian_open')) {
				$(this).closest('li').siblings().removeClass('accordian_open').children('ul').slideUp();
				$(this).closest('li').addClass('accordian_open');
				$(this).closest('li').children('ul').slideDown();
			} else {
				$(this).closest('li').removeClass('accordian_open').children('ul').slideUp();
			}
		});

	}

});

// =============================================================================
// Nav Checker
// =============
// get the combined widths of mutlitple elements and 
// check to see if it is greater than the containers width
// =============================================================================

      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // call function outside of $(document).ready
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      // examples
      //========================================
      // $('header .wrap').navChecker({
      //   activeClass: 'added-class',
      //   children: [$('nav.dropdown > ul > li')],
      //   targets: [$('body'), $('.search-block')],
      //   minWidth: 1024
      // });
      //========================================

      // default settings
      //========================================      
      // $('header .wrap').navChecker();
      //========================================

// =============================================================================
// activeClass: the class that is added to 'targets', default "desktop-nav-is-too-wide"
// children: array of jquery elements to calc widths, defaults to all direct children
// targets: array of jquery elements that 'activeClass' is applied
// minWidth: minimum width of window. if window is less than this number the activeClass will be applied.
// =============================================================================

(function ($, window, document, undefined) {
  var pluginName = 'navChecker';

  function NavChecker(el, options, sel) {
    this.$el = $(el);
    this.selector = sel;
    
    var defaults = {
      activeClass: 'desktop-nav-is-too-wide',
      children: [],
      childrenWidth: 0,
      targets: [$('body')],
      minWidth: 0
    };

    this.options = $.extend({}, defaults, options);

    this.init();
  }


  NavChecker.prototype = {

        // Initialize children and events
        init: function () {
          var plugin = this;

          // If children are not set, get this elements direct children'
          if (plugin.options.children.length === 0) {
            plugin.options.children.push(plugin.$el.children());
          }

          plugin.initEvents();
          plugin.checkSize();
        },

        // Events here
        initEvents: function () {
          var plugin = this;

          $(window).resize(function () {
            plugin.checkSize();
          });
          $(window).load(function(){
            plugin.checkSize();
          });
          $(document).ready(function(){
            plugin.getChildren();
            plugin.checkSize();
          });
        },

        // add all children widths together
        getChildren: function () {
          var plugin = this;
          plugin.options.childrenWidth = 0;

          $.each(plugin.options.children, function (index, child) {
            child.each(function () {
              plugin.options.childrenWidth += $(this).outerWidth();
            });
          });
        },

        // run comparison of childrenWidth and containerWidth
        checkSize: function () {
          var plugin = this;
          var containerWidth = plugin.$el.width();
          
          if ($(window).width() > plugin.options.minWidth) {
            if (plugin.options.childrenWidth >= containerWidth ) {
              plugin.updateClasses('add');
            } else {
              plugin.updateClasses('remove');
            } 
          } else {
            plugin.updateClasses('add');
          }

        },

        // Add or remove 'activeClass' to 'targets'
        updateClasses: function (operation) {
          var plugin = this;

          $.each(plugin.options.targets, function (index, target) {
            if (operation == 'remove') {
              target.removeClass(plugin.options.activeClass);
            } else {
              target.addClass(plugin.options.activeClass);
            }
          });
        }

      };

      $.fn[pluginName] = function (options) {
        var sel = this.selector;
        return this.each(function () {
          if (!$.data(this, pluginName)) {
            $.data(this, pluginName, new NavChecker(this, options, sel));
          }
        });
      };

    })(jQuery, window, document);

//textWrapper
// wraps text in div with class name

// example
// textWrapper($(".testimonial-container"), ".collection-item-description", "*", "collection-item-quote");
//

function textWrapper(targetContainer, target, separator, wrapClass ) {
  $(targetContainer).each(function() {
    $(this).find(target).html(function (i, html) {
      if ( $(this).text().indexOf(separator) >= 0 ){
        splitText = $(this).text().split(separator);
        formattedText =  splitText[0] + '<span class="'+wrapClass+'">' + splitText[1] + "</span>" ;
        $(this).html(formattedText);
      }  
    }); 
  });
}

// =============================================================================
//  fireslider settings
//==============================================================================

  //-------------------------------------  
  //  carousel
  //-------------------------------------
  // $(".js-slider--carousel .js-slider__contents > ul").each(function(){
  //   $(this).fireSlider({
  //     delay:7500,
  //     disableLinks:false,
  //     show:3,
  //     active:2,
  //     effect:"fadeInOut",
  //     activeSlideClass:"slide--active",
  //     activePagerClass:"slider__pager--active",
  //     breakpoints:sliderCarouselBreakpoints,
  //     pager:$(this).parents(".slider__contents").siblings(".slider__pager"),
  //     prev:$(this).parents(".slider__contents").siblings(".slider__nav").find(".slider-nav--prev"),
  //     next:$(this).parents(".slider__contents").siblings(".slider__nav").find(".slider-nav--next")
  //   })
  // });


  //-------------------------------------
  //  NO carousel
  //-------------------------------------
  // $(".js-slider--no-carousel .js-slider__contents > ul").each(function(){
  //   $(this).fireSlider({
  //     delay:7500,
  //     disableLinks:false,
  //     show:1,
  //     active:1,
  //     effect:"fadeInOut",
  //     activeSlideClass:"slide--active",
  //     activePagerClass:"slider__pager--active",
  //     pager:$(this).parents(".slider__contents").siblings(".slider__pager"),
  //     prev:$(this).parents(".slider__contents").siblings(".slider__nav").find(".slider-nav--prev"),
  //     next:$(this).parents(".slider__contents").siblings(".slider__nav").find(".slider-nav--next")
  //   })
  // });


  //-------------------------------------
  //  breakpoints example
  //-------------------------------------
  // var bps = [
  //     {breakpoint: 1, show: 1, active: 1},
  //     {breakpoint: 640, show: 2, active: 1},
  //     {breakpoint: 1000, show: 4, active: 2}
  // ];



// Spotlight Slider
if ( $('.spotlight-container ul > li').length > 1 ) {
  $('.spotlight-container ul').each(function() {
   $(this).fireSlider({
     delay: 8000,
     prev:$(this).parents(".slider__contents").siblings(".slider__controls").find(".slider-nav--prev"),
     next:$(this).parents(".slider__contents").siblings(".slider__controls").find(".slider-nav--next")
   });
 });
}



// Logos Slider
var bps = [
    {breakpoint: 1, show: 1, active: 1},
    {breakpoint: 640, show: 2, active: 1},
    {breakpoint: 800, show: 3, active: 1},
    {breakpoint: 1000, show: 4, active: 2}
];

if ( $('.logos-container ul > li').length > 1 ) {
  $('.logos-container ul').fireSlider({
    active: 2,
    delay: 8000,
    disableLinks: false,
    prev: $(".logos-container").find(".slider-nav--prev"),
    next: $(".logos-container").find(".slider-nav--next"),
    breakpoints: bps
  });
}

function landingImage(element, options) {
  $( element ).each(function() {
   var imgSrc = $(this).find('.masthead-container img').first().attr('src');
   $(this).find('.masthead-container').hide();
   $(this).css('background', 'url('+imgSrc+')' + options);
  });
}

$(document).ready(function() {
  landingImage($(".has-bg-landing"), "center center / cover no-repeat");
});




$(document).ready(function() {

	backgroundImage($(".has-bg"), "center center / cover no-repeat", 2);
	backgroundImage($(".has-bg__collection li"), "center center / cover no-repeat", 2);
	backgroundImage($(".has-bg-li__collection li .collection-item-image"), "center center / cover no-repeat", 1);
	
  placeHolders('form');
  $('header .wrap').navChecker();

}); // end document ready