exports.list = function(req, res){
    var line = req.body.line;
    line.id = linesInServer.length;
    linesInServer.push(line);
    res.json({});
};
