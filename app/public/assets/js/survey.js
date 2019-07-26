$(() => {
    $("#surveySubmit").on("click", (e) => {
        $("[id$=Error]").empty();

        var sendData = {
            name: $("#nameInput").val().trim(),
            image: $("#imgInput").val().trim(),
            scores: []
        };

        $("input[name^=question]:checked").each((i, ele) => {
            sendData.scores.push($(ele).val());
        });

        // Client side check before attempting to send the data.
        if(sendData.name !== "" && sendData.image !== "" && sendData.scores.length === 10){
            $.post("/api/friends", sendData).then((data) => {
                $("#friendDisplay").empty();

                var friend = data.friend;

                var friendNameDiv = $("<div>").text("Name: " + friend.name).addClass("mb-2");
                var friendImgDiv = $("<div>");

                var friendImg = $("<img>").attr("src", friend.image);
                friendImg.attr("alt", friend.name);
                friendImg.addClass("img-thumbnail mh-200px");
                friendImgDiv.append(friendImg).addClass("text-center");

                $("#friendDisplay").append(friendNameDiv, friendImgDiv);

                $("#friendModal").modal();
            }).fail((err) => {
                // Validation errors from the server.
                var errData = err.responseJSON;

                if(errData.validation.name)
                    $("#nameError").text(errData.validation.name);
                if(errData.validation.image)
                    $("#imageError").text("Please enter a valid URL for your image link.");
                if(errData.validation.scoreLength)
                    $("#validationError").text(errData.validation.scoreLength);
                if(errData.validation.scoreValues){
                    if($("#validationError").text().length > 0)
                        $("#validationError").text($("#validationError").text() + " ");
                    $("#validationError").text($("#validationError").text() + errData.validation.scoreValues);
                }
                
            });
        }
        else {
            if(sendData.name === "")
                $("#nameError").text("Please enter a name.");
            if(sendData.image === "")
                $("#imageError").text("Please enter a valid URL for your image link.");
            if(sendData.scores.length !== 10)
                $("#validationError").text("Please answer all of the questions.");
        }

        return false;
    });
});