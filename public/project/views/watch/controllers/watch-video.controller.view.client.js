(function(){
    angular
        .module("omdbApp")
        .controller("videoWatchController", videoWatchController);

    function videoWatchController($routeParams, videoService){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        // model.trustHtmlContent = trustHtmlContent;
        // model.trustUrlResource = trustUrlResource;
        model.getWidgetIncludeUrl = getWidgetIncludeUrl;

        function init(){
            videoService
                .findWidgetsByPageId(model.pageId)
                .then(function(widgets){
                    model.widgets = widgets;
                });
        }
        init();


        // function trustHtmlContent(htmlContent){
        //     return $sce.trustAsHtml(htmlContent);
        // }
        //
        // function trustUrlResource(url){
        //     var youtubeUrl = "https://www.youtube.com/embed/";
        //     var urlParts = url.split("/");
        //     youtubeUrl += urlParts[urlParts.length-1];
        //     return $sce.trustAsResourceUrl(youtubeUrl);
        // }

        function getWidgetIncludeUrl(widgetType){
            return "views/widget/templates/widget-" + widgetType + ".view.client.html";
        }
    }
})();
