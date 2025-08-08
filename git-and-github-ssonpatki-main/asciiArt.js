// This file will contain an ASCII art generating program

// example CL input: node asciiArt.js "This is the string to turn into ASCII art"

// Capture the first argument after the program name and print it to the terminal using console.log()

const { argv } = require('node:process');

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

var figlet = require("figlet");

figlet.text(argv[2], function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);
})