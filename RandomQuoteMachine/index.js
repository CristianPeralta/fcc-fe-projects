const projectName = "random-quote-machine";

localStorage.setItem('example_project', 'Randowm Quote Machine');

let quotes = "";
let currentQuote = '';
let currentAuthor = '';

function getRandomColor () {
    return "#" + ((1<<24) * Math.random() | 0).toString(16);
}

function getRandomNumberUntil (num) {
    return Math.floor(Math.random() * num);
}

function getRandomQuote() {
    return quotes[getRandomNumberUntil(quotes.length)];
}

function openURL(url){
    window.open(url, 'Share');
}

function getQuotes() {
    const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    
    return fetch(url).then(res =>  res.json())
    .then(response => {
        quotes = response.quotes;
        return true;
    })
    .catch(error => {
        console.log('ERROR: ', error);
    });
}