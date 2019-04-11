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
         // var form = document.createElement("form");
          // form.setAttribute('action', "sendTAInfo");
          // form.setAttribute('method', "post");
          var button = document.createElement("button");
          // var input = document.createElement("input");
          // input.setAttribute('name', "buttonSlot");
          // input.value = slotNum;
          // input.style.display = "none";
         button.class = "ta_button";
         button.setAttribute("type", "submit");
         button.setAttribute("id", slotNum);
         button.setAttribute("onclick", `displaySessionCode(${slotNum})`);
         button.innerHTML = jsonResponse[i].ta;

         // found the correct TA button
         if (slotNum == jsonResponse[i].slot)
         {
           // requested cover, no one has accepted yet
           if (jsonResponse[i].cover_requested && !(jsonResponse[i].cover_accepted))
           {
             // set button color to red
             button.style.backgroundColor = "#ff6d6b";
           }
           // someone has accepted the cover
           if (jsonResponse[i].cover_requested && jsonResponse[i].cover_accepted)
           {
             button.style.backgroundColor = "yellow";
           }
           // admin has approved cover
           if (jsonResponse[i].cover_requested && jsonResponse[i].cover_accepted && jsonResponse[i].cover_approved)
           {
             button.style.backgroundColor = "lightgreen";
           }
           // form.appendChild(input);
           // form.appendChild(button);
           // div.appendChild(input);
           div.appendChild(button);
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
         var start = toStandardTime(jsonResponse[i].start_time);
         var end = toStandardTime(jsonResponse[i].end_time);
         button.innerHTML = start + "-";
         button.innerHTML += end + "<br />";
         button.innerHTML += "Room " + jsonResponse[i].room;

         if (slotNum == jsonResponse[i].slot)
         {
           div.appendChild(button);
         }
       }
       slotNum++;
    }
  }
    slotNum = 0;
    for (var div of timeDivs)
    {
      if (div.classList.contains("role-2"))
      {
        slotNum++;
        for (var i = 0; i < jsonResponse.length; i++)
        {
          var form = document.createElement("form");
           form.setAttribute('action', "sendAdInfo");
           form.setAttribute('method', "post");
           var input = document.createElement("input");
           input.setAttribute('name', "buttonSlot");
           input.value = slotNum;
           input.style.display = "none";
          var button = document.createElement("button");
           button.class = "admin_button";
           button.setAttribute("type", "submit");
           button.setAttribute("onclick", "confirmCover(event)");
           button.innerHTML = jsonResponse[i].ta

           if (slotNum == jsonResponse[i].slot)
           {
             if (jsonResponse[i].cover_requested && !(jsonResponse[i].cover_accepted))
             {
               // set button color to red
               button.style.backgroundColor = "#ff6d6b";
             }
             // someone has accepted the cover
             if (jsonResponse[i].cover_requested && jsonResponse[i].cover_accepted)
             {
               button.style.backgroundColor = "yellow";
             }
             if (jsonResponse[i].cover_requested && jsonResponse[i].cover_accepted && jsonResponse[i].cover_approved)
             {
               button.style.backgroundColor = "lightgreen";
             }
            form.appendChild(input);
            form.appendChild(button);
            div.appendChild(form);
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

function displaySessionCode(slotNum)
{
  fetch(`/generateCode/${slotNum}`)
    .then(resp => {
      console.log('resposne from generateCode', resp)
    })
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
  var selected = document.getElementById(slotNum);
  console.log(selected.style.backgroundColor);
  // setTATarget(e);
  // no one has requested anything, request form is enabled
  if (selected.style.backgroundColor == "")
  {
    document.getElementById("accept_form").style.display = "none";
    if (selected.innerHTML != document.getElementById("fullEid").innerHTML)
    {
      document.getElementById("request_form").style.display = "none";
    }
  }
  // accepted cover, disable all forms
  else if (selected.style.backgroundColor == "yellow")
  {
    document.getElementById("request_form").style.display = "none";
    document.getElementById("accept_form").style.display = "none";
  }
  // cover is approved, disable all forms
  else if (selected.style.backgroundColor == "lightgreen")
  {
    document.getElementById("request_form").style.display = "none";
    document.getElementById("accept_form").style.display = "none";
  }
  // requested cover, disable request form
  else
  {
    document.getElementById("request_form").style.display = "none";
  }
}

function generateSessionCode()
{
  var session = Math.floor(1000 + Math.random() * 9000);
  var x = document.getElementById("code").value = session;
}


function confirmCover(e)
{
  if (e.target.style.backgroundColor == "yellow")
  {
    var x = document.getElementById("approve_cover");
    if (x.style.display === "none")
    {
      x.style.display = "block";
    }
    else
    {
      x.style.display = "none";
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
      slotButton1.setAttribute("type", "submit");
      slotButton1.setAttribute("onclick", "claimTATime(this)");
      //slotButton1.innerHTML = slotNum;
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
      //slotButton2.innerHTML = slotNum;
      form2.appendChild(input2);
      form2.appendChild(slotButton2);
      if(openSlots === 2)
      {
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
  //cleanup
  hideSelectTime(); //makes the form disapear
  addTATime(); //makes the empty buttons dissapear.
}

function toStandardTime(time)
{ // your input

  time = time.split(':'); // convert to array

  // fetch
  var hours = Number(time[0]);
  var minutes = Number(time[1]);
  var seconds = Number(time[2]);

  // calculate
  var timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
  } else if (hours > 12) {
    timeValue= "" + (hours - 12);
  } else if (hours == 0) {
    timeValue= "12";
  }

  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
  timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
  //timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

  return timeValue;
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
