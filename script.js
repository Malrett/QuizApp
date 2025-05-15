let questions = [
  {
    "question": "Was bedeutet die Abkürzung 'CPU'?",
    "answer_1": "Central Processing Unit",
    "answer_2": "Central Power Unit",
    "answer_3": "Computer Process Unit",
    "answer_4": "Control Program Unit",
    "right_answer": "answer_1",
  },
  {
    "question": "Welches Protokoll wird für den Versand von E-Mails verwendet?",
    "answer_1": "SNMP",
    "answer_2": "HTTP",
    "answer_3": "SMTP",
    "answer_4": "FTP",
    "right_answer": "answer_3",
  },
  {
    "question": "Was ist ein Byte?",
    "answer_1": "1 Bit",
    "answer_2": "4 Bit",
    "answer_3": "8 Bit",
    "answer_4": "16 Bit",
    "right_answer": "answer_3",
  },
  {
    "question": "Welche Programmiersprache wird hauptsächlich für Webentwicklung verwendet?",
    "answer_1": "JavaScript",
    "answer_2": "C",
    "answer_3": "Python",
    "answer_4": "Java",
    "right_answer": "answer_1",
  },
  {
    "question": "Was macht ein Betriebssystem?",
    "answer_1": "Es ist ein Antivirenprogramm",
    "answer_2": "Es verwaltet Hardware und Software",
    "answer_3": "Es speichert nur Daten",
    "answer_4": "Es ist ein Textverarbeitungsprogramm",
    "right_answer": "answer_2",
  },
  {
    "question": "Welche der folgenden ist eine NoSQL-Datenbank?",
    "answer_1": "PostgreSQL",
    "answer_2": "Oracle",
    "answer_3": "MongoDB",
    "answer_4": "MySQL",
    "right_answer": "answer_3",
  },
  {
    "question": "Was ist ein Router?",
    "answer_1": "Ein Grafikprozessor",
    "answer_2": "Ein Gerät zur Weiterleitung von Netzwerkpaketen",
    "answer_3": "Ein Gerät zur Stromversorgung",
    "answer_4": "Ein Backup-System",
    "right_answer": "answer_2",
  },
  {
    "question": "Wofür steht 'HTML'?",
    "answer_1": "Home Tool Markup Language",
    "answer_2": "HyperTransfer Markup Language",
    "answer_3": "HighText Machine Language",
    "answer_4": "HyperText Markup Language",
    "right_answer": "answer_4",
  },
  {
    "question": "Welche Zahl ist binär für die Dezimalzahl 5?",
    "answer_1": "100",
    "answer_2": "101",
    "answer_3": "110",
    "answer_4": "111",
    "right_answer": "answer_2",
  },
  {
    "question": "Was ist ein Framework?",
    "answer_1": "Eine Sammlung von Bibliotheken und Tools",
    "answer_2": "Ein Betriebssystem",
    "answer_3": "Ein Texteditor",
    "answer_4": "Ein Compiler",
    "right_answer": "answer_1",
  },
];

let currentQuestion = 0;
let correctAnswers = 0;
let AUDIO_WIN = new Audio("./audio/win.mp3");
let AUDIO_SUCCESS = new Audio("audio/success_2.mp3");
let AUDIO_FAIL = new Audio("audio/wrong_2.mp3");

function init() {
  let numberOfQuestionsRef = document.getElementById("number_of_questions");
  numberOfQuestionsRef.innerHTML = questions.length;

  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function showEndScreen() {
  document.getElementById("question-body").classList.add("d_none");
  document.getElementById("end-screen").classList.remove("d_none");
  document.getElementById("questions-endscreen").innerHTML = questions.length;
  document.getElementById("correct-answers").innerHTML = correctAnswers;
  //document.getElementById("end-screen").style = ''; alternativ den style im html inline definieren
  //document.getElementById("end-screen").style = 'display: none';
  document.getElementById("header-img").src = "./img/trophy.png";
  AUDIO_WIN.play();
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById("progress-bar").innerHTML = `${percent}%`;
  document.getElementById("progress-bar").style = `width: ${percent}%`;
}

function updateToNextQuestion() {
  let question = questions[currentQuestion];
  document.getElementById("question-text").innerHTML = question.question;
  document.getElementById("answer_1").innerHTML = question.answer_1;
  document.getElementById("answer_2").innerHTML = question.answer_2;
  document.getElementById("answer_3").innerHTML = question.answer_3;
  document.getElementById("answer_4").innerHTML = question.answer_4;
  document.getElementById("current-question").innerHTML = currentQuestion + 1;
}

function answer(selection) {
  let question = questions[currentQuestion];
  let idOfRightAnswer = question.right_answer;
  if (selection == question.right_answer) {
    correctAnswer(selection);
  } else {
    wrongAnswer(selection, idOfRightAnswer);
  }
  document.getElementById("next-button").disabled = false;
}

function correctAnswer(selection) {
  document.getElementById(selection).parentNode.classList.add("bg-success");
  AUDIO_SUCCESS.play();
  correctAnswers++;
}

function wrongAnswer(selection, idOfRightAnswer) {
  document.getElementById(selection).parentNode.classList.add("bg-danger");
  document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
  AUDIO_FAIL.play();
}

function nextQuestion() {
  currentQuestion++;
  resetAnswers();
  showQuestion();
}

function resetAnswers() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("next-button").disabled = true;
}

function restartGame() {
  document.getElementById("header-img").src = "./img/question-mark.jpg";
  document.getElementById("question-body").classList.remove("d_none");
  document.getElementById("end-screen").classList.add("d_none");
  currentQuestion = 0;
  correctAnswers = 0;
  init();
}
