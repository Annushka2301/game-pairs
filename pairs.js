(() => {

  const cardList = document.querySelector('.card__list');
  const body = document.querySelector('body')
  const form = document.createElement('form');
  const startButton = document.createElement('button');
  const input = document.createElement('input');
  const p = document.createElement('p');
  let interval;
  const timeButton = document.createElement('button');
  let gameCards = [];

  function fieldSize() {
    form.classList.add('form');
    input.classList.add('form-control');
    input.placeholder = 'Например, 4';
    startButton.classList.add('btn', 'btn-warning');
    startButton.textContent = 'Начать игру';
    p.textContent = 'Кол-во карточек по вертикали/горизонтали, введите число 2/4/6/8/10'

    body.append(form);
    form.append(p);
    form.append(input);
    form.append(startButton);
  }

  function createChart() {
    let defaultCards = []

    for (let i = 1; i <= 50; i++) {
      defaultCards.push(i)
      defaultCards.push(i)
    }

    timeButton.classList.add('btn', 'btn-primary', 'btn-time');
    timeButton.innerHTML = `60`;

    startButton.addEventListener('click', (e) => {
      e.preventDefault();

      let cardNumber = Number(input.value);
      gameCards = (cardNumber == 2 || cardNumber == 6 || cardNumber == 8 || cardNumber == 10) ? defaultCards.slice(0, cardNumber**2) : defaultCards.slice(0, 16);

      const shuffledCards = gameCards.sort(function(){
        return Math.random() - 0.5;
      });

      const cardsArr = {
        shuffledCards
      };

      if (cardNumber == 2 || cardNumber == 6 || cardNumber == 8 || cardNumber == 10) {
        cardsArr.shuffledCards.forEach((card) => {
          cardList.innerHTML += `<button class="card__item card__item${cardNumber} btn btn-outline-primary">${card}</button>`;
        });
      } else {
        cardsArr.shuffledCards.forEach((card) => {
          cardList.innerHTML += `<button class="card__item card__item4 btn btn-outline-primary">${card}</button>`;
        });
      }
      cardList.append(timeButton);
      form.classList.add('hide')
      createGame();
      cardList.classList.remove('hide')
      interval = setInterval(startTimer, 1000);
    })

  }

  function startTimer() {
    let openedCards = document.querySelectorAll('.btn-color');
    const cards = document.querySelectorAll('.card__item');

    timeButton.innerHTML -= 1;
    if (cards.length == openedCards.length || timeButton.innerHTML === '0') {
      clearInterval(interval);
      reloadGame();
    }
  }

  function reloadGame() {
    const cards = document.querySelectorAll('.card__item');

    let reloadButton = document.createElement('button');
    reloadButton.innerHTML = 'Сыграть ещё раз';
    reloadButton.classList.add('btn', 'btn-success');
    cardList.append(reloadButton);

    boardLock = true;
    clearInterval(interval);
    cards.forEach((el) => {
      el.classList.add('opacity')
    });
    timeButton.classList.add('opacity')
    reloadButton.addEventListener('click', function () {
      window.location.reload();
    } );
  }

  function createGame () {


    let hasOpenedCard = false;
    let boardLock = false;
    let firstCard;
    let secondCard;

    const openedCard = e => {

      if (boardLock) return;

      e.preventDefault;

      const target = e.target;

      if (target === firstCard) return;

      target.classList.add('btn-color');

      if (!hasOpenedCard) {
        hasOpenedCard = true;
        firstCard = target;
      } else {
        hasOpenedCard = false;
        secondCard = target;
        checkForMatch();
      }
    }

    const checkForMatch = () => {

      if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard.classList.remove('btn-color-check');
        secondCard.classList.remove('btn-color-check');
      } else {
        boardLock = true;

        setTimeout(() => {
          firstCard.classList.remove('btn-color', 'btn-color-check');
          secondCard.classList.remove('btn-color', 'btn-color-check');

          boardLock = false;
          hasOpenedCard = false;
          firstCard = null;
          secondCard = null;
        }, 500)
      }
    }
    const cards = document.querySelectorAll('.card__item');

    cards.forEach(card => {
      card.addEventListener('click', openedCard, true);
    });
    let openedCards = document.querySelectorAll('.btn-color');
    console.log(cards.length)
    console.log(openedCards.length)

    if (cards.length === openedCards.length && cards.length !== 0) {
      reloadGame();
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    fieldSize();
    createChart();
    // createGame();
  });
})();

