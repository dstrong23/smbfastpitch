(async function loadSharedIncludes() {
  const includeTargets = document.querySelectorAll("[data-include]");

  await Promise.all(Array.from(includeTargets, async (target) => {
    const includePath = target.getAttribute("data-include");
    const response = await fetch(includePath);

    if (!response.ok) {
      throw new Error(`Unable to load include: ${includePath}`);
    }

    target.outerHTML = await response.text();
  }));

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav a").forEach((link) => {
    const linkPage = link.getAttribute("data-page") || link.getAttribute("href");

    if (linkPage === currentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}());
