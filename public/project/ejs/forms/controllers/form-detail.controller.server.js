module.exports = function(app, model){
    app.get("/ejs/form/:formId/details", renderAllFormDetails);

    function renderAllFormDetails(req, res) {
        var data = {
            form: model.findFormById(req.params.formId)
        };
        res.render("../public/project/views/ejs/form/form-details.view.server.ejs", data)

    }
};