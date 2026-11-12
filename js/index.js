// Version dropdown and Play redirect only.
const versions = {
  web: [{
    name: "26.2",
    url: "https://verybrobro.github.io/Eaglercraft-26.2/",
    icon: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c3/Expressionless_Sulfur_Face.png/revision/latest/scale-to-width-down/62?cb=20260415024809"
  }, {
    name: "1.5.2",
    url: "https://sd592g.github.io/zj684od4lfg/",
    icon: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/2d/Redstone_Ore_Texture_Update_Revision_1.png/revision/latest?cb=20210615182702"
  }, {
    name: "1.8.8",
    url: "https://unblockedgames88.gitlab.io/e1/eaglercraft188/",
    icon: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e6/GuardianFace.png/revision/latest?cb=20200223055028"
  }, {
    name: "BETA",
    url: "https://minecraft-eaglercraft.github.io/go/minecraft-beta/",
    icon: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/05/HumanFace.png/revision/latest?cb=20110727224631"
  }, {
    name: "26.3",
    url: "https://zacharyceiley-jpg.github.io/ealgercraft-26.3/",
    icon: "https://minecraft.wiki/images/thumb/Straw_Bed_%28N%29_JE1.png/150px-Straw_Bed_%28N%29_JE1.png?0c1fa"
  }, {
    name: "1.21.11",
    url: "https://zacharyceiley-jpg.github.io/ealgercraft-1.21.11/",
    icon: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/d3/ZautilusBody.png/revision/latest/scale-to-width-down/64?cb=20251030025755"
  }, {
    name: "1.13.2",
    url: "https://zacharyceiley-jpg.github.io/ealgercraft-1.13/",
    icon: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/0d/DolphinFace.png/revision/latest?cb=20221004203638"
  }, {
    name: "1.20.6",
    url: "https://zacharyceiley-jpg.github.io/ealgercraft-1.20.6/",
    icon: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/ca/SnifferFace.png/revision/latest?cb=20230305034256"
  }],
  modded: [],
  mobile: [],
  servers: [],
  live: []
};
const categoryItems = document.querySelectorAll("[data-category]");
const dropdown = document.getElementById("versionDropdown");
const menu = document.getElementById("versionMenu");
const selectedName = document.getElementById("selectedVersionName");
const selectedIcon = document.getElementById("selectedVersionIcon");
const selectedCategory = document.getElementById("selectedVersionCategory");
const playLink = document.getElementById("playButton");
playLink.target = "_blank";
playLink.rel = "noopener noreferrer";
let activeCategory = "web";
let activeVersion = versions.web[0];

playLink.addEventListener("click", event => {
  if (!activeVersion) event.preventDefault();
});

function setVersion(version) {
  activeVersion = version || null;
  selectedName.textContent = activeVersion ? activeVersion.name : "No versions";
  selectedIcon.src = activeVersion ? activeVersion.icon : "";
  selectedCategory.textContent = activeVersion ? "Web Edition" : "No versions available";
  playLink.href = activeVersion ? activeVersion.url : "#";
  playLink.setAttribute("aria-disabled", String(!activeVersion));
  playLink.tabIndex = activeVersion ? 0 : -1;
}

function renderDropdown() {
  menu.replaceChildren();
  const list = versions[activeCategory] || [];
  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "dropdownOptions dropdownEmpty";
    empty.textContent = "No versions available";
    menu.appendChild(empty);
    setVersion(null);
    return;
  }
  list.forEach(version => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "dropdownOptions";
    const row = document.createElement("span");
    row.className = "dropdownOption";
    const img = document.createElement("img");
    img.src = version.icon;
    img.alt = "";
    img.width = 32;
    img.height = 32;
    const labels = document.createElement("span");
    labels.className = "dropdownOptionText";
    const name = document.createElement("strong");
    name.textContent = version.name;
    const edition = document.createElement("small");
    edition.textContent = "Web Edition";
    labels.append(name, edition);
    row.append(img, labels);
    option.append(row);
    option.addEventListener("click", event => {
      event.stopPropagation();
      setVersion(version);
      menu.hidden = true;
      dropdown.setAttribute("aria-expanded", "false");
    });
    menu.appendChild(option);
  });
  setVersion(list[0]);
}

dropdown.addEventListener("click", event => {
  event.stopPropagation();
  menu.hidden = !menu.hidden;
  dropdown.setAttribute("aria-expanded", String(!menu.hidden));
});

document.addEventListener("click", event => {
  if (!event.target.closest(".versionSelector")) {
    menu.hidden = true;
    dropdown.setAttribute("aria-expanded", "false");
  }
});

categoryItems.forEach(item => {
  item.addEventListener("click", () => {
    if (typeof closeInfoPage === "function") closeInfoPage();
    activeCategory = item.dataset.category;
    renderDropdown();
    menu.hidden = true;
    dropdown.setAttribute("aria-expanded", "false");
  });
});

renderDropdown();