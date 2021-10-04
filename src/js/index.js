"use strict";

// Variables

const linkPartners = document.querySelector(".link-partners");
const linkTeams = document.querySelector(".link-teams");

const containerDropDownPartners = document.querySelector(
  ".drop-down-partners-container"
);
const containerDropDownTeams = document.querySelector(
  ".drop-down-teams-container"
);

const dropDownOverlay = document.querySelector(".drop-down-overlay");

// Functions

const collapseSection = function (element) {
  requestAnimationFrame(function () {
    element.style.height = `0px`;
  });
};

const expandSection = function (element) {
  const sectionHeight = element.scrollHeight;
  console.log(sectionHeight);

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

// Event Handlers

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
