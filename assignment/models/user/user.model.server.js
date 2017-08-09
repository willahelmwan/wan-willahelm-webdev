var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/webdev_2017', {
//     useMongoClient: true
// });
// mongoose.Promise = require('q').Promise;
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUser = findAllUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.deleteAll = deleteAll;

module.exports = userModel;

function createUser(user){
    return userModel.create(user);
}

function findUserById(userId){
    return userModel.findById(userId);
}

function findAllUser(){
    return userModel.find();
}

function findUserByUsername(username){
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password){
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser){
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId){
    return userModel.remove({_id: userId});
}

function deleteAll(){
    return userModel.remove({});
}


// createUser({username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , isAdmin: true });
// createUser({username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley" });
// createUser({username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi"});
// createUser({username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia" });
