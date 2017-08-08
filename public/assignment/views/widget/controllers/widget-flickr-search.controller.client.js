(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController(flickrService, $location, $routeParams, widgetService){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.widgetId = $routeParams.wgid;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init(){
            widgetService
                .findWidgetById(model.widgetId)
                .then(function(widget){
                    model.widget = widget;
                });
        }
        init();

        function selectPhoto(photo){
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            model.widget.url = url;
            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function(){
                    $location.url("user/" + model.userId +"/website/"+ model.webId +"/page/" + model.pageId +"/widget/"+model.widgetId);
                });

        }
        function searchPhotos(searchTerm){
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }
    }
})();
