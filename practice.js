//Set the utilization of the modules and constants
const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/'));

//Open the JSON database file
let rawdata = fs.readFileSync('database.json');
let database = JSON.parse(rawdata);

//Create list to display
var numStu = database.students.length;
var page = 0;
let i = 0;
var studentsList = [];

while (i < 10){

    let indexNum = (page * 10) + i;

    if (indexNum < database.students.length)
    studentsList[i] = database.students[indexNum];
    
    i++;

}

studentsList[10] = Math.round(database.students.length / 10);

var studentsString = JSON.stringify(studentsList);
fs.writeFile("stuBackList.json", studentsString, function(err,result){
    if(err) console.log('error',err)
});

var pages = database.students.length / 10;

app.get('/',(req,res) =>{
    res.send(pages);
    res.sendFile(__dirname + "/index.html");
})

//Listening port
app.listen(port, () => console.log(`Listening port ${port}`));