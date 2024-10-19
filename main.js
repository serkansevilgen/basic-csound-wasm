import { Csound } from '@csound/browser';
import './style.css'
import csd from './poscil3.csd?raw'

// oninput function
window.sendData = async function (channel, value) {
  // set channel
  if(csound) await csound.setControlChannel(channel, value);
  // update display
  document.getElementById(channel+"val").innerHTML = value;
}


document.querySelector('#app').innerHTML = `
  <div>
    <button id='startButton'>Start</button>
  </div>
<div id="sliders">
<p>  
<input type="range" id="amp" min="0" max="1" value="0.5" step="0.01"
  oninput="sendData(id, value)"> <span id="ampval"> 0.5 </span> </input> 
  </p>
<p>  
<input type="range" id="freq" min="100" max="1000" value="440" step="1"
  oninput="sendData(id, value)"> <span id="freqval"> 440 </span> </input> 
</p>
<p>  
<input type="range" id="panpos" min="0" max="1" value="0.5" step="0.01"
  oninput="sendData(id, value)"> <span id="panposval"> 0.5 </span> </input> 
</p>    
</div>
`

let csound = null;

const startCsound = async () => {
  if(csound) {
    return;
  }

  console.log("Starting Csound...");

  csound = await Csound();
  console.log(csound);
  await csound.compileCsdText(csd);
  await csound.start();
}

document.querySelector('#startButton').addEventListener('click', startCsound);

