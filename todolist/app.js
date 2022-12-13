//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname+"/date.js") //making a module date.js

const items = [];
const workItems = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res)
{
    let day = date.getDate(); //using date.js
    res.render("list", {listTitle: day, newListItems: items})
    
});

app.post("/", function(req, res)
{
    let item = req.body.newItem;
    console.log(req.body);

    if (req.body.button === "Work")
    {
        workItems.push(item);
        
        res.redirect("/work");
    }
    else
    {
        items.push(item);
        
        res.redirect("/");
    }
    
    
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems}); 
})

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000, function()
{
    console.log("Server up.");
});