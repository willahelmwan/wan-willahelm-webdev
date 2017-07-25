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

        // this.createWebsite = createWebsite;
        // this.findWebsitesByUser = findWebsitesByUser;
        // this.findWebsiteById = findWebsiteById;
        // this.updateWebsite = updateWebsite;
        // this.deleteWebsite = deleteWebsite;

        // function createWebsite(userId, website){
        //     website._id = (new Date()).getTime() +"";
        //     website.developerId= userId;
        //     websites.push(website);
        //     return websites;
        // }
        //
        // function findWebsitesByUser(userId){
        //     var sites = [];
        //     for (var w in websites){
        //         if(websites[w].developerId === userId) {
        //             sites.push(websites[w]);
        //         }
        //     }
        //     return sites;
        // }
        //
        // function findWebsiteById(wid){
        //     for(var w in websites){
        //         if(websites[w]._id=== wid){
        //             return websites[w];
        //         }
        //     }
        //     return null;
        // }
        //
        // function updateWebsite(wid, website){
        //     for(var w in websites){
        //         if(websites[w]._id === wid){
        //             websites[w] = website;
        //             return;
        //         }
        //     }
        //     return null;
        // }
        //
        // function deleteWebsite(wid){
        //     for(var w in websites){
        //         if(websites[w]._id === wid){
        //             delete websites[w];
        //             return;
        //         }
        //     }
        // }
    }
})();
