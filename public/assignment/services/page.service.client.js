(function(){
    angular
        .module("WebAppMaker")
        .service("pageService", pageService);

    function pageService($http){

        this.createPage = createPage;
        this.findPageById = findPageById;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.updatePage= updatePage;
        this.deletePage = deletePage;

        function createPage(webId, page){
            var url =　"/api/website/" + webId + "/page";
            return $http.post(url, page);
        }

        function findPageByWebsiteId(wid){
            var url = "/api/website/" + wid + "/page";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findPageById(pid){
            var url = "/api/page/" + pid;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updatePage (pid, page){
            var url = "/api/page/" + pid;
            return $http.put(url,page)
                .then(function(response){
                    return response.data;
                });
        }

        function deletePage(pid){
            var url = "/api/page/" + pid;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
        }
    }
})();
