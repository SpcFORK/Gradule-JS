# Gradule

## Description
gradule is a Node.js library for creating colorful terminal output using gradient presets. It allows you to easily print strings with color gradients, apply bold and italic styles, and even ask for user input with styled prompts.

Inspired by `cnrad/iridi`.

## Usage
To use gradule in your Node.js application, you simply need to import the library and use its functions. Here's an example of how to use it:

```js
const { print, input, beautify, Preset } = require('gradule');

// Printing a string with a gradient
print('Hello, colorful world!', Preset.instagram.colorArr);

// Asking for user input with a stylized question
input('What is your name?', Preset.aquatic.colorArr)
  .then((name) => {
    console.log(`Hello, ${name}!`);
  });

```

## Presets

gradule comes with a variety of preset gradients that you can use. Here are a few examples:

- `Preset.kye_meh`: A purple and green gradient.
- `Preset.wiretap`: A vibrant gradient with shades of purple, red, and orange.
- `Preset.aquatic`: A fresh blue and green gradient reminiscent of water.
- ...and many more!

## Custom Gradients
You can also create custom gradients by passing an array of hex color strings to the `Preset` constructor.

Example of creating a custom gradient:

```js
const myGradient = new Preset(['#000000', '#FFFFFF']); // From black to white

myGradient.print('Custom gradient example');
```

License
gradule is MIT licensed. See LICENSE for details.