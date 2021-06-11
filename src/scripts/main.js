
const visibility = document.querySelector('.nav');
const toggler = document.querySelector('.menu__checkbox');

toggler.addEventListener('click', () => {
  visibility.classList.toggle('nav--visibility');
});
