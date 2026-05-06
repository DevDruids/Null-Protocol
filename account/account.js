const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('main section');
const selectionScreen = document.getElementById('selection-screen');
const levelScreen = document.getElementById('level-screen');


navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = item.getAttribute('data-target');

        navItems.forEach(nav => nav.classList.remove('active'));
        sections.forEach(sec => {
            sec.classList.remove('active');
            sec.style.display = 'none';
        });

        item.classList.add('active');

        // 3. Активуємо потрібну секцію
        const targetSection = document.querySelector(`.${targetId}`);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
        }

        if (levelScreen) levelScreen.style.display = 'none';
        if (targetId === 'dashboard-section' && selectionScreen) {
            selectionScreen.style.display = 'block';
        }
    });
});

function startLevel(levelTitle) {
    const titleElement = document.getElementById('current-level-title');
    const interfaceContainer = document.getElementById('level-interface');

    if (selectionScreen && levelScreen) {
        selectionScreen.style.display = 'none';
        levelScreen.style.display = 'block';

        if (titleElement) titleElement.innerText = levelTitle;

        resetLevelState();

        if (interfaceContainer) {
            interfaceContainer.innerHTML = `
                <div class="level-init-msg">
                    <p>> Ініціалізація протоколу: ${levelTitle}...</p>
                    <p>> Статус: Доступ дозволено.</p>
                </div>
            `;
        }
    }
}

function backToMenu() {
    if (selectionScreen && levelScreen) {
        levelScreen.style.display = 'none';
        selectionScreen.style.display = 'block';
    }
}


const dateEl = document.getElementById('current-date');
if (dateEl) {
    const now = new Date();
    dateEl.innerText = now.toLocaleDateString('uk-UA') + " " + now.toLocaleTimeString('uk-UA', {hour: '2-digit', minute:'2-digit'});
}

const runBtn = document.querySelector(".run-btn");
const toolDisplay = document.querySelector(".tool-display");
const statusBox = document.querySelector(".status-box-granted") || document.querySelector(".status-box");
const welcomeMsg = document.querySelector(".welcome-msg");
const rewardText = document.querySelector(".reward-text");
const nextBtn = document.querySelector(".next-btn");
const startBruteForceTusk = document.getElementById("startBruteForceLi");
const authAway = document.getElementById('aaa');

const passwords = [
  "123456",
  "password",
  "qwerty",
  "admin123",
  "dev2024",
  "letmein",
  "root",
  "dev_admin",
  "OmniCorp2025"
];

function resetLevelState() {
  if (statusBox) {
    statusBox.innerText = "ACCESS DENIED";
    statusBox.classList.remove("status-box-granted");
  }

  if (welcomeMsg) welcomeMsg.innerText = "";
  if (rewardText) rewardText.innerText = "";
  if (nextBtn) nextBtn.style.display = "none";
  if (toolDisplay) toolDisplay.innerText = "TOOL READY";
  if (runBtn) runBtn.disabled = false;
}

if (runBtn) {
  runBtn.addEventListener("click", () => {

    startBruteForceTusk.classList.remove('active')
    startBruteForceTusk.classList.add('done')
    authAway.classList.add('active');

    runBtn.disabled = true;

    let i = 0;

    if (statusBox) statusBox.innerText = "BRUTE FORCE...";

    const interval = setInterval(() => {
      toolDisplay.innerText = "Trying: " + passwords[i];
      i = (i + 1) % passwords.length;
    }, 150);

    setTimeout(() => {
      clearInterval(interval);

      authAway.classList.remove('active');
      authAway.classList.add('done');
      
      toolDisplay.innerText = "PASSWORD FOUND";

      if (statusBox) {
        statusBox.innerText = "ACCESS GRANTED";
        statusBox.classList.add("status-box-granted");
      }

      if (welcomeMsg) welcomeMsg.innerText = "Welcome, Dev_Admin.";
      if (rewardText) rewardText.innerText = "Mission Complete. 100 XP Rewarded.";
      if (nextBtn) nextBtn.style.display = "block";

    }, 4000);

  });
}