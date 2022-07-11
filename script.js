import cards from './assets/cards.js';
import mainCards from './assets/main.card.js';

const frontClassName = 'item card card-text mb-3 front';
const backClassName = 'item card card-text mb-3 back';

function navigationEvents() {
  const headerButton = document.getElementById("header-button");

  headerButton.addEventListener('click', () => {
    const nav = document.getElementById("nav");
  
    if (nav.classList.contains('visible')) {
      return nav.classList.remove('visible');
    }
  
    nav.classList.add('visible');
  });
  
  const nav = document.getElementById("nav");
  
  nav.addEventListener('mouseleave', () => {
    nav.classList.remove('visible');
  });
}

function createCards(cardsArray) {
  const section = document.getElementById("main-content");
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'blocks-conainer';

  for (let i = 0; i < cardsArray.length; i += 1) {
    cardsContainer.append(createCard(cardsArray[i]));
  }

  section.append(cardsContainer);

  cardsContainer.addEventListener('click', (event) => {
    const elementId = event.path.slice(-8, -7)[0].id;
    
    while (section.firstChild) {
      section.removeChild(section.firstChild);
    }

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'blocks-conainer';

    cardsContainer.addEventListener('click', (event) => {
      event.path.slice(-10, -9)[0].childNodes[2].play();
    })

    for (let i = 0; i < cards.length; i += 1) {
      cardsContainer.append(createSectionCard(cards[elementId][i]));
    }
    section.append(cardsContainer);
  });

  return section;
}

function mainContainer(el) {
  const flipContainer = document.createElement('div');
  flipContainer.className = 'flip-container';
  flipContainer.setAttribute('id', `${el.id}`);

  flipContainer.addEventListener('mouseleave', (event) => {
    const parentElement = event.target.childNodes[0];

    if (parentElement.classList.contains('transform')) {
      parentElement.classList.remove('transform');
    }

  });

  return flipContainer;
}

function flipperContainer() {
  const flipper = document.createElement('div');
  flipper.className = 'flipper';

  return flipper;
}

function innerContainers(el, nameOfTheClass) {
  const front = document.createElement('div');
  front.className = nameOfTheClass;

  const imageFront = document.createElement('img');
  imageFront.className = 'item-img';
  imageFront.setAttribute('src', `assets/${el.image}`);

  front.append(imageFront);

  return front;
}

function itemDescription() {
  const itemDescriptionFront = document.createElement('div');
  itemDescriptionFront.className = 'item-description';

  return itemDescriptionFront;
}

function iconButton() {
  const iconButtonFront = document.createElement('button');
  iconButtonFront.className = 'item-button';

  iconButtonFront.addEventListener('click', (event) => {
    const parentElement = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    parentElement.classList.add('transform');
  });

  return iconButtonFront;
} 

function soundContainer(el) {
  const soundElement = document.createElement('audio');
  const sourceElement = document.createElement('source');
  sourceElement.setAttribute('src', `assets/${el.audioSrc}`);
  sourceElement.setAttribute('type', 'audio/mpeg');
  soundElement.append(sourceElement);

  return soundElement;
}

// function playSound(audioSrc) {
//   const soundElement = document.createElement('audio');
//   const sourceElement = document.createElement('source');
//   sourceElement.setAttribute('src', audioSrc);
//   sourceElement.setAttribute('type', 'audio/mpeg');
//   soundElement.append(sourceElement);
//   soundElement.play();
// }

function decriptionEnglish(el) {
  const title = document.createElement('p');
  title.innerHTML = `${el.word}`;

  return title;
}

function decriptionRussian(el) {
  const title = document.createElement('p');
  title.innerHTML = `${el.translation}`;

  return title;
}

function titleMainPage(el) {
  const titleContainer = document.createElement('div');
  
  const titleFront = document.createElement('p');
  titleFront.innerHTML = `${el.block}`;

  const countOfCards = document.createElement('p');
  countOfCards.innerHTML = '8 cards';

  titleContainer.append(titleFront);
  titleContainer.append(countOfCards);

  return titleContainer;
}

function svgbutton() {
  const iconContainerFront = document.createElement('span');
  iconContainerFront.className = 'icon grey';

  const iconFront= document.createElement('img');
  iconFront.className = 'icon-rotate';
  iconFront.setAttribute('src', '/assets/rotate.svg');

  iconContainerFront.append(iconFront);

  return iconContainerFront;
}

function createCard(el) {
  const flipContainer = mainContainer(el);
  const flipper = flipperContainer();

  flipContainer.append(flipper);

  const front = innerContainers(el, frontClassName);
  const titleFront = titleMainPage(el);
  const itemDescriptionContainerFront = itemDescription();

  itemDescriptionContainerFront.append(titleFront);

  front.append(itemDescriptionContainerFront);

  flipper.append(front);

  return flipContainer;
}

function createSectionCard(arr) {
  const flipContainer = mainContainer(arr);
  const flipper = flipperContainer();

  flipContainer.append(flipper);

  const front = innerContainers(arr, frontClassName);
  const titleFront = decriptionEnglish(arr);
  const itemDescriptionContainerFront = itemDescription();

  itemDescriptionContainerFront.append(titleFront);

  const iconButtonContainerFront = iconButton();
  const iconContainerFront = svgbutton(arr);

  iconButtonContainerFront.append(iconContainerFront);
  itemDescriptionContainerFront.append(iconButtonContainerFront);
  front.append(itemDescriptionContainerFront);
  
  const soundElementFront = soundContainer(arr);

  front.append(soundElementFront);

  const back = innerContainers(arr, backClassName);
  const titleBack = decriptionRussian(arr);
  const itemDescriptionContainerBack = itemDescription();

  itemDescriptionContainerBack.append(titleBack);

  const iconButtonContainerBack = iconButton();
  const iconContainerBack = svgbutton(arr);

  iconButtonContainerBack.append(iconContainerBack);
  itemDescriptionContainerBack.append(iconButtonContainerBack);
  back.append(itemDescriptionContainerBack);
  
  const soundElementBack = soundContainer(arr);

  back.append(soundElementBack);

  flipper.append(front);
  flipper.append(back);

  return flipContainer;
}

function changeBlock() {
  const getNavigation = document.getElementById("nav");
  const childrenElement = getNavigation.children[0].children;
  
  for (let i = 0; i < childrenElement.length; i++) {
    childrenElement[i].children[0].addEventListener('click', (event) => {
      const section = document.getElementById('main-content');
      getNavigation.classList.remove('visible');

      while (section.firstChild) {
        section.removeChild(section.firstChild);
      }
  
      const atr = event.target.getAttribute('data-category');
  
      if (atr === 'main') {
        return createCards(mainCards);
      }

      const cardsContainer = document.createElement('div');
      cardsContainer.className = 'blocks-conainer';

      cardsContainer.addEventListener('click', (event) => {
        event.path.slice(-10, -9)[0].childNodes[2].play();
      })
  
      for (let i = 0; i < cards[atr].length; i += 1) {
        cardsContainer.append(createSectionCard(cards[atr][i]));
      }

      section.append(cardsContainer);
    })
  }
}

// function changeMode() {
//   const modeContainer = document.getElementById('mode-button');

//   modeContainer.addEventListener('click', (event) => {

//     if (event.target.innerHTML === 'Play') {
//       modeContainer.innerHTML = 'Train';
//     } else {
//       modeContainer.innerHTML = 'Play';
//     }

//     const elementList = document.querySelectorAll('.item-description');

//     for (let i = 0; i < elementList.length; i++) {
//       const elem = document.querySelector('.item-description');
//       elem.parentNode.removeChild(elem);
//     }

//     }
//   )


// }

window.onload = function loadPage() {
  navigationEvents();
  createCards(mainCards);
  changeBlock();
  // changeMode();
};