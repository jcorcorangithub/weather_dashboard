let cityInput;

var cities = JSON.parse(localStorage.getItem("cities"));
let cityItem = $("<a></a>");

//need to decide what to do with this
function displayTime() {
    return moment().format('MMM DD, YYYY');
  }



$("#search-button").on("click", function(){
    cityInput = $("#city-input").val().toLowerCase();
    renderSearch();
});

function renderSearch(){
    //without this preventdefault, searches completed via the search button did not work
    event.preventDefault();

    let city = cityInput;
    
    let url = "http://api.openweathermap.org/data/2.5/weather?q="+city+
    "&units=imperial&appid=1db5fbc9e14543777ea71f3e4b794636";
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
            if(cities == null){
                cities = [];
            }
            //if the city is already stored it wont add a repeat
            if(!cities.includes(city)){
                cities.push(city);
                //the next few lines will create a button/list item after the fetch has been completed 
                let cityItem = $("<li>")
                $(".list-group").append(cityItem);
                cityItem.text(city);
                cityItem.addClass('list-group-item list-group-item-action');
            } 
            localStorage.setItem("cities", JSON.stringify(cities));
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
    if(cities != null){
        for(let i=0; i<cities.length; i++){
            let cityItem = $("<li>")
            $(".list-group").append(cityItem);
            cityItem.text(cities[i]);
            cityItem.addClass('list-group-item list-group-item-action');
            cityItem.attr("data-city", cities[i]);
        }
        $(".list-group-item").on("click", function(){
            cityInput = $(this).attr("data-city");
            renderSearch();
        })
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






