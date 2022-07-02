//importing modules
const express = require("express");
let app = express();
const fs = require("fs");
const multer = require("multer");
const  Tesseract = require("tesseract.js");
// const worker = TesseractWorker();
app.use(express.static(__dirname + '/public'));

// setting storage object
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
     cb(null, "./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
const upload =multer ({storage:storage}).single("myImage");

// ejs
app.set("view-engine","ejs");

//Routes

app.get("/",(req,res)=>{

    res.render("documentreader.ejs")
});
app.post("/uploads",(req, res)=>{
    upload(req, res, err =>{
        fs.readFile(`./uploads/${req.file.originalname}`,(err,data)=>{
            if (err) return console.log("Error");
            Tesseract.recognize(
                data,
                'eng',
                { logger: m => console.log(m) }
              ).then(({ data: { text } }) => {
                console.log(text);
              })
        })
    });
})


app.get("/uploads",(req,res)=>{



});

// Port to listen on
const PORT= 5000||process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Listening on port : ${PORT}`)
});





















































// app.get("/",(req,res)=>{
// res.write("Abrusu is doing express");
// });
// app.listen(5000);