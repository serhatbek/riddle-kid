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

// It's better to use 'matchMedia' since 'onresize' event is an expensive operation.

const mediaQuery = window.matchMedia('(min-width: 992px)');

const checkMobileQuery = (e) => {
  if (e.matches && mobileMenu.classList.contains('active')) {
    toggleNavbar();
  }
};

mediaQuery.addEventListener('change', checkMobileQuery);
checkMobileQuery(mediaQuery);
