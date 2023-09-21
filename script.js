//https://jacintodesign.github.io/quotes-api/data/quotes.json

//we creating a const for every ID target:
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const autherText = document.getElementById('auther');
const twitterBtn = document.getElementById('twitter');
const newQuoteBTN = document.getElementById('new-quote');


//a global variable is declared with let as its value will change:
let apiquotes = [];

//new quote function that randomly generates a new quotes.
function newQuote() {
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

   autherText.textContent = quote.author;
   console.log(quote);
   quoteText.textContent = quote.text;
}

//Fetching quotes from an API:
//async can run at anytime and it eill not interfear with the browesrer loading the page: 
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
   
    //here we trying to fetch the API call
    try {
        //fetch request, we are using await so the respons will not be popilated before fetch have happen. 
        //the const response will only be used after it been filled with a response, if we donät do that itt will cause an error.
        const response = await fetch(apiUrl);

        //the api response is saved in the varible apiquotes and is being converted to json data. 
        apiquotes = await response.json();
        //calling the function newQuote that will generate a random quote:
        newQuote();
    }
    //if this do not work we can catch any arrors here:
    catch (error) {
        //alert(error)
        //catch error here:
    }
    //
}


// on load of the page prun the function.
getQuotes();