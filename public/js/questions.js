//is called at the bottom on load.
var topQuestion;
var displayed = false;
function displayPicked()
{
  //gimmi the pages questions.
  fetch("/loadQuestions")
    .then(function(response) {
      //turn the response into json.
      return response.json();
    })
    .then(function(jsonResponse) {
      //display the questions fetched from the back end that are now in json.
      displayQuestionList(jsonResponse);
    })
    .catch(function(){
        console.log("Caught");
    });
}

function displayQuestionList(jsonResponse)
{
  //Sort before going displaying.
  var sortedJSonQuestions = jsonResponse.sort(function(a,b){return a.position - b.position});
  for(jsonQuestion of sortedJSonQuestions)
  {
    // access data by jsonQuestion.question or jsonQuestion.position, etc.
    var surroundingDiv = document.createElement('div');
    var question = document.createElement("li");
    question.setAttribute("class", "question_item");
    // set id of question to position in list for easy access
    question.setAttribute("id", jsonQuestion.position);
    question.innerHTML = jsonQuestion.owner + ": " + jsonQuestion.question;
    surroundingDiv.appendChild(question);
    // create form request for upvote button
    var inputForm = document.createElement("form");
    inputForm.setAttribute("action", "upvoteQuestion");
    inputForm.setAttribute("method", "post");
    var hiddenInput = document.createElement("input");
    var hiddenInput2 = document.createElement("input");
    hiddenInput.style.display = "none";
    hiddenInput2.style.display = "none";
    // need to create name to access number of upvotes
    hiddenInput.setAttribute("name", "upvotes");
    hiddenInput.value = jsonQuestion.upvotes;
    hiddenInput2.setAttribute("name", "question");
    hiddenInput2.value = jsonQuestion.question;
    var upvoteBtn = document.createElement("button");
    upvoteBtn.setAttribute('type', 'submit');
    upvoteBtn.setAttribute('class', 'upvote');
    upvoteBtn.innerHTML = "&#x1F44D; " + jsonQuestion.upvotes;
    inputForm.appendChild(hiddenInput);
    inputForm.appendChild(hiddenInput2);
    inputForm.appendChild(upvoteBtn);
    //question.appendChild(inputForm);
    //surroundingDiv.appendChild(question);
    surroundingDiv.appendChild(inputForm);
    // create form for remove button
    var removeBtn = document.createElement("button");
    removeBtn.setAttribute('type', 'button');
    removeBtn.setAttribute('class', 'remove');
    removeBtn.innerHTML = "Remove";
    //removeBtn.addEventListener("click", function(e) {removeQuestion(e)});
    //surroundingDiv.appendChild(removeBtn);
    var list = document.getElementById("questionList");
    list.appendChild(surroundingDiv);
  }
}

// form
  //hidden input: num of upvotes
  //submit button
// form

function getNextQuestion()
{
  // fetch("/popQueue")
  //   // .then(function(response) {
  //   //   //turn the response into json.
  //   //   return response.json();
  //   // })
  //   .then(function(jsonResponse) {
  //     //display the questions fetched from the back end that are now in json.
  //     // displayQuestionList(jsonResponse);
  console.log("in getNextQuestion method");
  displayed = true;
      document.getElementById("currentQuestion").value = topQuestion;
    return true;
    // })
    // .catch(function(){
    //   console.log("Caught");
    // });
}

function removeQuestion(e)
{
  var parent = e.target.parentNode;
  var list = document.getElementById("questionList");
  list.removeChild(parent);
}

displayPicked();
