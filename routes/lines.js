
/*
 * GET users listing.
 */
var url = require('url');

exports.list = function(req, res){
        var queryData = url.parse(req.url, true).query;
        var lastLineId = queryData.last,
            maxLines = queryData.max,
            lastLineIndex,
            i;
        for(i = 0; i < linesInServer.length; i++){
            if(linesInServer[i].id == lastLineId){
                lastLineIndex = i;
                break;
            }
        }
        var forSending  = [];
        if(maxLines && linesInServer.length - lastLineIndex > maxLines){
            lastLineIndex = linesInServer.length - maxLines - 1;
        }
        for(i = lastLineIndex + 1; i < linesInServer.length; i++){
            forSending.push(linesInServer[i]);
        }
        res.json(forSending);
};
