var friends = require("../data/friends");
var validator = require("validator");
var escape = require("escape-html");

var allowedScores = ["1", "2", "3", "4", "5"];

module.exports = function(app){
    app.get("/api/friends", (req, res) => {
        res.json(friends);
    });

    app.post("/api/friends", (req, res) => {
        var newFriend = req.body;

        // Server-side validation for our fields
        var nameValid = !validator.isEmpty(newFriend.name);
        var imgValid = validator.isURL(newFriend.image);
        var scoreValuesValid = true;
        var scoresLengthValid = true;

        // jQuery doesn't send empty arrays, check if it exists before validating
        if(newFriend.scores){
            newFriend.scores.forEach((score) => {
                if(!validator.isIn(score, allowedScores))
                    scoreValuesValid = false;
            });
    
            scoresLengthValid = newFriend.scores.length === 10;
        }
        else
            scoresLengthValid = false;
        
        var scoresValid = scoreValuesValid && scoresLengthValid;

        if(!nameValid || !imgValid || !scoresValid){
            // Invalid, send bad request response
            res.status(400);
            var errObject = {
                validation: {}
            };

            if(!nameValid){
                errObject.validation.name = "Please enter a name";
            }
            if(!imgValid){
                errObject.validation.image = "Please enter a valid URL for your image link.";
            }
            if(!scoreValuesValid){
                errObject.validation.scoreValues = "Invalid score found.";
            }
            if(!scoresLengthValid){
                errObject.validation.scoreLength = "Please answer all of the questions.";
            }

            res.json(errObject);
            return;
        }

        var bestMatch;   
        var bestDifference = -1;
        // Find our closest match
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

        newFriend.name = escape(newFriend.name); // Escape any HTML found in the names

        friends.push(newFriend); 

        var responseObject = {
            created: newFriend,
            friend: bestMatch
        };

        res.json(responseObject);
    });
}