(function(){
    angular
        .module("WebAppMaker")
        .service("pageService", pageService);

    function pageService(){
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        this.createPage = createPage;
        this.findPageById = findPageById;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.updatePage= updatePage;
        this.deletePage = deletePage;

        function createPage(webId, page){
            page._id = (new Date()).getTime() +"";
            page.websiteId= webId;
            pages.push(page);
            return pages;
        }

        function findPageByWebsiteId(wid){
            var ps = [];
            for (var p in pages){
                if(pages[p].websiteId === wid) {
                    ps.push(pages[p]);
                }
            }
            return ps;
        }

        function findPageById(pid){
            for(var p in pages){
                if(pages[p]._id=== pid){
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function updatePage (pid, page){
            for(var p in pages){
                if(pages[p]._id === pid){
                    pages[p] = page;
                    return;
                }
            }
            return null;
        }

        function deletePage(pid){
            for(var p in pages){
                if(pages[p]._id === pid){
                    delete pages[p];
                    return;
                }
            }
        }
    }
})();
