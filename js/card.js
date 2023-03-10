let sliders = document.querySelectorAll('.card-info-slider-wrapper');

for (slider of sliders) {
  let swiper = new Swiper(slider, {
    slidesPerView: 2,
    spaceBetween: 20,
    pagination: {
      el: slider.nextElementSibling,
      clickable: true,
    },
    navigation: {
      nextEl: slider.parentElement.querySelector('.slider-next'),
      prevEl: slider.parentElement.querySelector('.slider-prev'),
    }
  });
}

let thumbsSlider = new Swiper(".card-slider-vertical", {
  direction: "vertical",
  spaceBetween: 7,
  slidesPerView: 6,
  freeMode: true,
  watchSlidesProgress: true,
});

let sliderCard = new Swiper(".card-slider", {
  slidesPerView: 1,
  thumbs: {
    swiper: thumbsSlider,
  },
});


let cardInfoNavItems = document.querySelectorAll('.card-info-nav__item');
let cardInfoBox = document.querySelectorAll('.card-info-box');

for (let i = 0; i < cardInfoNavItems.length; i++) {
  cardInfoNavItems[i].addEventListener('click', () => {
    if (!cardInfoNavItems[i].classList.contains('active')) {
      for (let x = 0; x < cardInfoNavItems.length; x++) {
        if (cardInfoNavItems[x].classList.contains('active')) {
          cardInfoNavItems[x].classList.remove('active');
          cardInfoBox[x].classList.add('dpl-none');
        }
      }

      cardInfoNavItems[i].classList.add('active');
      cardInfoBox[i].classList.remove('dpl-none');
    }
  })
}