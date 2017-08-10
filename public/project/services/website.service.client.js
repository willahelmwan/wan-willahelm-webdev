(function(){
    angular
        .module("omdbApp")
        .service("websiteService", websiteService);

    function websiteService($http){

        this.createWebsite = createWebsite;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function createWebsite(userId, website){
            var url = "/api/project/user/" + userId + "/website";
            return $http.post(url,website);
        }

        function findWebsitesByUser(userId){
            var url = "/api/project/user/" + userId + "/website";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findWebsiteById(wid){
            var url = "/api/project/website/" + wid;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updateWebsite(wid, website){
            var url = "/api/project/website/" + wid;
            return $http.put(url, website)
                .then(function(response){
                    return response.data;
                })
        }

        function deleteWebsite(wid){
            var url = "/api/project/website/" + wid;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                })
        }
    }
})();
