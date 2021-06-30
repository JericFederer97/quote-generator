const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {
    showLoadingSpinner();
    // const proxyURL = 'healthruwords.p.rapidapi.com'
    const apiURL = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiURL);
        const allData = await response.json();
        const quoteNumber = Math.floor(Math.random() * allData.length);
        const data = allData[quoteNumber];
        // If author is blank add 'Unknown'
        if (data.author === '') {
            authorText.innerHTML = 'Unknown';
        } else {
            authorText.innerHTML = data.text;
        }
        authorText.innerHTML = data.author;
        // Reduce font size for long quotes
        if (data.text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.text;
        // Stop loader, show quote
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
        // console.log('No quote detected', error);
    }
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();