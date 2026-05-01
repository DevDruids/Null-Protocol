const text = "> INITIALIZING SECURE KERNEL v9.0.4...> INITIALIZING SECURE KERNEL v9.1.4... > ESTABLISHING NEURAL LINK.......[OK] > INITIALIZING SECURE KERNEL v9.0.5... > BYPASSING FIREWALL PROXIES.....[OK] > WARNING: UNAUTHORIZED ACCESS DETECTED ON NODE 7> TRACE COMPLETE. TARGET IDENTIFIED: 'GHOST' > BYPASSING FIREWALL PROXIES.....[OK] > AWAITING INVESTIGATOR OVERRIDE... > AWAITING INVESTIGATOR OVERRIDE...▮";
const btn = document.getElementById("startBtn");
const typingEl = document.getElementById("typingText");
const popUp = document.getElementById("popUp");
const overlay = document.getElementById('overlay');
const popUpValidation = document.getElementById('popUp-content-wrapper');
const inputValueName = document.getElementById('input-name');
const inputValuePassword = document.getElementById('input-password');
const soundError = new Audio("./utils/sounds/error.mp3");
const SECRET_KEY = "GHOST_PROTOCOL_99";

let i = 0;

function showPopUp(){
  popUp.classList.add("show");
  overlay.classList.add("show");
}

function hidePopUp(){
  popUp.classList.remove("show");
  overlay.classList.remove("show");
}

function typeText(){

  if(i < text.length){
    if(text[i] === ">" && i !== 0){
      typingEl.innerHTML += "<br>";
    } 

    typingEl.innerHTML += text[i];

    i++;

    setTimeout(typeText, 15);

  } else {
    btn.classList.add("show");
  }
}

typeText();

async function validateInput() {
  const name = inputValueName.value.trim();
  const pass = inputValuePassword.value.trim();

  if (name === "" || pass === "") {
    popUpValidation.innerHTML = "<i class='bi bi-exclamation-triangle'></i> Заповніть усі поля!";
    popUpValidation.classList.add("show");
    soundError.volume = 0.2;
    soundError.play();
    setTimeout(() => 
      popUpValidation.classList.remove("show")
    , 2000);
    return;
  }
  
  setTimeout(() => {
     window.location.href = "../account/account.html";
  }, 500)
}

//   try {
//     const response = await fetch("http://localhost:3000/api/auth", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username: name, password: pass })
//     });

//     const result = await response.json();

//     if (response.ok) {
//       window.location.href = "../account/account.html";
//     } 
//     else {
//       popUpValidation.innerHTML = `<i class='bi bi-exclamation-triangle'></i> ${result.message}`;
//       popUpValidation.classList.add("show");
//       soundError.play();
//       setTimeout(() => 
//         popUpValidation.classList.remove("show")
//       , 2000);
//     }
//   } catch (error) {
//       popUpValidation.innerHTML = "<i class='bi bi-wifi-off'></i> Сервер не відповідає";
//       popUpValidation.classList.add("show");
//       soundError.play();
//       setTimeout(() => 
//         popUpValidation.classList.remove("show")
//       , 2000);
//   }
// }
  