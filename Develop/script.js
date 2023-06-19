// Define character sets
var passwordChoices = {
  UpperCase: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ],
  LowerCase: [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ],
  numbers: [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
  ],
  special: [
    ' ', 
    '!', 
    '#', 
    '$', 
    '%', 
    '&',
    "'", 
    '(', 
    ')', 
    '*', 
    '+', 
    ',',
    '-', 
    '.', 
    '/', 
    ':', 
    ';', 
    '<',
    '=', 
    '>', 
    '?', 
    '@', 
    '[', 
    ']',
    '^', 
    '_', 
    '`', 
    '{', 
    '|', 
    '}',
    '~'
  ]
  
}

// Function to randomly select numbers includng the maximum number
function randomNumberPicker(max) {
  // Generate a random number between 0 and max (inclusive)
  var randomNumber = Math.floor(Math.random() * (max));

  // Return the random number
  return randomNumber;
}

// Create a fxn to select randomly from the set of available characters
function randomPicker(chars) {
  if (chars && chars.length) {
    var randomIndex = randomNumberPicker(chars.length);
    return chars[randomIndex];
  } else {
    return console.log(`Invalid!`)
  }
}

// Function to shuffle available characters
function characterShuffle(input) {
  var charsArray = input.split("");
  for (var i=0; i<charsArray.length-1; i++) {
    var randomIndex = randomNumberPicker(charsArray.length);
    var randomvalue = input[i]
    input[i] = input[randomIndex];
    input[randomIndex] = randomvalue
    }
    return charsArray.join("");
}

function getSuggestions() {
  // ask user for length of password
  var passwordLength = prompt("Choose the number of characters to use to generate password");
  // convert response to number
  passwordLength = parseInt(passwordLength)
  // validate choice
  if (isNaN(passwordLength) || passwordLength <8 || passwordLength > 128) {
    alert("Invalid choice. Only numbers between 8 and 128 allowed");}
  else
    alert("Click OK to confirm");
  
  var useUppercase = confirm("Include uppercase letters in the password?");
  var useLowercase = confirm("Include lowercase letters in the password?");
  var useNumbers = confirm("Include numbers in the password?");
  var useSpecial = confirm("Include special characters in the password?");
// return characters confirmed by user
  return {
    passwordLength,
    useUppercase,
    useLowercase,
    useNumbers,
    useSpecial
  }
}

// Booleans on password suggestions
function generatePassword() {
  var passwordSuggestions = getSuggestions();
  console.log(passwordSuggestions)
  return printPassword(passwordSuggestions);
}

function printPassword(passwordSuggestions) {
  if (!passwordSuggestions) {
    return "Select valid password suggestions!"
  }

  var completeCharacterSet = [];
  var chosenCharacterSet = [];
  var finalCharaterSet = [];

  if (passwordSuggestions.useUppercase) {
    completeCharacterSet = completeCharacterSet.concat(passwordChoices.UpperCase);
    chosenCharacterSet.push(randomPicker(passwordChoices.UpperCase));
  }
  if (passwordSuggestions.useLowercase) {
    completeCharacterSet = completeCharacterSet.concat(passwordChoices.LowerCase);
    chosenCharacterSet.push(randomPicker(passwordChoices.LowerCase));
  }
  if (passwordSuggestions.useNumbers) {
    completeCharacterSet = completeCharacterSet.concat(passwordChoices.numbers);
    chosenCharacterSet.push(randomPicker(passwordChoices.numbers));

  }
  if (passwordSuggestions.useSpecial) {
    completeCharacterSet = completeCharacterSet.concat(passwordChoices.special);
    chosenCharacterSet.push(randomPicker(passwordChoices.special));
  }


console.log(completeCharacterSet)
console.log(chosenCharacterSet)

  finalCharaterSet = finalCharaterSet.concat(chosenCharacterSet);

  for (i=0; i < passwordSuggestions.passwordLength - chosenCharacterSet.length; i++) {
    finalCharaterSet.push(randomPicker(completeCharacterSet));
  }
  console.log(finalCharaterSet.join(""));
  return characterShuffle(finalCharaterSet.join(""));


}



// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
