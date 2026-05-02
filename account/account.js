const date = document.getElementById('current-date');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('main > section');

function updateDate() {
  date.textContent = new Date().toLocaleDateString('uk-UA') + ' ' + new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

if(window){
  updateDate();
  setInterval(updateDate, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  const initialTarget = document.querySelector('.nav-item.active').getAttribute('data-target');
  document.querySelector(`.${initialTarget}`).classList.add('active');

  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();

      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');

      const targetClass = this.getAttribute('data-target');
      
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.classList.contains(targetClass)) {
          section.classList.add('active');
        }
      });
    });
  });
});

function animationSharpGlow(){
  
}
