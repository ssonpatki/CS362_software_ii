// export default verifyPassword; so dont use { verifyPassword }
import verifyPassword from './verifyPassword.js';
import { expect, test, describe } from "vitest";

/*
    DUMMY TEST
*/

test("dummy to check vitest", () => {
    
})


/*
    TESTING FOR EMPTY/NON-STRING INPUTS
*/

test("password is empty returns invalid", () => {
    const password = "";    // Arrange
    const result = verifyPassword(password);  // Act

    // return { pass: false }; in verifyPassword.js
    expect(result.pass).toBeFalsy();  // Assert
})


test("password is a non-string value returns invalid", () => {
    const password = 5;     // Arrange
    const result = verifyPassword(password);  // Act
    expect(result.pass).toBeFalsy();  // Assert
})


test("password is a null value", () => {
    const password = null;     // Arrange
    const result = verifyPassword(password);   // Act
    expect(result.pass).toBeFalsy();     // Assert
})


/*
    TESTING FOR VALID INPUTS
*/

describe("Testing const checks elements with good password", () => {
    test("test good password <goodPassword2Use!>", () => {
        const password = "goodPassword2Use!";     // Arrange
        const result = verifyPassword(password);  // Act
        expect(result.pass).toBeTruthy();  // Assert
    })

    // Note: all checks must pass for previous test to == True, 
    //      thus it would be unnecessary to write specific tests
    //      for each check

});


/*
    TESTING FOR INDIVIDUAL INVALID INPUTS
*/

describe("Testing individual checks elements to catch invalid inputs", () => {
    test("password <badPass> contains less than 8 Chars", () => {
        const password = "badPass";     // Arrange
        const result = verifyPassword(password);  // Act

        // length - true if the password contains at least 8 characters
        expect(result.length).toBeFalsy();  // Assert
    })
    
    test("password <BADPASSWORD> contains no Lowercase", () => {
        const password = "BADPASSWORD";     // Arrange
        const result = verifyPassword(password);  // Act

        // lowercase - true if the password contains at least one lowercase letter
        expect(result.lowercase).toBeFalsy();  // Assert
    })
    
    test("password <badpassword> contains no Uppercase", () => {
        const password = "badpassword";     // Arrange
        const result = verifyPassword(password);  // Act

        // uppercase - true if the password contains at least one uppercase letter
        expect(result.uppercase).toBeFalsy();  // Assert
    })
    
    test("password <badPassword> contains no Digits", () => {
        const password = "badPassword";     // Arrange
        const result = verifyPassword(password);  // Act

        // digit - true if the password contains at least one digit 
        expect(result.digit).toBeFalsy();  // Assert
    })

    test("password <badPassword1> contains no Symbols ", () => {
        const password = "badPassword1";     // Arrange
        const result = verifyPassword(password);  // Act

        // symbol - true if the password contains at least one valid symbol
        expect(result.symbol).toBeFalsy();  // Assert
    })

    test("password <bad Password1!> contains Invalid Chars", () => {
        const password = "bad Password1!";     // Arrange
        const result = verifyPassword(password);  // Act

        //noInvalid - true if the password doesn't contain invalid symbols/spaces
        expect(result.noInvalid).toBeFalsy();  // Assert
    })
});


/*
    TESTING FOR MULTIPLE INVALID INPUTS
*/

describe("Check email <badpass> against multiple checks", () => {
    let password = "badpass";   // Arrange

    test("containsAtLeast8Chars returns false", () => {
        const result = verifyPassword(password);  // Act
        expect(result.length).toBeFalsy();  // Assert
    })
    
    test("containsOneLowercase returns true", () => {
        const result = verifyPassword(password);  // Act
        expect(result.lowercase).toBeTruthy();  // Assert
    })
    
    test("containsOneUppercase returns false", () => {
        const result = verifyPassword(password);  // Act
        expect(result.uppercase).toBeFalsy();  // Assert
    })
    
    test("containsOneDigit returns false", () => {
        const result = verifyPassword(password);  // Act
        expect(result.digit).toBeFalsy();  // Assert
    })

    test("containsOneSymbol returns false", () => {
        const result = verifyPassword(password);  // Act
        expect(result.symbol).toBeFalsy();  // Assert
    })

    test("containsNoInvalidChars returns true", () => {
        const result = verifyPassword(password);  // Act
        expect(result.noInvalid).toBeTruthy();  // Assert
    })
});


// uses example that tests if false/true elements from previous tests are now the opposite
describe("Check email <BAD PASSWORD2!> against multiple checks", () => {
    let password = "BAD PASSWORD2!";   // Arrange

    test("containsAtLeast8Chars returns true", () => {
        const result = verifyPassword(password);  // Act
        expect(result.length).toBeTruthy();  // Assert
    })
    
    test("containsOneLowercase returns false", () => {
        const result = verifyPassword(password);  // Act
        expect(result.lowercase).toBeFalsy();  // Assert
    })
    
    test("containsOneUppercase returns true", () => {
        const result = verifyPassword(password);  // Act
        expect(result.uppercase).toBeTruthy();  // Assert
    })
    
    test("containsOneDigit returns true", () => {
        const result = verifyPassword(password);  // Act
        expect(result.digit).toBeTruthy();  // Assert
    })

    test("containsOneSymbol returns true", () => {
        const result = verifyPassword(password);  // Act
        expect(result.symbol).toBeTruthy();  // Assert
    })

    test("containsNoInvalidChars returns false", () => {
        const result = verifyPassword(password);  // Act
        expect(result.noInvalid).toBeFalsy();  // Assert
    })
});


/*
    TESTING FOR BOUNDARY AND EDGE CASES
*/

describe("Testing boundary and edge cases", () => {
    test("Exactly 8 char with all criteria satisfied", () => {
        let password = "GoodPass0!";   // Arrange
        const result = verifyPassword(password);  // Act
        expect(result.pass).toBeTruthy();  // Assert
    })
    
    test("Testing valid length boundary", () => {
        let password = "H3lloThisIsAVeryLongPassword!ButItShouldBeOk";   // Arrange
        const result = verifyPassword(password);  // Act
        expect(result.pass).toBeTruthy();  // Assert
    })
    
    test("Test password containing invalid char", () => {
        let password = "InvalidChar<3";   // Arrange
        const result = verifyPassword(password);  // Act
        expect(result.pass).toBeFalsy();  // Assert
    })
    
    test("Test password with only symbols", () => {
        let password = "!@#$%^&*";   // Arrange
        const result = verifyPassword(password);  // Act
        expect(result.pass).toBeFalsy();  // Assert
    })
});
