$(document).ready(function(){

    var  geolocation = ""


    function ip_city_generator(){

        const api = "http://ip-api.com/json/?fields=61439"
         $.get(api)
            .done(function(ip_adress){
                // console.log(ip_adress.city)
                geolocation = ip_adress.city
                data_appender()
            })
    }
    
    function data_appender(){
        const api_key = "74e5d425b52f8580fd8f08d7bb0459a8";
        var city = $(".city-input").val() || geolocation ;
        var api_url = "https://api.openweathermap.org/data/2.5/weather?q="+city+ "&appid=" + api_key + "&units=metric" ;
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
        });
    }

    ip_city_generator()

    $(".inputs svg").click(function(){
        data_appender()
    });
    $(".inputs").keydown(function(e){
        if(e.keyCode==13){
            data_appender()
        }
    });
    
});
