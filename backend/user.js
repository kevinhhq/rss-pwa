const express = require("express");
const router = express.Router();
const db = require("./firebase");

router.get("/", function(req, res) {
    var userReference = db.ref("/user");
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

router.get("/:id", function(req, res) {
    var id = req.params.id;
    var userReference = db.ref("/user"+id);
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

router.get("/:id/channel", function(req, res) {
    var id = req.params.id;
    var userReference = db.ref("/user/"+id + "/channel");
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

router.put("/:id", function(req, res) {
    var channel=JSON.stringify(req.body.channel).replace(/\"/g, "");
    var id=req.params.id;
    var CurrentData=db.ref("/user/"+id + "/channel");
    CurrentData.once(
        "value",
        function(snapshot) {
            var currentdata=snapshot.val();
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
            console.log(list[0],list[1],list[2])
            db.ref("/user/"+id).update({
                channel: list.toString(),
            })
            res.send("Update Done");
            CurrentData.off("value");
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        }
    );
});

module.exports = router;
