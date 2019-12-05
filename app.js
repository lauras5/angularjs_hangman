// name for app, app id
const app = angular.module("HangmanApp", []);
// assign controller to app, can hold multiple controllers
app.controller("GameController", [
  "$scope",
  function($scope) {
    // dependency injection
    $scope.demo = "this is a demo of dependency injection";
    $scope.previousIndex;
    $scope.selectedWord;
    $scope.date;

    // list of workds for hangman game
    let words = [
      "angular",
      "python",
      "coding",
      "scope",
      "hoist",
      "data",
      "function",
      "method",
      "class"
    ];

    let hints = [
      "This app is written in this",
      "it's a scripting language",
      "it's what you probably do if you're inspecting this",
      "data in the app",
      "in javascript, var _____ variables to the top",
      "information",
      "it's like a method",
      "it's like a function",
      "used in many languages"
    ];

    // will hold incorrect letters user enters
    $scope.incorrectLettersChosen = [];
    // will hold correct letters user enters
    $scope.correctLettersChosen = [];

    $scope.guesses = 10; // allow user to make 10 guesses
    $scope.displayWord = "";
    $scope.input = {
      letter: ""
    };

    // function to generate random word from words array
    let selectRandomWord = function() {
      let index = Math.floor(Math.random() * words.length);
      if (index == $scope.previousIndex) {
        selectRandomWord();
      } else {
        $scope.previousIndex = index;
      }
      // console.log(index)
      return words[index];
    };

    // function to set new game
    let newGame = () => {
      $scope.input.letter = "";
      $scope.incorrectLettersChosen = [];
      $scope.correctLettersChosen = [];
      $scope.guesses = 10; // allow user to make 10 guesses
      $scope.displayWord = "";
      $scope.selectedWord = selectRandomWord();
      // console.log(selectedWord)

      let tempDisplayWord = "";
      for (const letter of $scope.selectedWord) {
        tempDisplayWord += "_";
        $scope.displayWord = tempDisplayWord;
      }
      console.clear();
      console.log("No Cheating!");
      console.log("Hint: " + hints[$scope.previousIndex]);
    };

    $scope.letterInput = () => {
      let correct = false;
      let lowerInput = $scope.input.letter.toLowerCase();
      let wrongArr = $scope.incorrectLettersChosen;
      let rightArr = $scope.correctLettersChosen;

      if (wrongArr.includes(lowerInput) || rightArr.includes(lowerInput)) {
        $scope.input.letter = "";
        return;
      }

      // if word is correct
      for (let i = 0; i < $scope.selectedWord.length; i++) {
        if ($scope.selectedWord[i] == lowerInput) {
          $scope.displayWord =
            $scope.displayWord.slice(0, i) +
            lowerInput +
            $scope.displayWord.slice(i + 1);
          correct = true;
        }
      }

      if (correct) {
        $scope.correctLettersChosen.push(lowerInput);
        $scope.input.letter = "";

        if ($scope.displayWord.indexOf("_") == -1) {
          $("#winModal").modal("toggle");
          newGame();
        }
      } else {
        $scope.guesses--;
        $scope.incorrectLettersChosen.push(lowerInput);
        $scope.input.letter = "";
      }

      if ($scope.guesses == 0) {
        //modal you lost
        $("#loseModal").modal("toggle");
        newGame();
      }
    };

    let getDate = () => {
      $scope.date = new Date();
    };
    // call initial game function
    newGame();
    getDate();
  }
]);
