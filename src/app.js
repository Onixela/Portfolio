const textDisplay = document.getElementById('text')
const phrases = ['developer!', 'photographer!', 'designer!', 'illustrator!']
let i = 0
let j = 0
let currentPhrase =[]
let isDeleting = false
let isEnd = false

function loop (){
    isEnd = false
    textDisplay.innerHTML = currentPhrase.join('')
    if (i < phrases.length) { //Если меньше 3, продолжаем цикл
        
     if (!isDeleting && j <= phrases[i].length){ //Второй цикл, если j меньше длинна первой фразы, тогда продолжаем цикл.//Написали первую букву первой фразы
         currentPhrase.push(phrases[i][j])
        j++ // Переход на следующую букву
        textDisplay.innerHTML = currentPhrase.join('')
    } 

    if (isDeleting && j <= phrases[i].length) {

        currentPhrase.pop(phrases[i][j])
        j--
        textDisplay.innerHTML = currentPhrase.join('')
    }

    if(j == phrases[i].length) { //если количество символов равняется длинне фразы, то 
        isEnd = true //только когда мы в конце слова - утверждение верно
        isDeleting = true
    }

    if (isDeleting && j === 0) { //переход на следующее слово
        currentPhrase = []
        isDeleting = false
        i++ 
        if (i == phrases.length) {
            i = 0;
        }
    }
}
const spedUp = Math.random() * (80 -50) + 50
const normalSpeed = Math.random() * (300 -200) + 200
const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed
setTimeout(loop, time)
}

loop()

