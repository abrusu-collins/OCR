//Selectors

let select = document.getElementById("select");
let button = document.getElementById("btn");
let speedgauge = document.getElementById("speed");
let pitchgauge = document.getElementById("pitch");
let speedval = document.getElementById("speedval");
let pitchval = document.getElementById("pitchval");
let play = document.getElementById("play");
pitchgauge.addEventListener("input", pitchincrease, true);
speedgauge.addEventListener("input", speedincrease, true);

//file reading
let speechData;


window.onload= function(){
  fetch("http://localhost:5000/uploads")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    speechData = data.text;
  });

}

function speedincrease(e) {
  speedval.textContent = speedgauge.value;
}

function pitchincrease(e) {
  pitchval.textContent = pitchgauge.value;
}

var synth = window.speechSynthesis;
function allvoices() {
  window.voices = synth.getVoices();
  for (var i = 0; i <= voices.length - 1; i++) {
    let option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);

    select.appendChild(option);
  }
}

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = allvoices;
}

function speak(e) {
  e.preventDefault();

  if (speechData === undefined) {
    alert("Choose a txt file from your device");
  } else {
    var newwindow = window.open("", "", "width=500, height=500");
    newwindow.document.write(`<pre>${speechData}</pre>`);

    var utterThis = new SpeechSynthesisUtterance(speechData);
    var selectedOption = select.selectedOptions[0].getAttribute("data-name");
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }

    utterThis.pitch = pitchgauge.value;
    utterThis.rate = speedgauge.value;
    synth.speak(utterThis);

    input.blur();
  }
}

button.addEventListener("click", speak, true);

//pause,resume and stop

let a = document.getElementById("a");
let b = document.getElementById("b");
let c = document.getElementById("c");

a.addEventListener("click", (e) => {
  synth.pause();
});

b.addEventListener("click", (e) => {
  synth.resume();
});

c.addEventListener("click", (e) => {
  synth.cancel();
});
