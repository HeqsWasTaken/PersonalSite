document.addEventListener("DOMContentLoaded",()=>{

  const toggle = document.getElementById("langToggle");

  let lang = "tr";

  const content = {
    tr:{
      title:"Merhaba, ben Poyraz",
      who:"Ben Kimim",
      goal:"Amacım",
      contact:"İletişim",
      whoText:"Modern web uygulamaları geliştiriyorum.",
      goalText:"Yaratıcı projeler üretmek.",
      mail:"Mail Gönder"
    },
    en:{
      title:"Hi, I'm Poyraz",
      who:"Who Am I",
      goal:"My Goal",
      contact:"Contact",
      whoText:"I build modern web applications.",
      goalText:"Creating innovative projects.",
      mail:"Send Email"
    }
  };

  function update(){
    const d = content[lang];

    document.getElementById("title").textContent = d.title;

    document.querySelectorAll(".buttons button").forEach(btn=>{
      const key = btn.getAttribute("data-key");
      if(key && d[key]){
        btn.textContent = d[key];
      }
    });

    document.getElementById("panel-who-title").textContent = d.who;
    document.getElementById("panel-who-text").textContent = d.whoText;

    document.getElementById("panel-goal-title").textContent = d.goal;
    document.getElementById("panel-goal-text").textContent = d.goalText;

    document.getElementById("panel-contact-title").textContent = d.contact;
    document.getElementById("panel-contact-btn").textContent = d.mail;
  }

  toggle.addEventListener("click",()=>{
    lang = lang === "tr" ? "en" : "tr";
    toggle.classList.toggle("active");
    update();
  });

  update();

});