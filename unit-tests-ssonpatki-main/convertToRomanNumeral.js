const convertToRomanNumeral = (numeral) => {

  if (numeral === 0 || numeral < 0 || numeral > 3999) {
    throw new Error("Invalid input value");
  }

  if (numeral === "") {
    return "";
  }
  
  let remainder = numeral;
  let result = "";

  const romanNumerals = [
    { number: 1000, roman : 'M' },
    { number: 100, roman : 'C' },
    { number: 50, roman : 'L' },
    { number: 10, roman : 'X' },
    { number: 5, roman : 'V' },
    { number: 1, roman : 'I'},
  ];

  while (remainder > 0) {
    for (let i = 0; i < romanNumerals.length; i++) {
      if (romanNumerals[i].number <= remainder) {
        result += romanNumerals[i].roman;
        remainder -= romanNumerals[i].number;
        break;
      }
    }
  }
  
  // if no matches are found return n
  if (result === "") {
    return 'n';
  }

  return result;
};

export default convertToRomanNumeral;
