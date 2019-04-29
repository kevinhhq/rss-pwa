const express = require("express");
const router = express.Router();
const db = require("./firebase");
var admin = require('firebase-admin');

router.post("/register", function(req, res) {
    admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        channel: null,
        recentread:{a:0}
    }).then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        let user = {
            uid: userRecord.uid,
            email: req.body.email,
            channel: null,
            recentread:{a:0},
        }
        let userRef = db.ref('user/');
        userRef.push().set(user);
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
            var Email=db.ref("/user/"+key_id).child("email")
            Email.on('value', snapshot => {
                Email_val=snapshot
            })
            var Channel=db.ref("/user/"+key_id).child("channel")
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

router.get("/:id/recentread", function(req, res) {
    var uid=req.params.id;
    var userReference = db.ref("/user");
    userReference.orderByChild("uid").equalTo(uid).on(
        "child_added",
        function(snapshot) {
            var recentread=snapshot.val().recentread
            delete (recentread["a"])
            res.json(recentread);
            userReference.off("value");
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        }
    )

});


router.put("/:id/recentread", function(req, res) {
    var uid=req.params.id;
    var img_url=JSON.stringify(req.body.img_url).replace(/\"/g, "");
    var summary=JSON.stringify(req.body.summary).replace(/\"/g, "");
    var news_id=JSON.stringify(req.body.news_id).replace(/\"/g, "");
    var timestamp=new Date().getTime();
    var userReference = db.ref("/user");
    userReference.orderByChild("uid").equalTo(uid).on(
        "child_added",
        function(snapshot) {
            var key_id=snapshot.key;
            if(!snapshot.hasChild("recentread")){
                recentread={"img_url":img_url,"summary":summary,"timestamp":timestamp};
                db.ref("/user/"+key_id).child(recentread).child(news_id).setValue(recentread)
            }
            else{
                var flag=0;
                var count=0;
                var recentread=snapshot.child("/recentread").val();
                for(let i in recentread){
                    count=count+1;
                }
                var least_timestamp=new Date().getTime();
                var not_recent_id=0
                for(let i in recentread){
                    if(i===news_id){
                        recentread[i].timestamp=timestamp;
                        flag=1;
                        break;
                    }
                    if(recentread[i].timestamp<least_timestamp){
                        not_recent_id=i;
                        least_timestamp=recentread[i].timestamp;
                    }
                }
                if(count===7){
                    delete(recentread[not_recent_id])
                    recentread[news_id]=({"img_url":img_url,"summary":summary,"timestamp":timestamp});
                    flag=1;
                }
                if(flag===0){
                    recentread[news_id]=({"img_url":img_url,"summary":summary,"timestamp":timestamp});
                    console.log(recentread)
                }
                db.ref("/user/"+key_id).update({
                    recentread: recentread,
                })
            }

            res.send("Update Done");
            userReference.off("child_added");
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        }
    );
});



router.put("/:id", function(req, res) {
    var name=JSON.stringify(req.body.name).replace(/\"/g, "");
    var type=JSON.stringify(req.body.type).replace(/\"/g, "");
    var uid=req.params.id;
    var userReference = db.ref("/user");
    userReference.orderByChild("uid").equalTo(uid).on(
        "child_added",
        function(snapshot) {
            var key_id=snapshot.key;
            var currentdata=snapshot.val().channel;
            if (!snapshot.hasChild("channel")) {
                currentdata = {};
                currentdata[name]= {"type": type};
            } else {
                var flag = 0;
                for (const i in currentdata) {
                    if (i === name && currentdata[i].type === type) {
                        delete (currentdata[i]);
                        flag = 1;
                        break;
                    }
            }
            if (flag === 0) {
                currentdata[name] = {"type": type};
            }
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