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
            localStorage.setItem("city"+city+"", city);
            return response.json();
        })
        .then(function(data){
            console.log(data);
            $(".weather-display").text(city+" weather "+data.main.temp+" farenheit");
            //this is where more commands to display info will be placed
        })
}


//this will take info from local storage and display on page 
//testing this stuff out. it currently works and adds that item
//will probbaly use a loop to add items
function displayCities(){
    $(".list-group").append("<a href='#'' class='list-group-item list-group-item-action ''>test</a>")
}

addItem();






