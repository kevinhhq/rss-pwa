const express = require("express");
const router = express.Router();
const db = require("./firebase");
var admin = require('firebase-admin');

router.post("/register", function(req, res) {
    admin.auth().createUser({
        name: req.body.name,
        channel: req.body.channel,
    }).then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        let user = {
            uid: userRecord.uid,
            name: req.body.name,
            channel: req.body.channel
        }
        let userRef = db.ref('user/');
        userRef.push().set(user);
        res.redirect('/user/login');
        console.log("Successfully created new user:", userRecord.uid);
    })
        .catch(function (error) {
            console.log("Error creating new user:", error);
        });
})
router.get("/:id", function(req, res) {
    var uid=req.params.id;
    var userReference = db.ref("/user");
    userReference.orderByChild("uid").equalTo(uid).on(
        "value",
        function(snapshot) {
            res.json(snapshot.val());
            userReference.off("value");
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        }
    )

});



router.put("/:id", function(req, res) {
    var channel=JSON.stringify(req.body.channel).replace(/\"/g, "");
    var uid=req.params.id;
    var userReference = db.ref("/user");
    userReference.orderByChild("uid").equalTo(uid).on(
        "child_added",
        function(snapshot) {
            var key_id=snapshot.key
            var currentdata=snapshot.val().channel
            var list=currentdata.split(',');
            var flag=0;
            if(list===null||list[0]===currentdata){
                if (list[0] === channel) {
                    list.splice(0, 1);
                }
                else
                    list.splice(0,0,channel);
            }
            else {
                n=list.length
                for (var i = 0; i < n; i++)
                    if (list[i] === channel) {
                        list.splice(i, 1);
                        flag = 1;
                        break;
                    }
                if(flag===0){
                    list.splice(0,0,channel);
                }
            }
            db.ref("/user/"+key_id).update({
                channel: list.toString(),
            })
            res.send("Update Done");
            userReference.off("child_added");
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        }
    );
});

module.exports = router;
