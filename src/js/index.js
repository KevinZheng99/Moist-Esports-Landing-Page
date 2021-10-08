import * as helper from "./helper.js";

// Variables

// Links
const linkPartners = document.querySelector(".link-partners");
const linkTeams = document.querySelector(".link-teams");
const linkPartnersH = document.querySelector(".hamburger-partners");
const linkTeamsH = document.querySelector(".hamburger-teams");

// Buttons
const btnAboutH = document.querySelector(".about-btn-h");

// Containers
const containerHamburger = document.querySelector(".hamburger-container");
const containerHamburgerNav = document.querySelector(
  ".hamburger-nav-container"
);
const containerHamburgerPartners = document.querySelector(
  ".hamburger-partners-container"
);
const containerHamburgerTeams = document.querySelector(
  ".hamburger-teams-container"
);

const containerDropDownPartners = document.querySelector(
  ".drop-down-partners-container"
);
const containerDropDownTeams = document.querySelector(
  ".drop-down-teams-container"
);
const containerPlayers = document.querySelector(".players-container");

// Others
const players = document.querySelectorAll(".player");

// Constants
const FADING_TIMER = 0.5;

// Functions
const fadePlayerSections = function (opacity) {
  players.forEach(player => {
    requestAnimationFrame(function () {
      player.style.opacity = opacity;
    });
  });
};

const switchSections = function (
  sectionOpen,
  sectionClose,
  linkOpen,
  linkClose
) {
  if (!sectionOpen.classList.contains("collapsed")) {
    // collaspses
    helper.collapseSectionStyle(sectionOpen, linkOpen);
    helper.hideLinks(sectionOpen);
  } else {
    // expands
    helper.showLinks(sectionOpen);
    helper.expandSection(sectionOpen);
    sectionOpen.classList.remove("collapsed");
    linkOpen.style.textDecoration = "underline";

    // Hides the images of the container being swapped
    helper.hideLinks(sectionClose);

    // Collapses active container when swapping sections
    helper.collapseSectionStyle(sectionClose, linkClose);
  }
};

const openLinkHamburger = function (container) {
  if (container.classList.contains("collapsed")) {
    // expand
    helper.showLinks(container);
    helper.expandSection(container);
    container.classList.remove("collapsed");
    container.style.margin = `2em 0`;
  } else {
    // collapse
    // Gives fade animation before hiding the images
    setTimeout(function () {
      helper.hideLinks(container);
    }, FADING_TIMER * 1000);

    container.classList.add("collapsed");
    helper.collapseSection(container);
    container.style.margin = 0;
  }
};

const closeHamburgerNav = function () {
  containerHamburger.classList.remove("open");
  setTimeout(function () {
    containerHamburgerNav.classList.add("hidden");
  }, FADING_TIMER * 1000);

  requestAnimationFrame(function () {
    containerHamburgerNav.style.opacity = 0;
  });
};

////////////////////
// Event Handlers //
////////////////////
linkPartners.addEventListener("click", function () {
  switchSections(
    containerDropDownPartners,
    containerDropDownTeams,
    linkPartners,
    linkTeams
  );
});

linkTeams.addEventListener("click", function () {
  switchSections(
    containerDropDownTeams,
    containerDropDownPartners,
    linkTeams,
    linkPartners
  );
});

// Hamburger links
containerHamburger.addEventListener("click", function () {
  if (!containerHamburger.classList.contains("open")) {
    containerHamburger.classList.add("open");
    containerHamburgerNav.classList.remove("hidden");
    requestAnimationFrame(function () {
      containerHamburgerNav.style.opacity = 1;
    });
  } else {
    closeHamburgerNav();
  }
});

linkPartnersH.addEventListener("click", function () {
  openLinkHamburger(containerHamburgerPartners);
});

linkTeamsH.addEventListener("click", function () {
  openLinkHamburger(containerHamburgerTeams);
});

btnAboutH.addEventListener("click", closeHamburgerNav);

// Fading in Player Section
let isActive = false;
window.addEventListener("scroll", function () {
  if (
    containerPlayers.getBoundingClientRect().y <= window.scrollY &&
    !isActive
  ) {
    fadePlayerSections(1);
    isActive = true;
  }

  if (containerPlayers.getBoundingClientRect().y > window.scrollY) {
    fadePlayerSections(0);
    isActive = false;
  }
});
