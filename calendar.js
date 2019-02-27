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
    //declarations
    addButtons();
  } else if (addButton.textContent === "Done")
  {
    addButton.textContent = "Add";
    removeButtons();
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
  //get all tds in table.
  var tds = document.getElementsByTagName("td");
  //filter tds by ones that have div and ones that dont.
  //if it has one add to it based on open slots.
  //else create one and add two to it.
  
  //Add buttons to div.
  for(var td of tds)
  {
    if(containsDiv(td))
    {
      alert();
    }
    else{
      var timeDiv = document.createElement("DIV");
      timeDiv.setAttribute("class", "role-1");
      var slotButton1 = document.createElement("BUTTON");
      slotButton1.setAttribute("class", "empty");
      slotButton1.setAttribute("type", "button");
      //onclick="claimTime()"
      var slotButton2 = document.createElement("BUTTON");
      slotButton2.setAttribute("class", "empty");
      slotButton2.setAttribute("type", "button");
      //onclick="claimTime()"
      if(openSlots === 2)
      {
        timeDiv.appendChild(slotButton1);
      }
      if(openSlots >= 1) //|| openSLots === 2
      {
        timeDiv.appendChild(slotButton2);
        td.appendChild(timeDiv);
      }
    }
  }
}

/**
 * 
 */
function containsDiv(td)
{
  var c = false;
  // for(var div of td.childNodes)
  // {
  //   if(div.classList.contains("role-1"))
  //   {
  //     c = true;
  //   }
  // }
  return c;
}

/**
 * Support function removes elements with empty class.
 */
function removeButtons()
{
  var x = document.getElementsByClassName("empty");
    for (var i=0; i< x.length; i++)
    {
      if (x[i].style.display === "none")
      {
//       x[i].style.display = "inline-block";
      }
      else
      {
        x[i].style.display = "none";
      }
    }
}