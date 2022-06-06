const express = require('express');
const app = express();
const config = require('./config');
const Class = require('./Models/Class');
const ClassRegistration = require('./Models/ClassRegistration');
const ClassType = require('./Models/ClassType');
const User = require('./Models/User');
const Workout = require('./Models/Workout');
const Purchase = require('./Models/Purchase')
const cors = require('cors');
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
            waiverSigned: 0,
            activeMembership: 0,
            isAdmin: 0
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

app.get('/classRegistrations', function(req,res){
    ClassRegistration.findAll().then(function(result){
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
// app.get('/user/:userId', function(req,res){
//     var userId = req.params.userId
//     User.findByPk(userId).then(function(result){
//         res.send(result);
//     }).catch(function(err){
//         res.send(err);
//     });
// });
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
    ClassRegistration.create(req.body).then(function(Result){
        res.redirect('/classRegistrations');
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
    Purchase.create(req.body).then(function(Result){
        res.redirect('/purchases');
    }).catch(function(err){
        res.send(err);
    });
});
//delete this as the only way to create new users is through registration
// app.post('/users', function(req,res){
//     User.create(req.body).then(function(Result){
//         res.redirect('/users');
//     }).catch(function(err){
//         res.send(err);
//     });
// });
app.post('/workouts', function(req,res){
    Workout.create(req.body).then(function(Result){
        res.redirect('/workouts');
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
app.delete('/classRegistrations/:classId/:userId', function(req,res){ 
    //will use this route to unregister a user from a class so need to destroy the record if the user Id matches
    var classId = req.params.classId
    var userId = req.params.userId //need to call userID somewhere to unregister the correct person
    ClassRegistration.findByPk(classId).then(function(result){
        if(result){ //and if the user ID exists
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

//create a patch to edit waiver signed
//create a patch to edit if valid membership
//create a patch to edit if is an admin user (?)

