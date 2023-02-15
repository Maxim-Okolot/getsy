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
          breakpoints: {
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
            1470: {
              slidesPerView: 6,
            },
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
  let headerFavorite = document.querySelector('.header-favorite');
  let headerComparison = document.querySelector('.header-comparison');

  if (cardPreviewBtn[0]) {
    for (let btn of cardPreviewBtn) {
      btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.classList.contains('btn-favorites')) {
          let btnFavorites = document.querySelectorAll('.btn-favorites');

          for (let btn of btnFavorites) {

            if (btn.classList.contains('active') && !headerFavorite.classList.contains('notice')) {
              headerFavorite.classList.add('notice');
              break;
            } else {

              if (headerFavorite.classList.contains('notice')) {
                headerFavorite.classList.remove('notice');
              }
            }
          }
        } else {
          let btnComparison = document.querySelectorAll('.btn-comparison');

          for (let btn of btnComparison) {

            if (btn.classList.contains('active') && !headerComparison.classList.contains('notice')) {
              headerComparison.classList.add('notice');
              break;
            } else {

              if (headerComparison.classList.contains('notice')) {
                headerComparison.classList.remove('notice');
              }
            }
          }
        }
      })
    }
  }


  let btnHeaderCatalog = document.querySelector('.catalog-btn');

  if (btnHeaderCatalog) {
    btnHeaderCatalog.addEventListener('click', function () {
      btnHeaderCatalog.parentElement.classList.toggle('active');
    })
  }




})();