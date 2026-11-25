
const themeButton = document.querySelector("#theme-toggle");

if (themeButton) {
    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("theme") || "light";
    } catch (error) {
        savedTheme = "light";
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);

        themeButton.textContent = theme === "dark"
            ? "Switch to Light Mode"
            : "Switch to Dark Mode";
    }

    applyTheme(savedTheme);
    themeButton.hidden = false;

   
themeButton.addEventListener("click", function() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    function switchColors() {
        applyTheme(newTheme);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (document.startViewTransition && !reduceMotion) {
        document.startViewTransition(switchColors);
    } else {
        switchColors();
    }

    try {
        localStorage.setItem("theme", newTheme);
    } catch (error) {
    }
});

}
