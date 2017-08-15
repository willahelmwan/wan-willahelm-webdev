module.exports = function (app, model) {

    app.get("/ejs/form/:formId/details", renderFormDetails);

    function renderFormDetails(req, res) {
        var data = {
            form: model.findFormById(req.params.formId)
        };
        res.render("/Users/danscheirer/neu/wan-willahelm-webdev/public/project/views/ejs/form/form-details.view.server.ejs", data);
    }
};