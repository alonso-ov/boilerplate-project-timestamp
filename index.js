// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var livereload = require('livereload')
var connectLiveReload = require('connect-livereload')

const liveReloadServer = livereload.createServer()

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/")
  }, 100)
})

app.use(connectLiveReload())

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// ? makes the parameter optional
app.get("/api/:date?", (req, res) => {
  
  // the {} around the variable name is used to as a destructor
  /*
    Ex:
        let arr = [1, 2, 3]

        var [one, two, three] = arr
  */

  var date = req.params.date

  if( !(date) ) {
    date = new Date()

  // if date is a number
  } else if ( /^\d+$/.test(date) ){
    date = new Date(parseInt(date))

  } else {

    date = new Date(date)

    if (date == "Invalid Date")

    res.json({
      error: "Invalid Date"
    })
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})

var port = process.env.PORT || 5050

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
