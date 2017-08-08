(function(){
    angular
        .module("WebAppMaker")
        .service("flickrService", flickrService);

    function flickrService($http){
        this.searchPhotos = searchPhotos;

        var key = "6039e319e36110fd7dd6c6ddf751f0a9";
        var secret = "2c1307f2cbb65bc3";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
