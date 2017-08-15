module.exports = function (app) {

    var model = require('./models/form.model.server')();
    require('./controllers/form-list.controller.server')(app, model);
    require('./controllers/form-detail.controller.server')(app, model);

};
