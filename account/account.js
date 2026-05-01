const date = document.getElementById('current-date');

function updateDate() {
  date.textContent = new Date().toLocaleDateString('uk-UA') + ' ' + new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

if(window){
  updateDate();
  setInterval(updateDate, 1000);
}
