const menuToggleBtn = document.querySelector('.header__menu-toggle');
const mobileMenu = document.querySelector('.header__menu');
const appBody = document.querySelector('body');
const appMain = document.querySelector('main');

const toggleNavbar = () => {
  appBody.classList.toggle('overflowHidden');
  appMain.classList.toggle('active');
  mobileMenu.classList.toggle('active');
};

if (menuToggleBtn) {
  menuToggleBtn.addEventListener('click', toggleNavbar);
}

const checkWindowSize = () => {
  if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
    toggleNavbar();
  }
};

window.onresize = checkWindowSize;
