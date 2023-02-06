// Defining variables -----------------------------------------------------------
const nav__links = document.querySelector('.header__column--2');
const sections = document.querySelectorAll('.section');
const targetImages = document.querySelectorAll('img[data-src]');
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
