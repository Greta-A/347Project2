//SESSION CODE
var ta_button_target;


function setTATarget(e)
{
  ta_button_target = e.target;
}

function getTATarget()
{
  return ta_button_target;
}

function hideInfo(option)
{
  if (option = "role-0")
  {
    document.getElementById("hidden_generate_session").style.display = "none";
  }
  if (option = "role-2")
  {
    document.getElementById("hidden_session_code").style.display = "none";
  }
}

function getSessionCode() {
    var x = document.getElementById("hidden_session_code");
    if (x.style.display === "none")
    {
      x.style.display = "block";
    }
    else
    {
      x.style.display = "none";
    }
  }

function displaySessionCode(e)
{
  var x = document.getElementById("hidden_generate_session");
  if (x.style.display === "none")
  {
    document.getElementById("code").value = "";
    x.style.display = "block";
  }
  else
  {
    x.style.display = "none";
  }
  setTATarget(e);
  document.getElementById("request_form").style.display = "block";
  if (getTATarget().style.backgroundColor == "")
  {
    document.getElementById("request_cover").checked = false;
    document.getElementById("hidden_accept").style.display = "none";
    document.getElementById("accept_cover").checked = false;
  }
}

function generateSessionCode()
{
  var session = Math.floor(1000 + Math.random() * 9000);
  var x = document.getElementById("code").value = session;
}

function validateCheck()
{
  var parentDivs = getTATarget().parentElement.parentElement.getElementsByTagName("div");
  var buttonText = getTATarget().innerHTML;
  if (document.getElementById("request_cover").checked)
  {
      getTATarget().style.backgroundColor = "#ff6d6b";
      var buttonAmount = parentDivs[2].getElementsByTagName("button").length;
      for (var i = 0; i < buttonAmount; i++)
      {
        if (parentDivs[2].getElementsByTagName("button")[i].innerHTML == buttonText)
        {
          parentDivs[2].getElementsByTagName("button")[i].style.backgroundColor = "#ff6d6b";
        }
      }
      var x = document.getElementById("hidden_accept");
      if (x.style.display === "none")
      {
        document.getElementById("new_ta_name").value = "";
        x.style.display = "block";
      }

      if (document.getElementById("accept_cover").checked)
      {
        getTATarget().style.backgroundColor = "yellow";
        getTATarget().innerHTML = document.getElementById("new_ta_name").value;
        for (var i = 0; i < buttonAmount; i++)
        {
          if (parentDivs[2].getElementsByTagName("button")[i].innerHTML == buttonText)
          {
            parentDivs[2].getElementsByTagName("button")[i].style.backgroundColor = "yellow";
            parentDivs[2].getElementsByTagName("button")[i].innerHTML = document.getElementById("new_ta_name").value;
          }
        }
        document.getElementById("request_form").style.display = "none";
      }
  }
  else
  {
    getTATarget().style.backgroundColor = "";
    document.getElementById("hidden_accept").style.display = "none";
  }
}

//ADD
/**
 * connected to TAs adding times for taing.
 */
function addTATime()
{
  var addButton = document.getElementById("add");
  if(addButton.textContent === "Add")
  {
    addButton.textContent = "Done";
    addButtons();
    //disable other buttons (remove, request, accept)
  } else if (addButton.textContent === "Done")
  {
    addButton.textContent = "Add";
    removeButtons();
    //enable other buttons (remove, request, accept)
  }
  else
  {
    console.log("Add button should have text of 'Add' or 'Done'");
  }

}

/**
 * Support function. Adds buttons.
 */
function addButtons()
{
  var openSlots = 2;
  //get all divs in table.
  var timeDivs = document.getElementsByClassName("times");

  for(var div of timeDivs)
  {
    //was adding to student and admin before as well.
    if(div.classList.contains("role-1"))
    {
      openSlots = 2-div.childElementCount;
      var slotButton1 = document.createElement("BUTTON");
      slotButton1.classList.add("temporary")
      slotButton1.setAttribute("type", "button");
      slotButton1.setAttribute("onclick", "claimTATime(this)")
      var slotButton2 = document.createElement("BUTTON");
      slotButton2.classList.add("temporary")
      slotButton2.setAttribute("type", "button");
      slotButton2.setAttribute("onclick", "claimTATime(this)")
      if(openSlots === 2)
      {
        div.appendChild(slotButton1);
        childToParentMap.set(slotButton1,div);
      }
      if(openSlots >= 1)
      {
        div.appendChild(slotButton2);
        childToParentMap.set(slotButton2,div);
      }
    }
  }
}

/**
 * Support function removes elements with empty class.
 */
function removeButtons()
{
  for (var [child, parent] of childToParentMap)
  {
    if(child.classList.contains("temporary"))
    {
      parent.removeChild(child);
    }
  }
  childToParentMap = new Map();
}

//ADD / SELECT TIME
var timeSlotButton = null;
/**
 * Takes a button and adds it perm
 */
function claimTATime(button)
{
  timeSlotButton = button;
  //TODO: get target and keep it. so that it can be added after submit is clicked.
  if(taSelectTime.style.display === "none")
  {
    displaySelectTime();
  }
  else
  {
    hideSelectTime();
  }
}

/**
 * separated display and hide so they can be called from anywhere.
 */
var taSelectTime = document.getElementById("select_time");
function displaySelectTime()
{
  taSelectTime.style.display = "block";
}
function hideSelectTime()
{
  taSelectTime.style.display = "none";
}

/**
 * takes the select_time form and creates a button for the ta time slot
 * in all three roles.
 */
function confirmAddTime()
{
  // <button type="button" id="ta_button">TA3</button>
  var timeDivs = document.getElementsByClassName("times");

  //get form values and populate:
  //TODO:

  //student button setup
  var student_button = document.createElement("BUTTON")
  student_button.class = "student_button";
  student_button.setAttribute("type", "button");
  student_button.setAttribute("onclick", "getSessionCode()");
  student_button.textContent = "start-end Room 123"; //TODO time-time <br> Room ###
  //added in loop below.

  //ta button setup
  var taParent = childToParentMap.get(timeSlotButton);
  var taButton = document.createElement("BUTTON");
  taButton.class = "ta_button";
  taButton.setAttribute("type", "button");
  taButton.setAttribute("onclick", "displaySessionCode(event)");
  taButton.textContent = "TA#"; //TODO #
  taParent.appendChild(taButton);

  //admin button setup
  var admin_button = document.createElement("BUTTON")
  admin_button.id = "admin_button";
  admin_button.setAttribute("type", "button");
  admin_button.textContent = "TA#"; //TODO #

  //find student and admin divs to add buttons to as well.
  for(var div of timeDivs)
  {
    //was adding to student and admin before as well.
    if(div.classList.contains("role-0") && taParent.parentElement === div.parentElement)
    {
      div.appendChild(student_button);
    }
    //ta one is done above since we dont have to search for the parent.
    if(div.classList.contains("role-2") && taParent.parentElement === div.parentElement)
    {
      div.appendChild(admin_button);
    }
  }

  //cleanup
  hideSelectTime(); //makes the form disapear
  addTATime(); //makes the empty buttons dissapear.
}

//OTHER
/**
 * instead of writing every single div out in html...
 */
function populateTdsWithDivs()
{
  var tds = document.getElementsByTagName("td");
  for(var td of tds)
  {
    // alert(td.childElementCount);
    if(td.childElementCount === 0)
    {
      var timeDiv0 = document.createElement("DIV");
      timeDiv0.classList.add("role-0", "times")
      var timeDiv1 = document.createElement("DIV");
      timeDiv1.classList.add("role-1", "times")
      var timeDiv2 = document.createElement("DIV");
      timeDiv2.classList.add("role-2", "times")

      td.appendChild(timeDiv0);
      td.appendChild(timeDiv1);
      td.appendChild(timeDiv2);
    }
  }
}

var childToParentMap = new Map();
populateTdsWithDivs();
