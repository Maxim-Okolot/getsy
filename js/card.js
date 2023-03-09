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

  let thumbsSlider = new Swiper(".card-slider-vertical", {
    direction: "vertical",
    spaceBetween: 7,
    slidesPerView: 6,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var sliderCard = new Swiper(".card-slider", {
    slidesPerView: 1,
    thumbs: {
      swiper: thumbsSlider,
    },
  });
}

