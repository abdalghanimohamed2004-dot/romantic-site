const screens = [...document.querySelectorAll(".screen")];
const song = document.getElementById("song");
const musicBox = document.getElementById("musicBox");
const musicToggle = document.getElementById("musicToggle");
const questions = [
  "إيه أكتر حاجة بتحبيها فيا؟ 🩷",
  "إيه أكتر موقف بينا عمرك ما تنسيه؟ ✨",
  "إيه أكتر كلمة مني بتحبي تسمعيها؟ 💗",
  "إيه أكتر حاجة نفسك نعملها سوا في المستقبل؟ 💍",
  "لو هتوصفي حكايتنا بكلمة واحدة، هتكون إيه؟ 🖤"
];
let qIndex = 0;

function show(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo(0,0);
}

function makeParticles(){
  const box=document.getElementById("particles");
  for(let i=0;i<65;i++){
    const p=document.createElement("span");
    p.className="particle";
    p.style.left=Math.random()*100+"%";
    p.style.animationDuration=(5+Math.random()*10)+"s";
    p.style.animationDelay=(-Math.random()*12)+"s";
    p.style.width=p.style.height=(2+Math.random()*4)+"px";
    box.appendChild(p);
  }
}
makeParticles();

function renderDots(){
  const d=document.getElementById("dots");
  d.innerHTML=questions.map((_,i)=>`<span class="dot ${i===qIndex?'on':''}"></span>`).join("");
}
renderDots();

document.getElementById("enterBtn").addEventListener("click",()=>{
  const day=Number(document.getElementById("day").value);
  const month=Number(document.getElementById("month").value);
  const error=document.getElementById("error");
  if(day===5 && month===6){
    error.textContent="";
    show("home");
    musicBox.style.display="block";
    song.volume=.65;
    song.play().catch(()=>{});
  }else{
    error.textContent="مش ده اليوم يا حبيبتي 🥹🩷 افتكري اليوم اللي بدأ فيه أجمل فصل في حكايتنا.";
    document.getElementById("day").animate(
      [{transform:"translateX(0)"},{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}],
      {duration:350}
    );
  }
});

document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click",()=>show(btn.dataset.next));
});

document.getElementById("nextQuestion").addEventListener("click",()=>{
  const answer=document.getElementById("answer");
  if(qIndex < questions.length-1){
    qIndex++;
    document.getElementById("questionText").textContent=questions[qIndex];
    answer.value="";
    renderDots();
  }else{
    show("final");
  }
});

document.getElementById("skipQuestions").addEventListener("click",()=>show("final"));

musicToggle.addEventListener("click",()=>{
  if(song.paused){
    song.play().catch(()=>{});
    musicToggle.textContent="إيقاف";
  }else{
    song.pause();
    musicToggle.textContent="تشغيل";
  }
});
