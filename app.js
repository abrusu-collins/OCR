//importing modules
const express = require("express");
let app = express();
const fs = require("fs");
const multer = require("multer");
const Tesseract = require("tesseract.js");

// Using the public folder
app.use(express.static(__dirname + "/public"));

// setting storage object
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("myImage");

// empty object

let api = {};

// ejs
app.set("view-engine", "ejs");

//Routes
//Home route
app.get("/", (req, res) => {
  res.render("documentreader.ejs");
});

// Make a post request, and process image
app.post("/uploads", (req, res) => {
  upload(req, res, (err) => {
    fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
      if (err) return console.log("Error");
      Tesseract.recognize(data, "eng", { logger: (m) => console.log(m) }).then(
        ({ data: { text } }) => {
          api.text = text;
          console.log(text);
        }
      );
    });
  });
});

// API roue for generted text
app.get("/uploads", (req, res) => {
  res.send(api);
});

// Port to listen on
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});


