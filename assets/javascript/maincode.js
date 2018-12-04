$(document).ready()

var gifButtons = ["One Punch Man", "Mob Psycho 100", "Tommy Wiseau"];

renderButtons();

//Sets default parameters on page load
var rating = "G";
//Grabs the value from ratings dropdown menu and stores it in var
$("#ratingSelect").click(function () {
    rating = $(this).val();
});
var limit = 5;
//Grabs the value from limit dropdown menu and stores it in var
$("#limitSelect").click(function () {
    limit = $(this).val();
});

//Creates buttons when invoked
function renderButtons() {
    $("#buttonBody").empty();

    // renderPlusTenBtn();

    for (var i = 0; i < gifButtons.length; i++) {

        var newBtn = $("<button>")

        newBtn.addClass("btn gifBtn");

        newBtn.attr("value", gifButtons[i]);

        newBtn.text(gifButtons[i]);

        $("#buttonBody").append(newBtn);
    }
};

//Creates a button to request 10 more GIFs
// function renderPlusTenBtn() {
//     var tenBtn = $("<button>");

//     tenBtn.addClass("btn plus10");

//     tenBtn.text("+10");

//     $("#buttonBody").prepend(tenBtn);
// };


//Add Category button function
$("#addCat").click(function (event) {
    event.preventDefault();

    var newGif = $("#searchBar").val().trim();
    //If input field is blank, it will not create a button
    if (newGif === "") {
        console.log("Requires user input");
    }
    else {
        gifButtons.push(newGif);
    }
    console.log("Added: " + newGif);
    renderButtons();

});

// $(document).on("click", '.plus10', function () {
//     limit += 10;
//     console.log(limit);
// })

//Pressing "Enter" key will also add category button to div
$("#searchBar").keyup(function(e) {
    var code = e.which;
    if(code === 13) {
        $("#addCat").click();
    }
});

//Displays gifs on page
$(document).on("click", '.gifBtn', function () {
    $("#displayBody").empty();

    var gif = $(this).attr("value");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=1R8LZbSSu8CX60HOGVtzyg5aPpyZxprl&limit=" + limit +
        "&rating=" + rating + "&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(response.data);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");

                var title = $("<h6>").text(results[i].title);
                title.addClass("gif-title");

                var R = $("<p>").text("Rating: " + results[i].rating);
                R.addClass("gif-rating");

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

                gifDiv.append(gifImg, title, R);

                $("#displayBody").append(gifDiv);

                $("#gifDisplay").show();

            }
        })
});

//Looks for class "gif" and toggles still/animate function
$(document).on("click", '.gif', function () {

    var state = $(this).attr("state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("state", "still");
    }
});