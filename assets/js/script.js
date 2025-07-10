'use strict';


// element toggle function
const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
}


// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// make sidebar expanded by default
sidebar.classList.add("active");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
});


// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
    if (modalContainer) modalContainer.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function () {

        if (modalImg && this.querySelector("[data-testimonials-avatar]")) {
            modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
            modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        }
        if (modalTitle && this.querySelector("[data-testimonials-title]")) {
            modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        }
        if (modalText && this.querySelector("[data-testimonials-text]")) {
            modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        }

        testimonialsModalFunc();

    });

}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
    elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

    for (let i = 0; i < filterItems.length; i++) {

        if (selectedValue === "all") {
            filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }

    }

}

// add event in all filter button items for large screens
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;

    });

}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

        // check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }

    });
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {

        for (let j = 0; j < pages.length; j++) {
            // Normalize both strings to handle accents properly
            const navText = this.innerHTML.toLowerCase().normalize('NFD');
            const pageData = pages[j].dataset.page.toLowerCase().normalize('NFD');

            if (navText === pageData) {
                pages[j].classList.add("active");
                navigationLinks[j].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[j].classList.remove("active");
                navigationLinks[j].classList.remove("active");
            }
        }

    });
}

// Check for resume=true query parameter on page load
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeParam = urlParams.get('resume');

    if (resumeParam === 'true') {
        // Hide the sidebar
        const sidebar = document.querySelector("[data-sidebar]");
        if (sidebar) {
            sidebar.style.display = 'none';
        }

        // Switch to resume section
        const resumePage = document.querySelector("[data-page='résumé']");

        // Find the resume navigation link
        let resumeNavButton = null;
        for (let i = 0; i < navigationLinks.length; i++) {
            const navText = navigationLinks[i].innerHTML.toLowerCase().normalize('NFD');
            if (navText === 'résumé') {
                resumeNavButton = navigationLinks[i];
                break;
            }
        }

        // Deactivate all pages and nav links
        for (let i = 0; i < pages.length; i++) {
            pages[i].classList.remove("active");
            navigationLinks[i].classList.remove("active");
        }

        // Activate resume page and nav link
        if (resumePage) {
            resumePage.classList.add("active");
        }
        if (resumeNavButton) {
            resumeNavButton.classList.add("active");
        }

        // Hide the navigation bar for cleaner PDF export
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.style.display = 'none';
        }

        // Replace the resume title with name
        const resumeTitle = resumePage.querySelector('.article-title');
        if (resumeTitle) {
            resumeTitle.textContent = 'Enrique Anthony Galea';
        }
    }
});
