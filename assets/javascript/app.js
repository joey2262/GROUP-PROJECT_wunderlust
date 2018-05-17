$(document).ready(function () {
    //Array for searched topics to be added
    var topics = [];

    //Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
    //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
    function displayDisneyCharacter() {

        var x = $(this).data("search");
        console.log(x);

        //curl -X GET --header "Accept: application/json" --header "user-key: 54cf56ac7981c92bf4197aa71e708a74" "https://developers.zomato.com/api/v2.1/restaurant?res_id=name"

        //https://developers.zomato.com/api/v2.1/search?q=
        var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + x + "&api_key=54cf56ac7981c92bf4197aa71e708a74&limit=5";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            console.log(results);
        });



        