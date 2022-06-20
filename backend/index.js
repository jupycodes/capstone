const express = require('express');
const app = express();
const config = require('./config');
const Class = require('./Models/Class');
const ClassRegistration = require('./Models/ClassRegistration');
const ClassType = require('./Models/ClassType');
const User = require('./Models/User');
const Workout = require('./Models/Workout');
const Purchase = require('./Models/Purchase')
const multer = require('multer');
var fileExtension = require('file-extension')
const cors = require('cors');
const cron = require('node-cron');
const bcrypt = require('bcrypt');
const saltRounds = 10

app.use(cors()); 
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//database associations
Class.belongsTo(ClassType, {
    foreignKey: 'classTypeId'
});
ClassType.hasMany(Class, {
    foreignKey: 'classTypeId'
})
ClassRegistration.hasMany(User, {foreignKey: 'userId'})

//create database connection
config.authenticate().then(function(){
    console.log('Database is connected');
}).catch(function(err){
    console.log(err);
});

//register new user
app.post('/register', function(req, res){
    let plainPassword = req.body.password;
    bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
        let user_data = {
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            password: hash,
            phoneNumber: req.body.phoneNumber,
            birthday: req.body.birthday,
            gender: req.body.gender,
            waiverSigned: 1,
            activeMembership: 0,
            isAdmin: 0,
            membershipType: 'none'
        };
        User.create(user_data).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(500).send(err);
        });
    });    
});

//login
app.post('/login', function(req, res){
    let email = req.body.email;
    let password = req.body.password;
    let user_data = {
        where: {email} // {email: email}
    }
    //Find a user that corresponds to the email
    User.findOne(user_data).then((result) => {
        if(result){
            console.log(result);
            bcrypt.compare(password, result.password, function(err, output) {
                console.log(output);
                if(output){
                    res.status(200).send(result);
                }else{
                    res.status(400).send('Incorrect password.');
                }
            });            
        } else {
            res.status(404).send('User does not exist.');
        }
    }).catch((err) => {
        res.status(500).send(err);
    });    
});

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});

//GET Routes
//to filter for specific records -> see Exm 4 index.js in module-3 folder
app.get('/classes', function(req,res){
    let data = {
        where: {},
        order: [['startTime', 'ASC']],
        include: ClassType
    }
    Class.findAll(data).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});
app.get('/classes/:classId', function(req,res){
    let classId = req.params.classId
    let data = {
        where: {classId},
        include: ClassType
    }
    Class.findAll(data).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

app.get('/classRegistrations/:classId', function(req,res){
    let id = req.params.classId;
    let data = {
        where: {classId: id},
        include: User
    }
    ClassRegistration.findAll(data).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});
app.get('/classType', function(req,res){
    ClassType.findAll().then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});
app.get('/purchases/:userId', function(req,res){
    let userId = req.params.userId
    let data = {
        where: {userId}
    }
    Purchase.findAll(data).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});
app.get('/users', function(req,res){
    User.findAll().then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});
app.get('/users/:userId', function(req,res){
    let userId = req.params.userId;
    User.findByPk(userId).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

app.get('/workouts', function(req,res){
   let data = {
       where: {},
   } 
   if (req.body.date !== undefined) {
       data.where.date = req.body.date
   }
    Workout.findAll(data).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

//Post Routes
app.post('/classes', function(req,res){
    Class.create(req.body).then(function(Result){
        res.redirect('/classes');
    }).catch(function(err){
        res.send(err);
    });
});
app.post('/classRegistrations', function(req,res){
    ClassRegistration.create(req.body).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});
app.post('/classTypes', function(req,res){
    ClassType.create(req.body).then(function(Result){
        res.redirect('/classTypes');
    }).catch(function(err){
        res.send(err);
    });
});
app.post('/purchases', function(req,res){
    Purchase.create(req.body).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

app.post('/workouts', function(req,res){
    Workout.create(req.body).then(function(result){
        res.send(result)
    }).catch(function(err){
        res.send(err);
    });
});

//DELETE Routes
app.delete('/classes/:classId', function(req,res){
    var classId = req.params.classId
    Class.findByPk(classId).then(function(result){
        if(result){
            result.destroy().then(function(){
                res.send(result);
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Record not found');
        };
    }).catch(function(err){
        res.send(err);
    });
});
// app.delete('/classRegistrations/:classId/:userId', function(req,res){
//     //will use this route to unregister a user from a class so need to destroy the record if the user Id matches
//     var classId = req.params.classId
//     var userId = req.params.userId //need to call userID somewhere to unregister the correct person
//     ClassRegistration.findByPk(classId).then(function(result){
//         if(result){ //and if the user ID exists
//             result.destroy().then(function(){
//                 res.send(result);
//             }).catch(function(err){
//                 res.send(err);
//             });
//         } else {
//             res.send('Record not found');
//         };
//     }).catch(function(err){
//         res.send(err);
//     });
// });
app.delete(`/classRegistrations/:classId/:userId/:date`, function (req,res){
    const date = req.params.date;
    const userId = req.params.userId;
    const classId = req.params.classId
    let data = {
        where: {date, userId, classId},
    }
    ClassRegistration.findOne(data).then(function(result){
        if(result){
            console.log(result)
            result.destroy().then(function(){
                res.send(result);
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Record not found');
        }
    }).catch(function(err){
        res.send(err);
    });
});

app.delete('/classTypes/:classTypeId', function(req,res){
    var classTypeId = req.params.classTypeId
    ClassType.findByPk(classTypeId).then(function(result){
        if(result){
            result.destroy().then(function(){
                res.send(result);
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Record not found');
        };
    }).catch(function(err){
        res.send(err);
    });
});
app.delete('/purchases/:purchaseId', function(req,res){
    var purchaseId = req.params.purchaseId
    Purchase.findByPk(purchaseId).then(function(result){
        if(result){
            result.destroy().then(function(){
                res.send(result);
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Record not found');
        };
    }).catch(function(err){
        res.send(err);
    });
});
app.delete('/users/:userId', function(req,res){
    var userId = req.params.userId
    User.findByPk(userId).then(function(result){
        if(result){
            result.destroy().then(function(){
                res.send(result);
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Record not found');
        };
    }).catch(function(err){
        res.send(err);
    });
});
app.delete('/workouts/:workoutId', function(req,res){
    var workoutId = req.params.workoutId
    Workout.findByPk(workoutId).then(function(result){
        if(result){
            result.destroy().then(function(){
                res.send(result);
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Record not found');
        };
    }).catch(function(err){
        res.send(err);
    });
});

//EDIT a record (sample)
app.patch('/classes/:classId', function(req,res){
    var classId = req.params.classId;
    Class.findByPk(classId).then(function(result){
        if(result){
            if (req.body.startTime !== undefined){
                result.startTime = req.body.startTime;
            }
            if (req.body.endTime !== undefined){
                result.endTime = req.body.endTime;
            }
            if (req.body.day !== undefined){
                result.day = req.body.day;
            }
            if (req.body.classTypeId !== undefined){
                result.classTypeId = req.body.classTypeId;
            }
            result.save().then(function(){
                res.send(result);
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Record does not exist')
        }
    }).catch(function(err){
        res.send(err);
    });
});
//edit workout details (admin users only)
app.patch('/workouts/:date',function(req,res){
    const date = req.params.date
    let data = {
        where: {date}
    }
    Workout.findAll(data).then(function(result){
        if (result[0] == null) {
            console.log('no result')
        }
        if (result) {
            if (req.body.description !== undefined) {
                result[0].description = req.body.description
            }
            result[0].save().then(function(){
                res.send(result[0]);
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('no result')
        }
    }).catch(function(err){
        res.send(err);
    });
})
//get single workout by date
app.get('/workouts/:date',function(req,res){
    const date = req.params.date
    let data = {
        where: {date}
    }
    Workout.findAll(data).then(function(result){
        if (result[0] == null) {
            console.log('no result')
        }
        if (result) {
           res.send(result[0])
        } else {
            res.send('no result')
        }
    }).catch(function(err){
        res.send(err);
    });
})
// app.patch('/workouts/:workoutId',function(req,res){
//     const workoutId = req.params.workoutId
//     Workout.findByPk(workoutId).then(function(result){
//         if (result) {
//             if (req.body.date !== undefined){
//                 result.date = req.body.date;
//             }
//             if (req.body.description !== undefined) {
//                 result.description = req.body.description
//             }
//             result.save().then(function(){
//                 res.send(result);
//             }).catch(function(err){
//                 res.send(err);
//             });
//         } else {
//             res.send('record does not exist')
//         }
//     }).catch(function(err){
//         res.send(err);
//     });
// })
//change user's membership type with new purchase
app.patch('/users/:userId', function(req,res){
    const userId = req.params.userId;
    User.findByPk(userId).then(function(result){
        if (result) {
            const currentMembershipType = result.membershipType
            if (req.body.activeMembership !== undefined) {
                result.activeMembership += parseInt(req.body.activeMembership);
            }
            if (req.body.membershipType !== undefined) {
                result.membershipType = req.body.membershipType;
                if (req.body.membershipType === 'unlimited' || req.body.membershipType === 'openGym') {
                    // console.log(currentMembershipType)
                    // console.log(result.membershipType)
                    // setTimeout(function () {
                    //     result.membershipType = currentMembershipType
                    //     console.log('30 days')
                    //     result.save().then(function () {
                    //         // res.send(result)
                    //     })
                    // }, 2592000000)
                    cron.schedule('* * */30 * *', () => {
                        console.log('reset after 30 days');
                        result.membershipType = currentMembershipType;
                        result.save().then(function () {
                            res.send(result)
                        })
                    }, {
                        scheduled: true,
                        timezone: "America/Sao_Paulo"
                    });
                }
                if (req.body.membershipType === 'freeTrial') {
                    // console.log(currentMembershipType)
                    // console.log(result.membershipType)
                    cron.schedule('* * */7 * *', () => {
                        console.log('reset after 7 days');
                        result.membershipType = currentMembershipType;
                        result.save().then(function () {
                            res.send(result)
                        })
                    }, {
                        scheduled: true,
                        timezone: "America/Sao_Paulo"
                    });
                }
            }
            result.save().then(function () {
                // res.send(result);
            }).catch(function (err) {
                res.send(err);
            });
        } else {
            res.send('Record does not exist')
        }
    }).catch(function(err){
        res.send(err);
    });
});
//edit user profile or change password
app.patch('/editProfile/:userId', function(req,res){
    var userId = req.params.userId;
    User.findByPk(userId).then(function(result){
        if(result){
            if (req.body.fName !== undefined){
                result.fName = req.body.fName;
            }
            if (req.body.lName !== undefined){
                result.lName = req.body.lName;
            }
            if (req.body.email !== undefined){
                result.email = req.body.email;
            }
            if (req.body.phoneNumber !== undefined){
                result.phoneNumber = req.body.phoneNumber;
            }
            if (req.body.birthday !== undefined){
                result.birthday = req.body.birthday;
            }
            if (req.body.gender !== undefined){
                result.gender = req.body.gender;
            }
            if (req.body.currentPassword !== undefined){
                let plainCurrent = req.body.currentPassword;
                let plainNew = req.body.password;
                bcrypt.compare(plainCurrent, result.password, function(err,output) {
                    console.log(output);
                    if (output) {
                        bcrypt.hash(plainNew, saltRounds, function(err, hash) {
                            result.password = hash;
                        })
                    }
                });
            }
            result.save().then(function(){
                res.send(result);
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Record does not exist')
        }
    }).catch(function(err){
        res.send(err);
    });
});

//upload profile image and patch user
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'profileImg')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
//     }
// })
// var upload = multer({
//     storage: storage,
//     limits: {
//         // Setting Image Size Limit to 2MBs
//         fileSize: 2000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             //Error
//             cb(new Error('Please upload JPG and PNG images only!'))
//         }
//         //Success
//         cb(undefined, true)
//     }
// })
// app.patch('/uploadImg/:userId', upload.single('uploadedImg'), (req,res,next) => {
//     const file = req.file;
//     console.log(req);
//     if (!file) {
//         const error = new Error('Please upload a file')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     const userId = req.params.userId;
//     User.findByPk(userId).then(function(result){
//         if (result) {
//             result.picture = file
//             result.save().then(function () {
//                 // res.send(result);
//             }).catch(function (err) {
//                 res.send(err);
//             });
//         } else {
//             res.send('Record does not exist')
//         }
//     }).catch(function(err){
//         res.send(err);
//     });
// });



