export class Quiz {
  constructor(quiz) {
    this.question = new QuestionItem(quiz.question.text);
    this.correctAnswer = new Answer(quiz.correctAnswer, true);

    this.wrongAnswers = [];
    for (const answer of quiz.incorrectAnswers)
      this.wrongAnswers.push(new Answer(answer, false));

    this.answers = new AnswerItems(this.correctAnswer, this.wrongAnswers);
  }

  render() {
    this.question.render();
    this.answers.render();
  }
}

export class QuestionItem {
  constructor(text) {
    this.text = text;
  }

  render() {
    const questionHolder = document.querySelector("[quiz-question]");
    questionHolder.innerHTML = "";
    questionHolder.innerText = this.text;
  }
}

export class Answer {
  constructor(answer, correct) {
    this.text = answer;
    this.correct = correct;
  }
}

export class AnswerItems {
  static clicked;
  constructor(correctAnswer, wrongAnswers) {
    const allAnswers = [correctAnswer, ...wrongAnswers];
    allAnswers.forEach((element, index, allAnswers) => {
      const li = document.createElement("li");
      li.setAttribute("clicked", 0);
      li.className = "list-group-item cursor-pointer";
      li.innerText = element.text;
      allAnswers[index] = li;
    });

    this.wrongAnswers = [];
    for (let i = 0; i < allAnswers.length; i++)
      if (i == 0) this.correctAnswer = allAnswers[0];
      else this.wrongAnswers.push(allAnswers[i]);
  }

  render() {
    this.assignEvent();
    const answersHolder = document.querySelector("[quiz-answers]");
    answersHolder.innerHTML = "";

    const shuffle = (array) => {
      return array
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
    };

    answersHolder.append(
      ...shuffle([this.correctAnswer, ...this.wrongAnswers])
    );
  }

  assignEvent() {
    this.assignCorrectEvent();
    this.assignWrongEvent();
  }

  assignCorrectEvent() {
    this.correctAnswer.addEventListener("click", () => {
      if (!AnswerItems.clicked) {
        this.correctAnswer.classList.add("text-bg-success");
        displayNextButton();
        increaseScore();
        AnswerItems.clicked = true;
      }
    });
  }

  assignWrongEvent() {
    this.wrongAnswers.forEach((el) => {
      el.addEventListener("click", () => {
        if (!AnswerItems.clicked) {
          el.classList.add("text-bg-danger");
          this.correctAnswer.classList.add("text-bg-success");
          AnswerItems.clicked = true;
          displayNextButton();
        }
      });
    });
  }
}
