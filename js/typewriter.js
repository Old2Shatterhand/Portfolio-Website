
// Typewriter Script with ES6 Class, inspired by Travery Media -> https://www.youtube.com/watch?v=POX3dT-pB4E

class Typewriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = wait;
        this.isDeleting = false;
        this.type();
    }

    // Initialise the type() method
    type() {

        // Current word index
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if the word is deleting -> isDeleting by default is set to false
        // In the condition we check if it's true
        if (this.isDeleting) {
            // Remove character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert into the HTML Element
        this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`;

        // Initialise the speed of typing
        let typespeed = 300;

        // if isDeleting is true we want half the typespeed
        if (this.isDeleting) {
            typespeed = typespeed / 2;
        }

        // check if the words are complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // if the word is complete but not yet deleting -> make a pause
            typespeed = this.wait;
            // Set isDeleting to true
            this.isDeleting = true;
        // if isDeleting is true and txt is empty, so every character is deleted   
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to the next word
            this.wordIndex = this.wordIndex + 1;
            // Pause before typing
            typespeed = 500;
        }

        setTimeout(() => this.type(), typespeed);
    }    
} 

// Initialise a function if the DOM loads, so basically when the website is called
document.addEventListener('DOMContentLoaded', start);

// Initialise the Typewriter Class Attributes within the start function
function start() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Initialise Typewriter class
    new Typewriter(txtElement, words, wait);
} 
