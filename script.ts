// Source 1: https://random-word-api.herokuapp.com/
// Source 2: https://api.wordnik.com/

function createHtmlElement(element: string,  className='', id=''){
    var elem = document.createElement(element);
    elem.setAttribute('class', className);
    elem.setAttribute('id', id);
    return elem;
}

let wordDisplay = document.getElementById('wordBox');
let randomWord: string[];
async function randomWordGen() {
    
    let randomWordResp = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    let randomWordData = await randomWordResp.json();
    console.log(randomWordData[0].toUpperCase());
    randomWord = randomWordData[0].toUpperCase().split('');
    randomWord.forEach( elem => {
        var alphabet = createHtmlElement('div', `word ${elem}`)
        alphabet.innerHTML = `${elem}`;
        alphabet.style.fontSize = "0px";
        (<HTMLDivElement>wordDisplay).append(alphabet);
    });
}
randomWordGen();


let keyboardBox = document.getElementById('keysBox');
let keyboardArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let countCorrect = 0;
let countWrong = 0;
let imageMan = new Image();

keyboardArray.forEach( elem => {
    var key = createHtmlElement('button', 'btn btn-secondary', `K${elem}`);
    key.innerHTML = `${elem}`;
    key.addEventListener('click', function(){
        pressButton(elem); 
    });
    (<HTMLDivElement>keyboardBox).append(key);
});

document.body.addEventListener('keydown', function(event){
   let regExp = /^[A-Za-z]$/;
   if(regExp.test(event.key)){
        pressButton(event.key.toUpperCase());
    }
});

function pressButton(key: string){
    var currentKey = <HTMLInputElement> document.getElementById(`K${key}`);
    currentKey.disabled = true; 
        if(randomWord.indexOf(key)>=0){
          var guessedWord: any = document.getElementsByClassName(`${key}`);

          for (let element of guessedWord){
             element.style.fontSize = "2.5rem";
             countCorrect++;
          }
          if(randomWord.length === countCorrect) displayModal('You Guessed Right!');
        }
        else{
            countWrong++;
            if(countWrong < 8){
            imageMan.src = `assets/stage${countWrong}.png`;
            (<HTMLDivElement>document.getElementById('pictureBox')).append(imageMan);
            }
            if(countWrong >= 7) displayModal(`You Lose! The Word was ${randomWord.join('')}`);   
        }  
}

function displayModal(string: string){
    (<HTMLButtonElement>document.getElementById("modalButton")).click();
    (<HTMLDivElement>document.getElementById("staticBackdropTitle")).innerHTML = string;
}

function refreshPage(){
    location.reload();
}