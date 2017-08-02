(function(){
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable(widgetService){
        var model = this;
        model.start = null;
        model.end = null;
        function linkFunction(scope, element){
            $(element).sortable({
                axis: 'y',
                start: function(event,ui){
                    model.start = ui.item.index();
                },
                stop: function(event, ui){
                    model.end = ui.item.index();
                    widgetService.updateSortIndex(model.start,model.end, scope.model.pageId);
                }
            });
        }
        return {
            link: linkFunction
        }
    }
})();
