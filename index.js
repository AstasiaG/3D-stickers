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

let partnersExpanded = false;
let worksExpanded = false;

function getPartnersCount() {
  return window.innerWidth > 1473 ? 4 :
         window.innerWidth > 1097 ? 3 :
         4;
}

function getWorksCount() {
  return window.innerWidth > 1302 ? 9 :
         window.innerWidth > 873 ? 4 :
         4;
}

function hideElement(el) {
  el.classList.add('hidden');

  const handler = () => {
    if (el.classList.contains('hidden')) {
      el.style.display = 'none';
    }
  };

  el.addEventListener('transitionend', handler, { once: true });
}

function showElement(el) {
  el.style.display = 'block';

  requestAnimationFrame(() => {
    el.classList.remove('hidden');
  });
}

function resetBlock(elements, visibleCount) {
  elements.forEach((el, index) => {
    if (index < visibleCount) {
      showElement(el);
    } else {
      hideElement(el);
    }
  });
}

function expandBlock(elements, count) {
  const hidden = [...elements].filter(el =>
    el.classList.contains('hidden')
  );

  for (let i = 0; i < count && i < hidden.length; i++) {
    showElement(hidden[i]);
  }

  return hidden.length <= count;
}

resetBlock(cards, getPartnersCount());
resetBlock(works, getWorksCount());

window.addEventListener('resize', () => {
  if (!partnersExpanded) {
    resetBlock(cards, getPartnersCount());
  }

  if (!worksExpanded) {
    resetBlock(works, getWorksCount());
  }
});

button.addEventListener('click', () => {

  if (!partnersExpanded) {

    const completed = expandBlock(
      cards,
      getPartnersCount()
    );

    if (completed) {
      partnersExpanded = true;
      button.textContent = 'Скрыть';
    }

  } else {

    partnersExpanded = false;

    resetBlock(
      cards,
      getPartnersCount()
    );

    button.textContent = 'Показать еще';
  }
});

worksButton.addEventListener('click', () => {

  if (!worksExpanded) {

    const completed = expandBlock(
      works,
      getWorksCount()
    );

    if (completed) {
      worksExpanded = true;
      worksButton.textContent = 'Скрыть';
    }

  } else {

    worksExpanded = false;

    resetBlock(
      works,
      getWorksCount()
    );

    worksButton.textContent = 'Показать еще';
  }
});