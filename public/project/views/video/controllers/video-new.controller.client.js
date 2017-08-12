(function(){
    angular
        .module("omdbApp")
        .controller("videoNewController", videoNewController);

    function videoNewController(currentUser){
        var model = this;
        model.currentUser = currentUser;

        function init(){

        }
        init();

    }
})();
