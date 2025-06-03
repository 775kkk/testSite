
const questions = [
  {
    text: "Что вы берёте первым в поход?",
    answers: [
      { text: "Заряженный телефон", type: "турист" },
      { text: "Карта и компас", type: "исследователь", correct: true },
      { text: "Сменную одежду", type: "отдыхающий" }
    ]
  },
  {
    text: "Ваш идеальный маршрут — это:",
    answers: [
      { text: "Горы и перевалы", type: "исследователь", correct: true },
      { text: "Прогулка до ближайшего кафе", type: "турист" },
      { text: "Экскурсия с гидом", type: "отдыхающий" }
    ]
  },
  {
    text: "Что вас вдохновляет в путешествиях?",
    answers: [
      { text: "Преодоление себя", type: "исследователь", correct: true },
      { text: "Новые фотки для соцсетей", type: "турист" },
      { text: "Возможность отдохнуть", type: "отдыхающий" }
    ]
  },
  {
    text: "Без чего вы точно не поедете?",
    answers: [
      { text: "Бинокль и нож", type: "исследователь", correct: true },
      { text: "Пауэрбанка", type: "турист" },
      { text: "Подушки для шеи", type: "отдыхающий" }
    ]
  },
  {
    text: "Как вы относитесь к палаткам?",
    answers: [
      { text: "Люблю жить ближе к природе", type: "исследователь", correct: true },
      { text: "Только если рядом есть зарядка", type: "турист" },
      { text: "Я лучше выберу отель", type: "отдыхающий" }
    ]
  },
  {
    text: "Сколько км в день комфортно пройти пешком?",
    answers: [
      { text: "10–15 км", type: "исследователь", correct: true },
      { text: "1–2 км, не больше", type: "отдыхающий" },
      { text: "Смотря по интернету, как модно", type: "турист" }
    ]
  },
  {
    text: "Вы оказались без связи. Что делаете?",
    answers: [
      { text: "Паникую", type: "турист" },
      { text: "Ориентируюсь по звёздам и местности", type: "исследователь", correct: true },
      { text: "Иду туда, где ловит", type: "отдыхающий" }
    ]
  },
  {
    text: "Какая обувь у вас в рюкзаке?",
    answers: [
      { text: "Кроссовки от блогера", type: "турист" },
      { text: "Треккинговые ботинки", type: "исследователь", correct: true },
      { text: "Сланцы", type: "отдыхающий" }
    ]
  },
  {
    text: "Как вы планируете маршрут?",
    answers: [
      { text: "Изучаю карту и отзывы", type: "исследователь", correct: true },
      { text: "Смотрю Reels", type: "турист" },
      { text: "Слежу за туроператором", type: "отдыхающий" }
    ]
  },
  {
    text: "Что для вас главное в путешествии?",
    answers: [
      { text: "Испытать себя", type: "исследователь", correct: true },
      { text: "Получить лайки", type: "турист" },
      { text: "Расслабиться", type: "отдыхающий" }
    ]
  }
];

let currentAnswers = [];
const container = document.getElementById("quiz-container");
const resultBlock = document.getElementById("quiz-result");
const actionsBlock = document.getElementById("quiz-actions");
const heading = document.getElementById("quiz-heading");
const userName = localStorage.getItem("userName");

if (userName) heading.textContent = `${userName}, проверьте свои навыки!`;

function renderQuiz() {
  questions.forEach((q, i) => {
    const block = document.createElement("div");
    block.className = "question-block";
    const title = document.createElement("h3");
    title.textContent = `${i + 1}. ${q.text}`;
    block.appendChild(title);

    q.answers.forEach((ans, j) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="q${i}" value="${j}"> ${ans.text}`;
      block.appendChild(label);
      block.appendChild(document.createElement("br"));
    });

    container.appendChild(block);
  });

  actionsBlock.classList.remove("hidden");
}

function finishQuiz() {
  let score = 0;
  let types = { "турист": 0, "исследователь": 0, "отдыхающий": 0 };

  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected) {
      const ans = q.answers[parseInt(selected.value)];
      if (ans.correct) score++;
      types[ans.type]++;
    }
  });

  const maxType = Object.entries(types).sort((a, b) => b[1] - a[1])[0][0];

  let finalType = "";
  if (score >= 7) {
    finalType = "исследователь";
  } else if (score >= 4) {
    finalType = "турист";
  } else {
    finalType = "отдыхающий";
  }

  const resultHTML = `
    <div class="question-block">
      <h3>Ваш результат:</h3>
      <p>Оценка: ${score} / ${questions.length}</p>
      <p>Вы — <strong>${finalType.toUpperCase()}</strong></p>
      <a href="#" class="btn-highlight" style="text-decoration: none;color: rgb(0, 0, 0)" onclick="restartQuiz()">Пройти заново</a>
    </div>
  `;
  resultBlock.innerHTML = resultHTML;
}

function restartQuiz() {
  container.innerHTML = "";
  resultBlock.innerHTML = "";
  renderQuiz();
}

window.onload = function () {
  renderQuiz();
};
