const menu = document.querySelector('nav.header_bottom');
const menuLinks = document.querySelector('.header__top_links');
const burger = document.querySelector('a.burger-menu');
const sliderItem = Array.from(document.getElementsByClassName('reviews__slider-item'));
const arrRight = document.querySelector('.reviews__slider-arrow.right');
const arrLeft = document.querySelector('.reviews__slider-arrow.left');
const slider = document.querySelector('.reviews__slider');
let current = 0;


let scrollY = 0;

function openModal() {
  scrollY = window.scrollY;

  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';

  if (window.innerWidth > 1180) {
    document.body.style.paddingRight = '15px';
  }
}

function closeModal() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.paddingRight = '';

  window.scrollTo(0, scrollY);
}

burger.addEventListener('click', () => {
  burger.classList.toggle('burger-menu__active');
  menu.classList.toggle('active');
  menuLinks.classList.toggle('active');

  if (menu.className.includes('active')) {
    openModal();
  } else {
    closeModal();
  }
})

function Left() {
  let itemWidth = sliderItem[0].offsetWidth;
  const max = sliderItem.length - 1;
  const gap = parseInt(getComputedStyle(slider).columnGap);
  const step = itemWidth + gap;

  if (current > 0) {
    current--;
    slider.style.transform = `translateX(-${current * step}px)`;
  }
  
}

function Right() {
  let itemWidth = sliderItem[0].offsetWidth;
  const max = (sliderItem.length /2) - 1;
  const gap = parseInt(getComputedStyle(slider).columnGap);
  const step = itemWidth + gap;


  if (current < max) {
    current++;
    slider.style.transform = `translateX(-${current * step}px)`;
  }
}

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;

  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchStartX - touchEndX;

  if (Math.abs(swipeDistance) < 50) return;

  if (swipeDistance > 0) {
    Right();
  } else {
    Left();
  }
}

arrLeft.addEventListener( "click" , Left);
arrRight.addEventListener( "click" , Right);


const cards = document.querySelectorAll('.partners__logo');
const button = document.querySelector('.partners__btn');
const works = document.querySelectorAll('.works__img');
const worksButton = document.querySelector('.works__btn');

let startIndex =
window.innerWidth > 1473 ? 4 :
window.innerWidth > 1097 ? 3 :
      4;

let startIndexWorks =
window.innerWidth > 1302 ? 9 :
window.innerWidth > 873 ? 4 :
      4;

window.addEventListener('resize', () => {
  startIndex =
  window.innerWidth > 1473 ? 4 :
  window.innerWidth > 1097 ? 3 :
        4;
  
  startIndexWorks =
  window.innerWidth > 1302 ? 9 :
  window.innerWidth > 873 ? 4 :
        4;
  
  hideCards();
  hideWorks();
})

function hideCards() {
  cards.forEach((card, index) => {
    if (index >= startIndex) {
      card.classList.add('hidden');
      card.addEventListener('transitionend', function handler() {
        card.style.display = 'none';
        card.removeEventListener('transitionend', handler);
      });
    } else {
      card.style.display = 'block';
      requestAnimationFrame(() => {
        card.classList.remove('hidden');
      });
    }
  });
}

function hideWorks() {
  works.forEach((work, index) => {
    if (index >= startIndexWorks) {
      work.classList.add('hidden');
      work.addEventListener('transitionend', function handler() {
        work.style.display = 'none';
        work.removeEventListener('transitionend', handler);
      });
    } else {
      work.style.display = 'block';
      requestAnimationFrame(() => {
        work.classList.remove('hidden');
      });
    }
  });
}

hideCards();
hideWorks();

button.addEventListener('click', () => {
  const hiddenCards = document.querySelectorAll('.partners__logo.hidden');

  if (hiddenCards.length > 0) {
    for (let i = 0; i < startIndex && i < hiddenCards.length; i++) {
      hiddenCards[i].style.display = 'block';

      requestAnimationFrame(() => {
        hiddenCards[i].classList.remove('hidden');

        if (document.querySelectorAll('.partners__logo.hidden').length === 0) {
          button.textContent = 'Скрыть';
        }
      });
    }
  } else {
    hideCards();
    button.textContent = 'Показать еще';
  }

  if (document.querySelectorAll('.partners__logo.hidden').length === 0) {
    button.textContent = 'Скрыть';
  }
});

worksButton.addEventListener('click', () => {
  const hiddenCards = document.querySelectorAll('.works__img.hidden');

  if (hiddenCards.length > 0) {
    for (let i = 0; i < startIndexWorks && i < hiddenCards.length; i++) {
      hiddenCards[i].style.display = 'block';
      requestAnimationFrame(() => {
        hiddenCards[i].classList.remove('hidden');

        if (document.querySelectorAll('.works__img.hidden').length === 0) {
          worksButton.textContent = 'Скрыть';
        }
      });
    }
  } else {
    hideWorks();
    worksButton.textContent = 'Показать еще';
  }

  if (document.querySelectorAll('.works__img.hidden').length === 0) {
    worksButton.textContent = 'Скрыть';
  }
});