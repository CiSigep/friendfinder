var friends = require("../data/friends");

module.exports = function(app){
    app.get("/api/friends", (req, res) => {
        res.json(friends);
    });

    app.post("/api/friends", (req, res) => {
        var newFriend = req.body; // TODO: Add validation and escape HTML

        var bestMatch;   
        var bestDifference = -1;
        friends.forEach((friend) => {
            var totalDifference = 0;
            for(var i = 0; i < 10; i++){
                newFriend.scores[i] = parseInt(newFriend.scores[i]);
                totalDifference += Math.abs(newFriend.scores[i] - friend.scores[i]);
            }
            if(bestDifference === -1 || totalDifference < bestDifference){
                bestMatch = friend;
                bestDifference = totalDifference;
            }
        });


        friends.push(req.body); 

        var responseObject = {
            created: newFriend,
            friend: bestMatch
        };

        res.json(responseObject);
    });
}