var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){};
xhr.open('GET','stuBackList.json');
xhr.send();

xhr.onload=function(){
  jsonList=JSON.parse(xhr.responseText);
  JSON.stringify(jsonList);

  printValue(jsonList);

  printPagesNum(jsonList)
};

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

function printPagesNum(json){
    var student = `<div class="pagination">
    <ul>`;

      for (let i = 1; i <= (json[json.length - 1]) ; i++){
        student += `<li><a id="${i}" href="/${i}">${i}</a></li>`;
      }
      student += `</ul></div>`;
      document.getElementsByClassName("pagination")[0].innerHTML = student;
      console.log(json[json.length - 1]);
}

/*
<div class="pagination">
        <ul>
          <li>
            <a id="one" href="/one">1</a>
          </li>
           <li>
            <a href="#">2</a>
          </li>
           <li>
            <a href="#">3</a>
          </li>
           <li>
            <a href="#">4</a>
          </li>
           <li>
            <a href="#">5</a>
          </li>
        </ul>
      </div>
*/



/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/




/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/





//Remember to delete the comments that came with this file, and replace them with your own code comments