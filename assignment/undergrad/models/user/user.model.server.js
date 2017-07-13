/**
 * Created by annunziatoj on 6/6/17.
 */


var bcrypt = require("bcrypt-nodejs");

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UndergraduateUserModel', userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.findAllUsers = findAllUsers;
userModel.updateUser = updateUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;

module.exports = userModel;

function findAllUsers() {
    return userModel.find();
}

function removeWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user._websites.indexOf(websiteId);
            user._websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user._websites.push(websiteId);
            return user.save();
        })
}

function updateUser(userId, newUser) {
//    delete newUser.username;
    return userModel.update({_id: userId}, {
        $set : {
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserByCredentials(username, password) {
    return userModel
        .findOne({username: username})
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                null;
            }
        });
    
    //, password: password});
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    user.roles = ['USER'];
    console.log(user.password);
    user.password = bcrypt.hashSync(user.password);
    console.log(user.password);
    return userModel.create(user);
}