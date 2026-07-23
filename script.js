/* ========================================================================== */
/*  Interakcje strony: mobilne menu, menu rozwijane i animacje przy przewijaniu */
/* ========================================================================== */

// Pobranie elementów, które zmieniają stan podczas korzystania ze strony.
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const dropdownButton = document.querySelector('.nav-dropdown-toggle');
const dropdownPanel = document.querySelector('.nav-dropdown-panel');
const navigationLinks = document.querySelectorAll('.main-nav a');

// Funkcja zamyka rozwijane części menu i przywraca poprawne atrybuty dostępności.
function closeMenus() {
  navigation.classList.remove('is-open');
  menuButton.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  dropdownPanel.classList.remove('is-open');
  dropdownButton.setAttribute('aria-expanded', 'false');
}

// Kliknięcie ikony hamburgera pokazuje lub ukrywa menu na telefonie.
menuButton.addEventListener('click', () => {
  const menuIsOpen = navigation.classList.toggle('is-open');
  menuButton.classList.toggle('is-open', menuIsOpen);
  menuButton.setAttribute('aria-expanded', String(menuIsOpen));
});

// Kliknięcie "Menu" rozwija listę skrótów zarówno na desktopie, jak i na telefonie.
dropdownButton.addEventListener('click', () => {
  const dropdownIsOpen = dropdownPanel.classList.toggle('is-open');
  dropdownButton.setAttribute('aria-expanded', String(dropdownIsOpen));
});

// Po wybraniu sekcji zamykamy menu — dzięki temu ekran telefonu nie pozostaje zasłonięty.
navigationLinks.forEach((link) => link.addEventListener('click', closeMenus));

// Kliknięcie poza menu zamyka rozwiniętą listę nawigacji.
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenus();
});

// Po przewinięciu nagłówek otrzymuje bardziej czytelne, lekko rozmyte tło.
function updateHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 25);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Observer dodaje klasę widoczności, kiedy fragment strony wejdzie w pole widzenia.
// Gdy użytkownik wraca w górę, klasa jest odejmowana, aby animacja mogła wrócić.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('is-visible', entry.isIntersecting);
  });
}, { threshold: 0.16, rootMargin: '0px 0px -5% 0px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
