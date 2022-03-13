$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Страница товара
	if ($('.product_head .images').length) {
		const productSlider = new Swiper('.product_head .images .swiper-container', {
			loop: false,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			on: {
				slideChange: swiper => {
					setTimeout(() => {
						$('.product_head .thumbs button').removeClass('active')
						$('.product_head .thumbs button').eq(swiper.activeIndex).addClass('active')
					})
				}
			}
		})

		$('.product_head .thumbs button').click(function (e) {
			e.preventDefault()

			productSlider.slideTo($(this).data('slide-index'), 500)
		})
	}


	// Конструктор
	var heightRange = $('.constructor #height_range').ionRangeSlider({
		// min: 2050,
		// max: 2300,
		// from: 2100,
		// step: 50,
		values: ['2050', '2100', '2150', '2200', '2250', '2300'],
		from: 1,
		grid: true
	}).data('ionRangeSlider')

	var widthRange = $('.constructor #width_range').ionRangeSlider({
		// min: 860,
		// max: 1000,
		// from: 860,
		// step: 50,
		values: ['860', '960', '1000'],
		from: 0,
		grid: true
	}).data('ionRangeSlider')


	// Моб. меню
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		if (!$('header .mob_menu_btn').hasClass('active')) {
			$('header .mob_menu_btn').addClass('active')
			$('body').addClass('menu_open')
			$('header .menu').addClass('show')
		} else {
			$('header .mob_menu_btn').removeClass('active')
			$('body').removeClass('menu_open')
			$('header .menu').removeClass('show')
		}
	})
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!fiestResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

			fiestResize = true
		} else {
			fiestResize = false
		}


		// Перезапись ширины окна
		WW = $(window).width()
	}
})


const initMap = () => {
	ymaps.ready(() => {
		let myMap = new ymaps.Map('map', {
			center: [55.664593, 37.634640],
			zoom: 16,
			controls: []
		})

		// Кастомный маркер
		let myPlacemark = new ymaps.Placemark([55.664593, 37.634640], {}, {
			iconLayout: 'default#image',
			iconImageHref: 'images/ic_map_marker.svg',
			iconImageSize: [56, 73],
			iconImageOffset: [-28, -73]
		})

		myMap.geoObjects.add(myPlacemark)

		myMap.controls.add('zoomControl', {
			position: {
				right: '20px',
				top: '20px'
			}
		})

		myMap.behaviors.disable('scrollZoom')
	})
}