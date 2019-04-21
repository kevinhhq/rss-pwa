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

app.get("/api/", function(req, res) {
    var userReference = db.ref("/articles/" );

    userReference.on(
        "value",
        function(snapshot) {
            res.json(snapshot.val());
            userReference.off("value");
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        }
    );
});

app.get("/media/:media_name", function(req, res) {
    var userReference = db.ref("/articles/" );
    var media_name = req.params.media_name;
    userReference.orderByChild("source/name").equalTo(media_name).on(
        "value",
        function(snapshot) {

            res.json(snapshot.val());
            userReference.off("value");
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        }
    );
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
