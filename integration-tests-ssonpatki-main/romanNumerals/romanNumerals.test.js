/**
 * @vitest-environment jsdom
 */
import fs from "fs";
import path from "path";
import { describe, test, expect, beforeEach, afterAll, afterEach, beforeAll} from "vitest";
import {initializeApp} from "./romanNumerals.js";
import { getByText } from "@testing-library/dom";
import "@testing-library/jest-dom/vitest";
import { userEvent } from "@testing-library/user-event";
import { screen } from "@testing-library/dom";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// created .json file to mock data
import modernRomanNumeral from "./modernRomanNumeral.json"

export const restHandlers = [
  http.get("https://romans.justyy.workers.dev/api/romans", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("n");
    if (!query) {
      return HttpResponse.json({
        message: "Conversion failed",
        errors: [
          {
            resource: "Roman Numeral Converter",
            field: "n",
            code: "missing",
          },
        ],
        documentation_url: "https://romans.justyy.workers.dev/api/romans",
        status: "422",
      });
    }
    
    // find the resultEntry where input (arabic number) equals the query (n)
    const resultEntry = modernRomanNumeral.find(entry => entry.input === query);

    return HttpResponse.json(resultEntry);
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Roman Numeral Application", () => {
    beforeEach(() => {
      const htmlPath = path.resolve(__dirname, "./romanNumerals.html");
      const htmlContent = fs.readFileSync(htmlPath, "utf-8");
      document.body.innerHTML = htmlContent;
      initializeApp();
    });

    /*
      DUMMY TEST
    */

    test("dummy to check vitest", () => {
      
    })

    /*
      test for numeralsLiveTyping (inputting and deleting 1234 - old roman numeral)
    */

    test("should auto update old numeral when typing and deleting 1234", async () => {
      const arabicNumberInput = screen.getByLabelText(/arabic number/i);

      await userEvent.type(arabicNumberInput, "1"); // tests input 1
      expect(screen.getByText("I")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "2"); // tests input 12
      expect(screen.getByText("XII")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "3"); // tests input 123
      expect(screen.getByText("CXXIII")).toBeInTheDocument();


      await userEvent.type(arabicNumberInput, "4"); // tests input 1234
      expect(screen.getByText("MCCXXXIIII")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "{backspace}"); // user deletes numbers (input 123)
      expect(screen.getByText("CXXIII")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "{backspace}"); // user deletes numbers (input 12)
      expect(screen.getByText("XII")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "{backspace}"); // user deletes numbers (input 1)
      expect(screen.getByText("I")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "{backspace}"); // input field is empty
      expect(screen.queryByText("I")).not.toBeInTheDocument();

    })

    /*
      test for numeralsLiveTyping (inputting and deleting 3567 - old roman numeral)
    */

    test("should auto update old numeral when typing and deleting 3567", async () => {
      const arabicNumberInput = screen.getByLabelText(/arabic number/i);

      await userEvent.type(arabicNumberInput, "3"); // tests input 3
      expect(screen.getByText("III")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "5"); // tests input 35
      expect(screen.getByText("XXXV")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "6"); // tests input 356
      expect(screen.getByText("CCCLVI")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "7"); // tests input 3567
      expect(screen.getByText("MMMCCCCCLXVII")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "{backspace}"); // user deletes numbers (input 356)
      expect(screen.getByText("CCCLVI")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "{backspace}"); // user deletes numbers (input 35)
      expect(screen.getByText("XXXV")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "{backspace}"); // user deletes numbers (input 3)
      expect(screen.getByText("III")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "{backspace}"); // input field is empty
      expect(screen.queryByText("III")).not.toBeInTheDocument();

    })

    /*
      test for numeralsConvertToModern (arabic 999 to old and new numeral)
    */

    test("should convert to modern numeral when submitted", async () => {
      const arabicNumberInput = screen.getByLabelText(/arabic number/i);
      const submitButton = screen.getByRole("button", { name: /convert to "modern" roman numerals/i });

  
      await userEvent.type(arabicNumberInput, "9"); // tests input 9
      expect(screen.getByText("VIIII")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "9"); // tests input 99
      expect(screen.getByText("LXXXXVIIII")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "9"); // tests input 999
      expect(screen.getByText("CCCCCCCCCLXXXXVIIII")).toBeInTheDocument();

      await userEvent.click(submitButton);
      
      // use await screen.findByTest because of loading time after click
      const modernRoman = await screen.findByText("CMXCIX");
      expect(modernRoman).toBeInTheDocument();

    })

    /*
      test for numeralsUpdateAfterConversion (deleting input field after modern conversion)
    */

    test("should update numerals after conversion", async () => {
      const arabicNumberInput = screen.getByLabelText(/arabic number/i);
      const submitButton = screen.getByRole("button", { name: /convert to "modern" roman numerals/i });

      await userEvent.type(arabicNumberInput, "999"); // tests input 999
      expect(screen.getByText("CCCCCCCCCLXXXXVIIII")).toBeInTheDocument();

      await userEvent.click(submitButton);
      
      // use await screen.findByTest because of loading time after click
      const modernRoman = await screen.findByText("CMXCIX");
      expect(modernRoman).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "{backspace}"); // user deletes numbers (input 99)
      expect(screen.queryByText("CMXCIX")).not.toBeInTheDocument();
      expect(screen.getByText("LXXXXVIIII")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "{backspace}"); // user deletes numbers (input 9)
      expect(screen.getByText("VIIII")).toBeInTheDocument();

      await userEvent.type(arabicNumberInput, "{backspace}"); // input field is empty
      expect(screen.queryByText("VIIII")).not.toBeInTheDocument();

    })
}); 

describe("Additional Tests: Roman Numeral Converter... ", () => {
  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, "./romanNumerals.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");
    document.body.innerHTML = htmlContent;
    initializeApp();
  });


  test("Return old roman numeral (IIII) for input (4) and new numeral (IV)", async () => {
    const arabicNumberInput = screen.getByLabelText(/arabic number/i);
    const submitButton = screen.getByRole("button", { name: /convert to "modern" roman numerals/i });


    await userEvent.type(arabicNumberInput, "4"); // tests input 9
    expect(screen.getByText("IIII")).toBeInTheDocument();

    await userEvent.click(submitButton);
    
    // use await screen.findByTest because of loading time after click
    const modernRoman = await screen.findByText("IV");
    expect(modernRoman).toBeInTheDocument();
  });

  test("Return old numeral (MMMCCCCCCCCCLXXXXVIIII) and new numeral (MMMCMXCIX) for input (3999)", async () => {
    const arabicNumberInput = screen.getByLabelText(/arabic number/i);
    const submitButton = screen.getByRole("button", { name: /convert to "modern" roman numerals/i });

    await userEvent.type(arabicNumberInput, "3999"); // tests input 9
    expect(screen.getByText("MMMCCCCCCCCCLXXXXVIIII")).toBeInTheDocument();

    await userEvent.click(submitButton);
    
    // use await screen.findByTest because of loading time after click
    const modernRoman = await screen.findByText("MMMCMXCIX");
    expect(modernRoman).toBeInTheDocument();
  });

  /*
    TDD CYCLE 14: Test error handling of zero
  */

  test("Return error for numeral input (0)", async () => {
    const arabicNumberInput = screen.getByLabelText(/arabic number/i);

    await userEvent.type(arabicNumberInput, "0"); // tests input 9

    expect(() => {
        convertToRomanNumeral(arabic_number).toThrow("Invalid input value");
    });
  });


  /*
    TDD CYCLE 15: Test error handling of negative values
  */

  test("Return error for numeral input (-1)", async() => {
    const arabicNumberInput = screen.getByLabelText(/arabic number/i);
    
    await userEvent.type(arabicNumberInput, "-1"); // tests input 9

    expect(() => {
        convertToRomanNumeral(arabic_number).toThrow("Invalid input value");
    });
  });


  /*
    TDD CYCLE 16: Test error handling of non-integer values
  */

  test("Return error for numeral input (1.001)", async () => {
    const arabicNumberInput = screen.getByLabelText(/arabic number/i);
    
    await userEvent.type(arabicNumberInput, "1.001"); // tests input 9

    expect(() => {
        convertToRomanNumeral(arabic_number).toThrow("Invalid input value");
    });
  });


  /*
    TDD CYCLE 17: Test error handling of values over 3999
  */

  test("Return error for numeral input (4000)", async () => {
    const arabicNumberInput = screen.getByLabelText(/arabic number/i);
    
    await userEvent.type(arabicNumberInput, "4000"); // tests input 9

    expect(() => {
        convertToRomanNumeral(arabic_number).toThrow("Invalid input value");
    });
  });
});


