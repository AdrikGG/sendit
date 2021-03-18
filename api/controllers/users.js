const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if(user.length >= 1) {
                return res.status(409).json({
                    message: "Username already taken"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash
                        });
                        user
                            .save()
                            .then(() => {
                                const token = jwt.sign({
                                    username: user.username,
                                    userId: user._id
                                }, "somethingspecial", {
                                    expiresIn: "1h"
                                });
                                res.status(201).json({
                                    message: 'User created',
                                    token: token
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })
            }
        });
}

exports.user_login = (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if(result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        userId: user[0]._id
                    }, "somethingspecial", {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        username: user[0].username,
                        userId: user[0]._id
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.users_get = (req, res, next) => {
    User.find()
    .select("_id username password")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            users: docs
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.user_post = (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username
    });
    user
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            createdUser: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.user_get = (req, res, next) => {
    const id = req.userData.userId;
    User.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc) {
            res.status(200).json({username: doc.username});
        } else {
            res.status(404).json({message: 'No valid entry founr for given id'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.user_update = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.user_delete = (req, res, next) => {
    const id = req.params.userId;
    User.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}