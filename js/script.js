(function () {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

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
          document.body.classList.remove('fix');
        } else {

          if (!headerUser.classList.contains('open-auth')) {
            btn.parentElement.classList.add('active');
            document.body.classList.add('fix');
          }

        }
      })
    }
  }


  let headerCatalogPreview = document.querySelector('.header-catalog-preview-wrap');
  let headerCatalogList = document.querySelector('.header-catalog-list');

  //скрываем слайдер при наведении на категории меню
  headerCatalogList.addEventListener('mouseover', () => {
    if (!headerCatalogPreview.classList.contains('focus')) {
      headerCatalogPreview.classList.add('focus');
    }
  })


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
      document.body.classList.add('fix');
    })

    // Закрываем при клике на крестик
    btnCloseSearch.addEventListener('click', () => {
      headerSearch.classList.remove('active');
      headerBottom.classList.remove('open-search');
      document.body.classList.remove('fix');

      // Чистим после ввода
      headerSearchInput.value = '';
    })
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
      authorizationForm = document.querySelector('.form-authorization');


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
      document.body.classList.remove('fix');
    })


    //убираем красную обводку у невалидных полей при смене формы
    let deleteNoValidInputs = (elems) => {
      for (let elem of elems) {
        elem.classList.remove('no-valid');
      }
    }

    // наблюдение за изменением атрибута data-status-form
    let observer = new MutationObserver(mutationRecords => {

      let statusForm = formAuth.dataset.statusForm;

      switch (statusForm) {
        // первоначальное состояние формы. Показываем первое окно авторизации с полем телефона
        case 'default':
          // текст сообщения в форме
          formText.innerHTML = 'Мы отправим СМС с кодом подтверждения';
          deleteNoValidInputs(document.querySelectorAll('.no-valid'));
          break;

        //Статус формы при отсутствии номера в базе
        case 'phone-not-found':
          formText.innerHTML = 'Мы не нашли аккаунт с таким номером телефона. Зарегистрируйтесь, чтобы продолжить покупки.';
          break;

        //Статус формы при открытии формы входа по паролю
        case 'pass':
          formText.innerHTML = 'Введите телефон и пароль';
          deleteNoValidInputs(document.querySelectorAll('.no-valid'));

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
  function validation(items) {

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







})();