function random(array){
    return Math.floor(Math.random()*array.length);
    // return Math.floor(Math.random()*array.length)
}

var city;
var urban;
var urbanURL;
var cityID;
var timezone;
var cityURL;

var activityOption = [
    "4d4b7104d754a06370d81259", //ArtsAndEntertainment
    "4d4b7105d754a06376d81259", //NightlifeSpot 
    "4d4b7105d754a06377d81259", //OutdoorsRecreation 
    "4d4b7105d754a06373d81259"  //OtherEvent
];


function pickCity(){

    var queryURL = "https://api.teleport.org/api/urban_areas/";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var cities = response._links["ua:item"];
        cityRoot = cities[random(cities)];
        urbanURL = cityRoot.href;
            
        city = cityRoot.name;

        $(".city-name").text(city);
        //   console.log(urbanURL);
          urbanInfo();
          getWeather();
          for(var i = 0; i < activityOption.length; i++){
          fourSquare(i);
          }

    });
}      

function urbanInfo() {
    $.ajax({
        url: urbanURL,
        method: "GET"
    }).done(function (response) {
        // console.log(response);
        urban = response;
        // console.log(urban);
        cityInfo();
    });      
}

function cityInfo() {
    cityURL = urban._links["ua:identifying-city"].href;
    // console.log(cityURL);

    $.ajax({
        url: cityURL,
        method: "GET"
    }).done(function (response) {
        // console.log(response);
        timezone = response._links["city:timezone"].name;
        // console.log(timezone);
    });      
}

//JOEY'S VARIABLES:
//  CITY NAME : var city
//  TIMEZONE : var timezone

$("body").on("click" , ".wunderlust-btn" , pickCity);







//API link with "city" variable plugged in between.  Parameter "near" takes the city name.

function fourSquare(query){
var clientSecret=[
    "HLFDLMAMHMQWMTJX3H2O3TIK2JOAKLUJD4NOTIDRGKP1MVR5",
    "BI42KWF4MSAGRFOYX1H0LO4ERS2GEFF3UL32VGIPQKLPLGW5"
];


var clietId =[
    "EDXCMO051UQ0ANTH2B53BJ400U01LR2YYAGOLIV142BBZNGT",
    "APG3IG5Z23XQFAHJ2OEIL315CCY4ZIYVNJHNNKSV4X5SIZPB"
];
var queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=EDXCMO051UQ0ANTH2B53BJ400U01LR2YYAGOLIV142BBZNGT&client_secret=HLFDLMAMHMQWMTJX3H2O3TIK2JOAKLUJD4NOTIDRGKP1MVR5&near=" + city + "&v=20180323&" + activityOption[query];


//API link with "city" variable plugged in between.  Parameter "near" takes the city name.


// var fourSheader = 
// var fourSlink = 
// var fourDescription =

// var activyOption = [
//     "ArtsAndEntertainment: 4d4b7104d754a06370d81259",
//     "NightlifeSpot: 4d4b7105d754a06376d81259",
//     "OutdoorsRecreation: 4d4b7105d754a06377d81259",
//     "OtherEvent: 4d4b7105d754a06373d81259"
// ];

// Arts and Entertainment:  4d4b7104d754a06370d81259
// Nightlife Spot:  4d4b7105d754a06376d81259
// Outdoors & Recreation:  4d4b7105d754a06377d81259
// Event:  4d4b7105d754a06373d81259

$.ajax({
   url: queryURL,
   method: "GET"
}).done(function (response) {
   console.log(response);
   var itemsArr = response.response.groups["0"].items;
   $(".content-"+query).empty();
   console.log(itemsArr);
    for(i = 0; i < 3; i++){
        //determines if itemsArr still has content
        if(itemsArr){
            //rand grabs random index from itemsArr
            var rand = random(itemsArr)
            // console.log(itemsArr[rand]);
            //After printing itemsArr[rand] this array element is removed to prevent it from appearing again
            var venue = itemsArr[rand]["venue"];
            var name = $("<h3 class='4sq-name'>").text(venue.name);
            var category = $("<p class='4sq-cat'>").text("Category: " + venue.categories[0].name + " ");
            console.log(category);
            var address = $("<p class='4sq-add'>").text(venue.location.address + ", " + city);
            console.log(address);
            // console.log(category);
            var container = $("<div class='venue-card col m4'>").append(name,category,address);
            $(".content-"+query).append(container);
            itemsArr.splice(rand,1);
        }
    }

//    console.log(response.response.groups["0"].items["0"].venue.name);
//    console.log(response.response.groups["0"].items["0"].venue.categories["0"].name);
//    for (var i = 0; i < response.response.groups["0"].items["0"].venue.location.formattedAddress.length; i++) {
//        console.log(response.response.groups["0"].items["0"].venue.location.formattedAddress[i])
   
//    }
   
});
}


//CLOCK AND WEATHER
function getWeather(){
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q="+city+"&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $(".city").html("<h3>" + response.name);
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".temp").text("Temperature (F) " + response.main.temp);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      });
    }

    //   function showTime(){
    //     console.log("city " + city);
    //     // var date = moment.tz("2014-06-01 12:00", "America/New_York");
    //     var date = new Date();
    //     console.log(date);
    //     var h = date.getHours(); // 0 - 23
    //     var m = date.getMinutes(); // 0 - 59
    //     var s = date.getSeconds(); // 0 - 59
    //     var session = "AM";
        
    //     if(h == 0){
    //         h = 12;
    //     }
        
    //     if(h > 12){
    //         h = h - 12;
    //         session = "PM";
    //     }
        
    //     h = (h < 10) ? "0" + h : h;
    //     m = (m < 10) ? "0" + m : m;
    //     s = (s < 10) ? "0" + s : s;
        
    //     var time = h + ":" + m + ":" + s + " " + session;
    //     document.getElementById("MyClockDisplay").innerText = time;
    //     document.getElementById("MyClockDisplay").textContent = time;
        
    //     setTimeout(showTime, 1000);   
    // }
    
    // showTime();
    // function getTime(){
    //     var date = moment.tz(timezone);     
    //     console.log("date " + date);
    //     console.log(date);
    // }
    // setTimeout(getTime, 3000);
