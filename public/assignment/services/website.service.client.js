(function(){
    angular
        .module("WebAppMaker")
        .service("websiteService", websiteService);

    function websiteService($http){

        this.createWebsite = createWebsite;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function createWebsite(userId, website){
            var url = "/api/user/" + userId + "/website";
            return $http.post(url,website);
        }

        function findWebsitesByUser(userId){
            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findWebsiteById(wid){
            var url = "/api/website/" + wid;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updateWebsite(wid, website){
            var url = "/api/website/" + wid;
            return $http.put(url, website)
                .then(function(response){
                    return response.data;
                })
        }

        function deleteWebsite(wid, website){
            var url = "/api/website/" + wid +"/"+ website._user;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                })
        }
    }
})();
