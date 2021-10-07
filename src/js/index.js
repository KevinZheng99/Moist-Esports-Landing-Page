"use strict";

// Variables

// Links
const linkPartners = document.querySelector(".link-partners");
const linkTeams = document.querySelector(".link-teams");
const linkPartnersH = document.querySelector(".hamburger-partners");
const linkTeamsH = document.querySelector(".hamburger-teams");

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
const dropDownOverlay = document.querySelector(".drop-down-overlay");

// Constants
const IMAGE_REVEAL_TIMER = 0.5;

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
    containerHamburger.classList.remove("open");
    containerHamburgerNav.classList.add("hidden");
    requestAnimationFrame(function () {
      containerHamburgerNav.style.opacity = 0;
    });
  }
});

linkPartnersH.addEventListener("click", function () {
  if (containerHamburgerPartners.classList.contains("collapsed")) {
    // expand
    containerHamburgerPartners
      .querySelectorAll("a")
      .forEach(link => link.classList.remove("hidden"));

    expandSection(containerHamburgerPartners);
    containerHamburgerPartners.classList.remove("collapsed");
    containerHamburgerPartners.style.margin = `2em 0`;
  } else {
    // collapse
    // Gives the animation before hiding the images
    setTimeout(function () {
      containerHamburgerPartners
        .querySelectorAll("a")
        .forEach(link => link.classList.add("hidden"));
    }, IMAGE_REVEAL_TIMER * 1000);

    containerHamburgerPartners.classList.add("collapsed");
    collapseSection(containerHamburgerPartners);
    containerHamburgerPartners.style.margin = `0`;
  }
});

linkTeamsH.addEventListener("click", function () {
  if (containerHamburgerTeams.classList.contains("collapsed")) {
    // expand
    containerHamburgerTeams
      .querySelectorAll("a")
      .forEach(link => link.classList.remove("hidden"));

    expandSection(containerHamburgerTeams);
    containerHamburgerTeams.classList.remove("collapsed");
    containerHamburgerTeams.style.margin = `2em 0`;
  } else {
    // collapse
    // Gives the animation before hiding the images
    setTimeout(function () {
      containerHamburgerTeams
        .querySelectorAll("a")
        .forEach(link => link.classList.add("hidden"));
    }, IMAGE_REVEAL_TIMER * 1000);

    containerHamburgerTeams.classList.add("collapsed");
    collapseSection(containerHamburgerTeams);
    containerHamburgerTeams.style.margin = `0`;
  }
});

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
