(function(){
    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);

    function widgetService(){
        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        // this.createPage = createPage;
        this.findWidgetById = findWidgetById;
        this.findWidgetsByPageId = findWidgetsByPageId;
        // this.updatePage= updatePage;
        // this.deletePage = deletePage;
        //
        // function createPage(webId, page){
        //     page._id = (new Date()).getTime() +"";
        //     page.websiteId= webId;
        //     pages.push(page);
        //     return pages;
        // }
        //
        function findWidgetsByPageId(pid){
            var ws = [];
            for (var w in widgets){
                if(widgets[w].pageId === pid) {
                    ws.push(widgets[w]);
                }
            }
            return ws;
        }

        function findWidgetById(wgid){
            for(var w in widgets){
                if(widgets[w]._id=== wgid){
                    return widgets[w];
                }
            }
            return null;
        }

        // function updatePage (pid, page){
        //     for(var p in pages){
        //         if(pages[p]._id === pid){
        //             pages[p] = page;
        //             return;
        //         }
        //     }
        //     return null;
        // }
        //
        // function deletePage(pid){
        //     for(var p in pages){
        //         if(pages[p]._id === pid){
        //             delete pages[p];
        //             return;
        //         }
        //     }
        // }
    }
})();
