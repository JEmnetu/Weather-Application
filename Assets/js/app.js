$(document).ready(function() {
    var cityEl = $('#cityDiv');
    var forecastEl = $('#nest2');
    var searchF = $('#searchForm');
    var searchB = $('#searchBar');
    var searchBtn = $('#searchButton');
    var historyEl = $('#history');
    var firstCard = $('#card1');
    var secondCard = $('#card2');
    var thirdCard = $('#card3');
    var fourthCard = $('#card4');
    var fifthCard = $('#card5');
    var citiesList = [];
    var previousCities = '';
    var cityQ = '';
    var butto = $('#btnn');
    // var cities = JSON.parse(localStorage.getItem('cities'));






    var APIKey = '7eb2e3aab4d0bbe005ec0933144dbca0';
    // Weather API


    // 5 Day forecast API
    var queryURL2 = 'https://api.openweathermap.org/data/2.5/forecast?id=4366647&units=imperial&appid=' + APIKey;

    // function renderHistory() {
    //     for (i = 0; i < cities.length(); i++) {
    //         console.log(cities[i]);
    //     }
    // }

    function clearDivs() {
        firstCard.empty();
        secondCard.empty();
        thirdCard.empty();
        fourthCard.empty();
        fifthCard.empty();
    }

    function clearHistory() {
        historyEl.empty();
        cityEl.empty();
        firstCard.empty();
        secondCard.empty();
        thirdCard.empty();
        fourthCard.empty();
        fifthCard.empty();

        console.log(localStorage);
        localStorage.clear();
        console.log(localStorage);

    }
    // Display Data for 5 day forecast





    function currentWeather() {
        var queryURL1 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityQ + '&units=imperial&appid=' + APIKey;
        // Weather API
        $.ajax({
                url: queryURL1,
                method: 'GET'
            })
            .then(function(data) {

                // Reset Divs
                // firstCard.empty();
                cityEl.empty();
                var brk = $('<br>');

                // City Name + Date

                var city = $('<div>');

                var rawDate = new Date((data.city.sunrise) * 1000);
                var d = rawDate.getDate();
                var m = rawDate.getMonth() + 1;
                var y = rawDate.getFullYear();
                var date = (m + '/' + d + '/' + y);


                city.html('<h1 id="cityName"> ' + data.city.name + ' ' + date + '</h1>');
                // city.attr('id', 'cityName');
                cityEl.append(city);

                // Coordinates for UV API call
                var lat = data.city.coord.lat;
                var lon = data.city.coord.lon;
                var uvUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;



                // Temperature
                var temp = $('<div>');
                temp.html('<p>Current Temperature: ' + data.list[0].main.temp + '&#8457</p>');
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
                var counter = 1;

                for (var i = 3; i < data.list.length; i += 8) {



                    var weatherCard = $("div[data-count='" + counter + "']");
                    var rawDate = new Date((data.list[i].dt) * 1000);
                    var d = rawDate.getDate();
                    var m = rawDate.getMonth() + 1;
                    var y = rawDate.getFullYear();
                    var date = (m + '/' + d + '/' + y);

                    var dateEl = $('<h5>');
                    dateEl.text(date);
                    weatherCard.append(dateEl);
                    // $.ajax({
                    //         url: 'https://api.openweathermap.org/data/2.5/weather?q=' + cityQ + '&units=imperial&appid=' + APIKey,
                    //         method: 'GET'
                    //     })
                    //     .then(function(iconData) {

                    //         var pic = $('<img>');
                    //         var picSrc = 'http://openweathermap.org/img/wn/' + iconData.weather[0].icon + '@2x.png';
                    //         pic.attr('src', picSrc);
                    //         weatherCard.append(pic);

                    //     })

                    var weatherBlockTemp = $('<div>');
                    weatherBlockTemp.html('<p>' + data.list[i].main.temp + '&#8457</p>');


                    weatherCard.append(weatherBlockTemp);


                    var weatherIcon = $('<img>');
                    iconSrc = 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png';
                    weatherIcon.attr('src', iconSrc);
                    weatherIcon.attr('width', '60px');
                    weatherIcon.attr('height', '60px')
                    weatherCard.append(weatherIcon);
                    var humidity2 = $('<p>').text('Humidity: ' + data.list[i].main.humidity + ' %');
                    weatherCard.append(humidity2);


                    counter += 1;

                }
                // UV
                $.ajax({
                        url: uvUrl,
                        method: 'GET'
                    })
                    .then(function(uvData) {

                        var uvIndex = uvData.value;
                        var uv = $('<p>');
                        uv.html('UV Index: <span id="uvSpan">' + uvIndex + '</span>');


                        if (uvIndex >= 0 && uvIndex <= 3) {
                            $(uv).addClass('lowUV');
                        } else if (uvIndex > 3 && uvIndex <= 6) {
                            $(uv).addClass('medUV');
                        } else if (uvIndex > 6) {
                            $(uv).addClass('highUV')
                        }
                        cityEl.append(uv);
                    })

            })


    }

    // function initialize() {

    //     if (cities === null) {
    //         cities = [];
    //     }
    //     citiesList = cities;
    //     console.log(cities);
    // }

    function search() {
        event.preventDefault();
        cityQ = searchB.val();

        if (cityQ !== '') {
            clearDivs();
            currentWeather();
            renderWeather();

        }
    }

    function renderWeather() {
        historyLink = $('<div>');
        historyText = '<p onclick="currentWeather"> ' + cityQ + '</p>';
        // Save city name to storage
        citiesList.push(historyText);
        console.log(historyText);
        // var cityHistory = {
        //     city_name: cityQ
        // }
        // localStorage.setItem('Search Entry', cityHistory);
        // console.log(cityHistory);
        localStorage.setItem('cities', JSON.stringify(historyText));
        historyLink.append(historyText);
        historyLink.attr('data-city', cityQ);
        historyLink.addClass('historyBtn');
        historyEl.append(historyLink);
    }

    // function weatherHistory() {
    //     historyLink = $('<div>').html('<p onclick="currentWeather()"> ' + cityQ + '</p>');
    //     // Save city name to storage
    //     citiesList.push(cityQ);
    //     // var cityHistory = {
    //     //     city_name: cityQ
    //     // }
    //     // localStorage.setItem('Search Entry', cityHistory);
    //     // console.log(cityHistory);
    //     localStorage.setItem('cities', JSON.stringify(citiesList));

    //     historyLink.attr('data-city', cityQ);
    //     historyLink.addClass('historyBtn');
    //     historyEl.append(historyLink);
    // }








    // initialize();
    // $('window').load(renderHistory);

    searchF.on('submit', search);



    butto.on('click', function() {
        clearHistory();


    });
});














// Function to grab basic weather info about city, will grab city name from search bar input














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