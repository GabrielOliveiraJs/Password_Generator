//DECLARAÇÃO DE VARIÁVEIS
const $checkUppercase = document.querySelector('.js-checkUppercase')
const $checkSpecialChars = document.querySelector('.js-checkSpecialChars')
const $checkNumbers = document.querySelector('.js-checkNumbers')
const $qtyOfChar = document.querySelector('.js-qtyOfChar')
const $password = document.querySelector('.js-password')

const $generatePasswordBtn = document.querySelector('.js-generatePassword')

const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const specialCharsArray = ['@', '#', '$', '%', '&']

let upper = false
let specialChars = false
let numbers = false
let qtyOfChars = 0

let password = []
let specialCharacters = []
let numbersForPassword = []

//FUNÇÃO CHAMADA AO CLICAR NO BOTÃO 'GERAR SENHA'
$generatePasswordBtn.addEventListener('click', () => {

    qtyOfChars = $qtyOfChar.value

    //FAZ UMA VALIDAÇÃO DO INPUT NUMBER PARA MANTER O VALOR ENTRE 6 E 12
    if (qtyOfChars < 6 || qtyOfChars > 12) {
        alert('Escolher um valor entre 6 e 12')
        $qtyOfChar.value = 6
        return
    }

    //RECUPERA OS VALORES DOS CHECKBOXES 
    upper = $checkUppercase.checked
    specialChars = $checkSpecialChars.checked
    numbers = $checkNumbers.checked

    //ESCOLHE A OPÇÃO DE ACORDO COM OS CHECKBOXES SELECIONADOS
    if (upper == true && specialChars == true && numbers == true) { //OK
        generateOnlyLetters()
        generateWithSpecialChars()
        generateWithNumbers()
        generateLettersWithCaps()

    } else if (upper == true && specialChars == true && numbers == false) {
        generateOnlyLetters()
        generateWithSpecialChars()
        generateLettersWithCaps()

    } else if (upper == true && specialChars == false && numbers == false) {
        generateOnlyLetters()
        generateLettersWithCaps()

    } else if (upper == true && specialChars == false && numbers == true) {
        generateOnlyLetters()
        generateWithNumbers()
        generateLettersWithCaps()

    } else if (upper == false && specialChars == true && numbers == true) {
        generateOnlyLetters()
        generateWithSpecialChars()
        generateWithNumbers()

    } else if (upper == false && specialChars == false && numbers == true) {
        generateOnlyLetters()
        generateWithNumbers()

    } else if (upper == false && specialChars == true && numbers == false) {
        generateOnlyLetters()
        generateWithSpecialChars()

    } else if (upper == false && specialChars == false && numbers == false) {
        generateOnlyLetters()

    } else {
        console.log(upper, specialChars, numbers)
    }

    $password.value = password
})

//FUNÇÃO PARA EMBARALHAR O ARRAY 
const shuffleArray = (arr) => {

    let newArr = []
    let rand = []
    let n = 0
    let i = 0

    while (i < arr.length) {
        n = Math.floor(Math.random() * arr.length)

        if (!rand.includes(n)) {
            rand = [...rand, n]
            i++
        }
    }

    password = ''

    for (let i = 0; i < arr.length; i++) {
        newArr[i] = arr[rand[i]]
        password = password + newArr[i]
    }
}

//FUNÇÃO PARA GERAR UM ARRAY DE LETRAS ALEATÓRIO
const generateOnlyLetters = () => {
    password = []

    for (let i = 0; i < qtyOfChars; i++) {
        let n = Math.floor(Math.random() * alphabetArray.length)

        password += alphabetArray[n]
    }
}

//FUNÇÃO PARA TRANSFORMAR A PRIMEIRA MAIÚSCULA DA SENHA
const generateLettersWithCaps = () => {

    let passwordToArray = [...password]
    let text = ''
    let controlNumber = 0
    let passwordAux = ''
    let x = false
    let i = 0

    while (x == false) {

        if (specialCharsArray.includes(passwordToArray[i]) || numbersArray.includes(passwordToArray[i])) {
            text = text + passwordToArray[i]
            controlNumber++

        } else {
            text = text + passwordToArray[i].toUpperCase()
            x = true
        }
        i++
    }

    for (let i = 0; i <= controlNumber; i++) {
        passwordAux += passwordToArray.shift(i)
    }

    password = ''
    password = text

    for (let i = 0; i < passwordToArray.length; i++) {
        password += passwordToArray[i]
    }
}

//FUNÇÃO PARA ADICIONAR CARACTERES ESPECIAS NA SENHA
const generateWithSpecialChars = () => {
    let numberOfSpecialChars = 0

    switch (qtyOfChars) {
        case '6':
            numberOfSpecialChars = 1
            break
        case '7':
            numberOfSpecialChars = 1
            break
        case '8':
            numberOfSpecialChars = 2
            break
        case '9':
            numberOfSpecialChars = 2
            break
        case '10':
            numberOfSpecialChars = 3
            break
        case '11':
            numberOfSpecialChars = 3
            break
        case '12':
            numberOfSpecialChars = 4
    }

    specialCharacters = []

    for (let i = 0; i < numberOfSpecialChars; i++) {
        let chars = Math.floor(Math.random() * specialCharsArray.length)

        specialCharacters += specialCharsArray[chars]
    }

    let arr = [...password, ...specialCharacters]

    //FUNÇÃO PARA REMOVER OS ELEMENTOS EXTRAS DO ARRAY ANTES DE EMBARALHAR
    for (let i = 0; i < numberOfSpecialChars; i++) {
        arr.shift()
    }

    //CHAMA A FUNÇÃO QUE EMBARALHA O ARRAY
    shuffleArray(arr)
}

//!Criar uma função para acrescentar números na senha
const generateWithNumbers = () => {

    let qtyOfNumbers = 0

    switch (qtyOfChars) {

        case '6':
            qtyOfNumbers = 1
            break
        case '7':
            qtyOfNumbers = 1
            break
        case '8':
            qtyOfNumbers = 1
            break
        case '9':
            qtyOfNumbers = 2
            break
        case '10':
            qtyOfNumbers = 2
            break
        case '11':
            qtyOfNumbers = 2
            break
        case '12':
            qtyOfNumbers = 3
            break
    }

    numbersForPassword = []

    for (let i = 0; i < qtyOfNumbers; i++) {
        let numb = Math.floor(Math.random() * numbersArray.length)

        numbersForPassword += numbersArray[numb]
    }

    let arr = [...password, ...numbersForPassword]

    //FUNÇÃO PARA REMOVER OS ELEMENTOS EXTRAS DO ARRAY ANTES DE EMBARALHAR
    for (let i = 0; i < qtyOfNumbers; i++) {
        arr.shift()
    }

    //CHAMA A FUNÇÃO QUE EMBARALHA O ARRAY
    shuffleArray(arr)
}
