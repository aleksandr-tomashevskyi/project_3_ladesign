'use strict'
var mixer = mixitup('.portfolio__gallery');


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
      aboutTextForChange = aboutContainerForChange.firstChild.nextSibling;
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

// //    Portfolio menu sliding

// const portfolioMenu = document.querySelector('.portfolio__menu');
// let portfolioTouchStartX;
// let portfolioTouchEndX;

// function portfolioTouchStart(event){
//    event.preventDefault();
//    portfolioTouchStartX = Math.floor(event.changedTouches[0].clientX);
//    console.log(portfolioTouchStartX)
// }

// function portfolioTouchEnd(event){

// }

// portfolioMenu.addEventListener('touchstart', portfolioTouchStart)
// // portfolioMenu.addEventListener('touchmove', function(event){
// //    console.log(event.changedTouches[0])
// // })
// portfolioMenu.addEventListener('touchend', function(event){
//    portfolioTouchEndX = Math.floor(event.changedTouches[0].clientX);
//    console.log(portfolioTouchEndX)
// })


//    Porfolio logic start

//portfolio menu buttons start
const galleryItemsCollection = document.querySelectorAll(".portfolio__gallery-item--additional");

// const galleryImagesCollection = document.querySelectorAll(".portfolio__gallery-image--additional");

let portfolioMenuSelected = document.querySelector(".portfolio__menu-button--selected");

const portfolioMenu = document.querySelector(".portfolio__menu-body");

let portfolioMenuSelectedFilter;

const portfolioShowMoreButton = document.querySelector(".portfolio__button");

let galleryAdditionalItemsSorted;

let galleryShowed = false;

//checking whether clicked button has "all" attribute to use it in filter function
function portfolioMenuFilter(){
   if(portfolioMenuSelected.dataset.filter == "all"){
      portfolioMenuSelectedFilter = ""
   } else{
      portfolioMenuSelectedFilter = portfolioMenuSelected.dataset.filter;
   }
}

portfolioMenuFilter(); //calling this one time at the launch

//Hiding gallery additional items on mune change
function galleryAdditionalItemsHide(){
   if(galleryShowed){
      galleryAdditionalItemsSorted.forEach(function(element){ 
         element.classList.toggle('portfolio__gallery-item--additional');
         element.lastChild.previousSibling.classList.toggle("portfolio__gallery-image--additional");
      });
      portfolioShowMoreButton.removeAttribute("disabled");
      galleryShowed = false;
   }
}

function portfolioShowMoreButtonFunc(eventResult){
   galleryAdditionalItemsSorted = document.querySelectorAll(`.portfolio__gallery-item--additional${portfolioMenuSelectedFilter}`);
   galleryAdditionalItemsSorted.forEach(function(element){
      element.classList.toggle('portfolio__gallery-item--additional');
      setTimeout(()=>element.lastChild.previousSibling.classList.toggle("portfolio__gallery-image--additional"), 10); //timeout is needed in order for animation to work
   });
   galleryShowed = true; //remembering that we already showed additional items
   portfolioShowMoreButton.setAttribute("disabled", "disabled")
};

function portfolioMenuCheck(event){
   //checking if the clicked area was actually a button
   if(event.target.closest(".portfolio__menu-button")){
      portfolioMenuChange(event);
   }
};

function portfolioMenuChange(event){
   //checking if the clicked button was new or it is already selected and nothing needs to be done
   if(event.target.closest(".portfolio__menu-button") !== portfolioMenuSelected){
      event.target.classList.toggle("portfolio__menu-button--selected");
      portfolioMenuSelected.classList.toggle("portfolio__menu-button--selected");
      //remembering new selection
      portfolioMenuSelected = event.target;
      portfolioMenuFilter();
      galleryAdditionalItemsHide();
   }
};

portfolioMenu.addEventListener("click", portfolioMenuCheck);
portfolioShowMoreButton.addEventListener("click", portfolioShowMoreButtonFunc);

//portfolio menu buttons end

//    Header color change while scroll start

let lastKnownScrollPosition = window.scrollY;
const headerScroller = document.querySelectorAll(".header-scroller");
let headerScrollerPrototype;
headerScroll();

function headerScroll(){
   lastKnownScrollPosition = window.scrollY;
   if(lastKnownScrollPosition > 50){
      headerScroller.forEach((element)=> {
         headerScrollerPrototype = element.classList[0];
         element.classList.add(`${headerScrollerPrototype}--whitebg`)
      })
   } else {
      headerScroller.forEach((element)=> {
         headerScrollerPrototype = element.classList[0];
         element.classList.remove(`${headerScrollerPrototype}--whitebg`)
      })
   }
};

document.addEventListener("scroll", headerScroll)

//    Header color change while scroll end

//    Popup form start
let bodyScrollDisableFlag = false;
let acceptionWindowFlag = false;

const formLink = document.querySelector(".portfolio__form-link");

const contactForm = document.querySelector(".popup-form");

const popupFormButton = document.querySelector(".popup-form__button")

function showForm(){
   document.querySelector(".popup-form").classList.toggle("popup-form--active");
   setTimeout(()=>document.querySelector(".popup-form__body").classList.toggle("popup-form__body--active"), 10);
   //disabling scroll
   if(!bodyScrollDisableFlag){ //checking if scroll was already disabled
      document.body.style.overflow = 'hidden'; //scroll disable
      document.body.style.left = '-7px'; //removing jumping of the content due to scroll width being removed
      bodyScrollDisableFlag = true; //setting memory flag for returning scroll back in the future
   }
}
function hideForm(event){
   if(!event.target.closest(".popup-form__body")){
      document.querySelector(".popup-form").classList.toggle("popup-form--active");
      document.querySelector(".popup-form__body").classList.toggle("popup-form__body--active");
      //returning scroll
      if(bodyScrollDisableFlag){
         document.body.style.overflow = 'auto';
         document.body.style.left = '0';
         bodyScrollDisableFlag = false;
      }
      if(acceptionWindowFlag){
         document.querySelector(".popup-form__wrapper").classList.toggle("popup-form__wrapper--accepted");
         acceptionWindowFlag = false;
      }
   }
}

function showAccepted(event){
   event.preventDefault();
   document.querySelector(".popup-form__wrapper").classList.toggle("popup-form__wrapper--accepted");
   acceptionWindowFlag = true;
}

formLink.addEventListener("click", showForm);
contactForm.addEventListener("click", hideForm)
popupFormButton.addEventListener("click", showAccepted)