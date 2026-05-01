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

function validateInput() {
  const name = inputValueName.value.trim();
  const pass = inputValuePassword.value.trim();

  let usersDB = [];
  const encryptedData = localStorage.getItem("users_db");
  
  if (encryptedData) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      usersDB = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      usersDB = [];
    }
  }

  if (name === "" || pass === "") {
    popUpValidation.innerHTML = "<i class='bi bi-exclamation-triangle'></i> Заповніть усі поля!";
    popUpValidation.classList.add("show");
    soundError.volume = 0.2;
    soundError.play();
    setTimeout(() => popUpValidation.classList.remove("show"), 2000);
    return;
  }

  const existingUser = usersDB.find(u => u.username.toLowerCase() === name.toLowerCase());

  if (existingUser) {
    if (existingUser.password === pass) {
      localStorage.setItem("username", name);
   
      const currentUserData = CryptoJS.AES.encrypt(JSON.stringify(existingUser), SECRET_KEY).toString();
      localStorage.setItem("current_user", currentUserData);
      
      window.location.href = "../account/account.html";
    } else {
      popUpValidation.innerHTML = "<i class='bi bi-exclamation-triangle'></i> Невірний пароль!";
      popUpValidation.classList.add("show");
      soundError.play();
      setTimeout(() => popUpValidation.classList.remove("show"), 2000);
    }
  } else {
    usersDB.push({ username: name, password: pass });
  
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(usersDB), SECRET_KEY).toString();
    localStorage.setItem("users_db", ciphertext);
    
    localStorage.setItem("username", name);
    window.location.href = "../account/account.html";
  }
}
  