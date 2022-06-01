'use strict'

//    About list logic start

const aboutList = document.querySelector('.about__list')

let clickedAboutItem;
let aboutContainerForChange;
let aboutTextForChange;
let aboutTitleContainerForChange;

function checkClickAbout(event){
   if(event.target.closest('.about__list-item-title-container')){
      aboutTitleContainerForChange = event.target.closest('.about__list-item-title-container');
      aboutContainerForChange = event.target.closest('.about__list-item-title-container').nextSibling.nextSibling;
      console.log(aboutContainerForChange);
      aboutTextForChange = aboutContainerForChange.firstChild.nextSibling;
      console.log(aboutTextForChange);
      aboutOpenNestedList();
   }
}

function aboutOpenNestedList(){
   aboutContainerForChange.classList.toggle('about__list-item-text-container--active');
   aboutTitleContainerForChange.classList.toggle('about__list-item-title-container--active');
   setTimeout(()=> aboutTextForChange.classList.toggle('about__list-item-text--active'), 10);
}

aboutList.addEventListener("click", checkClickAbout);

//    About list logic end

//    Portfolio menu sliding

const portfolioMenu = document.querySelector('.portfolio__menu');
let portfolioTouchStartX;
let portfolioTouchEndX;

function portfolioTouchStart(event){
   event.preventDefault();
   portfolioTouchStartX = Math.floor(event.changedTouches[0].clientX);
   console.log(portfolioTouchStartX)
}

function portfolioTouchEnd(event){
   
}

portfolioMenu.addEventListener('touchstart', portfolioTouchStart)
// portfolioMenu.addEventListener('touchmove', function(event){
//    console.log(event.changedTouches[0])
// })
portfolioMenu.addEventListener('touchend', function(event){
   portfolioTouchEndX = Math.floor(event.changedTouches[0].clientX);
   console.log(portfolioTouchEndX)
})