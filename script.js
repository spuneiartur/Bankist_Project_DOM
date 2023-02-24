// Defining variables -----------------------------------------------------------
const nav__links = document.querySelector('.header__column--2');
const sections = document.querySelectorAll('.section');
const targetImages = document.querySelectorAll('img[data-src]');
const operationsTabs = document.querySelectorAll('.operations__tab');
const operationsContents = document.querySelectorAll(
  '.operations__content--container-grid'
);
// ------------------------------------------- Smooth scrolling to page sections -------------------------------------------
nav__links.addEventListener('click', function (e) {
  //console.log(e.target.dataset.id);
  document
    .querySelector(`#${e.target.dataset.id}`)
    .scrollIntoView({ behavior: 'smooth' });
});

// ------------------------------------------- Lazy revealing sections -------------------------------------------

const intersectionCallBack = function (entries, observer) {
  entries.forEach(element => {
    if (!element.isIntersecting) return;
    element.target.classList.remove('section--hidden');
    observer.unobserve(element.target);
  });
};

const observerOptions = {
  threshold: 0.1,
  root: null,
};
const observer = new IntersectionObserver(
  intersectionCallBack,
  observerOptions
);

sections.forEach(section => {
  observer.observe(section);
});

// Lazy images
const callBackImages = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    // Removing blur
    entry.target.addEventListener('load', function (e) {
      entry.target.classList.remove('lazy-img');
    });
    imgObserver.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(callBackImages, {
  threshold: 0,
  root: null,
});

targetImages.forEach(img => {
  imgObserver.observe(img);
});

// ------------------------------------------- Operations tab selection -------------------------------------------

operationsTabs.forEach(tab => {
  tab.addEventListener('click', function (e) {
    operationsTabs.forEach(tab =>
      tab.classList.remove('operations__tab--active')
    );
    // Changing Content
    tab.classList.add('operations__tab--active');
    const elementClassName = tab.dataset.tab__class;
    operationsContents.forEach(contentDiv => {
      contentDiv.classList.remove(
        'operations__content--container-grid--active'
      );
    });
    document
      .querySelector(`.${elementClassName}`)
      .classList.add('operations__content--container-grid--active');
  });
});

// ------------------------------------------- Slider -------------------------------------------
const sliderBtnRight = document.querySelector('.slider__btn--1');
const sliderBtnLeft = document.querySelector('.slider__btn--2');
const slides = document.querySelectorAll('.testimonial__slide');
const dotsContainer = document.querySelector('.slider__dots--container');
const dotBtns = document.querySelectorAll('.slider__dot');

// Functions -----------
const decativateAllDots = function (dotBtns) {
  dotBtns.forEach(btn => btn.classList.remove('slider__dot--active'));
};
const activateDot = function (element) {
  element.classList.add('slider__dot--active');
};

const nextSlide = function () {
  slides.forEach(slide => {
    if (slide.dataset.index - 200 === -650) {
      slide.style.transform = `translateX(-50%)`;
      slide.dataset.index = '-50';
    } else {
      slide.style.transform = `translateX(${slide.dataset.index - 200}%)`;
      slide.dataset.index = `${slide.dataset.index - 200}`;
    }
  });
};

const previousSlide = function () {
  slides.forEach(slide => {
    if (Number(slide.dataset.index) + 200 === 550) {
      slide.style.transform = `translateX(-50%)`;
      slide.dataset.index = '-50';
    } else {
      slide.style.transform = `translateX(${
        Number(slide.dataset.index) + 200
      }%)`;
      slide.dataset.index = `${Number(slide.dataset.index) + 200}`;
    }
  });
};

const goToSlide = function (index, currentIndex) {
  if (index > currentIndex) {
    while (currentIndex !== index) {
      nextSlide();
      currentIndex++;
    }
  } else if (index < currentIndex) {
    while (currentIndex !== index) {
      previousSlide();
      currentIndex--;
    }
  }
};

// Adding event handler for arrow buttons
sliderBtnRight.addEventListener('click', function (e) {
  nextSlide();
});

sliderBtnLeft.addEventListener('click', function (e) {
  previousSlide();
});

// Adding event handler for dot buttons

dotsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.slider__dot');
  console.log(clicked);
  if (!clicked) return;
  decativateAllDots(dotBtns);
  activateDot(clicked);
});
