const express = require("express");
const router = express.Router();
const db = require("./firebase");
const admin = require('firebase-admin');
/**Read data from firebase, which could work offline */
router.get("/", function(req, res) {
  var userReference = db.ref("/article/headlines/articles");
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

router.get("/category/:category", function(req, res) {
  var category = req.params.category;
  var userReference = db.ref("/article/categories/" + category + "/articles");
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

router.get("/:newsId", function(req, res) {
  var newsId = req.params.newsId;
  var userReference = db.ref("/article/alldata/" + newsId);
  userReference.on(
    "value",
    function(snapshot) {
      res.json(snapshot.val());
      if (req.query.uid) {
        console.log(req.query);
        // todo: update here
      }
      userReference.off("value");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});

router.get("/source/:source", function(req, res) {
  var source = req.params.source;
  var userReference = db
    .ref("/article/alldata")
    .orderByChild("source")
    .equalTo(source);
  userReference.on(
    "value",
    function(snapshot) {
      var sourceList = [];
      for (var each in snapshot.val()) {
        sourceList.push(snapshot.val()[each]);
      }
      res.send(sourceList);
      userReference.off("value");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});

router.get("/search/:keyWord", function(req, res) {
  var keyWord = req.params.keyWord;
  var userReference = db
    .ref("/article/alldata")
    .orderByChild("title")
    .startAt(keyWord)
    .endAt(keyWord + "\uf8ff");
  userReference.on(
    "value",
    function(snapshot) {
      var searchList = [];
      for (var each in snapshot.val()) {
        searchList.push(snapshot.val()[each]);
      }
      res.send(searchList);
      userReference.off("value");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});

module.exports = router;
