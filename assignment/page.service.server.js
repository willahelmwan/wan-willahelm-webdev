var app = require("../express");

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function deletePage(req, res){
    for(var p in pages){
        if(pages[p]._id === req.params.pageId){
            delete pages[p];
            res.send(pages);
            return;
        }
    }
    res.sendStatus(404);
}

function updatePage(req, res){
    var page = req.body;

    for(var p in pages){
        if(pages[p]._id === req.params.pageId){
            pages[p] = page;
            res.send(page);
            return;
        }
    }
    res.send("0");
}

function findPageById(req,res){
    for(var p in pages){
        if(pages[p]._id=== req.params.pageId){
            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}

function createPage(req, res){
    var page = req.body;
    var webId = req.params.websiteId;
    page._id = (new Date()).getTime() +"";
    page.websiteId= webId;
    pages.push(page);
    res.json(pages);
}

function findAllPagesForWebsite(req,res){
    var ps = [];
    for (var p in pages){
        if(pages[p].websiteId === req.params.websiteId) {
            ps.push(pages[p]);
        }
    }
    res.json(ps);
}
