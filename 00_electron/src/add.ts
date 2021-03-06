const electron = require('electron');
const path = require('path');
const remote2 =  require('electron').remote;
const closeBtn = document.getElementById('closeBtn') ;


closeBtn.addEventListener('click', function (event) {
    var window = remote2.getCurrentWindow();
    window.close();
})


const updateBtn = document.getElementById('updateBtn');

updateBtn.addEventListener('click', function () {
    const ipcRenderer = electron.ipcRenderer;
    ipcRenderer.send('update-notify-value', (<HTMLInputElement>document.getElementById('notifyVal')).value);

  // Close this window
  var window = remote2.getCurrentWindow();
  window.close();
}) 