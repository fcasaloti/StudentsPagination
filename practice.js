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

//Receive POST from HTML, get data of which page was clicked and call function to create the data
app.post("/",(req,res) => {
        page = req.body.data;
        createJSON(page)
        res.sendFile(__dirname + "/index.html");
});

//Router to the roor folder
app.get('/',(req,res) =>{
    res.sendFile(__dirname + "/index.html");
})


//Function to create JSON file
function createJSON(page){
    var studentsList = [];
    let i = 0;
    page = page * 10;

    while (i < 10){
        let indexNum = page + i;

        if (indexNum < database.students.length)
        studentsList[i] = database.students[indexNum];
        i++;
    }
    studentsList.push(Math.ceil(database.students.length / 10));
    var studentsString = JSON.stringify(studentsList);
    fs.writeFile("stuBackList.json", studentsString, function(err,result){
        if(err) console.log('error',err)
    });
};

//Listening port
app.listen(port, () => console.log(`Listening port ${port}`));