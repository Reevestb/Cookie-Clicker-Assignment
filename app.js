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
  return data;
}

//creating an async function to be able to access the array of objects.
async function createShopItems() {
  reloadPage();
  let fetchedItems = await getShopItems();
  namingShopItems(fetchedItems);
}
createShopItems();

function namingShopItems(shopArray) {
  shopArray.forEach((itemOfShop) => {
    const upgradeName = document.createElement("h2");
    const upgradeCost = document.createElement("p");
    const upgradeIncrease = document.createElement("p");
    const upgradeShopBtn = document.createElement("button");
    upgradeShopBtn.innerText = `${itemOfShop.cost} Buy`;
    upgradeName.textContent = itemOfShop.name;
    upgradeCost.textContent = itemOfShop.cost;
    upgradeIncrease.textContent = `${itemOfShop.increase} Cookies Per Second`;
    shopUpgrades.append(upgradeName, upgradeIncrease, upgradeShopBtn);
    upgradeShopBtn.addEventListener("click", () => {
      if (cookiesOwned >= itemOfShop.cost) {
        cookiesOwned -= itemOfShop.cost;
        cps = cps + itemOfShop.increase;
        cpsBox.innerText = `${cps} Cookies Per Second`;
      }
    });
  });
}
//I need an addEventListener() to clicking our cookie
//select the cookie img or button
//write an event listener
const clickButton = document.getElementById("startButton");
clickButton.addEventListener("click", function () {
  cookiesOwned++;
  totalOwnedBox.innerText = `${cookiesOwned} Cookies`;
  saveLocalStorage();
});
//when i click the button, the value of cookiesOwned goes up by one
//increment operator
const resetButton = document.getElementById("Reset");
resetButton.addEventListener("click", function () {
  cookiesOwned = 0;
  cps = 1;
  totalOwnedBox.textContent = 0;
  cpsBox.textContent = `${cps} Cookies Per Second`;
});

//we need a timer to increase the cps // setInterval() timer
setInterval(function () {
  cookiesOwned = cookiesOwned + cps;
  totalOwnedBox.textContent = `${cookiesOwned} Cookies`;
  saveLocalStorage();
}, 1000);
cpsBox.textContent = `${cps} Cookies Per Second`;

//you need to check if there is any values stored in local storage. (cookiesOwned and cps (cookie per second)).

function saveLocalStorage() {
  localStorage.setItem("cookiesOwned", cookiesOwned);
  localStorage.setItem("cps", cps);
}

function reloadPage() {
  let storedCookOwned = localStorage.getItem("cookiesOwned");
  let storedCps = localStorage.getItem("cps");
  let parsedCookies = JSON.parse(storedCookOwned);
  let parsedCps = JSON.parse(storedCps);

  if (localStorage.getItem("cps")) {
    cps = parsedCps;
  }
  if (localStorage.getItem("cookiesOwned")) {
    cookiesOwned = parsedCookies;
  }
}
