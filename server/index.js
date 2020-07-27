//Set the utilization of the modules and constants
const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require("body-parser");
const path = require('path');

//Set the use of some functionalities
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

//Open the JSON database file
let rawdata = fs.readFileSync(path.join(__dirname, '../db', 'database.json'));
let database = JSON.parse(rawdata);

//Managing POST request
app.post("/", (req, res) => {
    console.log(req.body); //debug
    const page_id = req.body.page_id;
    const result = getStudents(page_id);
    res.contentType('Content-Type', 'application/json');
    res.status(200).json(result);
});

//Router to the root folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/view/', 'index.html'));
})


//Get the list of Students per page from the JSON object
function getStudents(page_id) {
    let studentsList = [];
    let i = 0;
    let row = page_id * 10;

    while (i < 10) {
        let indexNum = row + i;

        if (indexNum < database.students.length)
            studentsList[i] = database.students[indexNum];
        i++;
    }
    studentsList.push(Math.ceil(database.students.length / 10));
    return studentsList;
};

//Listening port
app.listen(port, () => console.log(`Listening port ${port}`));