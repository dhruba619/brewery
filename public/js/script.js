/*jshint jquery:true */

$(document).ready(function($) {
	"use strict";


	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

	var winDow = $(window);
	var $container=$('.iso-call');
	

	function isoFunction() {
		$container.isotope({
			layoutMode:'masonry',
			animationOptions:{
				duration:750,
				easing:'linear'
			}
		});
	}

	$container.imagesLoaded( function(){
		isoFunction();
	});

	winDow.on('resize', function(){
		isoFunction();
	});
	
	$('#container').addClass('active');
		
	/*-------------------------------------------------*/
	/* =  Discover tab list buttons click event
	/*-------------------------------------------------*/

	var listButton = $('.discover__list-item a');

	listButton.on('click', function(event){
		event.preventDefault();

		listButton.removeClass('active-list');
		$(this).addClass('active-list');

		var $this = $(this);

		if ( !$this.hasClass('place')) {
			$this.parents('.discover')
					.addClass('discover-events')
					.find('.places-tab')
					.fadeOut(200, function(){
						$this.parents('.discover')
								.find('.events-tab')
								.fadeIn(300);
					});
			
		} else {
			$this.parents('.discover')
					.removeClass('discover-events')
					.find('.events-tab')
					.fadeOut(200, function(){
						$this.parents('.discover')		
								.find('.places-tab')
								.fadeIn(300);
					});
		}
	});

	/*-------------------------------------------------*/
	/* =  OWL carousell
	/*-------------------------------------------------*/

	var owlWrap = $('.owl-wrapper');

	if (owlWrap.length > 0) {

		if (jQuery().owlCarousel) {
			owlWrap.each(function(){

				var carousel= $(this).find('.owl-carousel'),
					dataNum = $(this).find('.owl-carousel').attr('data-num'),
					dataNum2,
					dataNum3,
					dataNum4;

				if ( dataNum == 1 ) {
					dataNum2 = 1;
					dataNum3 = 1;
					dataNum4 = 1;
				} else if ( dataNum == 2 ) {
					dataNum2 = 2;
					dataNum3 = dataNum - 1;
					dataNum4 = dataNum - 1;
				} else if ( dataNum == 3 ) {
					dataNum2 = 3;
					dataNum3 = dataNum - 1;
					dataNum4 = dataNum3 - 1;
				} else {
					dataNum2 = dataNum - 1;
					dataNum3 = dataNum - 2;
					dataNum4 = dataNum - 3;
				}

				carousel.owlCarousel({
					autoPlay: 10000,
					navigation : true,
					items : dataNum,
					itemsDesktop : [1199,dataNum2],
					itemsDesktopSmall : [991,dataNum3],
					itemsTablet : [768, dataNum4],
					itemsMobile : [576, 1],
				});

			});
		}
	}
	
	/* ---------------------------------------------------------------------- */
	/*	Select2
	/* ---------------------------------------------------------------------- */

	$('.js-example-basic-multiple').select2();
	
	/*-------------------------------------------------*/
	/* =  add active state in nav menu for active section
	/*-------------------------------------------------*/

	$('.element-waypoint').each(function() {
		var currentDiv = $(this);
		currentDiv.waypoint({
			handler: function(direction) {
				if( direction === 'down' ) {
					var containerID = currentDiv.attr('id');
					/* update navigation */
					$('.navigate-section > li > a').removeClass('active');
					$('.navigate-section > li > a[href*=#'+containerID+']').addClass('active');
				}
			},
			offset: '18%'
		});

		currentDiv.waypoint({
			handler: function(direction) {
				if( direction === 'up' ) {
					var containerID = currentDiv.attr('id');
					/* update navigation */
					$('.navigate-section > li > a').removeClass('active');
					$('.navigate-section > li > a[href*=#'+containerID+']').addClass('active');
				}
			},
			offset: '0'
		});
	});

	/*-------------------------------------------------*/
	/* =  view all photos in single listing details,
	/* =  users page, cities & favorites posts
	/*-------------------------------------------------*/

	var itemsPhotosContainer = {
		selectorOne: '.listing-detail__photos-inner',
		selectorTwo: '.user-detail__cities-box',
		selectorThree: '.user-detail__favorites-box'
	};

	$.each(itemsPhotosContainer, function(key){

		var numbOfItemsShowed = parseInt($(itemsPhotosContainer[key]).attr('data-item-showen'), 10) - 1;

		$(itemsPhotosContainer[key]).find('.item:gt(' + numbOfItemsShowed + ')').css('display', 'none');	

		$('.load-others').on('click', function(event) {
			event.preventDefault();

			var parentClass = '.' + $(this).attr('data-parent-class');

			if( !$(this).hasClass('active') ) {
				$(parentClass).find('.item:gt(' + numbOfItemsShowed + ')').css('display', 'block');
				isoFunction();
				var textBtn = $(this).attr('data-less-text');
				$(this).addClass('active');
				$(this).find('span').text(textBtn);
				$(this).find('i.la-angle-down')
						.removeClass('la-angle-down')
						.addClass('la-angle-up');
			} else {
				$(parentClass).find('.item:gt(' + numbOfItemsShowed + ')').css('display', 'none');
				isoFunction();
				var textButton = $(this).attr('data-more-text');
				$(this).removeClass('active');
				$(this).find('span').text(textButton);
				$(this).find('i.la-angle-up')
						.removeClass('la-angle-up')
						.addClass('la-angle-down');
			}
		});

	});

	/* ---------------------------------------------------------------------- */
	/*	like button working for favorites places and events
	/* ---------------------------------------------------------------------- */

	var likeButton = $('a.place-post__like, a.event-post__like');

	likeButton.on('click', function(event) {
		event.preventDefault();
		if(!$(this).hasClass('active')) {
			$(this).addClass('active');
			$(this).find('i')
					.removeClass('fa-heart-o')
					.addClass('fa-heart');
		} else {
			$(this).removeClass('active');
			$(this).find('i')
					.removeClass('fa-heart')
					.addClass('fa-heart-o');
		}
	});

	/* ---------------------------------------------------------------------- */
	/*	Load more posts from container
	/* ---------------------------------------------------------------------- */

	var LoadButton = $('a.load-post-container'),
		PortContainer = ('.iso-call'),
		i = 0,
		s = 0;

	LoadButton.on( 'click', function(event) {
		event.preventDefault();

		var LoadContainer = $(this).attr('data-load'),
			xel = parseInt($(this).attr('data-number'), 10);

		var storage = document.createElement('div');
		$(storage).load(LoadContainer + " .item", function(){

			var elemloadedLength = $(storage).find('.item').length;
			
			if ( ((s + 1) <= elemloadedLength) ) {

				s = i + xel;

				var t = i - 1;
				var $elems;

				if ( i === 0 ) {
					/// create new item elements
					$elems = $(storage).find(".item:lt(" + s + ")").appendTo(PortContainer);
					// append elements to container
					$container.isotope( 'appended', $elems );

					setTimeout(Resize, 500);

				} else {
					/// create new item elements
					$elems = $(storage).find(".item:lt(" + s + "):gt("+ t +")").appendTo(PortContainer);
					// append elements to container
					$container.isotope( 'appended', $elems );

					setTimeout(Resize, 500);
				}

				i += xel;
			}

			if ( (s >= elemloadedLength) ) {
				$('a.load-post-container').text("No more posts");
			}

		});
	
	});

	/* ---------------------------------------------------------------------- */
	/*	Header animate after scroll
	/* ---------------------------------------------------------------------- */
	
	$(window).on('scroll', function() {
		if (document.documentElement.scrollTop > 100) {
			$("header").addClass('active');
		} else {
			$("header").removeClass('active');
		}
	});

	try {
		var scrollerOffset = $('.scroller-menu').offset().top;

		$(window).on('scroll', function() {
			if(document.documentElement.scrollTop > scrollerOffset) {
				$(".scroller-menu").addClass('active');
			} else {
				$(".scroller-menu").removeClass('active');
			}
		});
	} catch(err) {

	}

});

// resize triger function

function Resize() {
	$(window).trigger('resize');
}