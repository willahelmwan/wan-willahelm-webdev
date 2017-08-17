(function(){
    angular
        .module("omdbApp")
        .controller("videoEditController", videoNewController);

    function videoNewController(currentUser){
        var model = this;
        model.currentUser = currentUser;

        function init(){

        }
        init();

    }
})();
