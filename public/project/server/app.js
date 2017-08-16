var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/webdev_2017'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds151232.mlab.com:51232/heroku_z06hhkkx'; // user yours

}
mongoose.connect(connectionString, { useMongoClient: true });

// mongoose.connect('mongodb://localhost/webdev_2017', {
//     useMongoClient: true
//     });
mongoose.Promise = require('q').Promise;

require("./services/user.service.server");
require("./services/watchlist.service.server");
require("./services/page.service.server");
require("./services/widget.service.server");
require("./services/comment.service.server");
require("./services/video.service.server");
require("./services/channel.service.server");
require("./services/channelpage.service.server");
