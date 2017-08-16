(function(){
    angular
        .module("omdbApp")
        .service("channelService", channelService);

    function channelService($http){

        this.createchannel = createchannel;
        this.findchannelsByUser = findchannelsByUser;
        this.findchannelById = findchannelById;
        this.updatechannel = updatechannel;
        this.deletechannel = deletechannel;

        function createchannel(userId, channel){
            var url = "/api/project/channel";
            return $http.post(url,channel);
        }

        function findchannelsByUser(userId){
            var url = "/api/project/channel";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findchannelById(wid){
            var url = "/api/project/channel/" + wid;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updatechannel(wid, channel){
            var url = "/api/project/channel/" + wid;
            return $http.put(url, channel)
                .then(function(response){
                    return response.data;
                })
        }

        function deletechannel(wid){
            var url = "/api/project/channel/" + wid;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                })
        }
    }
})();
