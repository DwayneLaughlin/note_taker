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
    fs.readFile("./db/db.json",function(err, data){
        
        dataNotes = JSON.parse(data)
        console.log(dataNotes)
    })

   
    fs.appendFile("./db/db.json", JSON.stringify(req.body), function (err){
        if (err) throw err;
        console.log('success');
        dataJSON.push(JSON.stringify(req.body))
    })

   
});


app.listen(PORT, function(){
    console.log("App is listening on port" + PORT);
})