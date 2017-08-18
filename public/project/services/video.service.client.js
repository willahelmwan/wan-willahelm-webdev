(function(){
    angular
        .module("omdbApp")
        .service("videoService", videoService);

    function videoService($http, $location){


        this.createVideo = createVideo;
        this.findAllVideos = findAllVideos;
        this.findVideoById = findVideoById;
        this.findVideoByCreator = findVideoByCreator;
        // this.findVideosByPageId = findVideosByPageId;
        this.updateVideo= updateVideo;
        this.deleteVideo = deleteVideo;
        // this.updateSortIndex = updateSortIndex;
        //
        // function updateSortIndex(start, end, pageId){
        //     var url = "/api/project/page/" + pageId + "/video?initial="+ start + "&final="+end;
        //     return $http.put(url)
        //         .then(function(response){
        //             return response.data;
        //         });
        // }

        function findAllVideos() {
            var url = "/api/project/allvideos";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
        }

        function findVideoByCreator(creatorId) {
            var url = "/api/project/allvideo/" + creatorId;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
        }

        function createVideo(video){
            var url = "/api/project/video";
            return $http.post(url, video)
                .then(function(response){
                    return response.data;
                })
        }

        // function findVideosByPageId(pid){
        //     var url = "/api/project/page/" + pid + "/video";
        //     return $http.get(url)
        //         .then(function(response){
        //             return response.data;
        //         });
        // }
        //
        function findVideoById(vid){
            var url = "/api/project/video/"+vid;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function updateVideo (vid, video){
            var url = "/api/project/video/"+vid;
            return $http.put(url, video)
                .then(function(response){
                    return response.data;
                });
        }
        
        function deleteVideo(vid){
            var url = "/api/project/video/" + vid;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
        }

        // function deleteVideo(wgid){
        //     var url = "/api/project/video/"+wgid;
        //     return $http.delete(url)
        //         .then(function(response){
        //             return response.data;
        //         });
        // }
    }
})();
