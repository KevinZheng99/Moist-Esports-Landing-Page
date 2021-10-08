"use strict";

// Variables

// Links
const linkPartners = document.querySelector(".link-partners");
const linkTeams = document.querySelector(".link-teams");
const linkPartnersH = document.querySelector(".hamburger-partners");
const linkTeamsH = document.querySelector(".hamburger-teams");

// Buttons
const btnAboutH = document.querySelector(".about-btn-h");

// Containers
const containerHeader = document.querySelector(".main-header");
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
const collapseSection = function (element) {
  requestAnimationFrame(function () {
    element.style.height = `0px`;
  });
};

const expandSection = function (element) {
  const sectionHeight = element.scrollHeight;

  requestAnimationFrame(function () {
    element.style.height = `0px`;

    requestAnimationFrame(function () {
      element.style.height = `${sectionHeight}px`;
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
    collapseSection(sectionOpen);
    sectionOpen.classList.add("collapsed");
    linkOpen.style.textDecoration = "none";

    sectionOpen
      .querySelectorAll("a")
      .forEach(link => link.classList.add("hidden"));
  } else {
    // expands
    sectionOpen.querySelectorAll("a").forEach(link => {
      link.classList.remove("hidden");
    });
    expandSection(sectionOpen);
    sectionOpen.classList.remove("collapsed");
    linkOpen.style.textDecoration = "underline";

    // Hides the images of the container being swapped
    sectionClose
      .querySelectorAll("a")
      .forEach(link => link.classList.add("hidden"));

    // Collapses active container when swapping sections
    collapseSection(sectionClose);
    sectionClose.classList.add("collapsed");
    linkClose.style.textDecoration = "none";
  }
};

const openLinkHamburger = function (container) {
  if (container.classList.contains("collapsed")) {
    // expand
    container
      .querySelectorAll("a")
      .forEach(link => link.classList.remove("hidden"));

    expandSection(container);
    container.classList.remove("collapsed");
    container.style.margin = `2em 0`;

    requestAnimationFrame(function () {
      containerHamburgerNav.style.height = `auto`;
    });
  } else {
    // collapse
    // Gives the animation before hiding the images
    setTimeout(function () {
      container
        .querySelectorAll("a")
        .forEach(link => link.classList.add("hidden"));
    }, FADING_TIMER * 1000);

    const navHeight = containerHamburgerNav.scrollHeight;
    const headerHeight = containerHeader.scrollHeight;
    requestAnimationFrame(function () {
      containerHamburgerNav.style.height = `${
        navHeight - container.scrollHeight - headerHeight
      }px`;
    });

    container.classList.add("collapsed");
    collapseSection(container);
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
    players.forEach(player => {
      requestAnimationFrame(function () {
        player.style.opacity = 1;
      });
    });
    isActive = true;
  }

  if (containerPlayers.getBoundingClientRect().y > window.scrollY) {
    players.forEach(player => {
      requestAnimationFrame(function () {
        player.style.opacity = 0;
      });
    });
    isActive = false;
  }
});
