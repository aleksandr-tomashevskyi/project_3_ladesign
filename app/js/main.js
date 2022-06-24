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
if(aboutList){
aboutList.addEventListener("click", checkClickAbout);
}
//    About list logic end

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
let scrollerMemoryFlag = false; //for use in burger menu function

function headerScroll(){
   lastKnownScrollPosition = window.scrollY;
   if(lastKnownScrollPosition > 50){
      headerScroller.forEach((element)=> {
         headerScrollerPrototype = element.classList[0];
         element.classList.add(`${headerScrollerPrototype}--whitebg`);
         scrollerMemoryFlag = true;
      })
   } else {
      headerScroller.forEach((element)=> {
         headerScrollerPrototype = element.classList[0];
         element.classList.remove(`${headerScrollerPrototype}--whitebg`);
         scrollerMemoryFlag = false;
      })
   }
};
function headerScrollWhiteLoad(){
   headerScroller.forEach((element)=> {
      headerScrollerPrototype = element.classList[0];
      element.classList.add(`${headerScrollerPrototype}--whitebg`);
      scrollerMemoryFlag = true;
   })
}

// checking the page we are loaded in
if(document.title != "Ladesign portfolio"){
headerScroll(); //launching this function one time on page load
document.addEventListener("scroll", headerScroll)
} else{
   headerScrollWhiteLoad();
}

//    Header color change while scroll end

//    Popup form start

let bodyScrollDisableFlag = false;
let acceptionWindowFlag = false;

const formLink = document.querySelector(".portfolio__form-link");

const contactForm = document.querySelector(".popup-form");

const popupFormButton = document.querySelector(".popup-form__button");

function hideShowScroll(){
   if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
      // true for mobile device
   if(!bodyScrollDisableFlag){ //checking if scroll was already disabled
      document.body.style.overflow = 'hidden'; //scroll disable
      document.body.style.left = '-7px'; //removing jumping of the content due to scroll width being removed
      bodyScrollDisableFlag = true; //setting memory flag for returning scroll back in the future
   } else{
      document.body.style.overflow = 'auto';
         document.body.style.left = '0';
         bodyScrollDisableFlag = false;
   }
} else{
   if(!bodyScrollDisableFlag){ //checking if scroll was already disabled
      document.body.style.overflow = 'hidden'; //scroll disable
      bodyScrollDisableFlag = true; //setting memory flag for returning scroll back in the future
   } else{
      document.body.style.overflow = 'auto';
         bodyScrollDisableFlag = false;
   }
}
}

function showForm(){
   document.querySelector(".popup-form").classList.toggle("popup-form--active");
   setTimeout(()=>document.querySelector(".popup-form__body").classList.toggle("popup-form__body--active"), 10);
   //disabling scroll
   hideShowScroll();
}
function hideForm(event){
   if(!event.target.closest(".popup-form__body")){
      document.querySelector(".popup-form").classList.toggle("popup-form--active");
      document.querySelector(".popup-form__body").classList.toggle("popup-form__body--active");
      //returning scroll
      hideShowScroll();
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
contactForm.addEventListener("click", hideForm);
popupFormButton.addEventListener("click", showAccepted);

//    Burger menu show\hide

const menuIconBlock = document.querySelector(".header__menu-icon");
let burgerMenuMemoryFlag = false;

function whiteMenuElements(){
   if(scrollerMemoryFlag){ //making header elements white if not already
      if(burgerMenuMemoryFlag){
         headerScroller.forEach((element)=> {
            headerScrollerPrototype = element.classList[0];
            element.classList.remove(`${headerScrollerPrototype}--whitebg`);
         })
      } else{
         headerScroller.forEach((element)=> {
            headerScrollerPrototype = element.classList[0];
            element.classList.add(`${headerScrollerPrototype}--whitebg`);
         })
      }
   }
}

function showHideBurgerMenu(event){
   document.querySelector(".navigation__body").classList.toggle("navigation__body--active");
   if(!burgerMenuMemoryFlag){
      burgerMenuMemoryFlag = true;
   } else{
      burgerMenuMemoryFlag = false;
   }
   whiteMenuElements();
   hideShowScroll();
}

menuIconBlock.addEventListener("click", showHideBurgerMenu)