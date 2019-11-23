var cityEl = $('#cityDiv');
var forecastEl = $('#nest2');
var searchF = $('#searchForm');
var searchB = $('#searchBar');
var historyEl = $('#history');





var APIKey = '7eb2e3aab4d0bbe005ec0933144dbca0';
// Weather API


// 5 Day forecast API
var queryURL2 = 'https://api.openweathermap.org/data/2.5/forecast?id=4366647&units=imperial&appid=' + APIKey;






$(document).ready(
    searchF.on('submit', function() {

        event.preventDefault();
        let historyDiv = $('<div>');
        var cityQ = searchB.val();
        historyLink = $('<p>').text(cityQ);
        historyEl.append(historyLink);
        console.log(cityQ);
        // var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" +
        //     cityQ + "&units=imperial&appid=" + APIKey;

        var queryURL1 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityQ + '&units=imperial&appid=' + APIKey;
        // Weather API
        $.ajax({
                url: queryURL1,
                method: 'GET'
            })
            .then(function(data) {
                console.log(data);
                // Reset Div
                cityEl.empty();
                var brk = $('<br>');

                // City Name
                var city = $('<h2>');
                city.text('City name: ' + data.city.name);
                city.attr('id', 'cityName');
                cityEl.append(city);

                var lat = data.city.coord.lat;
                var lon = data.city.coord.lon;
                var uvUrl = 'http://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;


                // Temperature
                var temp = $('<p>');
                temp.text('Current Temperature: ' + data.list[0].main.temp);
                temp.addClass('cityPg');
                cityEl.append(temp);


                // Humidity
                var humidity = $('<p>').text('Humidity: ' + data.list[0].main.humidity + '%');
                humidity.addClass('cityPg');
                cityEl.append(humidity);


                // Wind Speed
                var wind = $('<p>').text('Wind Speed: ' + data.list[0].wind.speed + ' MPH');
                wind.addClass('cityPg');
                cityEl.append(wind);

                // UV
                $.ajax({
                        url: uvUrl,
                        method: 'GET'
                    })
                    .then(function(uvData) {

                        var uvIndex = uvData.value;
                        var uv = $('<p>');
                        uv.html('UV Index: <span id="uvSpan">' + uvIndex + '</span>');
                        console.log(uvIndex);

                        if (uvIndex >= 0 && uvIndex <= 3) {
                            $(uv).addClass('lowUV');
                        } else if (uvIndex > 3 && uvIndex <= 6) {
                            $(uv).addClass('medUV');
                        } else if (uvIndex > 6) {
                            $(uv).addClass('highUV')
                        }
                        cityEl.append(uv);
                    })

                // Function to grab basic weather info about city, will grab city name from search bar input
                btn1.on('click', function() {
                        // Reset Div
                        cityEl.empty();
                        var brk = $('<br>');

                        // City Name
                        var city = $('<h2>');
                        city.text('City name: ' + data.city.name);
                        city.attr('id', 'cityName');
                        cityEl.append(city);






                        // UV Index


                    }

                );

            });
    })

);









// 5 Day forecast API
// $.ajax({
//     url: queryURL2,
//     method: 'GET'

// })
// .then(function(response) {

//     btn2.on('click', function() {
//         var lat = response.city.coord.lat;
//         var lon = response.city.coord.lon;
//         var uvUrl = 'http://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;
//         console.log(uvUrl);
//         cityEl.empty();
//         console.log(response);
//         console.log('latitude: ' + response.city.coord.lat + '  ' + 'longitude:' + response.city.coord.lon);

//         var weatherBlockEl = $('<div>');
//         weatherBlockEl.addClass('weatherBlock');

//         // City Name
//         var city = $('<h2>');
//         city.text('City name: ' + response.city.name);
//         city.attr('id', 'cityName');
//         cityEl.append(city);


//         // Temperature
//         var temp = $('<p>');
//         temp.text('Current Temperature: ' + response.list[0].main.temp);
//         temp.addClass('cityPg');
//         cityEl.append(temp);


//         // Humidity
//         var humidity = $('<p>').text('Humidity: ' + response.list[0].main.humidity + '%');
//         humidity.addClass('cityPg');
//         cityEl.append(humidity);


//         // Wind Speed
//         var wind = $('<p>').text('Wind Speed: ' + response.list[0].wind.speed + ' MPH');
//         wind.addClass('cityPg');
//         cityEl.append(wind);

//         // UV
//         $.ajax({
//                 url: uvUrl,
//                 method: 'GET'
//             })
//             .then(function(uvData) {

//                 var uvIndex = uvData.value;
//                 var uv = $('<p>').html('UV Index: <span id="uvSpan">' + uvIndex + '</span>');
//                 console.log(uvIndex);
//                 $(uv).addClass('lowUV');
//                 if (0 <= uvIndex <= 4) {

//                 }
//                 cityEl.append(uv);
//             })

// var rawDate = new Date((response.list[16].dt) * 1000);
// var d = rawDate.getDate();
// var m = rawDate.getMonth();
// var y = rawDate.getFullYear();
// var date = (m + '/' + d + '/' + y);