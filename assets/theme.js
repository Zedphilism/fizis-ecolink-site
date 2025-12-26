const root = document.documentElement;
const toggleButton = document.getElementById("themeToggle");
const yearLabel = document.getElementById("year");

const prefersDark =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem("theme");

if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
  root.classList.add("dark");
} else {
  root.classList.remove("dark");
}

if (yearLabel) {
  yearLabel.textContent = new Date().getFullYear();
}

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    root.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      root.classList.contains("dark") ? "dark" : "light"
    );
  });
}

const teamSection = document.getElementById("team");
if (teamSection) {
  teamSection.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      const initials = (img.alt || "")
        .split(" ")
        .map((segment) => segment[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "--";
      img.src =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
             <rect width="100%" height="100%" fill="#0b1220"/>
             <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                   font-family="Inter, Arial" font-size="120" fill="#10B981">${initials}</text>
           </svg>`
        );
    });
  });
}
