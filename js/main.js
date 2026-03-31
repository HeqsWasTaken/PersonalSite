document.addEventListener("DOMContentLoaded",()=>{

  const ready = {
    carousel: typeof rotateTo === "function",
    theme: !!document.getElementById("themeToggle"),
    lang: !!document.getElementById("langToggle")
  };

  if(!ready.carousel) console.warn("carousel not loaded");
  if(!ready.theme) console.warn("theme toggle missing");
  if(!ready.lang) console.warn("language toggle missing");

  const contactBtn = document.getElementById("panel-contact-btn");

  if(contactBtn){
    contactBtn.addEventListener("click",()=>{
      window.location.href = "mailto:tupokilic@gmail.com";
    });
  }

});