var mongoose = require('mongoose');
var channelpageSchema = require('./channelpage.schema.server');
var channelpageModel = mongoose.model('projectchannelPageModel', channelpageSchema);

channelpageModel.findAllchannelPagesForchannel = findAllchannelPagesForchannel;
channelpageModel.createchannelPage = createchannelPage;
channelpageModel.findchannelPageById = findchannelPageById;
channelpageModel.updatechannelPage = updatechannelPage;
channelpageModel.deletechannelPage = deletechannelPage;
// channelpageModel.addWidgetToArray = addWidgetToArray;

module.exports = channelpageModel;

function findchannelPageById(channelpageId){
    return channelpageModel.findById(channelpageId);
}

function createchannelPage(channelId, channelpage){
    channelpage._channel = channelId;
    return channelpageModel.create(channelpage);
}

function findAllchannelPagesForchannel(channelId){
    return channelpageModel.find({_channel: channelId});
}

function updatechannelPage(channelpageId, channelpage){
    return channelpageModel.update({_id: channelpageId}, {$set: channelpage});
}

function deletechannelPage(channelpageId){
    return channelpageModel.remove({_id: channelpageId});
}








