// Dependencies

const express = require('express');
let db = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
//Method to require Id
const { v4: uuidv4 } = require('uuid');
// Method to read files on your computer  (fs)
const fs = require("fs");
const { json } = require('body-parser');

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});
app.get("/notes",(req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});
app.get("/api/notes",(req, res) => {
    res.json(db)
});
app.post("/api/notes",(req, res) => {
    req.body.id=uuidv4()
    db.push(req.body)
    console.log(db)
    fs.writeFileSync("./db/db.json", JSON.stringify(db))
    res.json(db)   
});

app.delete("/api/notes/:id",(req, res) => {
const id = req.params.id
  db = db.filter(note=> {
    return note.id !=id  //1 != 1

  })
  fs.writeFileSync("./db/db.json", JSON.stringify(db))
    res.json(db)   

})




app.listen(PORT,function(){
    console.log("app listening " + PORT)
});