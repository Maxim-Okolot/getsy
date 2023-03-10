(function () {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  //Запрет ввода символов, кроме чисел
  let validate = (evt) => {
    let theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;

    key = String.fromCharCode(key);
    let regex = /[0-9]/;

    if (!regex.test(key)) {
      theEvent.returnValue = false;

      if (theEvent.preventDefault) {
        theEvent.preventDefault();
      }
    }
  }

  //маска поля ввода номера телефона
  let maskPhone = document.querySelectorAll('.mask-phone');

  if (maskPhone[0]) {

    for (let phoneInput of maskPhone) {
      let phoneMask = IMask(phoneInput, {
        mask: '+7(000)000-00-00'
      });
    }
  }

  window.addEventListener('load', () => {
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

    let catalogSlider = document.querySelectorAll('.catalog-slider-wrap');

    if (catalogSlider[0]) {

      for (let slider of catalogSlider) {
        let swiper = new Swiper(slider, {
          slidesPerView: 5,
          spaceBetween: 20,
          pagination: {
            el: slider.closest('.catalog-slider').querySelector('.slider-pagination'),
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
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
            1470: {
              slidesPerView: 5,
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

    //слайдеры баннеров на страницах
    let pageBanner = document.querySelector('.page-banner-wrap');

    if (pageBanner) {
      let swiper = new Swiper(pageBanner, {
        slidesPerView: 1,
        spaceBetween: 0,
      });
    }

    let subcategoryTags = document.querySelector('.subcategory-tags');

    if (subcategoryTags) {
      let swiper = new Swiper(subcategoryTags, {
        slidesPerView: "auto",
        spaceBetween: 12,
        navigation: {
          nextEl: '.subcategory-tags__btn_left',
          prevEl: '.subcategory-tags__btn_right',
        },
      });
    }

    //слайдеры бренда
    let brand = document.querySelector('.brand-slider');

    if (brand) {
      let swiper = new Swiper(brand, {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: '.pagination-brand',
          clickable: true,
        }
      });
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
      btn.addEventListener('click', () => {
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
      btn.addEventListener('click', () => {
        let res;

        //проверяем наличие уже активного окна
        btn.parentElement.classList.contains('active') ? res = true : res = false;

        //закрываем закрытое окно
        for (let i = 0; i < btnOpen.length; i++) {
          btnOpen[i].parentElement.classList.remove('active');
        }

        //закрываем или открываем окно по клику
        if (res && !headerUser.classList.contains('open-auth')) {
          btn.parentElement.classList.remove('active');
        } else {

          if (!headerUser.classList.contains('open-auth')) {
            btn.parentElement.classList.add('active');
          }

        }
      })
    }
  }

  let headerSearch = document.querySelector('.header-search');
  let headerSearchInput = document.querySelector('.header-search__input');
  let headerBottom = document.querySelector('.header-bottom');
  let btnCloseSearch = document.querySelector('.header-search__close');

  // Открытие формы поиска в header-e
  if (headerSearch) {

    // Открываем при фокусе поля ввода поиска
    headerSearchInput.addEventListener('focus', () => {
      headerSearch.classList.add('active');
      headerBottom.classList.add('open-search');
    })

    // Закрываем при клике на крестик
    btnCloseSearch.addEventListener('click', () => {
      headerSearch.classList.remove('active');
      headerBottom.classList.remove('open-search');

      // Чистим после ввода
      headerSearchInput.value = '';
    })
  }

  window.addEventListener('click', (event) => {

    for (let btn of btnOpen) {
      if (btn.parentElement.classList.contains('active') && event.target === btn.parentElement) {
        btn.parentElement.classList.remove('active');
        document.querySelector('.header-location-confirm').classList.remove('hide');
      } else {

        if (btn.parentElement.classList.contains('open-auth') && event.target === btn.parentElement) {
          btn.parentElement.classList.remove('open-auth');
          document.querySelector('.authorization').classList.add('hide');
        }
      }
    }


    if (headerSearchInput.focus) {
      if (headerSearch.classList.contains('active') && !event.target.closest('.header-search') || event.target.classList.contains('header-search')) {
        headerSearch.classList.remove('active');
        headerBottom.classList.remove('open-search');
      }
    }

  });


  let headerCatalogPreview = document.querySelector('.header-catalog-preview-wrap');
  let headerCatalogListItems = document.querySelectorAll('.header-catalog-list__item');

  //скрываем слайдер при первом клике на категории меню
  for (let item of headerCatalogListItems) {
    item.addEventListener('click', () => {
      if (!headerCatalogPreview.classList.contains('focus')) {
        headerCatalogPreview.classList.add('focus');
      }
    })
  }



  //открытие блока локации
  let headerLocation = document.querySelector('.header-location');
  let headerLocationConfirm = document.querySelector('.header-location-confirm');
  let btnSelectLocation = document.querySelectorAll('.close-location');
  let btnOpenSelectLocation = document.querySelector('.header-location-confirm__btn-false');

  if (headerLocation) {

    //открытие блока выбора локации
    btnOpenSelectLocation.addEventListener('click', () => {
      headerLocationConfirm.classList.add('hide');
      headerLocation.classList.add('change-location');
    });

    //закрытие всего блока локации
    let closeLocation = () => {
      headerLocationConfirm.classList.remove('hide');
      headerLocation.classList.remove('active', 'change-location');
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
    inputChangeLocation.addEventListener('input', () => {

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
    btnChangeLocation.addEventListener('click', () => {
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


//форма авторизации и регистрации
  let btnOpenFormAuthorization = document.querySelector('.login-wrap__link'),
    authorization = document.querySelector('#authorization-wrap'),
    btnAuthorizationClose = document.querySelector('.authorization__close'),
    headerUser = document.querySelector('.header-user');

  if (authorization) {
    let formAuth = document.querySelector('#form-auth'),
      formText = document.querySelector('#form-login-text'),
      formAuthorizationSubmit = document.querySelector('.form-authorization__submit'),
      formAuthorizationBtn = document.querySelector('.form-authorization__btn'),
      formRegistrationBtn = document.querySelector('.form-registration__btn'),
      btnChangeFormAuth = document.querySelector('.registration-user__btn-form-auth'),
      inputFocus = document.querySelectorAll('.input-focus'),
      registrationForm = document.querySelector('.registration-from'),
      authorizationForm = document.querySelector('.form-authorization'),
      formTitle = document.querySelector('#form-login-title');

    //отправка формы регистрации
    registrationForm.addEventListener('submit', (event) => {
         let inputs = registrationForm.querySelectorAll('.reg');

         if (!validation(inputs)) {
           event.preventDefault();
         }
    })

    //отправка формы авторизации
    authorizationForm.addEventListener('submit', (event) => {
      let inputs = authorizationForm.querySelectorAll('.reg');

      if (!validation(inputs)) {
        event.preventDefault();
      }
    })

    //анимация placeholder-a при фокусе
    for (let input of inputFocus) {
      input.addEventListener('focus', () => {

        if (!input.classList.contains('focus')) {
          input.classList.add('focus');
        }

      });

      //анимация placeholder-a при смене фокуса
      input.addEventListener('blur', () => {

        if (input.value === '' && input.classList.contains('focus')) {
          input.classList.remove('focus');
        }

      });
    }

    //клик по кнопке "вход по паролю"
    formAuthorizationBtn.addEventListener('click', () => {
      formAuth.dataset.statusForm = 'pass';
      formAuthorizationSubmit.innerHTML = 'Войти';
    })

    //открытие формы авторизации
    btnOpenFormAuthorization.addEventListener('click', () => {
      authorization.classList.remove('hide');
      headerUser.classList.remove('active');
      headerUser.classList.add('open-auth');
    })

    //закрытие формы авторизации
    btnAuthorizationClose.addEventListener('click',  () => {
      headerUser.classList.remove('active', 'open-auth');
      authorization.classList.add('hide');
      headerUser.classList.remove('open-auth');
      formAuth.dataset.statusForm = 'default';
      authorization.classList.remove('registration');
      authorization.classList.add('authorization');

      if (document.querySelector('.sms-error-text')) {
        document.querySelector('.sms-error-text').remove();
      }
    })


    //убираем красную обводку у невалидных полей при смене формы
    let deleteNoValidInputs = (elems) => {
      for (let elem of elems) {
        elem.classList.remove('no-valid');
      }

      //очищаем поля формы
      authorizationForm.reset();
      registrationForm.reset();
    }

    let timer = document.querySelector('#form-sms-auth__timer');
    let timerStart = 59;
    let btnRepeatCode = document.querySelector('.form-sms-auth__repeat-code');
    let timerText = document.querySelector('.form-sms-auth__text');
    let timerCode;
    function tick() {
      if (timerStart < 11) {
        timer.innerHTML = `0${--timerStart}`;
      } else {
        timer.innerHTML = --timerStart;
      }

      if (timerStart <= 0) {
        timer.innerHTML = timerStart = 59;
        btnRepeatCode.removeAttribute('disabled');
        timerText.classList.add('dpl-none');
        clearTimeout();
        return false;
      } else {
        timerCode = setTimeout(tick, 1000);
      }
    }


    // наблюдение за изменением атрибута data-status-form
    let observer = new MutationObserver(mutationRecords => {

      let statusForm = formAuth.dataset.statusForm;

      switch (statusForm) {
        // первоначальное состояние формы. Показываем первое окно авторизации с полем телефона
        case 'default':
          clearTimeout(timerCode);
          // текст сообщения в форме
          formTitle.innerText = 'Введите номер телефона';
          formText.innerText = 'Мы отправим СМС с кодом подтверждения';
          formAuthorizationSubmit.innerText = 'Получить код';
          deleteNoValidInputs(document.querySelectorAll('.no-valid'));
          break;

        //Статус формы при отсутствии номера в базе
        case 'phone-not-found':
          formText.innerText = 'Мы не нашли аккаунт с таким номером телефона. Зарегистрируйтесь, чтобы продолжить покупки.';
          break;

        //Статус формы при открытии формы входа по паролю
        case 'pass':
          clearTimeout(timerCode);
          formTitle.innerText = 'Введите телефон и пароль';
          deleteNoValidInputs(document.querySelectorAll('.no-valid'));
          break;

        //Статус формы при ошибке ввода логина или пароля
        case 'pass-not-found':
          formText.innerText = 'Мы не нашли аккаунт с таким номером телефона. Либо пароль неверный. Зарегистрируйтесь, чтобы продолжить покупки.';
          break;

        case 'sms':
          if (document.querySelector('.sms-error-text')) {
            document.querySelector('.sms-error-text').remove();
          }

          formTitle.innerText = 'Код из СМС';
          timerCode = setTimeout(tick, 1000);

          let inputPhone = document.querySelector('#form-auth-phone');

          formText.innerHTML = `Мы отправили код на номер ${inputPhone.value} (<button type="button" class="bnt-change-phone">изменить</button>)`;

          let bntChangePhone = document.querySelector('.bnt-change-phone');

          bntChangePhone.addEventListener('click', () => {
            formAuth.dataset.statusForm = 'default';
            clearTimeout(timerCode);
            timer.innerHTML = timerStart = 59;
            inputPhone.focus();
          })

          btnRepeatCode.setAttribute('disabled', 'disabled');
          timerText.classList.remove('dpl-none');

          btnRepeatCode.addEventListener('click', () => {
            timerCode = setTimeout(tick, 1000);
            btnRepeatCode.setAttribute('disabled', 'disabled');
            timerText.classList.remove('dpl-none');
          })

          break;

        case 'sms-error':

          if (!document.querySelector('.sms-error-text')) {
            formText.insertAdjacentHTML('afterend','<span class="sms-error-text">Код введен неверно. Попробуйте еще раз</span>');
          }
      }


      //клик по кнопке регистрация
      btnChangeFormAuth.addEventListener('click', () => {
        formAuth.dataset.statusForm = 'default';
        authorization.classList.remove('registration');
        authorization.classList.add('authorization');

      })

      //клик по кнопке "уже зарегистрированы?"
      formRegistrationBtn.addEventListener('click', () => {
        formAuth.dataset.statusForm = 'hide';
        authorization.classList.remove('authorization');
        authorization.classList.add('registration');
      })

    });

    observer.observe(formAuth , {
      attributes: true
    });
  }


  //Валидация полей форм
  let validation = (items) => {

    //массив с результатами проверки
    let inputStatusValidate = [];

    for (let item of items) {

      if (item.value === '') {

        //при отсутствии у родителя класса no-valid - добавялем его ему
        if (!item.parentElement.classList.contains('no-valid')) {
          item.parentElement.classList.add('no-valid');
        }

        //добавляем в массив значение false
        inputStatusValidate.push(false);

      } else {
        //добавляем в массив значение true, так как поле не пустое
        inputStatusValidate.push(true);

        //удаляем при наличии класс у родителя
        if (item.parentElement.classList.contains('no-valid')) {
          item.parentElement.classList.remove('no-valid');
        }
      }
    }

    // проверяем наличие значения false в массиве
    if (inputStatusValidate.includes(false)) {
      return false;
    }
  }


  // фильтр подкатегории
  let subcategorySortTitle = document.querySelectorAll('.subcategory-sort__title');

  if (subcategorySortTitle[1]) {
    // скрытие блока подраздела фильтра
    for (let i = 1; i < subcategorySortTitle.length; i++) {
      subcategorySortTitle[i].addEventListener('click', () => {
        subcategorySortTitle[i].parentElement.classList.toggle('hide');
      })
    }

    let inputCheckboxSort = document.querySelectorAll('.subcategory-sort input[type="checkbox"]');
    let inputRadioSort = document.querySelectorAll('.subcategory-sort input[type="radio"]');
    let foundProducts = document.querySelector('.found-products');

    let inputSortElems = [...inputCheckboxSort, ...inputRadioSort];

    for (let input of inputSortElems) {
      input.addEventListener('input', () => {

        if (input.checked) {
          input.closest('.subcategory-sort__wrap').classList.add('active');
          input.closest('.subcategory-sort__wrap').prepend(foundProducts);
        } else {

          let activeInput = false;

          for (let i = 0; i < inputSortElems.length; i++) {

            if (inputSortElems[i].checked) {
              activeInput = true;
              break;
            }

          }

          if (activeInput === false) {
            foundProducts.parentElement.classList.remove('active');
          }
        }
      })
    }
  }


  let activeFilter = document.querySelector('.active-filter');

  if (activeFilter) {

    // событие удаления выбранного фильтра
    let addListener = (elems) => {
      for (let el of elems) {
        el.addEventListener('click', () => {
          el.parentElement.remove();
        })
      }
    }

    let filterDeleteBtn = document.querySelectorAll('.active-filter__delete');
    let filterReset = document.querySelector('.active-filter__reset');

    if (filterDeleteBtn[0]) {
      addListener(filterDeleteBtn);

      filterReset.addEventListener('click', () => {
        let activeFilterList = document.querySelector('.active-filter__list');
        let subcategorySort = document.querySelectorAll('.subcategory-sort__wrap');

        while (activeFilterList.firstChild) {
          activeFilterList.removeChild(activeFilterList.firstChild);
        }

        for (let el of subcategorySort) {
          el.classList.remove('active');
        }
      })
    }

    // отслеживание добавления \ удаления выбранного фильтра
    let observer = new MutationObserver(mutationRecords => {
      filterDeleteBtn = document.querySelectorAll('.active-filter__delete');

      if (filterDeleteBtn[0]) {
        addListener(filterDeleteBtn);
      } else {
        let activeFilterList = document.querySelector('.active-filter__list');
        activeFilterList.classList.add('active-filter__list_empty');
      }
    });

    observer.observe(activeFilter , {
      childList: true,
      subtree: true
    });
  }


  let viewBtn = document.querySelectorAll('.faq-list__view-btn');

  if (viewBtn[0]) {
    for (let btn of viewBtn) {
      btn.addEventListener('click', () => {
        btn.closest('.faq-list__item').classList.toggle('hide');
        btn.closest('.faq-list__item').classList.contains('hide') ? btn.innerText = 'Показать' :
          btn.innerText = 'Скрыть';
      })
    }
  }


  let eventChangeTab = (navs, items) => {

    for (let x = 0; x < navs.length; x++) {
      navs[x].addEventListener('click', () => {

        if (!navs[x].classList.contains('active')) {

          for (let i = 0; i < navs.length; i++) {

            if (navs[i].classList.contains('active')) {
              navs[i].classList.remove('active');
              items[i].classList.add('hide');
            }
          }

          navs[x].classList.add('active');
          items[x].classList.remove('hide');
        }
      })
    }
  }


  let exchangeNavItem = document.querySelectorAll('.exchange-nav__item');
  let payNavItem = document.querySelectorAll('.pay-nav__item');

  if (exchangeNavItem[0]) {
    let exchangeItem = document.querySelectorAll('.exchange-content__item');

    eventChangeTab(exchangeNavItem, exchangeItem);
  }

  if (payNavItem[0]) {
    let payItem = document.querySelectorAll('.pay-content__item');

    eventChangeTab(payNavItem, payItem);
  }

  let btnExpand = document.querySelectorAll('.promo-list-wrap__expand');

  if (btnExpand[0]) {
    for (let btn of btnExpand) {
      btn.addEventListener('click', () => {
        btn.parentElement.classList.contains('hide') ? btn.innerText = 'Свернуть' : btn.innerText = 'Правила проведения';
        btn.parentElement.classList.toggle('hide');
      })
    }
  }


  let promoCategory = document.querySelectorAll('.promo-category__item');

  if (promoCategory[0]) {
    for (let btn of promoCategory) {
      btn.addEventListener('click', () => {

        if (!btn.classList.contains('current')) {

          for (let items of promoCategory) {
            items.classList.remove('current');
          }

          btn.classList.add('current');
        }
      })
    }
  }


  let selects = document.querySelectorAll('.select');
  let selectsOutput = document.querySelectorAll('.select__output');

  if (selectsOutput[0]) {

    for (let output of selectsOutput) {
      output.addEventListener('click', () => {
        output.parentElement.classList.toggle('active');
      })
    }

    let selectItems = document.querySelectorAll('.select-menu__item');

    for (let item of selectItems) {
      item.addEventListener('click', () => {
        let itemValue = item.innerText;

        item.closest('.select').querySelector('.select__output').innerText = itemValue;
        item.closest('.select').classList.remove('active');
      })
    }

    window.addEventListener('click', (event) => {
      if (!event.target.closest('.select')) {

        for (let select of selects) {
          if (select.classList.contains('active')) {
            select.classList.remove('active');
          }
        }
      }

      if (!event.target.closest('.subcategory-sort__wrap') && !event.target.classList.contains('.subcategory-sort__wrap') &&
        !event.target.closest('.found-products') && !event.target.classList.contains('.found-products')) {

        let subcategorySort = document.querySelectorAll('.subcategory-sort__wrap');

        for (let elems of subcategorySort) {
          if (elems.classList.contains('active')) {
            elems.classList.remove('active');
          }
        }
      }
     })

    let catalogViewBtn = document.querySelectorAll('.catalog-view__btn');

    for (let btn of catalogViewBtn) {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) {

          for (let i = 0; i < catalogViewBtn.length; i++) {
            if (catalogViewBtn[i].classList.contains('active')) {
              catalogViewBtn[i].classList.remove('active');
            }
          }

          btn.classList.add('active');

        }
      })
    }

    let inputNum = document.querySelectorAll('.input-num');

    if (inputNum[0]) {
      validate(inputNum);

      for (let input of inputNum) {
        input.onkeypress = validate;
      }
    }

  }


})();