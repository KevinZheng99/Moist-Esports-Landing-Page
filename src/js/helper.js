export const hideLinks = element =>
  element.querySelectorAll("a").forEach(link => link.classList.add("hidden"));

export const showLinks = element =>
  element
    .querySelectorAll("a")
    .forEach(link => link.classList.remove("hidden"));

export const collapseSection = element =>
  requestAnimationFrame(() => (element.style.height = `0px`));

export const expandSection = function (element) {
  const sectionHeight = element.scrollHeight;

  requestAnimationFrame(function () {
    element.style.height = `0px`;

    requestAnimationFrame(function () {
      element.style.height = `${sectionHeight}px`;
    });
  });
};

export const collapseSectionStyle = function (element, link) {
  collapseSection(element);
  element.classList.add("collapsed");
  link.style.textDecoration = "none";
};
