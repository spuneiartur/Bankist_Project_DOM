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

// Adding event handler for arrow buttons
sliderBtnLeft.addEventListener('click', function (e) {});
