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
