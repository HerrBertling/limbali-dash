// Docs at http://simpleweatherjs.com
$(document).ready(function() {
    function updateClock(){

        var d = new Date();
        var hours = (d.getHours() < 10 ? "0":"") + d.getHours();
        var minutes = (d.getMinutes() < 10 ? "0":"") + d.getMinutes();
        var currentTime = hours + ":" + minutes;
        $('.ld-time').html(currentTime);
    }
    function setBodyBG() {
        var randomBgNum = Math.floor(Math.random()*11) + 1;
        $('body').removeClass();
        $('body').addClass('ld-bg-' + randomBgNum);
    }

    setBodyBG();
    updateClock();

    $.simpleWeather({
        woeid: '656958',
        location: '',
        unit: 'c',
        success: function(weather) {
            html = '<h2 class="ld-weather--today"><i class="wi wi-yahoo-'+weather.code+'"></i>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
            html += '<ul class="ld-weather--forecast">';
            for(var i=0;i<5;i++) {
                html += '<li class="ld-weather--forecast-item"><i class="wi wi-yahoo-'+weather.code+'"></i>'+weather.forecast[i].day+ '<br>' +weather.forecast[i].high+'&deg;</li>';
            }
            html += '</ul>';
            $(".ld-weather").html(html);
        },
        error: function(error) {
            $(".ld-weather").html('<p>'+error+'</p>');
        }
    });



    setInterval(updateClock, 10000);
    setInterval(setBodyBG, 60000);

});
