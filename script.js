//https://jacintodesign.github.io/quotes-api/data/quotes.json

//a global variable is declared with let as its value will change:
let apiQoutes = [];

//Fetching quotes from an API:
//async can run at anytime and it eill not interfear with the browesrer loading the page: 
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
   
    //here we trying to fetch the API call
    try {
        //fetch request, we are using await so the respons will not be popilated before fetch have happen. 
        //the const response will only be used after it been filled with a response, if we donät do that itt will cause an error.
        const response = await fetch(apiUrl);

        //the api response is saved in the varible apiQoutes and is being converted to json data. 
        apiQoutes = await response.json();
        console.log(apiQoutes);
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