// export default verifyEmail; so dont use { verifyEmail }
import verifyEmail from './verifyEmail.js';
import { expect, test, describe } from "vitest";

/*
    DUMMY TEST
*/

test("dummy to check vitest", () => {
    
})

/*
    TESTING FOR NON-STRING INPUTS
*/

test("email is a non-string value", () => {
    const some_integer = 5;     // Arrange
    const result = verifyEmail(some_integer);   // Act
    expect(result).toBeFalsy();     // Assert
})

test("email is a null value", () => {
    const some_integer = null;     // Arrange
    const result = verifyEmail(some_integer);   // Act
    expect(result).toBeFalsy();     // Assert
})



/*
    TESTING FOR VALID INPUT
    Note: All email requirements must be satisfied for return == True
*/
describe("Testing valid inputs", () => {

    test("<firstPart.secondPart@gmail.com> satisfies all email requirements", () => {
        const email = "firstPart.secondPart@gmail.com"; // Arrange
        const result = verifyEmail(email);  // Act
        expect(result).toBeTruthy();    // Assert
    })

    test("<first_Part@GMAIL.com> check capital letters in domain", () => {
        const email = "first_Part@GMAIL.com"; // Arrange
        const result = verifyEmail(email);  // Act
        expect(result).toBeTruthy();    // Assert
    })

    test("<firstPart@domain.subdomain.com> satisfies all email requirements", () => {
        const email = "firstPart@domain.subdomain.com"; // Arrange
        const result = verifyEmail(email);  // Act
        expect(result).toBeTruthy();    // Assert
    })

    test("<f@d.s.c> checks minimal edge case", () => {
        const email = "f@d.s.com"; // Arrange
        const result = verifyEmail(email);  // Act
        expect(result).toBeTruthy();    // Assert
    })

    test("Test to check length of domain edge case", () => {
        const email = "firstPart@domain.subdomain.subdomain.subdomain.subdomain.subdomain.subdomain.com"; // Arrange
        const result = verifyEmail(email);  // Act
        expect(result).toBeTruthy();    // Assert
    })
});


/*
    TESTING FOR INVALID INPUTS
*/

describe("Testing specific attributes in incomplete <email_inputs>", () => {

    test("<@gmail.com> lacks username", () => {
        const email = "@gmail.com";     // Arrange
        const result = verifyEmail(email);  // Act
        expect(result).toBeFalsy();     // Assert
    })


    test("<firstPart.secondPart> lacks @ and domain", () => {
        const email = "firstPart.secondPart";   // Arrange
        const result = verifyEmail(email);  //Act
        expect(result).toBeFalsy();     // Assert
    })


    test("<firstPart.secondPart.gmail.com> lacks @ symbol", () => {
        const email = "firstPart.secondPart.gmail.com"; // Arrange
        const result = verifyEmail(email);  // Act
        expect(result).toBeFalsy();     // Assert
    })


    test("<firstPart.secondPart@.com> lacks domain", () => {
        const email = "firstPart.secondPart@.com";  // Arrange
        const result = verifyEmail(email);  // Act
        expect(result).toBeFalsy();     // Assert
    })


    test("<firstPart.secondPart@gmail> lacks top-level domain", () => {
        const email = "firstPart.secondPart@gmail"; // Arrange
        const result = verifyEmail(email);  // Act
        expect(result).toBeFalsy();     // Assert
    })

});

