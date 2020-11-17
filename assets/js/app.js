// initialize some constant variables to hold the alphabets
const hira = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん", "だ", "で", "ど", "が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ", "ば", "び", "ぶ", "べ", "ぼ", "ぱ", "ぴ", "ぷ", "ぺ", "ぽ"];
const kata = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ", "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ヲ", "ン", "ダ", "デ", "ド", "ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "バ", "ビ", "ブ", "ベ", "ボ", "パ", "ピ", "プ", "ペ", "ポ"];
const roma = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wo", "n", "da", "de", "do", "ga", "gi", "gu", "ge", "go", "za", "ji", "zu", "ze", "zo", "ba", "bi", "bu", "be", "bo", "pa", "pi", "pu", "pe", "po"];


// declare some important variables for the game
var rounds = 1;
var enemyHealth = 80;
var questions = 100;
var enableHira = true;
var enableKata = true;
var currentQuestion = [];

// function to update the settings when a checkbox is altered
function updateSettings() {
  enableHira = document.getElementById("hiraCheck").checked;
  enableKata = document.getElementById("kataCheck").checked;
}

// set up important elements on loading
function onLoad() {
  document.getElementById("hiraCheck").checked = enableHira;
  document.getElementById("kataCheck").checked = enableKata;
}

// create a function to start the game
function startGame() {
  document.getElementById("menu").style.opacity = 0; // make the div invisible
  document.getElementById("menu").style.pointerEvents = "none"; // avoid interaction

  // show the UI elements for the game
  document.getElementById("game").style.opacity = 1;
  document.getElementById("game").style.pointerEvents = "all";

  // change the background to the game background
  document.getElementById("mainBody").style.backgroundImage = "url('assets/img/gameBg.jpg')";

  // generate a question and update the UI
  generateNewQuestion();
  updateUI();
}

// create an interface update function
function updateUI() {
  document.getElementById("roundNumber").innerHTML = rounds;
  document.getElementById("progress").style.width = ((enemyHealth / 80) * 100) + "%";
  document.getElementById("health").innerHTML = ((enemyHealth / 80) * 100) + "%";
  document.getElementById("questionCounter").innerHTML = questions;

  document.getElementById("questionLabel").innerHTML = currentQuestion[0];
}

// functions to generate a new question and update the UI accordingly
function generateNewQuestion() {

  currentQuestion = fetchCharSet();

  updateUI();
}
function fetchCharSet() {

  x = Math.floor(Math.random() * hira.length);

  if (enableHira && enableKata) {

    if (Math.floor(Math.random() * 2) == 1) {
      return [hira[x], roma[x]];
    } else {
      return [kata[x], roma[x]];
    }
  } else if (enableHira) {
    return [hira[x], roma[x]];
  } else if (enableKata) {
    return [kata[x], roma[x]];
  } else { return ["Enable one", x]}
}

// create a function to check the answers
function checkAnswer() {
  var answer = document.getElementById("answerInput").value;

  if (answer == currentQuestion[1]) {
    enemyHealth -= 1;
    var audio = new Audio("assets/snd/correct.mp3");
  } else {
    var audio = new Audio("assets/snd/wrong.mp3");
  }

  audio.play();

  questions -= 1;

  if (questions <= 0 && health > 0) {
    alert("Round Success!");
    rounds += 1;
    enemyHealth -= 1;
    var audio = new Audio("assets/snd/death.wav");
    audio.play();
  } else if (questions <= 0) {
    alert("Game over");
    rounds = 0;
  }

  generateNewQuestion();
  updateUI();
}

// add an event listener for the enter key to run checkAnswer()
window.addEventListener("keyup", checkLeyPress, false);
function checkLeyPress(key) {
  if (key.keyCode == "13") {
    checkAnswer();
    document.getElementById("answerInput").value = "";
  }
}
