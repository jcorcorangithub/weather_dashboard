let cityInput = $("#city-input");


$("#search-button").on("click", renderSearch);


function renderSearch(event){
    event.preventDefault();

    
    let city = cityInput.val();
    
    let url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=1db5fbc9e14543777ea71f3e4b794636";

    fetch(url)
        .then(function (response){
            if(response.status != 200){
                //change this so that it is not a window alert
                alert("Invalid city");
                return;
            }
            //store searched cities into an array
    
            //localStorage.setItem("city"+city+"", city);
            var cities = [];
            cities.push(city);
            localStorage.setItem("cities", JSON.stringify(cities));
            


            return response.json();
        })
        .then(function(data){
            console.log(data);
            $(".weather-display").text(city+" weather "+data.main.temp+" farenheit");
            //this is where more commands to display info will be placed
        })
}


function displayCities(){
    
        var storedCities = JSON.parse(localStorage.getItem(cities));
        for(i=0; i<cities.length; i++){
            var city = storedCities[i];
            $(".list-group").append("<a href='#' class='list-group-item list-group-item-action>'"+city+"</a>")
        }

    // var city = localStorage.getItem(city);
    // $(".list-group").append("<a href='#' class='list-group-item list-group-item-action>'"+city+"</a>")
}

displayCities();






