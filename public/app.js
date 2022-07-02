//Selectors
let input = document.getElementById("textinput");
let select = document.getElementById("select");
let convert = document.getElementById("convert");
let stat = document.getElementById("status");
let text = document.getElementById("text");
let button = document.getElementById("btn");
let speedgauge = document.getElementById("speed");
let pitchgauge = document.getElementById("pitch");
let speedval = document.getElementById("speedval");
let pitchval = document.getElementById("pitchval");
let play = document.getElementById("play");
// pitchgauge.addEventListener("input", pitchincrease, true);
// speedgauge.addEventListener("input", speedincrease, true);

// file conversion
let dat;

//fuunction for API call
let ApiCall= function(){ fetch("http://localhost:5000/uploads").then(
  (response)=>{return response.json()}
).then((data)=>{dat = data; console.log(dat.text)
text.innerHTML= !(dat.text)?
`<p>Text from image will appear here. Wait</p>`:
`<div>
<h2>Image Text</h2>
<pre>${dat.text}</pre>

</div>`

})}

//event listener for convert
convert.addEventListener("click", (e)=>{
  // e.preventDefault();
  // if(input.value==="")
  // {alert("No file specified")}
  
 let inter =setInterval(()=>{ ApiCall(),10000});

 setInterval(()=>{stat.innerHTML = (dat.progress*100) <100 ?
  `<div class="load">
  <h3> Converting...</h3>
  <img  src="./animation.gif" alt="load"/>
  <h3>${Math.trunc(dat.progress *100)} %</h3>
   </div>`
  :"<h3>Done!</h3>"},10090)





},true);



// //file reading
// window.data= undefined;
// input.addEventListener('change', function() {
			
// 			var fr=new FileReader();
// 			fr.onload=function(){
//          window.data=fr.result;
// 				console.log(window.data)
// 			}
			
// 			fr.readAsText(this.files[0]);
// 		})


// function speedincrease(e) {
//   speedval.textContent = speedgauge.value;
// }

// function pitchincrease(e) {
//   pitchval.textContent = pitchgauge.value;
// }

// var synth = window.speechSynthesis;
// function allvoices() {
//   window.voices = synth.getVoices();
//   for (var i = 0; i <= voices.length - 1; i++) {
//     let option = document.createElement("option");
//     option.textContent = `${voices[i].name} (${voices[i].lang})`;
//     option.setAttribute("data-lang", voices[i].lang);
//     option.setAttribute("data-name", voices[i].name);

//     select.appendChild(option);
//   }
// }

// if (synth.onvoiceschanged !== undefined) {
//   synth.onvoiceschanged = allvoices;
// }

// function speak(e) {
//   e.preventDefault();
  
//   if (window.data === undefined) {
//  alert("Choose a txt file from your device")
//   }
// else{
//   var newwindow= window.open('', '', 'width=500, height=500');
//   newwindow.document.write(`<pre>${window.data}</pre>`);

//   var utterThis = new SpeechSynthesisUtterance(window.data);
//   var selectedOption = select.selectedOptions[0].getAttribute("data-name");
//   for (var i = 0; i < voices.length; i++) {
//     if (voices[i].name === selectedOption) {
//       utterThis.voice = voices[i];
//     }
//   }

//   utterThis.pitch = pitchgauge.value;
//   utterThis.rate = speedgauge.value;
//   synth.speak(utterThis);

//   input.blur();

  
// }

// }

// button.addEventListener("click", speak, true);





// //pause,resume and stop

// let a=document.getElementById("a")
// let b=document.getElementById("b")
// let c=document.getElementById("c")

//   a.addEventListener("click",(e)=>{
//     synth.pause();
//   })

//   b.addEventListener("click",(e)=>{
//     synth.resume();
//   })


//  c.addEventListener("click",(e)=>{
//     synth.cancel();
    
//   })