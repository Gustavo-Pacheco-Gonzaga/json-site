const menuMobile = document.getElementById('menu-mobile');
const menu = document.getElementById('menu-ul');
const menuBody = document.querySelector('body');
const backgroundMenu = document.getElementById('background-menu');
let bodyHeight = menuBody.style.height;

menuMobile.addEventListener('click', toggleMenu);

function toggleMenu() {
    let menuItens = document.querySelectorAll('.header-link');
    menuItens.forEach(item => {
        item.addEventListener('click', toggleMenu);
    })

    // animação do icone do menu
    document.getElementById('left').classList.toggle('show-close-left');
    document.getElementById('middle').classList.toggle('show-close-middle');
    document.getElementById('right').classList.toggle('show-close-right');

    if (document.getElementById('left').classList.contains('show-close-left')) {
        menuBody.style.height = '1000px';
        menuBody.style.overflow = 'hidden';
        menuItens.forEach(item => {
            item.style.pointerEvents = 'all';
        });
    } else {
        menuBody.style.height = bodyHeight;
        menuBody.style.overflow = 'scroll';
        menuItens.forEach(item => {
            item.style.pointerEvents = 'none';
        });
    }
    // animação do menu aparecendo
    menu.classList.toggle('menu-ul-menu-open');
    backgroundMenu.style.height = document.documentElement.scrollHeight + 'px';
    backgroundMenu.classList.toggle('background-menu-open');
}