//Selectors
let input = document.getElementById("textinput");
let convert = document.getElementById("convert");
let stat = document.getElementById("status");
let text = document.getElementById("text");
let form = document.getElementById("form");
// form.addEventListener("submit",ler ,true)

$(document).ready(function () {
  $("#form").submit(function () {
    var data = new FormData($("#form")[0]);
    var img = $('#textinput').val();
    if(img){
    $.ajax({
      url: "/uploads",
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
    alert("Choose an Image file")
  }
  return false;
});
});

// file conversion
let dat;

//function for API call
let ApiCall = function () {
  fetch("https://clisteocr.herokuapp.com/uploads",{mode:"cors"}
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dat = data;
    });
};

function ler() {
  if(input.value){
  text.innerHTML = `<h3>Wait a second...</h3>`;
  let inter = setInterval(() => {
    ApiCall(), 10000;
  });

  setInterval(() => {
    stat.innerHTML = !(dat.progress * 100)
      ? `<div class="load"><h3>Converting...</h3></div>`
      : dat.progress * 100 < 100
      ? `<div class="load">
<h3> Converting...</h3>
<img  src="./animation.gif" alt="load"/>
<h3>${Math.trunc(dat.progress * 100)} %</h3>
 </div>`
      : `<div class="load">
<h3>Done!</h3>

<div class="externals">
<a onclick="PDFconversion()" class="btn btn-primary btn-sm">Get PDF</a>
<a href="https://clisteocr.herokuapp.com/speech" id="readtext" class="btn btn-primary btn-sm">Speech</a>
</div>

</div>`;
    stat.style.display = "flex";
    text.innerHTML = " ";
  }, 10090);
}else{
  alert("Choose an Image file")
}}

//event listener for convert
convert.addEventListener(
  "click",
  ler,
  true
);

//PDF conversion
function PDFconversion() {
  var doc = new jsPDF();

  var inv = document.querySelector(".invinsible");
  inv.textContent = `${dat.text}`;
  var specialElementHandlers = {
    "#elementH": function (element, renderer) {
      return true;
    },
  };
  doc.fromHTML(inv, 15, 15, {
    width: "100",
    elementHandlers: specialElementHandlers,
  });

  doc.save("Your_PDF.pdf");
}
