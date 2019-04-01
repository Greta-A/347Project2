//window.onload = onStartUp();

window.displayPicked = function()
{
  fetch("/loadPickedCourses")
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonResponse) {
      listUserCoursesInHTML(jsonResponse);//communication with backend

    })
    .catch(function(){
      console.log("Cought");
    });
    console.log("in displayPicked");
    //return true;
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
  var allCourses = document.getElementById("available_courses").getElementsByTagName("li");
  var leng = allCourses.length;
  if (jsonData.length > leng)
  {
    for (var i=leng; i < jsonData.length; i++)
    {
      var id = jsonData[i].course_id;
      var desc = jsonData[i].course_name;
      var form = document.createElement("form");
      // form.onClick = "displayPicked()";
      //form.addEventListener("click", function() {displayPicked()});
      form.setAttribute('action', 'pickedCourses');
      form.setAttribute('method', 'post');
      form.setAttribute('id', id+'Form');
      var li = document.createElement("li");
      var button = document.createElement("button");
      var br = document.createElement("br");
      button.setAttribute('class', 'course');
      button.setAttribute('id', "CS"+id);
      button.setAttribute('type', 'submit');
      button.setAttribute('name', 'classNum');
      button.setAttribute('value', id);
      button.innerHTML = "CS"+id +"<br />";
      button.appendChild(br);
      button.innerHTML += desc;
      // button.addEventListener("click", function() {
      //   rememberButton(id, desc);
      // })
      //button.appendChild(form);
      form.appendChild(button);
      //form.appendChild(button);
      li.appendChild(form);
      var list = document.getElementById("available_courses");
      list.appendChild(li);
    }
  }
}

function rememberButton(id, desc)
{
  document.getElementById(id+"Form").submit();
  location.reload();
  displayPicked();
}

//lists user's courses.
function listUserCoursesInHTML(jsonResponse)
{
  console.log(jsonResponse);
  console.log(jsonResponse[0].course_id);
  // alert(jsonResponse);
}

displayPicked()
