"use strict";

var _express = _interopRequireDefault(require("express"));
var _handler = require("./handler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
const port = 3000;
app.get('/get-word-count', _handler.wordCountHandler);
app.get('/get-random-users', _handler.getRandomUserHandler);
app.get('/', (req, res) => {
  res.send('Server is up and running..');
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});