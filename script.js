'use strict';

// DOM-elements
const screens = document.querySelectorAll('.screen');
const start_btn = document.getElementById('start-btn');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

let seconds = 0;
let score = 0;
let selected_insect = {};

// remove start-screen
start_btn.addEventListener('click', () => screens[0].classList.add('up'));

// random location for one insect
const getRandomLocation = function () {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;

  return { x, y };
};

// increase score and add message
const increaseScore = function () {
  score++;

  if (score > 19) {
    message.classList.add('visible');
  }

  scoreEl.innerHTML = `Score: ${score}`;
};

// create one insect (element)
const createInsect = function () {
  const insect = document.createElement('div');
  insect.classList.add('insect');

  const { x, y } = getRandomLocation();

  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;

  // as well to add some random rotation for new insect (transform: rotate())
  insect.innerHTML = `<img src="${selected_insect.src}" alt="${
    selected_insect.alt
  }" style="transform: rotate(${Math.random() * 360}deg)">`;

  insect.addEventListener('click', catchInsect);

  game_container.appendChild(insect);
};

// to add some new insects after click on old insect
const addInsects = function () {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
};

// disappear insect
const catchInsect = function () {
  increaseScore();

  this.classList.add('caught');
  setTimeout(() => this.remove(), 2000);

  addInsects();
};

// timer
const increaseTime = function () {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;

  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  timeEl.innerHTML = `Time: ${m}:${s}`;

  seconds++;
};

// run timer
const startGame = function () {
  setInterval(increaseTime, 1000);
};

// choose specific insect for game
choose_insect_btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');

    // put attributes for game-insect
    selected_insect = { src, alt };

    // remove second-screen
    screens[1].classList.add('up');

    setTimeout(createInsect, 1000);

    startGame();
  });
});
