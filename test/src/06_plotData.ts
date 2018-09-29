
import * as D3 from 'd3';
import * as BS from 'browser-sync';



let sync=BS.create();




function taskSync() 
{
  sync.init({
  proxy: "http://localhost:3000",
  port: 3030,
  files: ["./06_index.html"],
  browser: "google chrome",
  reloadDelay: 1000,
});
}

function taskNodemon() {
  return nodemon({
    script: 'index.js'
  }).on('restart', function() {
    sync.reload();
  });
}

BS.init({
  server: './',
  
  //index: './06_index.html',
  port: 3030,
  files: './06_index.html'
});

/*
 * npm install d3 node-jsdom
 */

function createTitle(text, win) {
    win = win || window;
   
    const title = win.document.createElement('h1');
    title.innerHTML = text;
    return title;
  };

  const window = new Window();
 
createTitle('Hi', window);