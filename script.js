//Web - Guess my number

//Først finder jeg html-elementerne
const checkBTN = document.querySelector(".left .btn");
const againBTN = document.querySelector("header .btn")
const inputElement = document.querySelector(".guess");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".highscore");
const numberElement = document.querySelector(".number");

//jeg sætter scoren til at starte på 0
let score = 0;
let scoreOnPage = scoreElement.textContent = 0;

//highscore har startværdi 20, for at sikre at der altid opnås highscore ved første spil
//på siden for brugeren vises der at den er 0
let highscore = 20;
let highScoreOnPage = highscoreElement.textContent = 0;

//og inputfeltet bliver tomt
let input = "";
let inputOnPage = inputElement.textContent = "";


//jeg laver funktionen der skal finde et tilfældigt tal
//funktion taget herfra: https://coreui.io/blog/how-to-generate-a-random-number-in-javascript/
const getRandomNumber = (min, max) => {
    min = Math.ceil(1)
    max = Math.floor(20)
    return Math.floor(Math.random() * (max - min + 1)) + min
}
let randomNumber = getRandomNumber(1, 20);
console.log("the first number to guess is " + randomNumber);


//gætte-historik
//fik hjælp af chatgpt til at sætte ul ind i main
//opretter ul-element
const guessList = document.createElement("ul");
    //const guessListPtag = document.createElement("p");
    //guessListPtag.textContent = "You already tried:";
//finder main
const mainElement = document.querySelector("main .right");
//tilføjer guessList-ul'en til main
mainElement.appendChild(guessList);
    //mainElement.appendChild(guessListPtag);
//jeg giver ul'en en klasse, så jeg nemt kan lave css på den
guessList.classList.add("guess-list");
//jeg laver et array som jeg vil lægge alle gæt ind i
let guesses = [""];

//denne funktion bliver kaldt nederst i checkAnswer og den sætter gæt ind på ul-listen: guessList
function updateGuessList() {
    //inspiration fra chatGPT til at tømme listen for gamle elementer
    guessList.innerHTML = "";
    guesses.forEach(guess => {
        const listItem = document.createElement("li");
        listItem.textContent = `${guess}`
        guessList.appendChild(listItem);
    })
}


//again-knap skal: kalde getRandomNumber, resette: score, inputfelt og guessList
againBTN.addEventListener("click", function () {
    randomNumber= getRandomNumber(1, 20);
    score = 0;
    scoreElement.textContent = score;
    inputElement.value = "";
    numberElement.textContent = "?";
    console.log("again btn clicked")
    console.log("new nr is " + randomNumber)
    //tømmer også listen over tidligere gæt
    guesses = [];
    guessList.textContent = "";
});


//farveskift på siden
const bodyElement = document.querySelector("body")
//sætter standartfarven til sort
const originalColor = document.body.style.backgoundColor = 'black';

//funktion der ændrer baggrundsfarve midlertidigt
//inspiration fra https://stackoverflow.com/questions/38293968/using-settimeout-to-temporarily-change-div-background-color
function changeBackgroundColorTemporarily(color, duration) {
    document.body.style.backgroundColor = color;
    //jeg bruger en timeOut funktion så farven ændres til sort igen
    setTimeout(() => {
        document.body.style.backgroundColor = originalColor;
    }, duration);
}



function checkAnswer() {
    //laver indputtet til et tal
    const userGuess = Number(inputElement.value);

    //hvis brugeren gætter på et tal der ikke er fra 1 til 20
    if (userGuess > 20 || userGuess < 1) {
        alert("Error: put in a number from 1 to 20")
        //input-elementet i html har typen number så man kan kun sætte tal ind
        //derfor behøves jeg ikke til at bede brugeren om kun at sætte tal ind
    }

//når bruger gætter rigtigt:
    if (userGuess === randomNumber) {
        numberElement.textContent = randomNumber;
        alert("yay! You guessed the number. Click again to play one more time");
        changeBackgroundColorTemporarily('lightpink', 2000);
    }

//når man har gættet forkert får man +1 fejl
    if (userGuess !== randomNumber) {
        score++;
        scoreElement.textContent = score;
        changeBackgroundColorTemporarily('red', 2000);
    }

//opdaterer highscore
    //hvis scoren(antal fejl) er mindre end highscore og du gætter rigtigt,
    else if (score < highscore && userGuess === randomNumber) {
        highscore = score;
        highscoreElement.textContent = highscore;
    }

    //jeg tilføjer gættene til arrayet: guesses
    guesses.push(userGuess);
    updateGuessList();

    //tømmer inputfeltet efter hvert gæt
    inputElement.value = "";
    inputOnPage = "";
}

//og funktionen checkAnswer skal køre når man trykker på knappen
checkBTN.addEventListener("click", checkAnswer);
