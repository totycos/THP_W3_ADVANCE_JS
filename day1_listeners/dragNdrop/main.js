// ##### TABS #####
// ################

// Tabs
const tab_accueil = document.getElementById('tab_accueil')
const tab_menu = document.getElementById('tab_menu')
const tab_gallery = document.getElementById('tab_gallery')

// Menu pages
const page_menu_content_accueil = document.getElementById('page_menu_content_accueil')
const page_menu_content_menu = document.getElementById('page_menu_content_menu')
const page_menu_content_gallery = document.getElementById('page_menu_content_gallery')

// Functions
const hide = (element) => element.style.display = 'none'
const show = (element) => element.style.display = 'block'
const active_tab = (tab) => tab.style.borderBottom = '0px solid #ffe4c426'
const inactive_tab = (tab) => tab.style.borderBottom = '2px solid #ffe4c426'

// Listeners
tab_accueil.addEventListener('click', () => {
    active_tab(tab_accueil)
    inactive_tab(tab_menu)
    inactive_tab(tab_gallery)

    show(page_menu_content_accueil)
    hide(page_menu_content_menu)
    hide(page_menu_content_gallery)
});

tab_menu.addEventListener('click', () => {
    active_tab(tab_menu)
    inactive_tab(tab_accueil)
    inactive_tab(tab_gallery)

    show(page_menu_content_menu)
    hide(page_menu_content_accueil)
    hide(page_menu_content_gallery)
});

tab_gallery.addEventListener('click', () => {
    active_tab(tab_gallery)
    inactive_tab(tab_accueil)
    inactive_tab(tab_menu)

    show(page_menu_content_gallery)
    hide(page_menu_content_accueil)
    hide(page_menu_content_menu)
});


// ##### IA MENU #####
// ####################

const mainCourses = ["Filet de turbot de la mer Noire", "Tablier de sapeur", "Gigot d'agneau", "Faisan de forêt", "Trio de quinoa, chou kale et pousses d'épinard"];
const techniques = ["à la cocotte", "minute", "avec sa sauce hollandaise", "façon sud-ouest", "comme chez ma grand-mère", "déglacé au saké", "maturé en fût de chêne"];
const sides = ["une purée de topinambour", "ses frites truffées", "des châtaignes croustillantes", "une brunoise carotte-cèleri", "un oeuf parfait", "sa crème veloutée de fromages affinés"];
const seasonings = ["au yuzu rouge", "au poivre vert de Sichuan", "et une pointe de safran", "à l'ail noir", "et un peu de sucre en poudre"];

const getRandom = (data) => data[Math.floor(Math.random() * data.length)];

const update_menu_btn = document.getElementById('update_menu_btn')
const todays_special = document.getElementById('todays_special')

update_menu_btn.addEventListener('click', () => {
    const menu = `${getRandom(mainCourses)} ${getRandom(techniques)}, avec ${getRandom(sides)} ${getRandom(seasonings)}`
    todays_special.innerHTML = menu
});


// ##### POPUP #####
// #################

const popup_bg = document.getElementById('popup_bg');

const handleMouseLeave = () => {
    popup_bg.style.display = 'block';
}

const handleMouseLeaveOnce = () => {
    handleMouseLeave();
    document.removeEventListener('mouseleave', handleMouseLeaveOnce);
}

document.addEventListener('mouseleave', handleMouseLeaveOnce);

document.addEventListener('click', () => {
    popup_bg.style.display = 'none';
});


// ##### DRAG N DROP #####
// #######################

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".image");

    let draggedElement = null;

    elements.forEach(function (item) {
        item.addEventListener("dragstart", dragstartHandler);
        item.addEventListener("dragenter", dragenterHandler);
        item.addEventListener("dragover", dragoverHandler);
        item.addEventListener("dragleave", dragleaveHandler);
        item.addEventListener("drop", dropHandler);
        item.addEventListener("dragend", dragendHandler);
    });

    function dragstartHandler(ev) {
        ev.dataTransfer.setData("text/plain", ev.target.id);
        ev.dataTransfer.dropEffect = "move";
        draggedElement = ev.target;
    }

    function dragenterHandler(ev) {
        ev.preventDefault();
    }

    function dragoverHandler(ev) {
        ev.preventDefault();
        const targetElement = ev.target;

        if (isDropAreaValid(targetElement)) {
            // Highlight the drop area if it's a valid drop target
            targetElement.classList.add("drop-area");
        }
    }

    function dragleaveHandler(ev) {
        ev.preventDefault();
        const targetElement = ev.target;

        if (isDropAreaValid(targetElement)) {
            // Remove the highlight when leaving a valid drop target
            targetElement.classList.remove("drop-area");
        }
    }

    function dropHandler(ev) {
        ev.preventDefault();
        const targetElement = ev.target;

        if (isDropAreaValid(targetElement)) {
            // Remove the highlight when dropping on a valid drop target
            targetElement.classList.remove("drop-area");

            // Get the index of the target element
            const targetIndex = Array.from(targetElement.parentNode.children).indexOf(targetElement);

            // Insert the dragged element before or after the target element based on the mouse position
            if (ev.clientY < targetElement.getBoundingClientRect().top + targetElement.offsetHeight / 2) {
                targetElement.parentNode.insertBefore(draggedElement, targetElement);
            } else {
                targetElement.parentNode.insertBefore(draggedElement, targetElement.nextSibling);
            }
        }
    }

    function dragendHandler(ev) {
        draggedElement = null;
    }

    function isDropAreaValid(element) {
        // Check if the element is a valid drop target
        return element.classList.contains("image") || element.id === "gallery";
    }
});
