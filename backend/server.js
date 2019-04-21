const express = require("express");
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.json());
app.use(express.urlencoded());

var loaddata = require("./loaddata");
var offline = require("./offline");
var search = require("./search");

app.use("/loaddata", loaddata);
app.use("/offline", offline);
app.use("/search", search);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
