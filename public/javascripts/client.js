function ChatViewModel(nickname){
    var self = this;
    this.nickname = nickname;
    //array of: {id:<num>, sender:<string>, message:<string>}
    this.lines = ko.observableArray([{
                    id:0,
                    sender:'Chat',
                    message:'Welcome to the chat.'
                 }]);
    this.input = ko.observable('');
    this.fetch = function(){
        $.getJSON('lines', {
                last: this.lines()[this.lines().length - 1].id,
                max: 25},
            function(fetchedLines){
                for(var i = 0; i < fetchedLines.length; i++){
                    self.lines.push(fetchedLines[i]);
                }
        });
    };
    this.send = function(){
        $.post('send', 
            {line: {
                sender: this.nickname,
                message: this.input()
            }}, 'json');
        this.input('');
    };

    //start fetching
    setInterval(function(){
        self.fetch();
    },200);
}

var fake$ = {
    linesInServer: [{
                    id:0,
                    sender:'Chat',
                    message:'Welcome to the chat.'
                 }],
    getJSON : function(url, data, callback){
        var lastLineId = data.last,
            lastLineIndex, 
            i;
        for(i = 0; i < this.linesInServer.length; i++){
            if(this.linesInServer[i].id === lastLineId){
                lastLineIndex = i;
                break;
            }
        }
        var forSending  = [];
        for(i = lastLineIndex + 1; i < this.linesInServer.length; i++){
            forSending.push(this.linesInServer[i]);
        }
        callback(forSending);
    },
    postJSON: function(url, data){
        var line = data.line;
        line.id = this.linesInServer.length;
        this.linesInServer.push(line);
    }
};

