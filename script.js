let cityInput = $("#city-input");
var cities = JSON.parse(localStorage.getItem("cities"));



$("#search-button").on("click", renderSearch);


function renderSearch(event){
    event.preventDefault();

    
    let city = cityInput.val();
    
    let url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=1db5fbc9e14543777ea71f3e4b794636";

    fetch(url)
        .then(function (response){
            if(response.status != 200){
                alert("Invalid city");
                return;
            }
            
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
    
        console.log(cities);
        for(let i=0; i<cities.length; i++){
            console.log(cities[i]);
            let cityItem = $("<a></a>")
            $(".list-group").append(cityItem);
            cityItem.addClass('list-group-item list-group-item-action');
            cityItem.attr("href", "#");
            cityItem.text(cities[i]);
        }

    
}



displayCities();

function displayError(){
    $("#city-input").val("please enter a valid country");
    $("#city-input").css("color","red");

    setTimeout(function(){
        $("#city-input").val("");
        $("#city-input").css("color","black");
    },1500);
}






