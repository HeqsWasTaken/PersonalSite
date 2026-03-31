const toggle = document.getElementById("themeToggle");
const body = document.body;
const key = "theme";

function setTheme(mode){
  const isLight = mode === "light";
  body.classList.toggle("light", isLight);
  toggle.classList.toggle("active", isLight);
  localStorage.setItem(key, isLight ? "light" : "dark");
}

const saved = localStorage.getItem(key);
setTheme(saved === "light" ? "light" : "dark");

toggle.addEventListener("click",()=>{
  const isLight = body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});