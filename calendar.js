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

function addTATime()
{
// <button type="button" class="empty" style="display:none;"></button>
// <button type="button" class="empty" style="display:none;"></button>

// <div class="role-1">
//   <button type="button" class="empty" style="display:none;"></button>
//   <button type="button" class="empty" style="display:none;"></button>
// </div>

  //get all tds in table.
  var tds = $("td");
  // 2 buttons per time.
  var openSlots = 2; 
  //Add buttons to div.
  for(var td of tds)
  {
    // alert(td);
    var timeDiv = $("<div><div>");//class='role-1'
    // alert(timeDiv);
    var slotButton = $("<button>+</button>");//type='button'//class='empty'
    // alert(slotButton);
    // openSlots = 2 - td.children().length;
    // alert(openSlots);
    for(var i = 0 ; i < openSlots ; i++)
    {
        timeDiv.append(slotButton);
    }
    td.append(timeDiv);
    td.append(slotButton);
  }


//   var x = document.getElementsByClassName("empty");
//   for (var i=0; i< x.length; i++)
//   {
//     if (x[i].style.display === "none")
//     {
//       x[i].style.display = "inline-block";
//     }
//     else
//     {
//       x[i].style.display = "none";
//     }
//   }
}

