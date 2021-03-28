let cityInput = $("#city-input");
let citiesA = [];
var cities = JSON.parse(localStorage.getItem("cities"));
let cityItem = $("<a></a>");

function displayTime() {
    return moment().format('MMM DD, YYYY');
  }



$("#search-button").on("click", renderSearch);

//this is supposed to fill the search box with the clicked item
$("cityItem").on("click", cityInput.val(cityItem.text()));


function renderSearch(event){
    event.preventDefault();
    
    let city = cityInput.val().toLowerCase();
    
    let url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=1db5fbc9e14543777ea71f3e4b794636";

    fetch(url)
        .then(function (response){
            if(response.status != 200){
                alert("Invalid city");
                //displayError();
                return;
            }
            //if the city is already stored it wont add a repeat
            if(!cities.includes(city)){
                cities.push(city);
            } 
            
            localStorage.setItem("cities", JSON.stringify(cities));
            
            return response.json();
        })
        .then(function(data){
            console.log(data);
            //this will be the main display
            $(".city-name").text(city);
            $(".date").text(displayTime);
            $(".weather-icon").text("condition are "+data.weather[0].main+" img");
            $(".temperature").text(data.main.temp+" farenheit");
            $(".humidity").text("humidity is "+data.main.humidity+" %");
            $(".wind-speed").text("wind speed is "+data.wind.speed+" mph");
            $(".uv-index").text("uv-index");
        })
}

previouslySearchedCities();





function previouslySearchedCities(){
    
        // var storedCities = JSON.parse(localStorage.getItem("cities"));
        console.log(cities);
        for(let i=0; i<cities.length; i++){
            console.log(cities[i]);
            // let cityItem = $("<a></a>")
            // $(".list-group").append(cityItem);
            // cityItem.addClass('list-group-item list-group-item-action');
            // cityItem.attr("href", "#");
            // cityItem.text(cities[i]);
            // $(cityItem).on("click", cityInput.val("zzz"));

            let cityItem = $("<li>")
            $(".list-group").append(cityItem);
            cityItem.text(cities[i]);
            cityItem.addClass('list-group-item list-group-item-action');
            
        }

    
}


function displayError(){
    $("#city-input").val("please enter a valid city");
    $("#city-input").css("color","red");

    setTimeout(function(){
        $("#city-input").val("");
        $("#city-input").css("color","black");
    },1500);
}






