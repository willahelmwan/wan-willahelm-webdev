var mongoose = require('mongoose');
var channelSchema = require('./channel.schema.server');
var channelModel = mongoose.model('projectchannelModel', channelSchema);

channelModel.findAllchannels = findAllchannels;
channelModel.findAllchannelsForUser = findAllchannelsForUser;
channelModel.createchannelForUser = createchannelForUser;
channelModel.findchannelById = findchannelById;
channelModel.updatechannel = updatechannel;
channelModel.deletechannel = deletechannel;
channelModel.addPageToArray = addPageToArray;

module.exports = channelModel;

function findchannelById(channelId){
    return channelModel.findById(channelId);
}

function updatechannel(channelId, channel){
    return channelModel.update({_id: channelId}, {$set: channel});
}

function deletechannel(channelId){
    return channelModel.remove({_id: channelId});
}

function createchannelForUser(channel){
    return channelModel.create(channel);
}

function findAllchannelsForUser(userId){
    return channelModel.find({_user: userId});
}

function findAllchannels(){
    return channelModel.find();
}

function addPageToArray(webId, page) {
    return channelModel.findById(webId)
        .then(function (channel) {
            channel.pages.push(page._id);
            return channel.save();
        });
}

