const text = "> INITIALIZING SECURE KERNEL v9.0.4...> INITIALIZING SECURE KERNEL v9.1.4... > ESTABLISHING NEURAL LINK.......[OK] > INITIALIZING SECURE KERNEL v9.0.5... > BYPASSING FIREWALL PROXIES.....[OK] > WARNING: UNAUTHORIZED ACCESS DETECTED ON NODE 7> TRACE COMPLETE. TARGET IDENTIFIED: 'GHOST' > BYPASSING FIREWALL PROXIES.....[OK] > AWAITING INVESTIGATOR OVERRIDE... > AWAITING INVESTIGATOR OVERRIDE...▮";

const btn = document.getElementById("startBtn");
const typingEl = document.getElementById("typingText");

const popUp = document.getElementById("popUp");
const overlay = document.getElementById("overlay");

const popUpValidation = document.getElementById("popUp-content-wrapper");

const inputValueName = document.getElementById("input-name");
const inputValuePassword = document.getElementById("input-password");

const registerName = document.getElementById("register-name");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const registerRepeatPassword = document.getElementById("registerRepeatPassword");

const tabs = document.querySelectorAll(".tab-btn");
const authTab = document.querySelector(".tab-content-auth");
const regTab = document.querySelector(".tab-content-reg");

const soundError = new Audio("./utils/sounds/error.mp3");

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

tabs.forEach((tab, index) => {

  tab.addEventListener("click", () => {

    tabs.forEach(btn => {
      btn.classList.remove("active");
    });

    tab.classList.add("active");

    if(index === 0){
      authTab.classList.add("active");
      regTab.classList.remove("active");
    } else {
      regTab.classList.add("active");
      authTab.classList.remove("active");
    }

  });

});

function showError(message){

  popUpValidation.innerHTML = `
    <i class="bi bi-exclamation-triangle"></i>
    ${message}
  `;

  popUpValidation.classList.add("show");

  soundError.volume = 0.2;
  soundError.play();

  setTimeout(() => {
    popUpValidation.classList.remove("show");
  }, 2000);
}

function validateEmail(email){

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password){

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    password.length >= 6 &&
    hasUppercase &&
    hasLowercase &&
    hasNumber
  );
}

async function validateInput(){

  const name = inputValueName.value.trim();
  const pass = inputValuePassword.value.trim();

  if(name === "" || pass === ""){
    showError("Заповніть усі поля!");
    return;
  }

  if(name.length < 3){
    showError("Ім'я занадто коротке");
    return;
  }

  if(pass.length < 6){
    showError("Пароль занадто короткий");
    return;
  }

  try {

    window.location.href = "../account/account.html";

    const response = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: name,
        password: pass
      })
    });

    const result = await response.json();

    if(response.ok){

      localStorage.setItem("current_user", name);

      setTimeout(() => {
        window.location.href = "../account/account.html";
      }, 500);

    } else {
      showError(result.message || "Невірний логін або пароль");
      window.location.href = "../account/account.html";
    }

  } catch(error){
    // showError("Сервер не відповідає");
    window.location.href = "../account/account.html";
  }
}

async function registerUser(){

  const name = registerName.value.trim();
  const email = registerEmail.value.trim();
  const password = registerPassword.value.trim();
  const repeatPassword = registerRepeatPassword.value.trim();

  if(
    name === "" || email === "" || password === "" || repeatPassword === ""
  ){
    showError("Заповніть усі поля!");
    console.log(1)
    return;
  }

  if(name.length < 3){
    showError("Ім'я повинно містити мінімум 3 символи");
    return;
  }

  if(!validateEmail(email)){
    showError("Некоректний email");
    return;
  }

  if(!validatePassword(password)){
    showError("Пароль: 6+ символів, велика літера та цифра");
    return;
  }

  if(password !== repeatPassword){
    showError("Паролі не співпадають");
    return;
  }

  try {

    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password
      })
    });

    const result = await response.json();

    if(response.ok){

      localStorage.setItem("current_user", name);

      setTimeout(() => {
        window.location.href = "../account/account.html";
      }, 500);

    } else {
      showError(result.message || "Помилка реєстрації");
    }

  } catch(error){
    // showError("Сервер не відповідає");
    setTimeout(() => {
        window.location.href = "../account/account.html";
    }, 500);
  }
}