
let input = document.getElementById("textinput");
let select = document.getElementById("select");
let button = document.getElementById("btn");
let speedgauge = document.getElementById("speed");
let pitchgauge = document.getElementById("pitch");
let speedval = document.getElementById("speedval");
let pitchval = document.getElementById("pitchval");
let play = document.getElementById("play");
let upload = document.getElementById("upload");
let form = document.getElementById("form");


pitchgauge.addEventListener("input", pitchincrease, true);
speedgauge.addEventListener("input", speedincrease, true);

$(document).ready(function () {
  $("#form").submit(function () {
    var data = new FormData($("#form")[0]);
    var pdf = $('#textinput').val();
    if(pdf){
    $.ajax({
      url: "/pdfconvert",
      type: "POST",
      contentType: false,
      processData: false,
      cache: false,
      data: data,
      success: function (res) {
        alert(res);
      },
      error: function () {
        alert("Error: In sending the request!, refresh page if problem");
      },
    });

  }else{
    alert("Choose a PDF file")
  }
  return false;
});
});
//uploaded successfully

upload.addEventListener("click", (e)=>{
  
  if(!(input.value)){
    alert("Choose a PDF file")
  }
  else{
    alert("File uploaded successfully")
  }
})

function speedincrease(e) {
  speedval.textContent = speedgauge.value;
}

function pitchincrease(e) {
  pitchval.textContent = pitchgauge.value;
}

//loading all voices
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

//speak 
function speak(e) {
  e.preventDefault();
  
  fetch("http://localhost:5000/pdfconvert").then(
    (res)=>{
      return res.json()
    }
  ).then(
    (data)=>{
  
  var newwindow= window.open('', '', 'width=500, height=500');
  newwindow.document.write(`<pre>${data.text}</pre>`);

  var utterThis = new SpeechSynthesisUtterance(data.text);
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
  )

  
}

button.addEventListener("click", speak, true);

//pause,resume and stop

let a=document.getElementById("a")
let b=document.getElementById("b")
let c=document.getElementById("c")

  a.addEventListener("click",(e)=>{
    synth.pause();
  })

  b.addEventListener("click",(e)=>{
    synth.resume();
  })


 c.addEventListener("click",(e)=>{
    synth.cancel();
    
  })