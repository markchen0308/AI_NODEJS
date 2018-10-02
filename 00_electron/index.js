//import { remote } from 'electron';
//import {remote} from 'electron';
let browserWindow = require('electron').remote.BrowserWindow;
let axios = require('axios');
//import {BrowserWindow} from 'electron';
let notifyBtn = document.getElementById('notifyBtn');
var price = document.querySelector('h1');
var targetPrice = document.getElementById('targetPrice');
notifyBtn.addEventListener('click', function (event) {
    // Stuff here soon
    // let path = require('path');
    const path = require('path');
    const modalPath = path.join('file://', __dirname, 'add.html');
    let win = new browserWindow({
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        width: 400,
        height: 200
    });
    win.on('close', function () { win = null; });
    win.loadURL(modalPath);
    win.show();
});
function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
        const cryptos = res.data.BTC.USD;
        price.innerHTML = '$' + cryptos.toLocaleString('en');
    });
}
getBTC();
setInterval(getBTC, 30000);
let ipc2 = require('electron').ipcRenderer;
var price = document.querySelector('h1');
// Add these two variables
var targetPriceVal;
var targetPrice = document.getElementById('targetPrice');
ipc2.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en');
});
