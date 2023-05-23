/*CARDWIZ
BY AYAAN TUNIO, KRISH SHAH, VANSH ANAND, AND RAEID USMANALI*/
const container = document.querySelector(".container");
const addThing = document.getElementById("addTHeQuestionThingy");
const cardButton = document.getElementById("saveFlashyCardyCard");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("addFlashyCardyCard");
const closeBtn = document.getElementById("closyclose");
let editBool = false;
let flashcards = [];

/*way too many issues with this, just made it global so that there were no initial issues*/
const disableButtons = (value) => {
  const editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};

//loads flashcards from localStorage if there are any
const storedFlashcards = localStorage.getItem("flashcards");
if (storedFlashcards) {
  flashcards = JSON.parse(storedFlashcards);
  viewlist();
}

//adds a flashcard question box when user clicks 'Add Flashcard' button
addQuestion.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addThing.classList.remove("hide");
});

//Hide Create flashcard Card
function hideQuestion() {
    container.classList.remove("hide");
    addThing.classList.add("hide");
    if (editBool) {
      editBool = false;
      submitQuestion();
    }
  }
  
  closeBtn.addEventListener("click", hideQuestion);
  

//Submit Question
cardButton.addEventListener("click", () => {
    editBool = false;
    const tempQuestion = question.value.trim();
    const tempAnswer = answer.value.trim();
    if (!tempQuestion || !tempAnswer) {
      errorMessage.classList.remove("hide");
    } else {
      container.classList.remove("hide");
      errorMessage.classList.add("hide");
      flashcards.push({ question: tempQuestion, answer: tempAnswer });
      localStorage.setItem("flashcards", JSON.stringify(flashcards));
      viewlist();
      question.value = "";
      answer.value = "";
    }
  });


//Card Generate
/*old code, deprecated in favour of new code below that uses localstorage)*/
/*function viewlist() {
  var listCard = document.getElementsByClassName("storeFlashyCardyCard");
  var div = document.createElement("div");
  div.classList.add("card");
  //Question
  div.innerHTML += `
  <p class="divQuestionFlashy">${question.value}</p>`;
  //Answer
  var displayAnswer = document.createElement("p");
  displayAnswer.classList.add("divAnswerFlashy", "hide");
  displayAnswer.innerText = answer.value;*/
  function viewlist() {
    const listCard = document.querySelector(".storeFlashyCardyCard");
    listCard.innerHTML = ""; // Clear previous flashcards
  
    flashcards.forEach((flashcard) => {
      const div = document.createElement("div");
      div.classList.add("card");
      // Question
      div.innerHTML += `
        <p class="divQuestionFlashy">${flashcard.question}</p>`;
      // Answer
      const displayAnswer = document.createElement("p");
      displayAnswer.classList.add("divAnswerFlashy", "hide");
      displayAnswer.innerText = flashcard.answer;
    // Link to show/hide answer
    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "buttonShowHideFlashyCardyCard");
    link.innerHTML = "Show/Hide";
    link.addEventListener("click", () => {
      displayAnswer.classList.toggle("hide");
    });

  div.appendChild(link);
  div.appendChild(displayAnswer);

  //Edit button
  let buttonsCon = document.createElement("div");
  buttonsCon.classList.add("containerForButton");
  var editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    editBool = true;
    modifyElement(editButton, true);
    addThing.classList.remove("hide");
  });
  buttonsCon.appendChild(editButton);
  disableButtons(false);

  //Delete Button
  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  buttonsCon.appendChild(deleteButton);

  div.appendChild(buttonsCon);
  listCard.appendChild(div);
});
  hideQuestion();
}

//Modify Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement.parentElement;
  let parentQuestion = parentDiv.querySelector(".divQuestionFlashy").innerText;
  if (edit) {
    let parentAns = parentDiv.querySelector(".divAnswerFlashy").innerText;
    answer.value = parentAns;
    question.value = parentQuestion;
    disableButtons(true);
  }
  parentDiv.remove();
  const updatedFlashcards = flashcards.filter(
    (flashcard) => flashcard.question !== parentQuestion
  );
  flashcards = updatedFlashcards;
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
};
