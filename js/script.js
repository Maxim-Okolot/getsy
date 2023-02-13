(function () {

  window.addEventListener('load', function () {
    //слайдеры карточек
    let sliderPerView = document.querySelectorAll('.slider-per-view');

    if (sliderPerView[0]) {

      for (let slider of sliderPerView) {
        let swiper = new Swiper(slider, {
          slidesPerView: 6,
          spaceBetween: 20,
          pagination: {
            el: slider.closest('section').querySelector('.slider-pagination'),
            clickable: true,
          },
          navigation: {
            nextEl: slider.parentElement.querySelector('.slider-next'),
            prevEl: slider.parentElement.querySelector('.slider-prev'),
          },
        });
      }

    }

    //слайдеры баннеров
    let sliderDefault = document.querySelectorAll('.slider-default');

    if (sliderDefault) {
      for (let slider of sliderDefault) {
        let swiper = new Swiper(slider, {
          slidesPerView: 1,
          spaceBetween: 0,
          pagination: {
            el: '.banners-pagination',
            clickable: true,
          }
        });
      }
    }

    //слайдер баннера преимуществ
    let bannerСontent = document.querySelector('.banner-content__wrap');

    if (bannerСontent) {
      let swiper = new Swiper(bannerСontent, {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: '.banner-content__pagination',
          clickable: true,
        }
      });
    }
  })

  //смена иконок "в избранное" и "в сравнение" в каталогах
  let cardPreviewBtn = document.getElementsByClassName('card-preview__btn');

  if (cardPreviewBtn[0]) {
    for (let btn of cardPreviewBtn) {
      btn.addEventListener('click', function () {
        btn.classList.toggle('active');
      })
    }
  }





})();