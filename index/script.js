const text = "> INITIALIZING SECURE KERNEL v9.0.4...> INITIALIZING SECURE KERNEL v9.1.4... > ESTABLISHING NEURAL LINK.......[OK] > INITIALIZING SECURE KERNEL v9.0.5... > BYPASSING FIREWALL PROXIES.....[OK] > WARNING: UNAUTHORIZED ACCESS DETECTED ON NODE 7> TRACE COMPLETE. TARGET IDENTIFIED: 'GHOST' > BYPASSING FIREWALL PROXIES.....[OK] > AWAITING INVESTIGATOR OVERRIDE... > AWAITING INVESTIGATOR OVERRIDE...▮";
const btn = document.getElementById("startBtn");
const typingEl = document.getElementById("typingText");

let i = 0;

function typeText(){

  if(i < text.length){
    if(text[i] === ">" && i !== 0){
      typingEl.innerHTML += "<br>";
    } 
    else if(text[i] === ">" && i === text.length - 1){
      typingEl.style.color = "#00ff66"
    }

    typingEl.innerHTML += text[i];

    i++;

    setTimeout(typeText, 20);

  } else {
    btn.classList.add("show");
  }
}

typeText();