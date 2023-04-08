"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wordCountHandler = exports.getRandomUserHandler = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _commonVariables = require("./common.variables.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const wordCountHandler = async (req, res) => {
  try {
    let {
      data: document
    } = await _axios.default.get(_commonVariables.documentUrl);
    const words = document.replace(/[^\w\s]/gi, '').split(/\s+/);
    ;
    const wordCount = {};
    console.log(words.length);

    // Count the occurrences of each word
    words.forEach(word => {
      const lowercaseWord = word;
      wordCount[lowercaseWord] = (wordCount[lowercaseWord] || 0) + 1;
    });

    // Collect details for top 10 words
    const top10Words = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]).slice(0, 10).map(word => ({
      word: word,
      count: wordCount[word]
    }));
    console.log(top10Words);
    return res.send({
      top10Words
    });
  } catch (err) {}
};
exports.wordCountHandler = wordCountHandler;
const getRandomUserHandler = async (req, res) => {
  try {
    const {
      data
    } = await _axios.default.get('https://randomuser.me/api/?results=10');
    const usersDetails = data.results.map(user => {
      return {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        dob: user.dob.date.slice(0, 10),
        email: user.email
      };
    });
    res.status(200).json(usersDetails);
  } catch (err) {}
};
exports.getRandomUserHandler = getRandomUserHandler;