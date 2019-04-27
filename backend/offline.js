const express = require("express");
const router = express.Router();
const db = require("./firebase");

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
      userReference.off("value");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});

module.exports = router;
