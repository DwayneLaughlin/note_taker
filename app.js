// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var dataJSON = require("./db/db.json");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.json());

// DATA 
// ===============================================================



// ROUTES
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html")); 
});

app.get("/api/notes", function (req,res){
    res.send(dataJSON)     
});

app.post("/api/notes", function(req,res){
    const addNote = {
        id: dataJSON.length +1,
        title: req.body.title,
        text: req.body.text,
    };


    dataJSON.push(addNote)
    res.json(dataJSON)
    console.log(dataJSON)

    fs.writeFile("./db/db.json",JSON.stringify(dataJSON), (err)=> {
        if (err) throw err;
        console.log("post works")
    })
});

app.delete("api/notes/:id", function(req,res){
    var id = req.params.id;
    var dataParse = JSON.parse(dataJSON);
    

})


app.listen(PORT, function(){
    console.log("App is listening on port" + PORT);
})