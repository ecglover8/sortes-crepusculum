// require installed packages and variables
var express = require("express");
var app = express();
const port = process.env.PORT || 8080;

// set up view engine and file paths
app.set("view engine", "ejs");
app.use(express.static(__dirname));
const twilightjson = require("./public/twilight.json");
const text = twilightjson.text;

// define routes
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.get("/about", (req, res) => {
  var response = {
    "book title": twilightjson.name,
    "written by": twilightjson.author,
    "published by": twilightjson.publisher,
    "publication date": twilightjson.year,
    "ISBN": twilightjson.ISBN
  };
  res.json(response);
});
app.get("/websortes", sortes, GetChapter, (req, res) => {
  res.render(__dirname + "/websortes", {
    line: req.line,
    chapter: req.chapter
  });
});
app.get("/sortesjson", sortes, (req, res) => {
  res.json(req.line);
});
app.get("/line/:query", (req, res) => {
  var linenum = parseInt(req.params.query, 10);
  if (!isNaN(linenum)) {
    if (linenum < 1 || linenum > 7085) {
      console.log("Integer not within range. Please choose a number between 1 and 7085, inclusive.");
      res.json("Integer not within range. Please choose a number between 1 and 7085, inclusive.");
      return;
    } else {
      res.json(text[linenum-1]);
      return;
    }
  } else {
    console.log("You must enter a valid number. Please go back and try again.");
    res.json("You must enter a valid number. Please go back and try again.");
    return;
  }
});
//get a random line from the book
function sortes(req, res, next) {
  // total number of lines in Twilight
  var totallines = 7085;
  var i = Math.floor(totallines * Math.random());
  req.line = text[i];
  return next();
}
//chapter f(x)
function GetChapter(req, res, next) {
  switch (req.line.ch) {
    case 0:
      req.chapter = "~ Preface";
      break;
    case 1:
      req.chapter = "1: First Sight";
      break;
    case 2:
      req.chapter = "2: Open Book";
      break;
    case 3:
      req.chapter = "3: Phenomenon";
      break;
    case 4:
      req.chapter = "4: Invitations";
      break;
    case 5:
      req.chapter = "5: Blood Type";
      break;
    case 6:
      req.chapter = "6: Scary Stories";
      break;
    case 7:
      req.chapter = "7: Nightmare";
      break;
    case 8:
      req.chapter = "8: Port Angeles";
      break;
    case 9:
      req.chapter = "9: Theory";
      break;
    case 10:
      req.chapter = "10: Interrogations";
      break;
    case 11:
      req.chapter = "11: Complications";
      break;
    case 12:
      req.chapter = "12: Balancing";
      break;
    case 13:
      req.chapter = "13: Confessions";
      break;
    case 14:
      req.chapter = "14: Mind Over Matter";
      break;
    case 15:
      req.chapter = "15: The Cullens";
      break;
    case 16:
      req.chapter = "16: Carlisle";
      break;
    case 17:
      req.chapter = "17: The Game";
      break;
    case 18:
      req.chapter = "18: The Hunt";
      break;
    case 19:
      req.chapter = "19: Goodbyes";
      break;
    case 20:
      req.chapter = "20: Impatience";
      break;
    case 21:
      req.chapter = "21: Phone Call";
      break;
    case 22:
      req.chapter = "22: Hide-And-Seek";
      break;
    case 23:
      req.chapter = "23: The Angel";
      break;
    case 24:
      req.chapter = "24: An Impasse";
      break;
    case 25:
      req.chapter = "~ Epilogue: An Occasion";
      break;
  }
  return next();
}
//open port to listen for requests
app.listen(port, () => {
  console.log("Sortes crepusculum is live on port #" + port + ".");
});
