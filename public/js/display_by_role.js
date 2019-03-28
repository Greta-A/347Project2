//var urlParams = new URLSearchParams(location.search);
var roleValues = [0,1,2]
// create the string classname for that role
//var currentClass = urlParams.get('role');
//
//if there is not string query default to student
 // if(currentClass === null)
 // {
 //     currentClass = 0;
 // }

 var currentClass = document.getElementById("user_role").innerHTML;
 showHide(currentClass);


//show and hids based on value (0,1,2)
function showHide(value)
{
    for (var possibleRoleVal in roleValues) {
        // create the string classname for that role
        var currentClass = ".role-" + possibleRoleVal;

        // select all of the elements that belong to the current role on the page
        var elements = document.querySelectorAll(currentClass);
        // debugger
        // if we have selected the currentRole of the loop in our dropdown
        // >= would allow teacher to see student elements, and etc.
        // if (classToRoleLevel(event.target.value) >= possibleRoleVal) {
        if (value == possibleRoleVal) {
            // add the class "showing" (and remove the class "hidden")
            elements.forEach(elem => elem.classList.remove("hidden"))
            elements.forEach(elem => elem.classList.add("showing"))
            // elements.classList.add("showing")
        } else { //if we're looking at elements that do not belong to the sleected role, hide them
            elements.forEach(elem => elem.classList.remove("showing"))
            elements.forEach(elem => elem.classList.add("hidden"))
        }
    }
}

//event listener
// document.getElementById("role-selector")
//     .addEventListener("change", function (event) {
//         console.log("event", event);
//         showHide(classToRoleLevel(event.target.value))});


//showHide(classToRoleLevel(document.getElementById("role-selector").value));

function classToRoleLevel (stringClass) {
    // "role-0" => 0
    return stringClass.split("-")[1]
}


//showHide(currentClass);
