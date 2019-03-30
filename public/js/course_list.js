function showCourses(ev)
{
  ev.preventDefault();
  fetch("/availableCourses")
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonResponse) {
      listCoursesInHTML(jsonResponse);
      //console.log(jsonResponse[0].course_id);
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
}

function addCourse(e)
{
  var pickedList = document.getElementById("picked_courses");
  pickedList.appendChild(e.target);
  e.target.removeAttribute("onclick");
  //creates a new onclick event which makes it work on a new click, not this click.
  e.target.onclick = function() {e.target.type = "submit";};
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
  console.log("in create Course");
  var id = document.getElementById("class_ID").value;
  var name = document.getElementById("class_name").value;
  var new_course = document.createElement("button");
  new_course.setAttribute('class', 'course');
  new_course.setAttribute('id', id);
  var br = document.createElement("br");
  new_course.innerHTML = id + "<br />";
  new_course.appendChild(br);
  new_course.innerHTML += name;
  new_course.type = "button";
  new_course.addEventListener("click", function(e) {addCourse(e)});
  var list = document.getElementById("available_courses");
  list.appendChild(new_course);
  displayCreateForm();
  //document.getElementById("class_ID").value = "";
  //document.getElementById("class_name").value = "";
}

// function getMyCourses() {
//   fetch('/course_list')
//     .then(response => {
//       document.getElementById("picked_courses").
//       //append to picked courses
//     })
// }
//
function listCoursesInHTML(jsonData) {
  var allCourses = document.getElementById("available_courses").getElementsByTagName("li");
  var leng = allCourses.length;
  if (jsonData.length > leng)
  {
    for (var i=0; i < jsonData.length; i++)
    {
      var id = jsonData[i].course_id;
      var desc = jsonData[i].course_name;
      var li = document.createElement("li");
      var button = document.createElement("button");
      var br = document.createElement("br");
      button.setAttribute('class', 'course');
      button.setAttribute('id', "CS"+id);
      button.setAttribute('type', 'button');
      button.addEventListener("click", function(e) {addCourse(e)});
      button.innerHTML = "CS"+id +"<br />";
      button.appendChild(br);
      button.innerHTML += desc;
      li.appendChild(button);
      var list = document.getElementById("available_courses");
      list.appendChild(li);
      //list.appendChild(button);
    }
  }

  //fill nameSpan inner html with param
  //append to li
  //   <li><button <div id="CS149" class="course" type="submit">CS149<br><br>Programming Fundamentals</button></li>
}
