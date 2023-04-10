type NumeralMap = {
  value: number;
  numeral: string;
};

const numeralMap: NumeralMap[] = [
  { value: 1000, numeral: 'm' },
  { value: 900, numeral: 'cm' },
  { value: 500, numeral: 'd' },
  { value: 400, numeral: 'cd' },
  { value: 100, numeral: 'c' },
  { value: 90, numeral: 'xc' },
  { value: 50, numeral: 'l' },
  { value: 40, numeral: 'xl' },
  { value: 10, numeral: 'x' },
  { value: 9, numeral: 'ix' },
  { value: 5, numeral: 'v' },
  { value: 4, numeral: 'iv' },
  { value: 1, numeral: 'i' },
];

export function convertArabicIntoRoman(arabicNumber: number): string {
  if (arabicNumber < 1 || arabicNumber > 3999) {
    throw new Error('The input number should be between 1 and 3999');
  }

  let romanNumeral = '';

  for (const { value, numeral } of numeralMap) {
    while (arabicNumber >= value) {
      romanNumeral += numeral;
      arabicNumber -= value;
    }
  }

  return romanNumeral;
}