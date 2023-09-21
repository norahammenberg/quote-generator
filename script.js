//const for every ID target:
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const autherText = document.getElementById('auther');
const twitterBtn = document.getElementById('twitter');
const newQuoteBTN = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//fetching in process, leading function:
function loading() {
    loader.hidden = false; //the hidden attribute can be used on all html elemern and hiddes an element.
    quoteContainer.hidden = true;
}

//completed loading function
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true; 
}

//a global variable to save the api responed.
let apiquotes = [];

//new quote function that randomly generates a new quotes.
function newQuote() {
    //execute the loading function:
    loading();
    //getting a random quote by using Math.random multiple by the arrays lengt to never get a number that is longer then the array it self and wrapped in Math.floor to get a whole number 
    const quote = apiquotes[Math.floor(Math.random() * apiquotes.length)];

        //setting the quote taext
    quoteText.textContent = quote.q;

    //check if auther is null write unknown
        if (!quote.a) {
        autherText.textContent = "Unknown";
    }
    else {
        autherText.textContent = quote.a;
    }
    //check the quote lenght and add a styling class on the text if the quote is longer then 120 characthers:
    if (quote.q.length > 120) {
        quoteText.classList.add('long-quote');//classList allow us to modife the class of the element. add adding a class remove removes a class. 
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    //set the quote and hide the loader:
    complete();
}

//Fetching quotes from an API with an async function:
//async can run at anytime and it eill not interfear with the browesrer loading the page: 
async function getQuotes() {
    loading();
    //proxy URL, to deal with Cors probem:
    const proxyUrl ='https://cors-anywhere.herokuapp.com/';
    //api URL:
    const apiUrl = 'https://zenquotes.io/api/quotes/';
   
    //here we trying to fetch the data from the API:
    try {
        //fetch request
        const response = await fetch(proxyUrl + apiUrl);

        //the api response is saved in the varible apiquotes and is being converted to json data. 
        apiquotes = await response.json();
        //execute the newQuote function:
        newQuote();
    }
    //if TRY don't work, catch catches any error.
    catch (error) {
        getQuotes();
        alert(error)
        //catch error here:
    }
    //
}

//tweet a quote function, creating an URL with the quote and open a new window with the url.
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${autherText.textContent}`;//backticks for a template string, template strings allowes oss to pass in a varible.
    window.open(twitterUrl, '_blank');//window open a new window by adding_blank it opens in a new tab. we sendning twitter url that we created for the window open.
}

//adding a event listner and then calling the functions.
newQuoteBTN.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//When the page is loading the getQuotes function runs and fetches data from the API.
getQuotes();
