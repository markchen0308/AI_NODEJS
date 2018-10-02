
const ipc_main = require('electron').ipcMain;
const app_main=require('electron').app;
const BrowserWindow_main=require('electron').BrowserWindow;
const menu_main=require('electron').Menu;




//import * as path from 'path.mjs';

//import * as url from 'url';
let win
const shell = require('electron').shell

function createWindow() {

    // Create the browser window.
    win = new BrowserWindow_main({ width: 800, height: 600 })//windows size 800x600
    const path = require('path');
    const url = require('url');
    // and load the index.html of the app
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),//window first page
        protocol: 'file:',
        slashes: true
    }))

    //create menu
    var menu = menu_main.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                { label: 'Adjust Notification Value' },
                {
                    label: 'CoinMarketCap',
                    click() {
                        shell.openExternal('http://coinmarketcap.com') //open web site
                    },
                    accelerator: 'CmdOrCtrl+Shift+C'  //create short command
                },
                { type: 'separator' },  // Add seperator line
                {
                    label: 'Exit',
                    click() {
                        app_main.quit()
                    }
                }
            ]
        },
        {

            label: 'Info'

        }


    ])
    menu_main.setApplicationMenu(menu);//set menu

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}
//process is ready to create windows
app_main.on('ready', createWindow);

//close 
app_main.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app_main.quit()
    }
})

app_main.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

ipc_main.on('update-notify-value', function (event, arg) {
    win.webContents.send('targetPriceVal', arg)
})



