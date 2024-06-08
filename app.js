//I need a global value of the cookies
let cookiesOwned = 0;
let cps = 1;

//DOM manipulation
//Elements in the DOM: cookie count, cps (cookies per second), image to click on.
//Select these elements from the DOM or create these elements with JS
let totalOwnedBox = document.getElementById("cookie-count-number");
let cpsBox = document.getElementById("cookie-per-second");
const shopUpgrades = document.getElementById("shop");

//A way to store the shop items that we get from the API
let shopItems;

//Fetch the items from the API (async, await)
async function getShopItems() {
  //1. fetch shop items from api
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  //2. turn data into JSON --> .json()
  const data = await response.json();
  console.log(data);
  //3. push the items in the shop items array
  return data;
}

//creating an async function to be able to access the array of objects.
async function createShopItems() {
  let fetchedItems = await getShopItems();
  namingShopItems(fetchedItems);
}
createShopItems();

function namingShopItems(shopArray) {
  shopArray.forEach((itemOfShop) => {
    const upgradeName = document.createElement("h1");
    const upgradeCost = document.createElement("p");
    const upgradeIncrease = document.createElement("p");
    const upgradeShopBtn = document.createElement("button");
    upgradeShopBtn.innerText = `${itemOfShop.cost} buy`;
    upgradeName.textContent = itemOfShop.name;
    upgradeCost.textContent = itemOfShop.cost;
    upgradeIncrease.textContent = `${itemOfShop.increase} Cookies Per Second`;
    shopUpgrades.append(upgradeName, upgradeIncrease, upgradeShopBtn);
    upgradeShopBtn.addEventListener("click", () => {
      cps = cps + itemOfShop.increase;
    });
  });
}

// function namingShopItems(itemOfShop) {
//     const name = document.createElement("h1");
//     const cost = document.createElement("p");
//     const increase = document.createElement("p");
//     name.textContent = itemOfShop[0].name;
//     cost.textContent = itemOfShop[0].cost;
//     increase.textContent = itemOfShop[0].increase;
//     console.log(name);
//     console.log(cost);
//     shopUpgrades.append(name, cost, increase);

//   }

//I need an addEventListener() to clicking our cookie
const clickButton = document.getElementById("startButton");
//select the cookie img or button
//write an event listener
clickButton.addEventListener("click", function () {
  cookiesOwned++;
  totalOwnedBox.innerText = `${cookiesOwned} Cookies`;
});
//when i click the button, the value of cookiesOwned goes up by one
//increment operator
const resetButton = document.getElementById("Reset");
resetButton.addEventListener("click", function () {
  cookiesOwned = 0;
  cps = 1;
  saveLocalStorage();
});
//We need to have all the game information in one function
//you need to check if there is any values stored in local storage. (cookiesOwned and cps (cookie per second)).

//we need a timer to increase the cps // setInterval() timer
setInterval(function () {
  cookiesOwned = cookiesOwned + cps;
  totalOwnedBox.textContent = `${cookiesOwned} Cookies`;
  saveLocalStorage();
}, 1000);
cpsBox.textContent = `${cps} Cookies Per Second`;

function saveLocalStorage() {
  localStorage.setItem("cookiesOwned", cookiesOwned);
  localStorage.setItem("cps", cps);
}

let storedCookOwned = localStorage.getItem("cookiesOwned");
let storedCps = localStorage.getItem("cps");

function reloadPage() {
  let parsedCookies = json.parse(storedCookOwned);
  let parsedCps = json.parse(storedCps);
  if (localStorage.getItem("cps")) {
    cps = parsedCps;
  }
  if (localStorage.getItem("cookiesOwned")) {
    cookiesOwned = parsedCookies;
  }
}

//increase the cookiesOwned by one every second
//I want to update the value displayed on the page (or you could have this in a seperate function that you call inside the interval, for example updateDisplay() )
//I want to update the value in local storage (or you could have this in a seperate function that you call inside the interval, for example saveLocalStorage())

//extra tools, if you want to use them to seperate different tasks into functions.

// function updateDisplay() {
//update the DOM element containing the value of cookiesOwned
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
