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


        const menuLinks = document.querySelectorAll('.menu-item a');
        const mainText = document.getElementById('main-text');

        const aboutHeading = document.getElementById('about-heading');
        const aboutSecondaryHeading = document.getElementById('about-secondary-heading');
        const aboutAdvantages = document.querySelectorAll('.about-advantage span');

        const galleryHeading = document.getElementById('gallery-heading');
        const galleryButtonText = document.querySelector('.gallery-button span');

        const puppiesHeading = document.getElementById('puppies-heading');
        const puppiesSecondaryHeading = document.getElementById('puppies-secondary-heading');
        const puppiesSecondaryHeadingHTML = document.getElementById('puppies-secondary-heading-html');

        const advantagesHeading = document.getElementById('advantages-heading');
        const advantagesSecondaryHeading = document.getElementById('advantages-secondary-heading');
        const advantagesItems = document.querySelectorAll('.advantages-item span');

        const faqHeading = document.getElementById('faq-heading');
        const faqQuestions = document.querySelectorAll('.faq-accordion-button-text');
        const faqAnswers = document.querySelectorAll('.faq-accordion-text');
        const faqAnswerHTML = document.getElementById('faq-answer-html');

        const footerLinksText = document.querySelectorAll('.footer-link span');

        let locales;
        const localesReady = fetch('/src/locales.json').then(r => r.json()).then(d => (locales = d));

        localesReady.then(() => {
            const languageSelect = document.getElementById('language-select');
            languageSelect.addEventListener('change', (e) => {

                const lang = e.target.value;

                if (lang === 'en' || lang === 'ru') {
                    document.documentElement.dir = 'ltr';
                } else if (lang === 'he') {
                    document.documentElement.dir = 'rtl';
                }

                for (let i = 0; i < menuLinks.length; i++) {
                    menuLinks[i].innerText = locales[lang].main.menu[i];
                }
                mainText.innerText = locales[lang].main.text;

                aboutHeading.innerText = locales[lang].about.heading;
                aboutSecondaryHeading.innerText = locales[lang].about.secondary_heading;
                for (let i = 0; i < aboutAdvantages.length; i++) {
                    aboutAdvantages[i].innerText = locales[lang].about.advantages[i];
                }

                galleryHeading.innerText = locales[lang].gallery.heading;
                galleryButtonText.innerText = locales[lang].gallery.button;

                puppiesHeading.innerText = locales[lang].puppies.heading;
                puppiesSecondaryHeading.innerText = locales[lang].puppies.secondary_heading
                puppiesSecondaryHeadingHTML.innerHTML = locales[lang].puppies.secondary_heading_html;

                advantagesHeading.innerText = locales[lang].advantages.heading;
                advantagesSecondaryHeading.innerText = locales[lang].advantages.secondary_heading;
                for (let i = 0; i < advantagesItems.length; i++) {
                    advantagesItems[i].innerText = locales[lang].advantages.items[i];
                }

                faqHeading.innerText = locales[lang].faq.heading;
                for (let i = 0; i < faqQuestions.length; i++) {
                    faqQuestions[i].innerText = locales[lang].faq.buttons[i];
                }
                for (let i = 0; i < faqAnswers.length; i++) {
                    faqAnswers[i].innerText = locales[lang].faq.answers[i];
                }
                console.log(faqAnswerHTML.innerHTML = locales[lang].faq.answer_html);
                faqAnswerHTML.innerHTML = locales[lang].faq.answer_html;

                for (let i = 0; i < footerLinksText.length; i++) {
                    footerLinksText[i].innerText = locales[lang].footer[i];
                }
            });
        });


        headerMenuButton.addEventListener("click", function (e) {
            e.preventDefault();
            toggleActive();
        });

        menuCloseButton.addEventListener("click", function (e) {
            e.preventDefault();
            toggleActive();
        });


        for (let i = 0; i < accordionButtons.length; i++) {
            accordionButtons[i].addEventListener("click", function () {
                this.classList.toggle("active");
                let accordionText = this.nextElementSibling;
                if (accordionText.style.maxHeight) {
                    accordionText.style.maxHeight = null;
                    accordionButtons[i].children[1].innerHTML = "<span class=\"faq-accordion-icon\">&plus;</span>";
                } else {
                    accordionText.style.maxHeight = accordionText.scrollHeight + "px";
                    accordionButtons[i].children[1].innerHTML = "<span class=\"faq-accordion-icon\">&minus;</span>";
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
            const clickedImage = e.target === dialogImg;
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