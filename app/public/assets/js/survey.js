$(() => {
    $("#surveySubmit").on("click", (e) => {
        var sendData = {
            name: $("#nameInput").val().trim(),
            image: $("#imgInput").val().trim(),
            scores: []
        };

        $("input[name^=question]:checked").each((i, ele) => {
            sendData.scores.push($(ele).val());
        });

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
            });
        }

        return false;
    });
});