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

// Popup

const popupLinks = document.querySelectorAll('.popup-link')
const body = document.querySelector('body') //блокируем боди
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true //не было двойных нажатий

const timeout = 800 //цифра из свойства transition (для блокировки скрола)

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index]
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '')
      const curentPopup = document.getElementById(popupName)
      popupOpen(curentPopup)
      e.preventDefault()
    })
  }
}
//закрытие попапа
const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index]
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'))
      e.preventDefault()
    })
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open')
    if (popupActive) {
      popupClose(popupActive, false)
    } else {
      bodyLock()
    }
    curentPopup.classList.add('open')
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open')
    if (doUnlock) {
      bodyUnLock()
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px' //узнаем длинну скрола, чтобы избежать смещения контента
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index]
      el.style.paddingRight = lockPaddingValue
    }
  }
  body.style.paddingRight = lockPaddingValue
  body.classList.add('lock')

  unlock = false
  setTimeout(function () {
    unlock = true
  }, timeout)
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index]
        el.style.paddingRight = '0px'
      }
    }
    body.style.paddingRight = '0px'
    body.classList.remove('lock')
  }, timeout) //скрол появляется только тогда когда кончается анимация

  unlock = false
  setTimeout(function () {
    unlock = true
  }, timeout)
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open')
    popupClose(popupActive)
  }
})

//галерея
