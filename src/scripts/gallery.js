(function () {
    'use strict';
    window.addEventListener('DOMContentLoaded', function () {

        const dialog = document.getElementById('lightbox');
        const dialogImg = document.getElementById('lightbox-img');

        const pageGalleryItems = document.getElementsByClassName('page-gallery-item');
        for (let i = 0; i < pageGalleryItems.length; i++) {
            pageGalleryItems[i].addEventListener('click', (e) => {

                const img = e.target.closest('.page-gallery-item img');
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


        let locales;
        const localesUrl = new URL('./../locales/locales.json', location.href);
        const localesReady = fetch(localesUrl).then(r => r.json()).then(d => (locales = d)).catch(err => console.error(err));

        const pageGalleryHeading = document.getElementById('page-gallery-heading');
        const footerLinksText = document.querySelectorAll('.footer-link span');
        const pageTitle = document.getElementById('page-title');

        localesReady.then(() => {
            const languageSelect = document.getElementById('language-select');
            languageSelect.addEventListener('change', (e) => {

                const lang = e.target.value;

                if (lang === 'en' || lang === 'ru') {
                    document.documentElement.dir = 'ltr';
                } else if (lang === 'he') {
                    document.documentElement.dir = 'rtl';
                }

                pageGalleryHeading.innerText = locales[lang].gallery.heading;
                pageTitle.innerText = locales[lang].gallery.heading;

                for (let i = 0; i < footerLinksText.length; i++) {
                    footerLinksText[i].innerText = locales[lang].footer[i];
                }
            });
        });
    });
})();