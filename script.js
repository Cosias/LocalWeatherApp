$(document).ready(function(){
  
  var lat;//latitude
  var lon;//longitude
  var tempF;//temp in farenheight
  var tempC;//temp in celsius
  var tempSwitch = true;

  function updateWeather(){
    var geoLocation = "http://ipinfo.io/json";
    $.getJSON(geoLocation,function(geoData){
        
        latlon = geoData.loc.split(',');
        lat = latlon[0];
        lon = latlon[1];

        var api = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=d6e7aa26938297e1198318622a0257fa';
        
        $.getJSON(api, function(data){

            var weatherType = data.weather[0].description;
            var kelvin = data.main.temp;//temp in degrees kelvin
            tempF = kelvinToFarenheight(kelvin);
            tempC = kelvinToCelsius(kelvin); 

            var city = data.name;
            var country = data.sys.country;
            var weatherIcon = data.weather[0].icon;

            $("#location").text(city +","+ country);
            $("#icon").attr('src',"http://openweathermap.org/img/w/"+weatherIcon+".png");
            
            if (tempSwitch === true) {
              $("#temp").html(tempF + "&#8457");
            } else{
              $("#temp").html(tempC + "&#8451");
            }

            $("#weather").html(weatherType);
            weatherBackground(weatherIcon);
          })// JSON call for weather data from api 
      })
  }//Checks current location and updated the weather

  $("#tempSwitch").click(function(){
        if (tempSwitch === true){
          $("#temp").html(tempC + "&#8451");
          $("#degreeIcon").html("&#8457");
          tempSwitch = false;
        }
        else{ 
          $("#temp").html(tempF + "&#8457");
          $("#degreeIcon").html("&#8451");
          tempSwitch = true;
        }
  });// Adds click event to change temp between Farenheight and Celsius

  function kelvinToCelsius(kelvin){
    return Math.floor(kelvin - 273.15);
  }//Converts Kelvin temp to Celsius

  function kelvinToFarenheight(kelvin){
    return Math.floor(((kelvin * 9)/5) - 459.67);
  }//Converts Kelvin temp to Farenheight

  function weatherBackground(weatherIcon){
    
    var rain = /(09)|(10)/;
    var thunder = /(11)/;
    var clear = /(01)/;
    var snow = /(50)/;
    var clouds = /(02)|(03)|(04)/;
    var fog = /(50)/;

    if(rain.test(weatherIcon)){
      $('body').css('background-image','url("https://upload.wikimedia.org/wikipedia/commons/c/cc/Raindrops_on_water.jpg")');
    } else if (thunder.test(weatherIcon)){
      $('body').css('background-image','url("http://www.publicdomainpictures.net/pictures/30000/velka/thunder-light.jpg")');
    } else if (clear.test(weatherIcon)){
      $('body').css('background-image','url("http://www.photos-public-domain.com/wp-content/uploads/2011/02/bright-sun-in-blue-sky.jpg")');
    } else if (snow.test(weatherIcon)){
      $('body').css('background-image','url("https://upload.wikimedia.org/wikipedia/commons/0/0d/Snow_wallpaper.jpg")');
    } else if (clouds.test(weatherIcon)){
      $('body').css('background-image','url("http://www.publicdomainpictures.net/pictures/40000/velka/cloudy-sky-6.jpg")');
    } else if (fog.test(weatherIcon)){
      $('body').css('background-image','url("https://static.pexels.com/photos/5230/road-fog-foggy-mist.jpg")');
    }
  }// Updates the background image depending on the weather conditions 

  function updateDate() {
    
    var d = new Date();
    var hrs = d.getHours();
    var mins = d.getMinutes();
    var amPm;

    if(mins < 10){
      mins = '0'+mins;
    }

    if (hrs<12) {
      if(hrs === 0){
        hrs = 12;
      }
      amPm = 'AM';
    } else {
      amPm = 'PM';
      hrs-=12;
    }

    var currentDate = d.getMonth()+1 +"/"+ d.getDate()+ "/"+ d.getFullYear();
    
    $("#date").text(currentDate);
    $("#lastRefresh").text("Last Updated: " + hrs + ':' + mins + ' '+ amPm);

  }//Checks and updates the current date being displayed

  function refresh(){
    updateDate();
    updateWeather();
  }//Updates the weather and date

  $("#refreshBtn").click(function(){refresh()});

  refresh();
  
});