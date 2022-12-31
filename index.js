/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // create a new div element, which will become the game card
        let gameDiv = document.createElement('div');
        gameDiv.id = 'gameContent';
        // add the class game-card to the list
        gameDiv.className = 'game-card';
        // set the inner HTML using a template literal to display some info about each game
        const gameInfo = `<div class="games"> <h1> Welcome to '${games[i].name}' </h1> 
                          <p> ${games[i].description}</p> 
                          <img class="game-img" src="${games[i].img}">
                          <p> Pledged : ${games[i].pledged}</p> <p> Goal : ${games[i].goal}</p> </div>`;
        
        gameDiv.innerHTML = gameInfo;
        // append the game to the games-container
        gamesContainer.append(gameDiv);
        //gamesContainer.classList.add("game-card");

    }
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

    // grab the contributions card element
    const contributionsCard = document.getElementById("num-contributions");

    // use reduce() to count the number of total contributions by summing the backers
    var totContributions = GAMES_JSON.reduce((totBackers, curGame) => { return totBackers+curGame.backers } ,0 );

    // set the inner HTML using a template literal and toLocaleString to get a number with commas
    const contributions = `<div> <p> ${totContributions.toLocaleString('en-US')}</p> </div>`;
    contributionsCard.innerHTML = contributions;

    // grab the amount raised card, then use reduce() to find the total amount raised
    const raisedCard = document.getElementById("total-raised");
    var totRaised = GAMES_JSON.reduce((totPledged, curGame) => { return totPledged+curGame.pledged } ,0 );

    // set inner HTML using template literal
    const raisedAmount = `<div> <p> ${totRaised.toLocaleString(('en-US'),{ style: 'currency', currency: 'USD'})}</p> </div>`;
    raisedCard.innerHTML = raisedAmount;

    // grab number of games card and set its inner HTML
    const gamesCard = document.getElementById("num-games");
    var totGames = GAMES_JSON.reduce((prevGames, curGame, curGameIndex) => { return curGameIndex+1} ,0 );
    const gamesTotal = `<div> <p> ${totGames}</p> </div>`;
    gamesCard.innerHTML = gamesTotal;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    var filterUnFunded = GAMES_JSON.filter((unFunded) => { return unFunded.pledged < unFunded.goal});
    console.log(filterUnFunded);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(filterUnFunded);
}
// select each button in the "Our Games" section
// add event listeners with the correct functions to each button
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    var filterFunded = GAMES_JSON.filter(funded => funded.pledged >= funded.goal);
    console.log(filterFunded);

    // use the function we previously created to add unfunded games to the DOM
   addGamesToPage(filterFunded);
}
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly);

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// use filter or reduce to count the number of funded and unfunded games
var reduceUnfundedT = GAMES_JSON.reduce((prevGames, curGame) => { 
                                        return prevGames+ ( (curGame.pledged < curGame.goal) ? 1 : 0 ) } ,0 );
console.log(reduceUnfundedT);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totRaised.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games.
                    Currently, ${reduceUnfundedT} ${reduceUnfundedT.length > 1 ? "games remain" : "game remains"} unfunded.
                    We need your help to fund these amazing games!`;

console.log(displayStr);

// create a new DOM element containing the template string and append it to the description container
let descDiv = document.createElement('p');
descDiv.innerHTML = displayStr;

// grab the description container
const descriptionContainer = document.getElementById("description-container");
descriptionContainer.append(descDiv);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [ firstGame, secondGame, ...others] = sortedGames;
console.log(firstGame.name);
console.log(secondGame.name);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameContainer = document.getElementById("first-game");
let firstGameDiv = document.createElement('h3');
firstGameDiv.innerHTML = firstGame.name;
firstGameContainer.append(firstGameDiv);

const secondGameContainer = document.getElementById("second-game");
let secondGameDiv = document.createElement('h3');
secondGameDiv.innerHTML = secondGame.name;
secondGameContainer.append(secondGameDiv);
