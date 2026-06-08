const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show startLoader
function startLoader() {
    loader.hidden = false; // don't hide the div
    quoteContainer.hidden = true; // if loader is going, hide hte quoteContainer
}

// Hide startLoader
function completeLoader() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    startLoader();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author ?? "Unknown";
    // Check quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote'); // add CSS class
    } else {
        quoteText.classList.remove('long-quote'); // remove CSS class
    }
    // Set quote, Hide loader
    quoteText.textContent = quote.text;
    completeLoader();
}

async function getQutoes() {
    startLoader();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl); // response datatype is array
        apiQuotes = await response.json();
        // console.log(apiQuotes);
        newQuote();
    } catch (error) {
        alert(error);
    }
}

function tweetQuote() {
    const twitterUrl = 'https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}';
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// On Load
getQutoes();
// startLoader();