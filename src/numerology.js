const CHAR_VALUES = {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
      's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    };

    const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

    export function calculateLifePathNumber(birthdate) {
      const [year, month, day] = birthdate.split('-').map(Number);
      const sum = calculateDigitSum(day) + calculateDigitSum(month) + calculateDigitSum(year);
      return calculateSingleDigit(sum);
    }

    export function calculateDestinyNumber(name) {
      const lowerCaseName = name.toLowerCase();
      let sum = 0;
      for (const char of lowerCaseName) {
        if (CHAR_VALUES[char]) {
          sum += CHAR_VALUES[char];
        }
      }
      return calculateSingleDigit(sum);
    }

    export function calculateSoulUrgeNumber(name) {
      const lowerCaseName = name.toLowerCase();
      let sum = 0;
      for (const char of lowerCaseName) {
        if (VOWELS.has(char)) {
          sum += CHAR_VALUES[char];
        }
      }
      return calculateSingleDigit(sum);
    }

    export function calculatePersonalityNumber(name) {
      const lowerCaseName = name.toLowerCase();
      let sum = 0;
      for (const char of lowerCaseName) {
        if (!VOWELS.has(char) && CHAR_VALUES[char]) {
          sum += CHAR_VALUES[char];
        }
      }
      return calculateSingleDigit(sum);
    }

    export function calculateBirthdayNumber(birthdate) {
      const [, , day] = birthdate.split('-').map(Number);
      return calculateSingleDigit(day);
    }

    export function calculateMaturityNumber(lifePathNumber, destinyNumber) {
      return calculateSingleDigit(lifePathNumber + destinyNumber);
    }

    function calculateDigitSum(number) {
      let sum = 0;
      const numStr = String(number);
      for (const digit of numStr) {
        sum += Number(digit);
      }
      return sum;
    }

    function calculateSingleDigit(number) {
      let sum = number;
      while (sum > 9 && sum !== 11 && sum !== 22) {
        sum = calculateDigitSum(sum);
      }
      return sum;
    }
