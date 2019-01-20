var express = require("express");
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the home page route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/results", function(req, res) {
  res.sendFile(__dirname + "/results.html");
});

app.listen(port, function() {
  console.log("Our app is running on http://localhost:" + port);
});

const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  let page = null;
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    page = await browser.newPage();
    await page.goto("https://polishignorant.github.io/");
  } catch (e) {
    console.log(e);
  }

  setInterval(async () => {
    if (!page) {
      console.log("no page");
      return;
    }
    const content = await page.$eval("#text", e => e.innerHTML);
    console.log(content);
    fs.writeFile(__dirname + "/results.html", content, err => {
		if(err) console.log("err")
	});
  }, 10000);
})();
