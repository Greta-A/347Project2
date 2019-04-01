// window.onload = displayPicked();

function displayPicked()
{
  fetch("/loadPickedCourses")
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonResponse) {
      listUserCoursesInHTML(jsonResponse);//communication with backend

    });
}

function showCourses(ev)
{
  ev.preventDefault();
  fetch("/availableCourses")
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonResponse) {
      listCoursesInHTML(jsonResponse);
    });
  var x = document.getElementById("hidden_course_list");
  if (x.style.display === "none")
  {
    x.style.display = "block";
  }
  else
  {
  x.style.display = "none";
  }
  displayPicked();
}

function addCourse(id)
{
  console.log("in add");
  //var formToSubmit = document.getElementById(id+"form");
  //formToSubmit.submit();
  //var pickedList = document.getElementById("picked_courses");
  // fetch("/loadPickedCourses")
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(jsonResponse) {
  //     //communication with backend
  //   });
  // e.preventDefault();
  // e.target.removeAttribute("onclick");
  // //creates a new onclick event which makes it work on a new click, not this click.
  // e.target.onclick = function() {e.target.type = "submit";};
}

function displayCreateForm()
{
  var x = document.getElementById("hidden_create_course_menu");
  if (x.style.display === "none")
  {
    x.style.display = "block";
  }
  else
  {
  x.style.display = "none";
  }
}

function createCourse()
{
  displayCreateForm();
}

//loads courses for + button (all/addable courses)
function listCoursesInHTML(jsonData) {
  console.log(jsonData)//
  var allCourses = document.getElementById("available_courses").getElementsByTagName("li");
  var leng = allCourses.length;
  if (jsonData.length > leng)
  {
    for (var i=leng; i < jsonData.length; i++)
    {
      var id = jsonData[i].course_id;
      var desc = jsonData[i].course_name;
      var form = document.createElement("form");
      form.setAttribute('action', 'pickedCourses');
      form.setAttribute('method', 'post');
      form.setAttribute('id', id + 'form');
      var li = document.createElement("li");
      var button = document.createElement("button");
      var br = document.createElement("br");
      button.setAttribute('class', 'course');
      button.setAttribute('id', "CS"+id);
      button.setAttribute('type', 'submit');
      button.setAttribute('name', 'classNum');
      button.setAttribute('value', id);
      //button.addEventListener("click", function() {addCourse(id)});
      button.innerHTML = "CS"+id +"<br />";
      button.appendChild(br);
      button.innerHTML += desc;
      form.appendChild(button);
      //li.appendChild(button);
      li.appendChild(form);
      var list = document.getElementById("available_courses");
      list.appendChild(li);
    }
  }
}

//lists user's courses. 
function listUserCoursesInHTML(jsonResponse)
{
  console.log(jsonResponse);
  // alert(jsonResponse);
}

displayPicked()