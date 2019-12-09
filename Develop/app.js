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
    fs.readFile("./db/db.json", function(err, data){
        if (err) throw err;
    })
    
});

app.get("/api/notes", function (req,res){
    res.send(dataJSON)
      
});

app.post("/api/notes", function(req,res){
    fs.writeFile("./db/db.json", function(err, data){
        if (err) throw err;
        console.log(data)
        
    })
});


    






app.listen(PORT, function(){
    console.log("App is listening on port" + PORT);
})