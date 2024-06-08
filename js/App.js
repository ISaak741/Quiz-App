import { AnswerItems, Quiz } from "./Quiz.js";

class App {
  static init() {
    App.nextButton = document.querySelector("[quiz-button]");
    App.hideButton();
    App.getQuizes();
    App.index = 0;
    App.score = 0;
  }

  static increaseScore() {
    if (App.Quizes.length == App.score) {
      const h3 = document.createElement("h3");
      h3.innerText = `your score is ${App.score} / ${App.max}`;
      h3.className = "text-center my-auto mx-auto";
      const game = document.querySelector("[quiz-game]");
      game.innerHTML = "";
      game.append(h3);
    } else App.score++;
  }

  static displayNextButton() {
    App.nextButton.classList.remove("d-none");
  }

  static run() {
    App.nextButton.addEventListener("click", () => {
      App.hideButton();
      AnswerItems.clicked = false;
      if (App.index < App.Quizes.length) {
        const quiz = new Quiz(App.Quizes[App.index++]);
        quiz.render();
      } else {
        const h3 = document.createElement("h3");
        h3.innerText = `your score is ${App.score} / ${App.max}`;
        h3.className = "text-center my-auto mx-auto";
        const mainQuizContainer = document.querySelector("[quiz-game]");
        mainQuizContainer.innerHTML = "";
        mainQuizContainer.append(h3);
      }
    });
  }

  static hideButton() {
    App.nextButton.classList.add("d-none");
  }
  static getQuizes() {
    const request = new XMLHttpRequest();

    request.open("GET", "https://the-trivia-api.com/v2/questions");
    request.send();

    request.onload = function () {
      App.Quizes = JSON.parse(request.response);
      App.max = App.Quizes.length;
      App.run();
      App.nextButton.click();
    };

    request.onerror = function () {
      App.abort();
    };
  }
  static abort() {
    alert("failed loading the app please refresh the page");
  }
}

window.increaseScore = () => {
  App.increaseScore();
};

window.displayNextButton = () => {
  App.displayNextButton();
};

window.onload = App.init;
