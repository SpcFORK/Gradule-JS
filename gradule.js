let { createInterface } = require('readline');
let { stdin } = require('process');

const rl = createInterface({
  input: stdin,
  output: process.stdout
});

class Preset {
  static kye_meh = new Preset(["#7350b3", "#2ebf91"])

  static wiretap = new Preset(["#8A2387", "#E94057", "#F27121"])

  static aquatic = new Preset(["#00C9FF", "#92FE9D"])

  static martini = new Preset(["#FDFC47", "#24FE41"])

  static amethyst = new Preset(["#9D50BB", "#6E48AA"])

  static dance_to_forget = new Preset(["#FF4E50", "#F9D423"])

  static instagram = new Preset(['#833ab4', '#fd1d1d', '#fcb045'])

  static pastel = new Preset(['#74ebd5', '#74ecd5'])

  static retro = new Preset([
    '#3f51b1',
    '#5a55ae',
    '#7b5fac',
    '#8f6aae',
    '#a86aa4',
    '#cc6b8e',
    '#f18271',
    '#f3a469',
    '#f7c978'
  ])

  static cherryblossoms = new Preset(["#FBD3E9", "#BB377D"])

  static candy = new Preset(["#D3959B", "#BFE6BA"])

  static nelson = new Preset(["#f2709c", "#ff9472"])

  static kyoto = new Preset(["#c21500", "#ffc500"])

  static wedding_day_blues = new Preset(["#40E0D0", "#FF8C00", "#FF0080"])

  constructor(colorArr) {
    this.colorArr = colorArr.map((color) => this.#convertHexToRGB(color));
  }

  static beautify(string, colorArr, bold = false, italic = false) {
    const presetInstance = new Preset(colorArr);
    return presetInstance.#applyColors(string, bold, italic);
  }

  #convertHexToRGB(hexColor) {
    if (typeof hexColor === 'string' && hexColor.startsWith("#")) {
      const color = hexColor.slice(1);
      return {
        r: parseInt(color.slice(0, 2), 16),
        g: parseInt(color.slice(2, 4), 16),
        b: parseInt(color.slice(4, 6), 16),
      };
    }
    return hexColor; // assuming it's already an RGB object
  }

  #applyColors(string, bold = false, italic = false) {
    let { colorArr } = this;
    const length = string.length;
    const colorStopsCount = colorArr.length;
    const sectionLength = Math.floor(length / (colorStopsCount - 1));
    let finalStr = '';

    if (bold) finalStr += '\x1B[1m';
    if (italic) finalStr += '\x1B[3m';

    let index = 0;
    let { r, g, b } = colorArr[0];

    for (let i = 1; i < colorStopsCount; i++) {
      for (let j = 0; j < sectionLength && index < length; j++, index++) {
        finalStr += `\x1B[38;2;${r};${g};${b}m${string[index]}`;

        r += Math.round((colorArr[i].r - colorArr[i - 1].r) / sectionLength);
        g += Math.round((colorArr[i].g - colorArr[i - 1].g) / sectionLength);
        b += Math.round((colorArr[i].b - colorArr[i - 1].b) / sectionLength);
      }
    }

    // Append the remaining part of the string with the last color stop.
    finalStr += `\x1B[38;2;${r};${g};${b}m${string.substring(index)}`;

    if (italic) finalStr += '\x1B[23m';
    finalStr += '\x1B[0m';

    return finalStr;
  }

  print(string, bold = false, italic = false) {
    console.log(this.#applyColors(string, bold, italic));
  }

  static input(question, colorArr, bold = false, italic = false) {
    return new Promise((resolve) => {
      rl.question(Preset.beautify(question, colorArr, bold, italic), (answer) => {
        resolve(answer);
      });
    });
  }
}

// Helper functions for direct usage
const print = (string, colorArr, bold = false, italic = false) => {
  new Preset(colorArr).print(string, bold, italic);
};

const input = Preset.input; // Use the static input method for consistency with 'print'.
const beautify = Preset.beautify; // Delegate to static beautify method for cleaner usage.

let _exp_ = { print, input, beautify, preset: Preset }

{ // Export Core
  module && (module.exports = _exp_)
  ||
  window && (window.gradule = _exp_)
}