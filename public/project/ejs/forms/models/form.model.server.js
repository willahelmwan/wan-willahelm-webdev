module.exports = function () {
    var forms = require('./form.mock.server.json');

    var api = {
        createForm: createForm,
        findAllForms: findAllforms,
        deleteForm: deleteForm,
        findFormById: findFormById,
        updateForm: updateForm
    };
    return api;

    function updateForm(form) {
        for (var f in forms) {
            if (form._id == forms[f]._id) {
                forms[f] = form;
            }
        }
    }

    function findFormById(formId) {
        for (var f in forms) {
            if (formId == forms[f]._id) {
                return forms[f];
            }
        }
    }

    function deleteForm(formId) {
        for (var f in forms) {
            if (formId == forms[f]._id) {
                forms.splice(f, 1);
            }
        }
    }

    function createForm(form) {
        form._id = (new Date).getTime();
        forms.push(form);
    }

    function findAllforms() {
        return forms;
    }
};