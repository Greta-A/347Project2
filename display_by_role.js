var urlParams = new URLSearchParams(location.search);
var roleValues = [0,1,2]
// create the string classname for that role
var currentClass = urlParams.get('role');
// select all of the elements that belong to the current role on the page

for (var possibleRoleVal in roleValues) {
    // debugger
    // if we have selected the currentRole of the loop in our dropdown
    // >= would allow teacher to see student elements, and etc.
    // if (classToRoleLevel(event.target.value) >= possibleRoleVal) { 
    var elements = document.querySelectorAll(".role-"+possibleRoleVal);
    // alert((currentClass == possibleRoleVal) + " " + currentClass + " == " + possibleRoleVal)
    if (currentClass == possibleRoleVal) {
        // add the class "showing" (and remove the class "hidden")
        elements.forEach(elem => elem.classList.remove("hidden"))
        elements.forEach(elem => elem.classList.add("showing"))
        // elements.classList.add("showing")
    } else { //if we're looking at elements that do not belong to the sleected role, hide them
        elements.forEach(elem => elem.classList.remove("showing"))
        elements.forEach(elem => elem.classList.add("hidden"))
    }
}


document.getElementById("role-selector")
    .addEventListener("change", function (event) {
        console.log("event", event);
        // loop over all possible roles (student, ta, teacher)
        for (var possibleRoleVal in roleValues) {
            // create the string classname for that role
            var currentClass = ".role-" + possibleRoleVal;

            // select all of the elements that belong to the current role on the page
            var elements = document.querySelectorAll(currentClass);
            // debugger
            // if we have selected the currentRole of the loop in our dropdown
            // >= would allow teacher to see student elements, and etc.
            // if (classToRoleLevel(event.target.value) >= possibleRoleVal) { 
            if (classToRoleLevel(event.target.value) == possibleRoleVal) {
                // add the class "showing" (and remove the class "hidden")
                elements.forEach(elem => elem.classList.remove("hidden"))
                elements.forEach(elem => elem.classList.add("showing"))
                // elements.classList.add("showing")
            } else { //if we're looking at elements that do not belong to the sleected role, hide them
                elements.forEach(elem => elem.classList.remove("showing"))
                elements.forEach(elem => elem.classList.add("hidden"))
            }
        }
    });

function classToRoleLevel (stringClass) {
    // "role-0" => 0
    return stringClass.split("-")[1]
}
