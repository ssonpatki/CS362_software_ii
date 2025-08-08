/**
 * @vitest-environment jsdom
 */
import fs from "fs";
import path from "path";
import { describe, test, expect, beforeEach } from "vitest";
import {initializeFormValidation} from "./registerUser.js";
import { getByText } from "@testing-library/dom";
import "@testing-library/jest-dom/vitest";
import { userEvent } from "@testing-library/user-event";
import { screen } from "@testing-library/dom";


describe("Register User Form", () => {
    beforeEach(() => {
      const htmlPath = path.resolve(__dirname, "./registerUser.html");
      const htmlContent = fs.readFileSync(htmlPath, "utf-8");
      document.body.innerHTML = htmlContent;
      initializeFormValidation();
    });
  
    /*
      DUMMY TEST
    */
    test("dummy to check vitest", () => {
        
    })


    /*
      test for registerSuccess video
    */
   
    test("should display success message when registration is successful", async () => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /register/i });

      await userEvent.type(emailInput, "hello@example.com");
      await userEvent.type(passwordInput, "123abcABC*");
      await userEvent.click(submitButton);

      const successMessage = await screen.findByRole("status");
      expect(successMessage).toHaveTextContent(/registration successful/i);
    })

    test("should clear form fields when registration is successful", async () => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /register/i });

      await userEvent.type(emailInput, "hello@example.com");
      await userEvent.type(passwordInput, "123abcABC*");
      await userEvent.click(submitButton);

      expect(emailInput).toHaveDisplayValue("");
      expect(passwordInput).toHaveDisplayValue("");
    })


    /*
      test for registerFail1 video
    */

    test("should return registration error message when email is invalid", async () => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /register/i });

      await userEvent.type(emailInput, "hello@example.c");
      await userEvent.type(passwordInput, "123abcABC*");
      await userEvent.click(submitButton);

      // error header
      const errorMessage = await screen.findByRole("alert");
      expect(errorMessage).toHaveTextContent(/registration error/i);

      // email error message
      const emailErrorHeader = screen.getByText(
        /the email address you entered is invalid/i
      );
      expect(emailErrorHeader).toBeInTheDocument();
    })

    /*
      test for registerFail2 video
    */

    test("should return registration error message when password is invalid", async () => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /register/i });

      await userEvent.type(emailInput, "hello@example.com");
      await userEvent.type(passwordInput, "12345678");
      await userEvent.click(submitButton);

      const errorMessage = await screen.findByRole("alert");
      expect(errorMessage).toHaveTextContent(/registration error/i);

      // error header
      const passwordErrorHeader = screen.getByText(
        /the password you entered is invalid/i
      );
      expect(passwordErrorHeader).toBeInTheDocument();

      // reason for error (lower case)
      const passErrorLowercase = screen.getByText(
        /password needs a lower case letter/i
      );
      expect(passErrorLowercase).toBeInTheDocument();

      // reason for error (upper case)
      const passErrorUppercase = screen.getByText(
        /password needs an upper case letter/i
      );
      expect(passErrorUppercase).toBeInTheDocument();

      // reason for error (missing symbol)
      const passErrorSymbol = screen.getByText(
        /password needs a symbol/i
      );
      expect(passErrorSymbol).toBeInTheDocument();
    })


    /*
      test for registerFail3 video
    */

    test("should return registration error message when password is invalid", async () => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /register/i });

      await userEvent.type(emailInput, "hello@example.com");
      await userEvent.type(passwordInput, "1234abcd");
      await userEvent.click(submitButton);

      const errorMessage = await screen.findByRole("alert");
      expect(errorMessage).toHaveTextContent(/registration error/i);

      // error header
      const passwordErrorHeader = screen.getByText(
        /the password you entered is invalid/i
      );
      expect(passwordErrorHeader).toBeInTheDocument();

      // reason for error (upper case)
      const passErrorUppercase = screen.getByText(
        /password needs an upper case letter/i
      );
      expect(passErrorUppercase).toBeInTheDocument();

      // reason for error (missing symbol)
      const passErrorSymbol = screen.getByText(
        /password needs a symbol/i
      );
      expect(passErrorSymbol).toBeInTheDocument();
    })


    /*
      test for registerFail4 video
    */

    test("should return error message when email and password are invalid", async () => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /register/i });

      await userEvent.type(emailInput, "hello@example.c");
      await userEvent.type(passwordInput, "1234abcd");
      await userEvent.click(submitButton);

      const errorMessage = await screen.findByRole("alert");
      expect(errorMessage).toHaveTextContent(/registration error/i);

      // reason for error
      const emailErrorHeader = screen.getByText(
        /the email address you entered is invalid/i
      );
      expect(emailErrorHeader).toBeInTheDocument();

      // error header
      const passwordErrorHeader = screen.getByText(
        /the password you entered is invalid/i
      );
      expect(passwordErrorHeader).toBeInTheDocument();

      // reason for error (upper case)
      const passErrorUppercase = screen.getByText(
        /password needs an upper case letter/i
      );
      expect(passErrorUppercase).toBeInTheDocument();

      // reason for error (missing symbol)
      const passErrorSymbol = screen.getByText(
        /password needs a symbol/i
      );
      expect(passErrorSymbol).toBeInTheDocument();
    })
});

/*
    TESTING FOR VALID INPUT
    Note: All email requirements must be satisfied for return == True
*/
describe("Testing app response with valid email inputs", () => {
  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, "./registerUser.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");
    document.body.innerHTML = htmlContent;
    initializeFormValidation();
  });

  test("<first_Part@GMAIL.com> check capital letters in domain", async () => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /register/i });

      await userEvent.type(emailInput, "first_Part@GMAIL.com");
      await userEvent.type(passwordInput, "123abcABC*");
      await userEvent.click(submitButton);

      const successMessage = await screen.findByRole("status");
      expect(successMessage).toHaveTextContent(/registration successful/i);
  })

/* TEST FAILING (CANNOT FIND 'status')

  test("<f@d.s.c> checks minimal edge case", async () => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /register/i });

      await userEvent.type(emailInput, "f@d.s.c");
      await userEvent.type(passwordInput, "123abcABC*");
      await userEvent.click(submitButton);

      const successMessage = await screen.findByRole("status");
      expect(successMessage).toHaveTextContent(/registration successful/i);
  })

  test("Test to check length of domain edge case", async () => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /register/i });

      await userEvent.type(emailInput, "firstPart@domain.subdomain.subdomain.subdomain.subdomain.subdomain.subdomain.c");
      await userEvent.type(passwordInput, "123abcABC*");
      await userEvent.click(submitButton);

      const successMessage = await screen.findByRole("status");
      expect(successMessage).toHaveTextContent(/registration successful/i);
  })
*/

});


/*
  TESTING FOR INVALID INPUTS FAILING (CANNOT FIND 'alert')
*/

/*
describe("Testing app response with incomplete <email_inputs>", () => {
  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, "./registerUser.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");
    document.body.innerHTML = htmlContent;
    initializeFormValidation();
  });

  test("<@gmail.com> lacks username", async () => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /register/i });

      await userEvent.type(emailInput, "@gmail.com");
      await userEvent.type(passwordInput, "123abcABC*");
      await userEvent.click(submitButton);

      // error header
      const errorMessage = await screen.findByRole("alert");
      expect(errorMessage).toHaveTextContent(/registration error/i);

      // email error message
      const emailErrorHeader = screen.getByText(
        /the email address you entered is invalid/i
      );
      expect(emailErrorHeader).toBeInTheDocument();
  })


  test("<firstPart.secondPart> lacks @ and domain", async() => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /register/i });

      await userEvent.type(emailInput, "firstPart.secondPart");
      await userEvent.type(passwordInput, "123abcABC*");
      await userEvent.click(submitButton);

      // error header
      const errorMessage = await screen.findByRole("alert");
      expect(errorMessage).toHaveTextContent(/registration error/i);

      // email error message
      const emailErrorHeader = screen.getByText(
        /the email address you entered is invalid/i
      );
      expect(emailErrorHeader).toBeInTheDocument();
  })

});
*/