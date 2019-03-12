function submitQuestion() {
  var questionInput = document.getElementById("question_string").value;
  var surroundingDiv = document.createElement('div');
  var newQuestion = document.createElement('li');
  newQuestion.setAttribute('class', 'question_item');
  newQuestion.innerHTML = questionInput;
  surroundingDiv.appendChild(newQuestion);
  var upvoteBtn = document.createElement("button");
  upvoteBtn.setAttribute('type', 'button');
  upvoteBtn.setAttribute('class', 'upvote');
  upvoteBtn.innerHTML = "&#x1F44D; 0";
  upvoteBtn.addEventListener("click", function(e) {upvote(e)});
  surroundingDiv.appendChild(upvoteBtn);
  var removeBtn = document.createElement("button");
  removeBtn.setAttribute('type', 'button');
  removeBtn.setAttribute('class', 'remove');
  removeBtn.innerHTML = "Remove";
  removeBtn.addEventListener("click", function(e) {removeQuestion(e)});
  surroundingDiv.appendChild(removeBtn);
  var list = document.getElementById("questionList");
  list.appendChild(surroundingDiv);
  document.getElementById("question_string").value="";
}

function getNextQuestion()
{
  var topQuestion = document.getElementsByClassName("question_item")[0].innerHTML;
  var list = document.getElementById("questionList");
  document.getElementById("currentQuestion").value = topQuestion;
  var firstElement = document.getElementById("questionList").getElementsByTagName("div")[0];
  list.removeChild(firstElement);
}

function upvote(e) {
  var upvoteString = String(e.target.innerHTML);
  var split = upvoteString.split(" ");
  var upvoted = parseInt(split[1]) + 1;
  e.target.innerHTML = "&#x1F44D; " + upvoted;
  e.target.disabled = true;
}

function removeQuestion(e)
{
  var parent = e.target.parentNode;
  var list = document.getElementById("questionList");
  list.removeChild(parent);
}
