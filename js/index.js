const categories={
  web:{title:"EAGLERCRAFT WEB EDITION",image:"web-edition.jpg",logo:"web-title.png"},
  modded:{title:"EAGLERCRAFT MODDED EDITIONS",image:"modded-edition.jpg",logo:"modded-title.png"},
  mobile:{title:"EAGLERCRAFT MOBILE / CONTROLLER",image:"controls-edition.jpg",logo:"controls-title.png"},
  servers:{title:"EAGLERCRAFT SERVERS",image:null,logo:null},
  live:{title:"EAGLERCON LIVE",image:"eaglercon.jpg",logo:"eaglercon-title.png"}
};
const imgBase="https://raw.githubusercontent.com/zacharyceiley-jpg/EalgerLauncher/main/images/";
const versions={
  web:[{
    name:"26.2",
    url:"https://verybrobro.github.io/Eaglercraft-26.2/",
    icon:"https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c3/Expressionless_Sulfur_Face.png/revision/latest/scale-to-width-down/62?cb=20260415024809"
  }],
  modded:[],mobile:[],servers:[],live:[]
};
let selectedCategory="web";
let selectedVersion=versions.web[0]||null;
const menu=document.getElementById("versionMenu");
const dropdown=document.getElementById("versionDropdown");
function renderVersions(){
  const list=versions[selectedCategory]||[];
  menu.replaceChildren();
  if(!list.length){
    const empty=document.createElement("div");
    empty.className="dropdownOptions dropdownEmpty";
    empty.textContent="No versions available";
    menu.append(empty);
    selectedVersion=null;
  }else{
    list.forEach(version=>{
      const option=document.createElement("button");
      option.type="button";option.className="dropdownOptions";
      option.innerHTML='<span class="dropdownOption"><img width="32" height="32" alt=""><span class="dropdownOptionText"><strong></strong><small></small></span></span>';
      option.querySelector("img").src=version.icon;
      option.querySelector("strong").textContent=version.name;
      option.querySelector("small").textContent="Web Edition";
      option.addEventListener("click",()=>{
        selectedVersion=version;
        updateSelectedVersion();
        menu.hidden=true;dropdown.setAttribute("aria-expanded","false");
      });
      menu.append(option);
    });
    if(!list.includes(selectedVersion)) selectedVersion=list[0];
  }
  updateSelectedVersion();
}
function updateSelectedVersion(){
  const name=document.getElementById("selectedVersionName");
  const icon=document.getElementById("selectedVersionIcon");
  name.textContent=selectedVersion?selectedVersion.name:"No versions";
  icon.src=selectedVersion?selectedVersion.icon:"";
  document.getElementById("selectedVersionCategory").textContent=selectedVersion?"Web Edition":"No versions available";
  const play=document.getElementById("playButton");
  play.href=selectedVersion?selectedVersion.url:"#";
  play.setAttribute("aria-disabled",String(!selectedVersion));
  play.style.pointerEvents=selectedVersion?"auto":"none";
}
document.querySelectorAll("[data-category]").forEach(item=>item.addEventListener("click",()=>{
  selectedCategory=item.dataset.category;
  const data=categories[selectedCategory];
  document.querySelectorAll("[data-category]").forEach(el=>el.classList.toggle("active",el===item));
  document.getElementById("categoryTitle").textContent=data.title;
  const bg=document.getElementById("game-bg");
  bg.style.backgroundImage=data.image?"url('"+imgBase+data.image+"')":"none";
  const logo=document.querySelector(".gameLogo img");
  if(data.logo){logo.src=imgBase+data.logo;logo.style.display="block"}else{logo.style.display="none"}
  renderVersions();
}));
dropdown.addEventListener("click",()=>{
  menu.hidden=!menu.hidden;
  dropdown.setAttribute("aria-expanded",String(!menu.hidden));
});
document.addEventListener("click",event=>{
  if(!event.target.closest(".versionSelector")){
    menu.hidden=true;dropdown.setAttribute("aria-expanded","false");
  }
});
renderVersions();