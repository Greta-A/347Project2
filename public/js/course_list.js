//window.onload = onStartUp();

function displayPicked()
{
  fetch("/loadPickedCourses")
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonResponse) {
      listUserCoursesInHTML(jsonResponse);//communication with backend
    })
    .catch(function(){
        console.log("Caught");
    });
    showCourses();
    document.getElementById("hidden_course_list").style.display = "none";
}

function showCourses()
{
  //ev.preventDefault();
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
      form.appendChild(button);
      li.appendChild(form);
      var list = document.getElementById("available_courses");
      list.appendChild(li);
    }
  }
}

//lists user's courses.
function listUserCoursesInHTML(jsonResponse)
{
  var allCourses = document.getElementById("available_courses").getElementsByTagName("li");
  console.log(allCourses.length);
  console.log(jsonResponse);
  allPickedCourses = document.getElementById("picked_courses").getElementsByTagName("li");
  var length = allPickedCourses.length;
  if (jsonResponse.length > length)
  {
    for (var i = length; i < jsonResponse.length; i++)
    {
      //find id of available course that matches
      // save element as variable
      //append variable to picked courses list
      var pickedCourseID = jsonResponse[i].course_id;
      var li = document.createElement("li");
      var form = document.createElement("form");
      form.setAttribute('method', 'post');
      form.setAttribute('action', 'calendar');
      var pickedCourseButton = document.getElementById("CS"+pickedCourseID);
      form.appendChild(pickedCourseButton);
      //li.appendChild(pickedCourseButton);
      li.appendChild(form);
      document.getElementById("picked_courses").appendChild(li);
    }
  }
}

displayPicked()
