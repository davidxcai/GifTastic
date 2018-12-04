$(document).ready()

var gifButtons = [];

// var rating = $("#ratingSelect").attr("value");

// var limit = $("#limitSelect option").click(function(e){
//     $("#ratingSelect").text(this.innerHTML);
// });

$(".gifBtn").on("click", function () {
    $("#displayBody").empty();

    var gif = $(this).attr("value");

    var limit = 5;
    
    var rating = "G";

    // var rating = $("#ratingSelect option").attr("value");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=1R8LZbSSu8CX60HOGVtzyg5aPpyZxprl&limit=" + limit +
        "&rating=" + rating + "&lang=en"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);

                console.log(response);

                console.log("limit: " + limit);

                console.log("rating: " + rating);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");

                    var p = $("<p>").text("Rating: " + results[i].rating);

                    var gifImg = $("<img>");

                    var stillImage = results[i].images.fixed_height_still.url;

                    var animateImage = results[i].images.fixed_height.url;

                    gifImg.attr({
                        src: stillImage,
                        still: stillImage,
                        animate: animateImage,
                        state: "still",
                        class: "gif"
                    });

                    gifDiv.append(gifImg, p);

                    $("#displayBody").append(gifDiv);

                }
            })
})

$(document).on("click", '.gif', function(){

    var state = $(this).attr("state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("state", "still");
    }
})