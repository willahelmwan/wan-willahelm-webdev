(function(){
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable(){
        function linkFunction(scope, element){
            $(element).sortable({axis: 'y'});
        }
        return {
            link: linkFunction
        }
    }
})();
