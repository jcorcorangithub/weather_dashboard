let cityInput = $("#city-input");

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
    let error = false;
    fetch(url)
        .then(function (response){
                if(response.status != 200){
                    displayError();
                    error = true;
                    return error;
                } else {
                    return response.json();
                }
        })
        .then(function(data){
            if(error == true){
                return;
            }
            error = false;
            if(cities == null){
                cities = [];
            }
            //if the city is already stored it wont add a repeat
            if(!cities.includes(city)){
                cities.push(city);
            } 
            
            localStorage.setItem("cities", JSON.stringify(cities));

            //this will create a button/list item after the fetch has been completed 
            let cityItem = $("<li>")
            $(".list-group").append(cityItem);
            cityItem.text(city);
            cityItem.addClass('list-group-item list-group-item-action');
            
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
        for(let i=0; i<cities.length; i++){
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






