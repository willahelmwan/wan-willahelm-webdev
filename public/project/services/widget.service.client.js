(function(){
    angular
        .module("omdbApp")
        .service("widgetService", widgetService);

    function widgetService($http, $location){


        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.updateWidget= updateWidget;
        this.deleteWidget = deleteWidget;
        this.updateSortIndex = updateSortIndex;

        function updateSortIndex(start, end, pageId){
            var url = "/api/project/page/" + pageId + "/widget?initial="+ start + "&final="+end;
            return $http.put(url)
                .then(function(response){
                    return response.data;
                });
        }

        function createWidget(pageId, widget){
            var url = "/api/project/page/"+pageId+"/widget";
            return $http.post(url, widget)
                .then(function(response){
                    return response.data;
                })
        }

        function findWidgetsByPageId(pid){
            var url = "/api/project/page/" + pid + "/widget";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findWidgetById(wgid){
            var url = "/api/project/widget/"+wgid;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function updateWidget (wgid, widget){
            var url = "/api/project/widget/"+wgid;
            return $http.put(url, widget)
                .then(function(response){
                    return response.data;
                });
        }

        function deleteWidget(wgid){
            var url = "/api/project/widget/"+wgid;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
        }
    }
})();