const express = require("express");
const router = express.Router();
const db = require("./firebase");
var admin = require('firebase-admin');

router.post("/register", function(req, res) {
    admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        channel: req.body.channel,
    }).then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        let user = {
            uid: userRecord.uid,
            email: req.body.email,
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
        "child_added",
        function(snapshot) {
            var key_id=snapshot.key
            var Email_val=null
            var Channel_val=null
            Email=db.ref("/user/"+key_id).child("email")
            Email.on('value', snapshot => {
                Email_val=snapshot
            })
            Channel=db.ref("/user/"+key_id).child("channel")
            Channel.on('value', snapshot => {
                Channel_val=snapshot
            })
            res.json({"email":Email_val,"channel":Channel_val});
            userReference.off("value");
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        }
    )

});



router.put("/:id", function(req, res) {
    var name=JSON.stringify(req.body.name).replace(/\"/g, "");
    var type=JSON.stringify(req.body.type).replace(/\"/g, "");
    console.log(name,type)
    var uid=req.params.id;
    var userReference = db.ref("/user");
    userReference.orderByChild("uid").equalTo(uid).on(
        "child_added",
        function(snapshot) {
            var key_id=snapshot.key
            var currentdata=snapshot.val().channel;
            var flag=0;
            console.log(currentdata)
            for(let i in currentdata){
                console.log(currentdata)
                if(currentdata[i].name===name&&currentdata[i].type===type){
                    delete (currentdata[i])
                    flag=1;
                    break;
                }
            }
            if(flag===0){
                currentdata[name]=({"name":name,"type":type});
            }

            db.ref("/user/"+key_id).update({
                channel: currentdata,
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
