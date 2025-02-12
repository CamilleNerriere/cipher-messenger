const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const cipher = (message, key) => {
  const keyWithModulo = key % 26;
  let ciphermessage = "";
  for (const letter of message) {
    const index = alphabet.indexOf(letter);
    const newLetter = alphabet[index + keyWithModulo];
    ciphermessage += newLetter;
  }
  return ciphermessage;
};

const decipher = (message, key) => {
  const keyWithModulo = key % 26;
  let decipheredMessage = "";
  for (const letter of message) {
    const index = alphabet.indexOf(letter);
    const newLetter = alphabet[index - keyWithModulo];
    decipheredMessage += newLetter;
  }
  return decipheredMessage;
};

export { cipher, decipher };
