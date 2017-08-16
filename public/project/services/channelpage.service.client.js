(function(){
    angular
        .module("omdbApp")
        .service("channelpageService", channelpageService);

    function channelpageService($http){

        this.createchannelPage = createchannelPage;
        this.findchannelPageById = findchannelPageById;
        this.findchannelPageBychannelId = findchannelPageBychannelId;
        this.updatechannelPage= updatechannelPage;
        this.deletechannelPage = deletechannelPage;

        function createchannelPage(channelId, channelpage){
            var url =　"/api/project/channel/" + channelId + "/channelpage";
            return $http.post(url, channelpage);
        }

        function findchannelPageBychannelId(cid){
            var url = "/api/project/channel/" + cid + "/channelpage";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findchannelPageById(cpid){
            var url = "/api/project/channelpage/" + cpid;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updatechannelPage (cpid, channelpage){
            var url = "/api/project/channelpage/" + cpid;
            return $http.put(url,channelpage)
                .then(function(response){
                    return response.data;
                });
        }

        function deletechannelPage(cpid){
            var url = "/api/project/channelpage/" + cpid;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
        }
    }
})();
