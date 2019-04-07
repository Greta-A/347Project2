//SESSION CODE
var ta_button_target;
displayAllTASlots();

function displayAllTASlots()
{
  fetch("/displayAllTASlots")
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonResponse) {
      displayTASlotsInHTML(jsonResponse);
    })
}

function displayTASlotsInHTML(jsonResponse)
{
  //values in jsonResponse: slot, ta, course_id, start_time, room,
  //  session_code, cover_requested, cover_accepted, cover_approved,
  //  remove_pending, end_time
  var slotNum = 0;
  var timeDivs = document.getElementsByClassName("times");
  // slots 1-14: 5pm
  // slots 15-28: 6pm
  // slots 29-42: 7pm
  // slots 43-56: 8pm
  // slots 57-70: 9pm
  // slots 71-84: 10pm
  // slots 85-98: 11pm
  for (var div of timeDivs)
  {
    if (div.classList.contains("role-1"))
    {
      slotNum++;
      for (var i = 0; i < jsonResponse.length; i++)
      {
         var form = document.createElement("form");
          form.setAttribute('action', "sendTAInfo");
          form.setAttribute('method', "post");
          var button = document.createElement("button");
          var input = document.createElement("input");
          input.setAttribute('name', "buttonSlot");
          input.value = slotNum;
          input.style.display = "none";
         button.class = "ta_button";
         button.setAttribute("type", "submit");
         button.setAttribute("onclick", "displaySessionCode(event)");
         button.innerHTML = jsonResponse[i].ta;

         if (slotNum == jsonResponse[i].slot)
         {
           if (jsonResponse[i].cover_requested)
           {
             if (button.innerHTML == document.getElementById("fullEid").innerHTML)
             {
               document.getElementById("request_form").style.display = "none";
               document.getElementById("accept_form").style.display = "none";
             }
             button.style.backgroundColor = "#ff6d6b";
             form.appendChild(input);
             form.appendChild(button);
             div.appendChild(form);
           }
         }
       }
       slotNum++;
    }
  }
  slotNum = 0;
  for (var div of timeDivs)
  {
    if (div.classList.contains("role-0"))
    {
      slotNum++;
      for (var i = 0; i < jsonResponse.length; i++)
      {
        var button = document.createElement("button");
         button.class = "student_button";
         button.setAttribute("type", "button");
         button.setAttribute("onclick", "getSessionCode()");
         button.innerHTML = jsonResponse[i].start_time + "-";
         button.innerHTML += jsonResponse[i].end_time + "<br />";
         button.innerHTML += "Room " + jsonResponse[i].room;

         if (slotNum == jsonResponse[i].slot)
         {
           div.appendChild(button);
         }
       }
       slotNum++;
    }
  }
}


function setTATarget(e)
{
  ta_button_target = e.target;
}

function getTATarget()
{
  return ta_button_target;
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
  // document.getElementById("request_form").style.display = "block";
  // if (getTATarget().style.backgroundColor == "")
  // {
  //   document.getElementById("request_cover").checked = false;
  //   document.getElementById("hidden_accept").style.display = "none";
  //   document.getElementById("accept_cover").checked = false;
  // }
  // else if (getTATarget().style.backgroundColor == "yellow")
  // {
  //   document.getElementById("request_form").style.display = "none";
  // }
}

function generateSessionCode()
{
  var session = Math.floor(1000 + Math.random() * 9000);
  var x = document.getElementById("code").value = session;
}

function validateCheck()
{
  console.log(getTATarget().parentElement.type);
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
        console.log("in validate check statemenet");
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

function confirmCover(e)
{
  var parentDivs = getTATarget().parentElement.parentElement.getElementsByTagName("div");
  var buttonAmount = parentDivs[1].getElementsByTagName("button").length;
  var buttonText = e.target.innerHTML;
  if (e.target.style.backgroundColor = "yellow")
  {
    e.target.style.backgroundColor = "#11d86e";
    for (var i = 0; i < buttonAmount; i++)
    {
      alert(parentDivs[0].getElementsByTagName("button")[i].innerHTML);
      if (parentDivs[0].getElementsByTagName("button")[i].innerHTML == buttonText)
      {
        parentDivs[0].getElementsByTagName("button")[i].style.backgroundColor = "#11d86e";
      }
    }
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
  var slotNum = 0;
  //get all divs in table.
  var timeDivs = document.getElementsByClassName("times");

  for(var div of timeDivs)
  {
    //was adding to student and admin before as well.
    if(div.classList.contains("role-1"))
    {
      slotNum++;
      openSlots = 2-div.childElementCount;
      var slotButton1 = document.createElement("BUTTON");
      var form1 = document.createElement("form");
      form1.setAttribute('action', 'addTASlot');
      form1.setAttribute('method', 'post');
      form1.setAttribute('id', slotNum+"form");
      form1.classList.add('temporary');
      input1 = document.createElement("input");
      input1.setAttribute('name', "buttonSlot");
      input1.style.display = "none";
      input1.value = slotNum;
      slotButton1.classList.add("temporary")
      // slotButton1.setAttribute("type", "button");
      slotButton1.setAttribute("type", "submit");
      slotButton1.setAttribute("onclick", "claimTATime(this)");
      slotButton1.innerHTML = slotNum;
      form1.appendChild(input1);
      form1.appendChild(slotButton1);
      slotNum++;
      input2 = document.createElement("input");
      input2.setAttribute('name', "buttonSlot");
      input2.style.display = "none";
      input2.value = slotNum;
      var form2 = document.createElement("form");
      form2.setAttribute('action', 'addTASlot');
      form2.setAttribute('method', 'post');
      form2.setAttribute('id', slotNum+"form");
      form2.classList.add('temporary');
      var slotButton2 = document.createElement("BUTTON");
      slotButton2.classList.add("temporary")
      // slotButton2.setAttribute("type", "button");
      slotButton2.setAttribute("type", "submit");
      slotButton2.setAttribute('name', slotNum);
      slotButton2.setAttribute("onclick", "claimTATime(this)");
      slotButton2.innerHTML = slotNum;
      form2.appendChild(input2);
      form2.appendChild(slotButton2);
      if(openSlots === 2)
      {
        // div.appendChild(slotButton1);
        // childToParentMap.set(slotButton1,div);
        div.appendChild(form1);
        childToParentMap.set(form1,div);
      }
      if(openSlots >= 1)
      {
        div.appendChild(form2);
        childToParentMap.set(form2,div);
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
  var timeDivs = document.getElementsByClassName("times");

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
  admin_button.setAttribute("onclick", "confirmCover(event)");
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

      td.appendChild(timeDiv1);
      td.appendChild(timeDiv0);
      td.appendChild(timeDiv2);
    }
  }

  /*
   * Since the buttons/div/whatever above are being created dynamically the display by role has to be called again.
   * So I am getting the role from the back end and re calling display by role with whatever role the user is.
   * (This is the first time things needed to be displayed by role dynamically, and not on page creation).
   */
  fetch("/getRole")
  .then(function(response) {
    return response.json();
  })
  .then(function(response)
  {
    showHide(response);
  })
  .catch(function(response)
  {
    console.log("failed to get role. Display by role is borked." + response);
  })
}

var childToParentMap = new Map();
populateTdsWithDivs();
