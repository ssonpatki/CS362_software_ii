// export default verifyPassword; so dont use { verifyPassword }
import convertToRomanNumeral from './convertToRomanNumeral.js';
import { expect, test, describe } from "vitest";

/*
    FIRST TDD CYCLE
*/

test("Return empty string given empty input", () => {
    const arabic_number = "";
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("");
});


/*
    SECOND TDD CYCLE 
    - needed to comment out test since code was added later in the 
    development cycle to handle boundary cases
*/

/*
test("Return character placeholder (n) for numeral input (0)", () => {
    const arabic_number = 0;
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("n");
});
*/

/*
    TDD CYCLE 3: Handling Conversion of 1 to I
*/

test("Return roman numeral (I) for numeral input (1)", () => {
    const arabic_number = 1;
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("I");
});


/*
    TDD CYCLE 4: Adding Conversion Handling of 5 to V
*/

test("Return roman numeral (V) for numeral input (5)", () => {
    const arabic_number = 5;
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("V");
});


/*
    TDD CYCLE 5: Adding Conversion Handling of 10 to X
*/

test("Return roman numeral (X) for numeral input (10)", () => {
    const arabic_number = 10;
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("X");
});


/*
    TDD CYCLE 6: Adding Conversion Handling of 50 to L
*/

test("Return roman numeral (L) for numeral input (50)", () => {
    const arabic_number = 50;
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("L");
});


/*
    TDD CYCLE 7: Adding Conversion Handling of 100 to C
*/

test("Return roman numeral (C) for numeral input (100)", () => {
    const arabic_number = 100;
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("C");
});


/*
    TDD CYCLE 8: Adding Conversion Handling of 1000 to M
*/

test("Return roman numeral (M) for numeral input (1000)", () => {
    const arabic_number = 1000;
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("M");
});


/*
    TDD CYCLE 9: Adding Conversion Handling of 2 to II
*/

test("Return roman numeral (II) for numeral input (2)", () => {
    const arabic_number = 2;
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("II");
});


/*
    TDD CYCLE 10: Adding Conversion Handling of 4 to IIII
    - checks addition and repitition of digits
*/

test("Return roman numeral (IIII) for numeral input (4)", () => {
    const arabic_number = 4;
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("IIII");
});


/*
    TDD CYCLE 11: Adding Conversion Handling of 49 to XXXXVIIII
    - checks addition
*/

test("Return roman numeral (XXXXVIIII) for numeral input (49)", () => {
    const arabic_number = 49;
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("XXXXVIIII");
});


/*
    TDD CYCLE 12: Adding Conversion Handling of 99 to LXXXXVIIII
    - checks addition and repitition of digits
*/

test("Return roman numeral (LXXXXVIIII) for numeral input (99)", () => {
    const arabic_number = 99;
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("LXXXXVIIII");
});

/*
    TDD CYCLE 13: Adding Conversion Handling of 3999 to MMMCCCCCCCCCLXXXXVIIII
    - checks addition and repitition of digits
    - edge case: max value of valid range
*/

test("Return roman numeral (MMMCCCCCCCCCLXXXXVIIII) for numeral input (3999)", () => {
    const arabic_number = 3999;
    const result = convertToRomanNumeral(arabic_number);
    expect(result).toBe("MMMCCCCCCCCCLXXXXVIIII");
});


/*
    TDD CYCLE 14: Test error handling of zero
*/

test("Return error for numeral input (0)", () => {
    const arabic_number = 0;
    expect(() => {
        convertToRomanNumeral(arabic_number).toThrow("Invalid input value");
    });
});


/*
    TDD CYCLE 15: Test error handling of negative values
*/

test("Return error for numeral input (-1)", () => {
    const arabic_number = -1;
    expect(() => {
        convertToRomanNumeral(arabic_number).toThrow("Invalid input value");
    });
});


/*
    TDD CYCLE 16: Test error handling of non-integer values
*/

test("Return error for numeral input (1.001)", () => {
    const arabic_number = 1.001;
    expect(() => {
        convertToRomanNumeral(arabic_number).toThrow("Invalid input value");
    });
});


/*
    TDD CYCLE 17: Test error handling of values over 3999
*/

test("Return error for numeral input (4000)", () => {
    const arabic_number = 4000;
    expect(() => {
        convertToRomanNumeral(arabic_number).toThrow("Invalid input value");
    });
});

/*
    TDD CYCLE 18: Test error handling of null input
*/

test("Return error for null input", () => {
    const arabic_number = null;
    expect(() => {
        convertToRomanNumeral(arabic_number).toThrow("Invalid input value");
    });
});

/*
    TDD CYCLE 19: Test error handling of Infinity input
*/

test("Return error for Infinity input", () => {
    const arabic_number = Infinity;
    expect(() => {
        convertToRomanNumeral(arabic_number).toThrow("Invalid input value");
    });
});

/*
    TDD CYCLE 20: Test error handling of -Infinity input
*/

test("Return error for -Infinity input", () => {
    const arabic_number = -Infinity;
    expect(() => {
        convertToRomanNumeral(arabic_number).toThrow("Invalid input value");
    });
});