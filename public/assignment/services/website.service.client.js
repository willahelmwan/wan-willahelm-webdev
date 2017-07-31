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

            // website._id = (new Date()).getTime() +"";
            // website.developerId= userId;
            // websites.push(website);
            // return websites;
        }

        function findWebsitesByUser(userId){
            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });

            // var sites = [];
            // for (var w in websites){
            //     if(websites[w].developerId === userId) {
            //         sites.push(websites[w]);
            //     }
            // }
            // return sites;
        }

        function findWebsiteById(wid){
            var url = "/api/website/" + wid;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });

            // for(var w in websites){
            //     if(websites[w]._id=== wid){
            //         return angular.copy(websites[w]);
            //     }
            // }
            // return null;
        }

        function updateWebsite(wid, website){
            var url = "/api/website/" + wid;
            return $http.put(url, website)
                .then(function(response){
                    return response.data;
                })
            // for(var w in websites){
            //     if(websites[w]._id === wid){
            //         websites[w] = website;
            //         return;
            //     }
            // }
            // return null;
        }

        function deleteWebsite(wid){
            var url = "/api/website/" + wid;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                })
            // for(var w in websites){
            //     if(websites[w]._id === wid){
            //         delete websites[w];
            //         return;
            //     }
            // }
        }
    }
})();
