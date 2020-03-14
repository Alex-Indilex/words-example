import shuffle from "lodash/shuffle";

export class Task {
    constructor({ type }) {
        this._info = "";
        this.type = "";
           if (this.constructor === Task) {
               throw new Error("It`s not possible to create an instance of abstract class")
           }
    }

    checkAnswer(answer) {
        throw new Error("checkAnswer should be implemented in subclass")
    }

    getDescription() {
        return this._info;
    }


    /*
         data - объект в формате

       { type: "word",
         question: "apple",
         answer: "apple"
       }

     */
    static create(data) {
        const constructor = Task._subclasses[data.type];
        if (constructor) {
            return new constructor(data);
        }
        throw new Error(`There is no constructor specified for type ${data.type}`);
    }

    static register(key, constructor) {
        if(Task._subclasses[key]) {
            throw new Error(`Constructor for type ${key} is already registered`);
        }

        Task._subclasses[key] = constructor;
    }
}

Task._subclasses = {};

export class WordTask extends Task{
    constructor({ question }) {
        super(...arguments);
        this._info = "Соберите слово по буквам";
        this.question = shuffle(question); // shuffle из lodash разбивает строку на массив
        this._answer = question;
        this._current = 0;
        this.isComleted = false;
    }

    get currentLetter() {
        return this._answer[this._current];
    }

    checkAnswer(answer) {
        if (answer === this.currentLetter) {
            return false;
          }
        this._current++;
        if(this._current >= this._answer.length) {
            this.isComleted = true;
        }
        return true;
    }

}

export class PhraseTask extends Task{
    constructor({ question }) {
        super(...arguments);
        this._info = "Соберите фразу по словам";
        this.question = shuffle(question.split(" ")); // shuffle из lodash разбивает строку на массив
        this._answer = question.split(" ");
        this._current = 0;
        this.isComleted = false;
    }

    get currentWord() {
        return this._answer[this._current];
    }

    checkAnswer(answer) {
        if (answer === this.currentWord) {
            return false;
        }
        this._current++;
        if(this._current >= this._answer.length) {
            this.isComleted = true;
        }
        return true;
    }
}


export class TranslateTask extends Task{
    constructor({ question, answer }) {
        super(...arguments);
        this._info = "Переведите слово";
        this.question = question;
        this._answer = answer.toLowerCase();
        this.isComleted = false;
    }

    checkAnswer(answer) {
        if (answer.toLowerCase() === this._answer) {
            this.isCompleted = true;
            return false;
        }
        return true;
    }
}


Task.register("word", WordTask);
Task.register("phrase", PhraseTask);
Task.register("translate", TranslateTask);



