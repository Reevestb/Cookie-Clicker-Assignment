//I need a global value of the cookies
let cookieCounter = 0;

//DOM manipulation
//Elements in the DOM: cookie count, cps (cookies per second), image to click on.
//Select these elements from the DOM or create these elements with JS

//A way to store the shop items that we get from the API
let shopItems = []; //fill this with the data we get from the API

//Fetch the items from the API (async, await)
function getShopItems() {
  //1. fetch shop items from api
  //2. turn data into JSON --> .json()
  //3. push the items in the shop items array
}

//I need an addEventListener() to clicking our cookie
//select the cookie img or button
//write an event listener
addEventListener("click", function () {
  //when i click the button, the value of cookieCounter goes up by one
  //increment operator
});

//We need to have all the game information in one function
//you need to check if there is any values stored in local storage. (cookieCounter and cps (cookie per second)).
//Then load the game. (call the function)
//fetch the shop items.
//render the shop items --> displays the shop items in the page

//we need a timer to increase the cps // setInterval() timer
setInterval(function () {
  //increase the cookieCounter by one every second
  //I want to update the value displayed on the page (or you could have this in a seperate function that you call inside the interval, for example updateDisplay() )
  //I want to update the value in local storage (or you could have this in a seperate function that you call inside the interval, for example saveLocalStorage())
}, 1000);

//extra tools, if you want to use them to seperate different tasks into functions.

// function updateDisplay() {
//update the DOM element containing the value of cookieCounter
//update the content value of the cookies from local storage  (current total)
//}

// function saveLocalStorage() {
// a method to turn your data into strings
//a method to set the items using key and value in local storage
//}

// function rederShop() {
//create DOM elements to display your shop items
//you can use for loop or an array method
//shopItems.forEach(() => {});
//}
