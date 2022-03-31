//TEXT
const textDisplay = document.getElementById('text')
const cursor = document.getElementById('cursor')
const phrases = ['developer!', 'photographer!', 'designer!', 'illustrator!']
let i = 0
let j = 0
let currentPhrase = []
let isDeleting = false
let isEnd = false
let blinking = null

function loop() {
  isEnd = false
  textDisplay.innerHTML = currentPhrase.join('')
  if (i < phrases.length) {
    //Если меньше 3, продолжаем цикл

    if (!isDeleting && j <= phrases[i].length) {
      //Второй цикл, если j меньше длинна первой фразы, тогда продолжаем цикл.//Написали первую букву первой фразы
      currentPhrase.push(phrases[i][j])
      j++ // Переход на следующую букву
      textDisplay.innerHTML = currentPhrase.join('')
    }

    if (isDeleting && j <= phrases[i].length) {
      currentPhrase.pop(phrases[i][j])
      j--
      textDisplay.innerHTML = currentPhrase.join('')
    }

    if (j == phrases[i].length) {
      //если количество символов равняется длинне фразы, то
      isEnd = true //только когда мы в конце слова - утверждение верно
      isDeleting = true
      blinking = setInterval(() => {
        if (cursor.innerHTML) {
          cursor.innerHTML = ''
        } else {
          cursor.innerHTML = '|'
        }
      }, 300)
    }

    if (isDeleting && j === 0) {
      //переход на следующее слово
      clearInterval(blinking)
      currentPhrase = []
      isDeleting = false
      i++
      if (i == phrases.length) {
        i = 0
      }
    }
  }
  const spedUp = Math.random() * (80 - 50) + 50
  const normalSpeed = Math.random() * (300 - 200) + 200
  const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed
  setTimeout(loop, time)
}

loop()

//FILTER
// */const filterBox = document.querySelectorAll('.box')

// document.querySelector('nav').addEventListener('click', (event) => {
//   if (event.target.tagName !== 'LI') return false
//   let filterClass = event.target.dataset['f']

//   filterBox.forEach((elem) => {
//     elem.classList.remove('hide')
//     if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
//       elem.classList.add('hide')
//     }
//   })
// })

//Filter2
const list = document.querySelector('.list')
items = document.querySelectorAll('.box')
listItems = document.querySelectorAll('.list_item') //Класс активности

function filter() {
  list.addEventListener('click', (event) => {
    const targetId = event.target.dataset['f']
    const target = event.target

    if (target.classList.contains('list_item')) {
      listItems.forEach((listItem) => listItem.classList.remove('activeline'))
      target.classList.add('activeline')
    }

    switch (targetId) {
      case 'all':
        getItems('box')
        break
      case 'design':
        getItems(targetId)
        break
      case 'photo':
        getItems(targetId)
        break
      case 'coding':
        getItems(targetId)
        break
    }
  })
}
filter()

function getItems(className) {
  items.forEach((item) => {
    if (item.classList.contains(className)) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })
}

//Email

function sendEmail() {
  Email.send({
    SecureToken: 'b58a8631-fcc9-4f80-adda-87b31a0d1f42',
    To: 'lazarev.alexino@gmail.com',
    From: document.getElementById('email').value,
    Subject: 'New Contact Form Enquiry',
    Body:
      'Name: ' +
      document.getElementById('name').value +
      '<br> Email: ' +
      document.getElementById('email').value +
      '<br> Message: ' +
      document.getElementById('message').value,
  }).then((message) => alert('Message Sent Succesfully'))
}
