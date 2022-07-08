const express = require("express");
let app = express();
const fs = require("fs");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const pdf = require("pdf-parse");
var mammoth = require("mammoth");

app.use(express.static(__dirname + "/public"));
app.set("view-engine", "ejs");

// setting storage object for image, doc and pdf
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("myImage");
const pdfstorage = multer({ dest: "pdfuploads/" });
const docstorage = multer({ dest: "docuploads/" });

// empty object to store text taken off image, pdf and doc
let api = {};
let pdfobject = {};
let docobject = {};

//Routes
app.get("/", (req, res) => {
  res.render("ocr.ejs");
});

app.get("/speech", (req, res) => {
  res.render("speech.ejs");
});

app.get("/pdfreader", (req, res) => {
  res.render("pdfreader.ejs");
});

app.get("/uploads", (req, res) => {
  res.send(api);
});

app.get("/pdfconvert", (req, res) => {
  res.send(pdfobject);
});

app.get("/docconvert", (req, res) => {
  res.send(docobject);
});

app.get("/docreader", (req, res) => {
  res.render("docreader.ejs");
});

app.post("/uploads", (req, res) => {
  upload(req, res, (err) => {
    fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
      if (err) return console.log("Error");
      Tesseract.recognize(
        data,
        "eng",
        {
          logger: (m) => {
            api.progress = m.progress;
            console.log(m);
          },
        },
        { tessjs_create_pdf: "1" }
      ).then(({ data: { text } }) => {
        api.text = text;

        console.log(text);
      });
    });
  });
});

app.post("/pdfconvert", pdfstorage.single("pdf"), function (req, res) {
  let dataBuffer = fs.readFileSync(`./pdfuploads/${req.file.filename}`);
  pdf(dataBuffer).then(function (data) {
    console.log(data.text);
    pdfobject.text = data.text;
  });
});

app.post("/docconvert", docstorage.single("doc"), function (req, res) {
  mammoth.extractRawText({ path: `./docuploads/${req.file.filename}` })
    .then(function (result) {
      docobject.text = result.value;
    })
    .done();
});

app.get("*", (req, res) => {
  res.render("404.ejs");
});

const PORT =   process.env.PORT||5000;
app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
