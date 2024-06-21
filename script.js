'use strict';

/////////////////////////////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


/////////////////////////////////////////////////////////////
// Mobile Navigation
const navLinks = document.querySelectorAll('.nav__link');
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');
const logo = document.querySelector('.nav__logo');

navLinks.forEach(link => {
  link.addEventListener('click', function() {

    const headerEl = document.querySelector('.header');
    headerEl.classList.remove('nav-open');
    logo.style.opacity = 1;
  });
});

btnNavEl.addEventListener('click', function() {

  headerEl.classList.toggle('nav-open');
});




/////////////////////////////////////////////////////////////
// Creating and Inserting Elements

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add("cookie-message");
message.textContent = "We use cookies for improved functionality and analytics";
message.innerHTML = `We use cookies for improved functionality and analytics 
<button class="btn btn--close-cookie">Got it!</button>`;

header.append(message);   //Adds has a last child of the HTML


// Delete Elements
document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function(){
        message.remove()
        // message.parentElement.removeChild(message)   //Old Way of Deleting Elements
    });

/////////////////////////////////////////////////////////////
// Styles

message.style.backgroundColor = "#37383d";
message.style.width = "120%";
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

/////////////////////////////////////////////////////////////
// Footer Year
const year = document.querySelector(".year")
year.textContent = new Date().getFullYear();

/////////////////////////////////////////////////////////////
// Smooth Scrolling - Button
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();

  
  section1.scrollIntoView({behavior: "smooth"});    // Scrolling

});


/////////////////////////////////////////////////////////////
// Page Navigation
// Event Delegation
// 1. Add Event Listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    if (id !== "#") {
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    } else {
      // Code to open modal window
      // For example:
      // openModalFunction();
    }
  }
});
/////////////////////////////////////////////////////////////
// Operations
// Tabbed Component

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');

  // Guard Statement
  if(!clicked) return;

  // Remove Active Tab
  tabs.forEach((t) => t.classList.remove('operations__tab--active'));
  tabsContent.forEach((c) => c.classList.remove('operations__content--active'));

  // Active Tab
  clicked.classList.add('operations__tab--active');


  // Activate COntent Area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active')
});

/////////////////////////////////////////////////////////////
// Menu Fade Animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/////////////////////////////////////////////////////////////
// Sticky Navbar 
// - Using Intersection Observer API

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  const [entry] = entries;

  if(!entry.isIntersecting){
    nav.classList.add('sticky');
  }
  else{
    nav.classList.remove('sticky');
  }

}

const headerObserver = new IntersectionObserver(
  stickyNav, { 
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

/////////////////////////////////////////////////////////////
// Reveal Sections
// - Using Intersection Observer API

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)

}

const sectionObserver = new IntersectionObserver(revealSection, 
  {
  root: null,
  threshold: 0.15,
  rootMargin: "+200px",

});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add("section--hidden");




});

/////////////////////////////////////////////////////////////
// Lazy Loading images
// - Using Intersection Observer API

const imageTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');

  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0,
});

imageTargets.forEach(img => imgObserver.observe(img));

/////////////////////////////////////////////////////////////
// Slider

const slider = function(){
  const names = ['Omnifood', 'Roll a Dice', 'Guess My Number', 'Flip a Coin' ,'Chart Genarator', 'Nisal Banking']
  const links = [ 
    'https://omnifoodeathealthy.netlify.app/',
    'https://mohammadarmaan.github.io/Roll-A-Dice-Game/', 
    'https://mohammadarmaan.github.io/Guess-My-Number/', 
    'https://mohammadarmaan.github.io/Flip-A-Coin/',
    'https://mohammadarmaan.github.io/Chart-Genarator/',
    'https://mohammadarmaan.github.io/Nisal-Banking/'

  ]
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  const slider = document.querySelector('.slider');


  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * i}%)`;
    // 0%  100%  200%  300%

    s.innerHTML = `<a href="${links[i]}" class="carousel-links" target="_blank" rel="${names[i]} Project">
      <img src="img/img-${i + 1}.png" class="image-1" alt="${names[i]} Project"/>
      <div class="overlay-text">${names[i]}</div>`
  });


  // Functions
  const createDots = function(){
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', 
    `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  }

  const activateDot = function(slide){
    document
    .querySelectorAll('.dots__dot')
    .forEach(function(dot){
      dot.classList.remove('dots__dot--active');
    });
    document.querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active')
  }

  const goToSlide = function(slide){
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      //CurrSlide:  -100%  0%  100%  200%
    });
  }

  // Next Slide
  const nextSlide = function(){
    if(currentSlide === maxSlide - 1){
      currentSlide = 0
    }
    else{
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  // Previous SLide
  const prevSlide = function(){
    if(currentSlide === 0){
      currentSlide = maxSlide - 1;
    }
    else{
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);

  }

  const init = function(){
    goToSlide(0);
    createDots();
    activateDot(0);
  }

  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide)

  // Arrow Button Functionality
  document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft') prevSlide();
    if(e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')){
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);

    }
  });
  }

  slider();



