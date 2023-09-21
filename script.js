//https://jacintodesign.github.io/quotes-api/data/quotes.json

//we creating a const for every ID target:
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const autherText = document.getElementById('auther');
const twitterBtn = document.getElementById('twitter');
const newQuoteBTN = document.getElementById('new-quote');
const loader = document.getElementById('loader');
//show lat the api call is loading: fetching in process:
function loading() {
    loader.hidden = false; //the hidden attribute can be used on all html elemern and hiddes an element.
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true; 
}

//a global variable is declared with let as its value will change:
let apiquotes = [];

//new quote function that randomly generates a new quotes.
function newQuote() {
    loading();
   //we gonna make a dynamic random  function, we gonna use math.random
   //math random returns a random number between 0-1
   //math floor allowes os to return the whole int, no deciimals
   // pick a random quote from teh api array:
   //we do the same as apiQuote[1] but instead of the one we replace it with what will randomize a number
   //by wrapping math.random() with math floor we automatically get a intergi wit out any decimals. 
   //the we * with the lenght of the api array. Meaning we will never get an number that is larger the the length of the array.
   const quote = apiquotes[Math.floor(Math.random() * apiquotes.length)];

   //we will populat the auther and quote element from the random picked quote and save it in the const fro txt and quther:
   //textCOntent let us save the content in a string and we = this const to quote: the random picked quote from the arry. auther because we only like the auther or text. JSON
    //textContentcan both take the text of an element as well as setting the text. In this case we setting the text from the random generated text from the API.

   quoteText.textContent = quote.text;
   //check if auther is null write unknown
    if (!quote.author) {
    autherText.textContent = "Unknown";
   }
   else {
    autherText.textContent = quote.author;
   }
   //check the quote lenght to determen styling:
   if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');//classList allow us to modife the class of the element. add adding a class remove removes a class. 
   }
   else {
    quoteText.classList.remove('long-quote');
   }
   //set the quote and hide the loader:
   complete();
}

//Fetching quotes from an API:
//async can run at anytime and it eill not interfear with the browesrer loading the page: 
async function getQuotes() {
    loading();
    //proxy URL toloop arounf the cors problem
    const proxyUrl ='https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://zenquotes.io/api/quotes/';
   
    //here we trying to fetch the API call
    try {
        //fetch request, we are using await so the respons will not be popilated before fetch have happen. 
        //the const response will only be used after it been filled with a response, if we donät do that itt will cause an error.
        //cors policy.
        const response = await fetch(proxyUrl + apiUrl);
        //console.log('The respond:' + response);
        //the api response is saved in the varible apiquotes and is being converted to json data. 
        apiquotes = await response.json();
        //calling the function newQuote that will generate a random quote:
        console.log(response);
        newQuote();
    }
    //if this do not work we can catch any arrors here:
    catch (error) {
        //getQuotes();
        //alert(error)
        //catch error here:
    }
    //
}

//tweet a quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${autherText.textContent}`;//backticks for a template string, template strings allowes oss to pass in a varible.
    window.open(twitterUrl, '_blank');//window open a new window by adding_blank it opens in a new tab. we sendning twitter url that we created for the window open.
}

//event listerners, alwasy added after the fucntions been called. 
//adding a event listner click and then calling the function
newQuoteBTN.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// on load of the page prun the function.
getQuotes();
