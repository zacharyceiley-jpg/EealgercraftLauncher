async function openInfoPage(page) {
  const panel = document.getElementById("infoPanel");
  const content = document.getElementById("infoContent");
  if (!panel || !content) return;

  document.getElementById("game-bg").style.display = "none";
  document.getElementById("gameSelection").style.display = "none";
  const menu = document.getElementById("versionMenu");
  const dropdown = document.getElementById("versionDropdown");
  if (menu) menu.hidden = true;
  if (dropdown) dropdown.setAttribute("aria-expanded", "false");
  panel.style.display = "block";

  document.getElementById("playTab").className = "headerButtons";
  document.getElementById("faqTab").className = page === "faq" ? "headerButtonSelected" : "headerButtons";
  document.getElementById("changelogTab").className = page === "changelog" ? "headerButtonSelected" : "headerButtons";

  if (page === "faq") {
    content.innerHTML = '<p class="info-loading">Loading FAQ…</p>';
    try {
      const response = await fetch("./faq-content.html");
      if (!response.ok) throw new Error("FAQ could not be loaded");
      content.innerHTML = await response.text();
    } catch (error) {
      content.innerHTML = '<p class="info-error">The FAQ could not be loaded. Please refresh and try again.</p>';
    }
    return;
  }

  content.innerHTML = '<p class="info-loading">Loading changelogs…</p>';
  try {
    if (!window.marked) throw new Error("Markdown renderer unavailable");
    const versions = [
      { file: "./changelogs/java-26.2.md", title: "Java Edition · 26.2", subtitle: "Chaos Cubed" },
      { file: "./changelogs/bedrock-1.8.0.md", title: "Bedrock Edition · 1.8.0", subtitle: "11 December 2018" },
      { file: "./changelogs/bedrock-1.5.0.md", title: "Bedrock Edition · 1.5.0", subtitle: "Update Aquatic — Phase Two" },
      { file: "./changelogs/beta-1.0.md", title: "BETA · 1.0", subtitle: "MCPE / Windows 10 / Gear VR" }
    ];
    const articles = await Promise.all(versions.map(async (version, index) => {
      const response = await fetch(version.file);
      if (!response.ok) throw new Error("A changelog source could not be loaded");
      let markdown = await response.text();
      markdown = markdown.replace(
        /\[([^\]]+)\]\((https:\/\/www\.minecraft\.net\/content\/[^)]+\.jpg)\)\s*\n\s*\n\*\*(.*?)\*\*\s*\[Click here for a link to the full-size image\.\]\(([^)]+)\)/gs,
        (match, alt, imageUrl, caption, originalUrl) =>
          '<figure class="changelog-figure"><a href="' + imageUrl + '" target="_blank" rel="noopener"><img src="' + imageUrl + '" alt="' + alt.replace(/"/g, "&quot;") + '" loading="lazy"></a><figcaption>' + caption + ' <a href="' + originalUrl + '" target="_blank" rel="noopener">Open full-size image</a></figcaption></figure>'
      );
      const body = window.marked.parse(markdown, { gfm: true });
      return '<details class="changelog-entry"' + (index === 0 ? " open" : "") + '><summary><span class="entry-version">' + version.title + '</span><span class="entry-subtitle">' + version.subtitle + '</span><span class="entry-chevron">⌄</span></summary><div class="entry-body">' + body + "</div></details>";
    }));
    content.innerHTML = '<div class="changelog-intro"><div class="eyebrow">VERSION HISTORY</div><h1>Changelog</h1><p>Update notes for the Minecraft versions included in this launcher. Select a version to expand its notes.</p></div><div class="changelog-list">' + articles.join("") + "</div>";
  } catch (error) {
    content.innerHTML = '<p class="info-error">The changelogs could not be loaded. Please refresh and try again.</p>';
  }
}

function openFAQ() {
  openInfoPage("faq");
}

function openChangelog() {
  openInfoPage("changelog");
}

function closeInfoPage() {
  const panel = document.getElementById("infoPanel");
  if (panel) panel.style.display = "none";
  const background = document.getElementById("game-bg");
  const selection = document.getElementById("gameSelection");
  if (background) background.style.display = "flex";
  if (selection) selection.style.display = "flex";
  const play = document.getElementById("playTab");
  const faq = document.getElementById("faqTab");
  const changelog = document.getElementById("changelogTab");
  if (play) play.className = "headerButtonSelected";
  if (faq) faq.className = "headerButtons";
  if (changelog) changelog.className = "headerButtons";
}
