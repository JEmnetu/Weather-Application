var cityEl = $('#cityDiv');
var btn1 = $('#butt1');





var APIKey = '7eb2e3aab4d0bbe005ec0933144dbca0';

var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "zip=21136&units=imperial&appid=" + APIKey;
$.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(data) {
        console.log(data);
        // Function to grab basic weather info about city, will grab city name from search bar input
        btn1.on('click', function() {
                // Reset Div
                cityEl.empty();

                // City Name
                var city = $('<h2>');
                city.text('City name: ' + data.name);
                cityEl.append(city);

                // Temperature
                var temp = $('<p>');
                temp.text('Current Temperature: ' + data.main.temp);
                cityEl.append(temp);

                // Humidity
                var humidity = $('<p>').text('Humidity: ' + data.main.humidity + '%');
                cityEl.append(humidity);

                // Wind Speed
                var wind = $('<p>').text('Wind Speed: ' + data.wind.speed + 'MPH');
                cityEl.append(wind);

                // UV Index
                var uv = $('<p>').text('UV Index: ');
                cityEl.append(uv);
            }

        );
    });