//Declare constants and import JSON file that is sent from server
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){};
xhr.open('GET','stuBackList.json');
xhr.send();

//Function to convert data from JSON
xhr.onload=function(){
  jsonList=JSON.parse(xhr.responseText);
  JSON.stringify(jsonList);

  printValue(jsonList);

  printPagesNum(jsonList)
};

//Function to write Students Name dynamically
function printValue(json){
  var studentPage = 
  `<div class="page-header cf">
  <h2>Students</h2>
  </div><ul class="student-list">`;

    for (let i = 0; i < json.length - 1; i++){

     studentPage += 
    `<li class="student-item cf">
    <div class="student-details">
        <img class="avatar" src=${json[i].avatar}>
        <h3>${json[i].name}</h3>
        <span class="email">${json[i].email}</span>
    </div>
    <div class="joined-details">
          <span class="date">${json[i].joined}</span>
    </div>
    </li>`
    }
    studentPage += `</ul></div>`;
    document.getElementsByClassName("page-header cf")[0].innerHTML = studentPage;
}

//Function to print numbers of pages dynamically
function printPagesNum(json){
  var student = `<div class="pagination">
  <ul>`;

    for (let i = 1; i <= (json[json.length - 1]) ; i++){
      student += `<li><form method="POST" action="/"><input type="hidden" id="${i}" name="data" value="${i - 1}">${i}
      <button type="submit" id="${i}" name="submit"></button></form></li>`;
    }
    student += `</ul></div>`;
    document.getElementsByClassName("pagination")[0].innerHTML = student;
}