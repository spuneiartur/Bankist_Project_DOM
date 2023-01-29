// Defining variables -----------------------------------------------------------
const nav__links = document.querySelector('.header__column--2');

// Smooth scrolling to page sections -------------------------------------------
nav__links.addEventListener('click', function (e) {
  //console.log(e.target.dataset.id);
  document
    .querySelector(`#${e.target.dataset.id}`)
    .scrollIntoView({ behavior: 'smooth' });
});
