/* || JAY SHREE MATAJI || || JAY SHREE GANESH || || JAY SHREE GAUMATA ||
|| JAY SHREE RAM || || JAY SHREE KRISHNA ||
|| JAY SHREE KHETARPAL DADA || || JAY SHREE KSHETRPAL DADA || JAY SHREE DADA || */

require("dotenv");
const expr = require("express");
const app = expr();
const cors = require("cors");
const mongoDB = require("mongoose");
const bodyParser = require("body-parser");
const url = bodyParser.urlencoded({ extended: false });
const mail = require("nodemailer");

const transport = mail.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    auth: {
        user: "sysggausada@gmail.com",
        pass: "xjguwdfxtcjfcbhq",
    }
});

mongoDB.connect("mongodb://localhost:27017/TODOAPP").then((info) => {

    if (info) {
        console.log("database connected !");
    }
    else {
        console.log("connection error !");
    }

}).catch((e) => {
    console.log("connection error: " + e);
});

app.use(expr.json());
app.use(cors());

app.get("/", (req, res) => {

    res.send("|| JAY SHREE GANESH ||");

});

// LOGIN & SignUP

const userSchema = new mongoDB.Schema({
    userName: String,
    email: String,
    password: String,
});

const userModel = new mongoDB.model("user", userSchema);

const userStatus = new mongoDB.Schema({
    userID: String,
    status: Boolean,
});

const userStatusModel = new mongoDB.model("userStaus", userStatus);

app.post("/signup", url, (req, res) => {

    const userData = req.body;

    userModel.find({ email: userData.email }).then((info) => {

        if (info[0].userName != userData.userName) {

            const newUser = new userModel({
                userName: userData.userName,
                email: userData.email,
                password: userData.password,
            });

            newUser.save().then((userInsertInfo) => {

                if (userInsertInfo._id.toString().length > 0) {

                    res.send({
                        status: true,
                        userCreated: true,
                        errorMsg: false,
                    });

                }
                else {

                    res.send({
                        status: true,
                        userCreated: false,
                        errorMsg: "user not inserted !",
                    });

                }

            }).catch((e) => {

                res.send({
                    status: false,
                    userCreated: false,
                    errorMsg: "server Down !",
                });

            });

        }
        else {
            res.send({
                status: true,
                userCreated: false,
                errorMsg: "user allready exits !",
            });
        }

    }).catch((e) => {

        res.send({
            status: false,
            userCreated: true,
            errorMsg: "server down !",
        });

    });

});

const setUserStatus = async (userID, status) => {

    return await userStatusModel.find({ "userID": userID }).then(async (info) => {

        if (!(info._id.toString().length > 0)) {

            const newUser = new userStatusModel({
                "userID": userID,
                "status": status,
            });

            return await newUser.save().then((info) => {

                if (info._id.toString().length > 0) {

                    return {
                        setStatus: true,
                    }

                }
                else {

                    return {
                        setStatus: false,
                    }

                }

            }).catch((e) => {

                return {
                    setStatus: false,
                }

            });

        }
        else {
            userStatusModel.updateOne({ "_id": info[0]._id, }, { "status": status }).then((updateInfo) => {

                if (updateInfo.modifiedCount) {
                    return {
                        setStatus: true,
                    }
                }
                else {
                    return {
                        setStatus: true,
                    }
                }

            }).catch((e) => {
                return {
                    setStatus: true,
                }
            })
        }

    }).catch((e) => {
        return {
            setStatus: false,
        }
    });
}

const getUserStatus = async (userID) => {

    return await userStatusModel.find({ "userID": userID }).then(async (info) => {

        if (info[0]._id.toString().length > 0) {

            return {
                findStatus: true,
                userStatus: info[0].status,
            }

        }
        else {
            return {
                findStatus: false,
            }
        }

    }).catch((e) => {
        return {
            findStatus: false,
        }
    });

}

app.post("/login", url, (req, res) => {

    const userData = req.body;

    userModel.find({ email: userData.email, password: userData.password }).then(async (info) => {

        if (info[0]._id.toString().length > 0) {

            var statusUpdate = await setStatus(info[0]._id, true);

            if (statusUpdate) {
                res.send({
                    status: true,
                    userValid: true,
                    errorMsg: false,
                })
            }
            else {
                res.send({
                    status: true,
                    userCreated: false,
                    errorMsg: "server down !",
                });
            }

        }
        else {
            res.send({
                status: true,
                userCreated: false,
                errorMsg: "invalid credential !",
            });
        }

    }).catch((e) => {

        res.send({
            status: false,
            userCreated: true,
            errorMsg: "server down !",
        });

    });

});

app.post("/get/user/status", url, async (req, res) => {

    if (req.body.userID) {
        const userStatus = await getUserStatus(req.body.userID);

        if (userStatus.findStatus) {
            res.send({
                status: "ok",
                "userFind": true,
                "userStatus": userStatus
            });
        }
        else {
            res.send({
                status: "ok",
                "userFind": false,
                errorMsg: "user not found !",
            });
        }
    }
    else {
        res.send({
            status: "ok",
            "userFind": false,
            errorMsg: "server down !",
        });
    }

});

// TEAM APIS

const team = new mongoDB.Schema({
    teamName: String,
    description: String,
    members: Object,
});

const teamModel = new mongoDB.model("team", team);

app.post("/team/create", (req, res) => {

    const teamData = req.body;

    const newTeam = new teamModel({
        teamName: teamData.teamName,
        description: teamData.description,
        members: [],
    });

    newTeam.save().then((teamInsertInfo) => {

        if (teamInsertInfo._id.toString().length > 0) {

            res.send({
                status: true,
                teamCreated: true,
                errorMsg: false,
            });

        }
        else {

            res.send({
                status: true,
                teamCreated: false,
                errorMsg: "team not created !",
            });

        }

    }).catch((e) => {

        res.send({
            status: false,
            teamCreated: false,
            errorMsg: "server Down !",
        });

    });

});

app.post("/team/update", (req, res) => {

    teamModel.updateOne({ "_id": req.body._id }, req.body.data).then((info) => {

        if (info.modifiedCount) {

            res.send({
                status: true,
                teamDataModified: true,
                errorMsg: false,
            });

        }
        else {

            res.send({
                status: true,
                teamDataModified: false,
                errorMsg: "data not modified !",
            });

        }

    }).catch((e) => {

        res.send({
            status: false,
            teamDataModified: false,
            errorMsg: "server Down !",
        });

    });

});

app.post("/team/delete", (req, res) => {

    teamModel.deleteOne({ "_id": req.body._id }).then((info) => {

        if (info.deletedCount) {

            res.send({
                status: true,
                teamDataDeleted: true,
                errorMsg: false,
            });

        }
        else {

            res.send({
                status: true,
                teamDataDeleted: false,
                errorMsg: "data not deleted !",
            });

        }

    }).catch((e) => {

        res.send({
            status: false,
            teamDataDeleted: false,
            errorMsg: "server Down !",
        });

    });

});

app.post("/team/fetch", (req, res) => {

    teamModel.find({}).then((info) => {

        if (info[0]) {

            res.send({
                status: true,
                teamData: info,
                errorMsg: false,
            });

        }
        else {

            res.send({
                status: true,
                teamData: false,
                errorMsg: "data not found !",
            });

        }

    }).catch((e) => {

        res.send({
            status: false,
            teamData: false,
            errorMsg: "server Down !",
        });

    });

});

const teamMember = new mongoDB.Schema({
    userName: String,
    email: String,
    password: String,
});

const teamMemberModel = new mongoDB.model("teamMember", teamMember);

app.post("/teamMember/create", (req, res) => {

    teamModel.find({ "_id": req.body.teamID }).then((info) => {

        if (info[0]) {

            const teamMember = new teamMemberModel({
                userName: String,
                email: String,
                password: String,
            });

            teamMember.save().then((teamMemberInsertInfo) => {

                if (teamMemberInsertInfo._id.toString().length > 0) {

                    var updatedTeamMembers = info[0].members;
                    updatedTeamMembers.push(teamMemberInsertInfo._id);

                    teamModel.updateOne({ "_id": info._id }, { "members": updatedTeamMembers }).then((teamUpdate) => {

                        if (teamUpdate.modifiedCount) {
                            res.send({
                                status: true,
                                teamMemberCreated: false,
                                errorMsg: "team member created !",
                            });
                        }
                        else {
                            res.send({
                                status: true,
                                teamMemberCreated: false,
                                errorMsg: "team member not created !",
                            });
                        }

                    }).catch((e) => {

                        res.send({
                            status: false,
                            teamMemberCreated: false,
                            errorMsg: "server down !",
                        });

                    });

                }
                else {

                    res.send({
                        status: true,
                        teamMemberCreated: false,
                        errorMsg: "team member not created !",
                    });

                }

            }).catch((e) => {

                res.send({
                    status: false,
                    teamMemberCreated: false,
                    errorMsg: "server Down !",
                });

            });

        }
        else {
            res.send({
                status: true,
                teamMemberCreated: false,
                errorMsg: "team Member not created !",
            });
        }

    }).catch((e) => {
        res.send({
            status: false,
            teamMemberCreated: false,
            errorMsg: "server down !",
        });
    });

});

app.post("/teamMember/update", (req, res) => {

    teamMemberModel.updateOne({ "_id": req.body._id }, req.body.data).then((info) => {

        if (info.modifiedCount) {

            res.send({
                status: true,
                teamDataModified: true,
                errorMsg: false,
            });

        }
        else {

            res.send({
                status: true,
                teamDataModified: false,
                errorMsg: "memder data not modified !",
            });

        }

    }).catch((e) => {

        res.send({
            status: false,
            teamDataModified: false,
            errorMsg: "server Down !",
        });

    });

});

app.post("/teamMember/delete", (req, res) => {

    teamModel.find({ "_id": req.body.teamID }).then((info) => {

        if (info[0]._id.toString().length > 0) {

            var updatedTeamMembers = info[0].members;

            for (var i in updatedTeamMembers) {

                if (req.body.teamMemberID.toString() == i.toString()) {
                    updatedTeamMembers.pop(req.body.teamMemberID);
                }
            }

            teamModel.updateOne({ "_id": info._id }, { "members": updatedTeamMembers }).then((teamUpdate) => {

                if (teamUpdate.modifiedCount) {

                    taskModel.find({ "_id": req.body.teamID }).then((taskInfo) => {

                        var updatedTeamMemberTask = taskInfo[0].teamMember;

                        for (var i in updatedTeamMemberTask) {

                            if (req.body.teamMemberID.toString() == i.toString()) {
                                updatedTeamMemberTask.pop(req.body.teamMemberID);
                            }
                        }

                        taskModel.updateOne({ "_id": info._id }, { "teamMember": updatedTeamMemberTask }).then((teamUpdate) => {

                            if (teamUpdate.modifiedCount) {

                                res.send({
                                    status: true,
                                    teamDataDeleted: true,
                                    errorMsg: false,
                                });

                            }

                        }).catch((e) => {

                            res.send({
                                status: true,
                                teamDataDeleted: false,
                                errorMsg: "team member not deleted !",
                            });

                        });

                    }).catch((e) => {

                        res.send({
                            status: true,
                            teamDataDeleted: false,
                            errorMsg: "team member not deleted !",
                        });

                    });


                }
                else {
                    res.send({
                        status: true,
                        teamMemberCreated: false,
                        errorMsg: "team member not deleted !",
                    });
                }

            }).catch((e) => {

                res.send({
                    status: false,
                    teamMemberCreated: false,
                    errorMsg: "server down !",
                });

            });

            res.send({
                status: true,
                teamDataDeleted: true,
                errorMsg: false,
            });

        }
        else {

            res.send({
                status: true,
                teamDataDeleted: false,
                errorMsg: "team member not deleted !",
            });

        }

    }).catch((e) => {

        res.send({
            status: false,
            teamDataDeleted: false,
            errorMsg: "server Down !",
        });

    });

});

app.post("/teamMember/fetch", (req, res) => {

    teamMemberModel.find({ "_id": req.body.teamMemberID }).then((info) => {

        if (info[0]) {

            res.send({
                status: true,
                teamMemberData: info[0],
                errorMsg: false,
            });

        }
        else {

            res.send({
                status: true,
                teamMemberData: false,
                errorMsg: "data not found !",
            });

        }

    }).catch((e) => {

        res.send({
            status: false,
            teamMemberData: false,
            errorMsg: "server Down !",
        });

    });

});

const task = new mongoDB.Schema({
    userID: String,
    teamMember: Object,
    taskTitle: String,
    description: String,
    status: Boolean,
    comments: Object,
});

const taskModel = new mongoDB.model("task", task);

app.post("/task/create", (req, res) => {

    const newTask = new taskModel(req.body);

    newTask.save().then(async(teamMemberInsertInfo) => {

        if (teamMemberInsertInfo._id.toString().length > 0) {

            for(var i=0;i<teamMemberInsertInfo.length;i++){

                var status = await teamMemberModel.find({"_id":req.body.teamMember[i]}).then(async(info)=>{

                    if(info[0]){
                        return info[0].email;
                    }
                    else{
                        return false;
                    }

                }).catch((e)=>{
                    return false;
                })

                if(status && i != teamMemberInsertInfo.length -1){

                    const message = {
                        from: "sysggausada@gmail.com",
                        to: status.toString(),
                        subject: "New Task Assinged !",
                        html:req.body.taskTitle,
                    }

                    var mailStatus = await transport.sendMail(message,(error,info)=>{

                        if(error){
                            return true;
                        }
                        else{
                            return false;
                        }

                    });

                    if(mailStatus){
                        
                        res.send({
                            status: true,
                            taskCreated: true,
                            notification:false,
                            errorMsg: false,
                        });

                        break;

                    }

                }
                else{
                    
                    const message = {
                        from: "sysggausada@gmail.com",
                        to: status.toString(),
                        subject: "New Task Assinged !",
                        html:req.body.taskTitle,
                    }

                    transport.sendMail(message,(error,info)=>{
                        
                        error ? res.send({
                            status: true,
                            taskCreated: true,
                            notification:false,
                            errorMsg: false,
                        }) : res.send({
                            status: true,
                            taskCreated: true,
                            notification:true,
                            errorMsg: false,
                        });
                   

                    });

                }

            }

            res.send({
                status: true,
                taskCreated: true,
                errorMsg: false,
            });

        }
        else {

            res.send({
                status: true,
                taskCreated: false,
                errorMsg: "task not created !",
            });

        }

    }).catch((e) => {

        res.send({
            status: false,
            taskCreated: false,
            errorMsg: "server Down !",
        });

    });

});

app.post("/task/update", (req, res) => {

    taskModel.updateOne({ "_id": req.body._id }, req.body.data).then((info) => {

        if (info.modifiedCount) {

            res.send({
                status: true,
                taskModified: true,
                errorMsg: false,
            });

        }
        else {

            res.send({
                status: true,
                taskModified: false,
                errorMsg: "memder data not modified !",
            });

        }

    }).catch((e) => {

        res.send({
            status: false,
            taskModified: false,
            errorMsg: "server Down !",
        });

    });

});

app.post("/task/delete", (req, res) => {

    taskModel.deleteOne({ "_id": req.body._id }).then((info) => {

        if (info.deletedCount) {

            res.send({
                status: true,
                taskDeleted: true,
                errorMsg: false,
            });

        }
        else {

            res.send({
                status: true,
                taskDeleted: false,
                errorMsg: "memder data not deleted !",
            });

        }

    }).catch((e) => {

        res.send({
            status: false,
            taskDeleted: false,
            errorMsg: "server Down !",
        });

    });

});

app.post("/task/member/fetch", (req, res) => {

    taskModel.find({}).then((info) => {

        if (info[0]) {

            var userTasks = [];

            for (var i in info) {

                for (var j in i.members) {

                    if (j.toString() == req.body._id) {
                        userTasks.push(i);
                        break;
                    }

                }

            }

            res.send({
                status: true,
                yourTasks: userTasks,
                errorMsg: false,
            });

        }
        else {

            res.send({
                status: true,
                yourTasks: false,
                errorMsg: "data not found !",
            });

        }

    }).catch((e) => {

        res.send({
            status: false,
            yourTasks: false,
            errorMsg: "server Down !",
        });

    });

});

app.post("/task/team/fetch", (req, res) => {

    taskModel.find({ "teamID": req.body.teamID }).then((info) => {

        if (info[0]) {

            res.send({
                status: true,
                assingedTasks: info,
                errorMsg: false,
            });

        }
        else {

            res.send({
                status: true,
                assingedTasks: false,
                errorMsg: "data not found !",
            });

        }

    }).catch((e) => {

        res.send({
            status: false,
            assingedTasks: false,
            errorMsg: "server Down !",
        });

    });

});

const port = process.env.PORT || 6111;

app.listen(port, () => {
    console.log("server run at: http://127.0.0.1:" + port);
});