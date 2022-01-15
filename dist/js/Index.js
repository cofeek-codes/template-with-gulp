"use strict"
// BURGER

// BURGER


// OS CHECK



const isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows()}};


// OS CHECK



if (isMobile.any()) {
    document.body.classList.add('_mobile');

    let menuarrows = document.querySelectorAll('.link-arrow');
    if (menuarrows.length>0) {
        for (let index = 0; index < menuarrows.length; index++) {
            const menuarrow = menuarrows[index];
            menuarrow.addEventListener('click', () => {
                menuarrow.parentElement.classList.toggle('__active');
            })
            
        }
    }

}else {
    document.body.classList.add('_pc');
    
}



(function () {
    const burgeritem = document.querySelector ('.burger');
    const menu = document.querySelector ('.nav');
    const menulinks = document.querySelectorAll ('.nav__list-item-link');
    //! CLOSING
    const menuclose = document.querySelector ('.header__nav-close');
    //!
    burgeritem.addEventListener('click', () => {
       menu.classList.add('nav-active');
    });
    //! CLOSING
    menuclose.addEventListener('click', () => {
        menu.classList.remove ('nav-active');
    });
    // close on click-on-link 
if (window.innerWidth < 768) {
    for (let i = 0; i < menulinks.length; i += 1) {
        menulinks[i].addEventListener('click', () => {
            menu.classList.remove ('nav-active');
        });
    }
}
}());

