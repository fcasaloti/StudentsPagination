// Onload call
window.onload = function () {
    loadPageContent(0);
}

// Loads Page Content: Body and Pagination
function loadPageContent(page_id) {
    getStudents(page_id)
        .then(function (data) {
            setBody(data);
            setPagination(data, page_id);
        });
}

function getStudents(page_id) {
    let promise = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        let data = JSON.stringify({ "page_id": page_id });
        request.addEventListener("readystatechange", function () {
            if (this.readyState !== 4) return;

            if (this.readyState === 4 && this.status == 200) {
                console.log(JSON.parse(this.responseText)); // Debug
                resolve(JSON.parse(this.responseText));
            }
            else {
                reject({
                    status: this.status
                });
            }
        });

        request.open('POST', 'http://localhost:3000');
        request.setRequestHeader("Content-Type", "application/json");
        request.send(data);
    });
    return promise;
}

//Function to write Students Name dynamically
function setBody(data) {
    if (typeof data !== 'undefined') {
        let studentPage =
            `<div class="page-header cf">
              <h2>Students</h2>
          </div>
          <ul class="student-list">`;

        for (let i = 0; i < data.length - 1; i++) {
            studentPage +=
                `<li class="student-item cf">
                  <div class="student-details">
                      <img class="avatar" src=${data[i].avatar}>
                      <h3>${data[i].name}</h3>
                      <span class="email">${data[i].email}</span>
                  </div>
                  <div class="joined-details">
                      <span class="date">${data[i].joined}</span>
                  </div>
              </li>`
        }
        studentPage += `</ul></div>`;
        document.getElementsByClassName("page-header cf")[0].innerHTML = studentPage;
    }
}

// Function to print numbers of pages dynamically
function setPagination(data, page_id) {
    if (typeof data !== 'undefined') {
        let student = `<div class="pagination">
          <ul id="pagination">`;

        for (let i = 1; i <= (data[data.length - 1]); i++) {
            let active = (page_id + 1 == i ? 'active' : '');
            student += `<li>
              <a class="${active}" onclick="loadPageContent(${i - 1})">${i}</a>
          </li>`;
        }
        student += `</ul></div>`;
        document.getElementsByClassName("pagination")[0].innerHTML = student;
    }
}
