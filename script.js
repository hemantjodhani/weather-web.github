const API_KEY = "74e5d425b52f8580fd8f08d7bb0459a8";
$(document).ready(function(){

    navigator.geolocation.getCurrentPosition(function(pos) {
        const crd = pos.coords;

        var latitude = crd.latitude;
        var longitude = crd.longitude;
        var city_fetcher_api = "http://api.openweathermap.org/geo/1.0/reverse?lat="+latitude+"&lon="+longitude+"&appid="+API_KEY;
        $.get(city_fetcher_api)
        .done(function(lat_long_city){
            var city = lat_long_city[0].name;
        
            data_appender(city)
        });
    });


    function data_appender(city){
         city = $(".city-input").val() || city ;
        var api_url = "https://api.openweathermap.org/data/2.5/weather?q="+city+ "&appid=" + API_KEY + "&units=metric" ;
        $.get(api_url)
        .done(function(data){
            var current_icon = "https://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
            $(".discription").text(data.weather[0].description)
            $(".city-name").text(data.name)
            $(".exact-temp").text(data.main.temp + " C")
            $(".wind").text(data.wind.speed + " km/h")
            $(".humidity").text(data.main.humidity)
            $(".visibility").text(data.visibility)
            $(".weather-icon").attr("src", current_icon);
        })
        .fail(function(){
            alert("Sorry, couldn't load your current location");
            $(".weather-section").hide()
        })
    }
    $(".inputs svg").click(function(){
        data_appender()
        $(".weather-section").show()
    });
    $(".inputs").keydown(function(e){
        if(e.keyCode==13){
            data_appender()
            $(".weather-section").show()
        }
    });
});