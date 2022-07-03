//Selectors
let input = document.getElementById("textinput");
let convert = document.getElementById("convert");
let stat = document.getElementById("status");
let text = document.getElementById("text");


// file conversion
let dat;

//fuunction for API call
let ApiCall= function(){ fetch("http://localhost:5000/uploads").then(
  (response)=>{return response.json()}
).then((data)=>{dat = data; console.log(dat)
})}


//event listener for convert
convert.addEventListener("click", (e)=>{
  // e.preventDefault();
  // if(input.value==="")
  // {alert("No file specified")}
  text.innerHTML=`<h3>Wait a second...</h3>`
 let inter =setInterval(()=>{ ApiCall(),10000});

 setInterval(()=>{stat.innerHTML = !(dat.progress*100)?`<div class="load"><h3>Converting</h3></div>`  
 :  (dat.progress*100) <100 ?
  `<div class="load">
  <h3> Converting...</h3>
  <img  src="./animation.gif" alt="load"/>
  <h3>${Math.trunc(dat.progress *100)} %</h3>
   </div>`
  :`<div class="load">
  <h3>Done!</h3>
  
  <div class="externals">
  <button type="button" class="btn btn-primary btn-sm">Small button</button>
  <button type="button" class="btn btn-primary btn-sm">Small button</button>
 </div>
  
  
  
  </div>`;
stat.style.display="flex";
text.innerHTML=" ";

},10090)





},true);


