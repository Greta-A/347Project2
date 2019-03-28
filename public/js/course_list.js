function showCourses()
{
  var x = document.getElementById("hidden_course_list");
  if (x.style.display === "none")
  {
    x.style.display = "inline-block";
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
