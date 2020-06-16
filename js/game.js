const numDivs = 36;
const maxHits = 10;
const maxScore = 10;

let hits = 0;
let firstHitTime = 0;
let number = 1;
let miss = 0;
let score = 0;

function round() { 
  $('.game-field').removeClass('miss')
  $('.game-field' ).removeClass("target");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  let miss = randomDivId();
  $(miss).addClass('miss');
  $('.target').removeClass('miss');
  // TODO: помечать target текущим номером
  $('.target').text(number);
  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 1) {
    firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  score = score - miss;
  $('.field').hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  if (score > 0) {
    $("#total-time-played").text(totalPlayedSeconds);
    $("#win-message").removeClass("d-none");
    $("#score").text(score);
    $("#maxScore").text(maxScore);
  }
  else {
    $("#total-time-played").text(totalPlayedSeconds);
    $("#win-message").removeClass("d-none");
    $("#score").text(score);
    $("#maxScore").text(maxScore + ' ты лох');

  }
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    number = number + 1;
    score = score + 1;
    $('.target').text('');
    round();
  }
  if ($(event.target).hasClass("miss")) {
    miss = miss + 1;
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
  $("#button-start").click(function() {
    round();
    $("#button-start").hide();
  });
}

$(document).ready(init);
