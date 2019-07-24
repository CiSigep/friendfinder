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
                console.log(data);
            });
        }

        return false;
    });
});