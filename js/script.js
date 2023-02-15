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


  //открытие выпадающих окон в header-e
  let btnOpen = document.querySelectorAll('.btn-open');

  if (btnOpen[0]) {
    for (let btn of btnOpen) {
      btn.addEventListener('click', function () {
        let res;

        btn.parentElement.classList.contains('active') ? res = true : res = false;

        for (let i = 0; i < btnOpen.length; i++) {
          btnOpen[i].parentElement.classList.remove('active');
        }

        if (res) {
          btn.parentElement.classList.remove('active');
          document.body.classList.remove('fix');
        } else {
          btn.parentElement.classList.add('active');
          document.body.classList.add('fix');

        }
      })
    }
  }


  //открытие блока локации
  let headerLocation = document.querySelector('.header-location');
  let headerLocationConfirm = document.querySelector('.header-location-confirm');
  let btnSelectLocation = document.querySelectorAll('.close-location');
  let btnOpenSelectLocation = document.querySelector('.header-location-confirm__btn-false');

  if (headerLocation) {

    //открытие блока выбора локации
    btnOpenSelectLocation.addEventListener('click', function () {
      headerLocationConfirm.classList.add('hide');
      headerLocation.classList.add('change-location');
    });

    //закрытие всего блока локации
    let closeLocation = () => {
      headerLocationConfirm.classList.remove('hide');
      headerLocation.classList.remove('active', 'change-location');
      document.body.classList.remove('fix');
    }


    for (let btn of btnSelectLocation) {
      btn.addEventListener('click', closeLocation);
    }

    let btnChangeLocation = document.querySelector('#btn-change-location');
    let inputChangeLocation = document.querySelector('#input-change-location');
    let selectsItemLocation = document.getElementsByClassName('header-location-confirm__select-item');
    let listLocation = document.querySelector('.header-location-confirm__select-list');
    let currentCity = document.querySelectorAll('.current-city');

    // Перенос имени выбранного города в поле ввода
    let changeLocation = (el) => {
      inputChangeLocation.value = el.innerText;
      btnChangeLocation.classList.add('visible');
    }

    // Показываем|скрываем кнопку "Все верно" при совпадении введенного названия со списком отсортированных городов
    inputChangeLocation.addEventListener('input', function () {

      for (let item of selectsItemLocation) {
        if (inputChangeLocation.value.toLocaleLowerCase() === item.innerText.toLocaleLowerCase()) {
          btnChangeLocation.classList.add('visible');
          break;
        } else {
          btnChangeLocation.classList.remove('visible');
        }
      }
    })


    //закрытие всего блока локации
    btnChangeLocation.addEventListener('click', function () {
      let newLocation = inputChangeLocation.value[0].toUpperCase() + inputChangeLocation.value.slice(1);

      for (let city of currentCity) {
        city.innerHTML = newLocation;
      }

      closeLocation();
    })

    // Навешиваем вызов функции переноса названия текста на сортированные города
    let addEventItems = (items) => {

      for (let item of items) {
        item.addEventListener('click', function (event) {
          changeLocation(event.target);
        })
      }

    };

    addEventItems(selectsItemLocation);

    // Отслеживаем изменение сортированных городов в блоке выбора локации
    let listLocationObserver = new MutationObserver(function(mutations) {

      mutations.forEach(function(mutation) {
        addEventItems(selectsItemLocation);
      });

    });

    let locationObserverConfig = {
      childList: true
    };

    listLocationObserver.observe(listLocation,  locationObserverConfig);
  }


  let headerSearch = document.querySelector('.header-search');
  let headerSearchInput = document.querySelector('.header-search__input');
  let headerBottom = document.querySelector('.header-bottom');
  let btnCloseSearch = document.querySelector('.header-search__close');



  if (headerSearch) {

    headerSearchInput.addEventListener('focus', function () {
      headerSearch.classList.add('active');
      headerBottom.classList.add('open-search');
      document.body.classList.add('fix');
    })

    btnCloseSearch.addEventListener('click', function () {
      headerSearch.classList.remove('active');
      headerBottom.classList.remove('open-search');
      document.body.classList.remove('fix');
      headerSearchInput.value = '';
    })


  }






})();