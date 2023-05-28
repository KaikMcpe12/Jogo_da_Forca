var img = document.querySelector('.doll')
var keys = document.querySelectorAll('.key')

var restart_button = document.querySelector(".restart")
restart_button.addEventListener("click", start)

var hint = document.querySelector('.hint')

var words;
var secret_word;
var correct_letter;
var incorrect_letter;

var box_message = document.querySelector(".box-message")
var final_message = document.querySelector('.final-message')

var letter_box = document.querySelector('.letter-box')
var letters;

function start() {
  box_message.classList.add("disabled")
  letter_box.innerHTML = ''

  words = randomList()
  secret_word = generateWord()

  correct_letter = 0
  incorrect_letter = 0

  createLetters()
  letters = document.querySelectorAll(".letter")

  switchImage()

  keys.forEach((key) => {
    key.classList.remove("pressed")
    key.addEventListener("click", computeLetter, { once: true })
  })
}

function randomList(){
  let hintList = ['Animais','Frutas','Esportes','Cidades e lugares']
  let animalList = ["cachorro", "gato", "pássaro", "peixe", "leão", "tigre", "elefante", "macaco", "zebra", "girafa", "urso", "coelho", "rato", "cobra", "aranha", "formiga", "abelha", "borboleta", "mosca", "mosquito", "barata", "lagarta", "caracol", "lesma", "minhoca", "siri", "polvo"]
  
  let fruitsList = ["maçã", "banana", "laranja", "limão", "abacaxi", "manga", "melancia", "melão", "uva", "morango", "amora", "framboesa", "cereja", "pêssego", "ameixa", "damasco", "caqui", "goiaba", "jabuticaba", "maracujá", "acerola", "kiwi", "coco", "abacate", "mamão", "pitanga", "romã"]
  
  let sportList = ["futebol", "vôlei", "basquete", "tênis", "natação", "atletismo", "ginástica", "judô","boxe","ciclismo","skate","surf","esqui","patinação","hóquei","golfe","xadrez","badminton","tênis de mesa","boliche","dardo","hipismo","canoagem","remo","vela","paraquedismo"]
  
  let placeList = ["Brasil","França","Japão","China","EUA","Canadá","México","Argentina","Chile","Peru","Espanha","Portugal","Itália","Alemanha","Rússia","Índia","Austrália","Nova Zelândia","Egito","Marrocos","Grécia","Turquia","Inglaterra","Escócia","Irlanda","Suécia","Noruega"]
  
  let generalList = [[...animalList],[...fruitsList],...[sportList],...[placeList]]
  let numRandom = Math.floor(Math.random()*generalList.length)
 
  hint.innerHTML = hintList[numRandom]
  return generalList[numRandom]
}

function generateWord(){
  let index = Math.floor(Math.random()*words.length)
  return words[index].toUpperCase()
}

function createLetters(){
  for(letter of secret_word){
    if(letter == ' '){
      letter_box.innerHTML += `<span class="letter space"></span>`
    }else{
      letter_box.innerHTML += `<span class="letter"></span>`
    }
  }
}

function markupLetter(letter){
  for(let i = 0; i < secret_word.length; i++) {
      if (letter == secret_word[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '')) {
        letters[i].innerHTML = secret_word[i];
        correct_letter ++
    }
  }
}

function switchImage(){
  img.src = `./assets/forca-${incorrect_letter}.png`
}

function computeLetter(e){
  let key = e.target
  key.classList.add('pressed')
  let letter = key.innerText
  if(secret_word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(letter)){
    markupLetter(letter)
  }else{
    incorrect_letter ++
    switchImage()
  }
  if(correct_letter == secret_word.replace(' ','').length){
    box_message.classList.remove("disabled")
    final_message.innerHTML = "Você ganhou!!!! <br> 🎉🎉🎉"
  }else if(incorrect_letter == 6){
    box_message.classList.remove("disabled")
    final_message.innerHTML = `Você perdeu :( <br> 😢😢😢 <br>A palavra era ${secret_word}`
  }
}
start()