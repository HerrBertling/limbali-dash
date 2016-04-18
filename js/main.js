// Docs at http://simpleweatherjs.com
$(document).ready(function() {
    function updateClock(){
        var d = new Date();
        var hours = (d.getHours() < 10 ? "0":"") + d.getHours();
        var minutes = (d.getMinutes() < 10 ? "0":"") + d.getMinutes();
        var currentTime = hours + ":" + minutes;
        $('.ld-time').html(currentTime);
    }

    function updateDate(){
        var d = new Date();
        var weekday = (d.getDate() < 10 ? "0":"") + d.getDate();
        var month = ((d.getMonth() + 1) < 10 ? "0":"") + (d.getMonth() + 1);
        var year = d.getFullYear();

        var currentDate = weekday + "." + month + "." + year;

        $('.ld-date').html(currentDate);
    }

    function setBodyBG() {
        var randomBgNum = Math.floor(Math.random()*11) + 1;
        $('body').removeClass();
        $('body').addClass('ld-bg-' + randomBgNum);
    }

    function updateWeather() {
        $.simpleWeather({
            woeid: '656958',
            location: '',
            unit: 'c',
            success: function(weather) {
                html = '<h2 class="ld-weather--today"><i class="wi wi-yahoo-'+weather.code+'"></i>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
                html += '<ul class="ld-weather--forecast">';
                for(var i=0;i<5;i++) {
                    html += '<li class="ld-weather--forecast-item"><i class="wi wi-yahoo-'+weather.forecast[i].code+'"></i><span class="ld-weather--forecast-content">'+ weather.forecast[i].day + '<br />' + weather.forecast[i].high+'&deg;</span></li>';
                }
                html += '</ul>';
                $(".ld-weather").html(html);
            },
            error: function(error) {
                $(".ld-weather").html('<p>'+error+'</p>');
            }
        });
    }

    setBodyBG();
    updateClock();
    updateWeather();
    updateDate();

    setInterval(updateClock, 10000);
    setInterval(setBodyBG, 60000);
    setInterval(updateWeather, 900000);
    setInterval(updateDate, 3600000);

});
