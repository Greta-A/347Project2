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

function displaySessionCode()
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
}

function generateSessionCode()
{
  var session = Math.floor(1000 + Math.random() * 9000);
  var x = document.getElementById("code").value = session;
}

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
      openSlots = 2-div.childElementCount;
      var slotButton1 = document.createElement("BUTTON");
      slotButton1.classList.add("temporary")
      slotButton1.setAttribute("type", "button");
      //onclick="claimTime()"
      var slotButton2 = document.createElement("BUTTON");
      slotButton2.classList.add("temporary")
      slotButton2.setAttribute("type", "button");
      //onclick="claimTime()"
      if(openSlots === 2)
      {
        div.appendChild(slotButton1);
      }
      if(openSlots >= 1)
      {
        div.appendChild(slotButton2);
      }
  }
}

/**
 * Support function removes elements with empty class.
 */
function removeButtons()
{
  var tempButtons = document.getElementsByClassName("temporary");
  for (var b of tempButtons)
  {
    b.remove();
  }
}

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

populateTdsWithDivs();