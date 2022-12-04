// Mobile Menu
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

const mediaQuery = window.matchMedia('(min-width: 992px)');

const checkMobileQuery = (e) => {
  if (e.matches && mobileMenu.classList.contains('active')) {
    toggleNavbar();
  }
};

mediaQuery.addEventListener('change', checkMobileQuery);
checkMobileQuery(mediaQuery);

const menuLinks = document.querySelectorAll('.header__links > a');

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
      toggleNavbar();
    }
  });
});
