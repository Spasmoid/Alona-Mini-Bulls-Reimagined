(function () {
    'use strict';
    window.addEventListener('DOMContentLoaded', function () {

        const header = document.getElementById('header');

        const dialog = document.getElementById('lightbox');
        const dialogImg = document.getElementById('lightbox-img');

        const accordionButtons = document.getElementsByClassName("faq-accordion-button");

        const headerMenuButton = document.getElementById("header-menu-button");
        const popupOverlay = document.getElementById("popup-overlay");
        const popupMenu = document.getElementById("popup-menu");
        const menuCloseButton = document.getElementById("menu-close-button");

        const logo = document.getElementById('header-logo');
        const logoBlock = document.getElementById('main-logo');
        new IntersectionObserver(([entry]) => {
            logo.classList.toggle('past', !entry.isIntersecting);
        }, {
            threshold: 0
        }).observe(logoBlock);


        headerMenuButton.addEventListener("click", function (e) {
            e.preventDefault();
            toggleActive();
        });

        menuCloseButton.addEventListener("click", function (e) {
            e.preventDefault();
            toggleActive();
        });


        for (let i = 0; i < accordionButtons.length; i++) {
            accordionButtons[i].addEventListener("click", function() {
                this.classList.toggle("active");
                let accordionText = this.nextElementSibling;
                if (accordionText.style.maxHeight) {
                    accordionText.style.maxHeight = null;
                    accordionButtons[i].children[0].innerHTML = "<span class=\"faq-accordion-icon\">&plus;</span>";
                } else {
                    accordionText.style.maxHeight = accordionText.scrollHeight + "px";
                    accordionButtons[i].children[0].innerHTML = "<span class=\"faq-accordion-icon\">&minus;</span>";
                }
            });
        }


        const galleryItems = document.getElementsByClassName('gallery-item');
        for (let i = 0; i < galleryItems.length; i++) {
            galleryItems[i].addEventListener('click', (e) => {

                const img = e.target.closest('.gallery-item img');
                if (!img) return;

                dialogImg.src = img.dataset.full || img.currentSrc || img.src;
                dialogImg.alt = img.alt || '';
                dialog.showModal();
            });
        }

        const puppiesItems = document.getElementsByClassName('puppies-item');
        for (let i = 0; i < puppiesItems.length; i++) {
            puppiesItems[i].addEventListener('click', (e) => {

                const img = e.target.closest('.puppies-item img');
                if (!img) return;

                dialogImg.src = img.dataset.full || img.currentSrc || img.src;
                dialogImg.alt = img.alt || '';
                dialog.showModal();
            });
        }


        dialog.addEventListener('click', (e) => {
            e.preventDefault();
            const clickedBackdrop = e.target === dialog;
            const clickedImage    = e.target === dialogImg;
            if (clickedBackdrop || clickedImage) dialog.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dialog.open) dialog.close();
        });


        function onScroll() {
            const offTop = window.scrollY > 0;
            header.classList.toggle('scrolled', offTop);
        }

        onScroll();
        window.addEventListener('scroll', () => requestAnimationFrame(onScroll), {passive: true});
        window.addEventListener('resize', () => requestAnimationFrame(onScroll));


        document.getElementById('main-link').addEventListener('click', function (e) {
            e.preventDefault();
            main.scrollIntoView({behavior: 'smooth'});
            toggleActive();
        });
        document.getElementById('about-link').addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('about').scrollIntoView({behavior: 'smooth'});
            toggleActive();
        });
        document.getElementById('gallery-link').addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('gallery').scrollIntoView({behavior: 'smooth'});
            toggleActive();
        });
        document.getElementById('puppies-link').addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('puppies').scrollIntoView({behavior: 'smooth'});
            toggleActive();
        });
        document.getElementById('advantages-link').addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('advantages').scrollIntoView({behavior: 'smooth'});
            toggleActive();
        });
        document.getElementById('faq-link').addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('faq').scrollIntoView({behavior: 'smooth'});
            toggleActive();
        });


        function toggleActive() {
            popupOverlay.classList.toggle("active");
            popupMenu.classList.toggle("active");
            document.documentElement.classList.toggle('modal-open');
        }
    });
})();