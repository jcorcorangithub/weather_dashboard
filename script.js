let cityInput = $("#city-input");

$("#search-button").on("click", renderSearch);


function renderSearch(event){
    event.preventDefault();

    let city = cityInput.val();
    let url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=1db5fbc9e14543777ea71f3e4b794636";

    fetch(url)
        .then(function (response){
            if(response.status != 200){
                //change this so that it is not a window alert
                alert("Invalid city");
            }
            return response.json();

        })
        .then(function(data){
            //console.log(data);
            $("p").text("city weather " + city);
            //this is where more commands to display info will be placed
        })
}




