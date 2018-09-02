$(document).ready(function() {

    var api = "https://starlord.hackerearth.com/movieslisting";
    var movieData;

    $.ajax({
        type: "GET",
        url: api,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            movieData = data;
        }
    });

    $("#search").click(function() {

        var text = $("#searchText").val();
        if(text==""){
            alert("Enter a Search term.");
            return;
        }
        $("#result").empty();

        var noMatch = true;

        for (var i = 0; i < movieData.length; i++) {

            var title = movieData[i].movie_title.toLowerCase();
            var keyWords = movieData[i].plot_keywords;

            // Movie Title
            if (title.includes(text.toLowerCase()) || keyWordCheck(text, keyWords)) {
                var movieName = movieData[i].movie_title;
                var movieLink = movieData[i].movie_imdb_link;
                var director = movieData[i].director_name;
                var actors = movieData[i].actor_1_name + ", " +  movieData[i].actor_2_name;
                var genre = movieData[i].genres.split("|");
                var language = "Not Available";
                if (movieData[i].language != "") {
                    language = movieData[i].language;
                }
                var country = "Not Available";
                if (movieData[i].country != "") {
                    country = movieData[i].country;
                }
                var content_rating = "Not Available";
                if (movieData[i].content_rating != "") {
                    content_rating = movieData[i].content_rating;
                }
                var budget = "Not Available";
                if (movieData[i].budget != "") {
                    budget = movieData[i].budget + " USD";
                }
                var title_year = "Not Available";
                if (movieData[i].title_year != "") {
                    title_year = movieData[i].title_year;
                }

                var movieTitle = '<h3><a href=' + movieLink + ' target="_blank"><div class="list-group-item-info">' 
                + movieName + "</div></h3></a>";

                var additionalDetails = "<h4><b>Director</b> : " + director + "<br><b>Actors</b> : " + actors + "<br><b>Genre</b> : " + genre + "<br><b>Language</b> : " + language
                + "<br><b>Country</b> : " + country + "<br><b>Content-Rating</b> : " + content_rating + "<br><b>Budget</b> : " + budget + "<br><b>Year</b> : " + title_year + "</h4>";

                noMatch = false;
                $("#result").prepend(movieTitle + additionalDetails + "<br>");
            }
        }

        if (noMatch) {
            $("#result").prepend("<h4>No Results</h4>");
        }

    });
});

function keyWordCheck(text, keyWords) {
    var keys = keyWords.split("|");
    for (var i = 0 ; i< keys.length ; i++) {
        if (keys[i] == text.toLowerCase()) {
            return true;
        }
    }
    return false;
}