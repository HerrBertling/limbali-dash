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

    function updateWeather() {
        $.simpleWeather({
            woeid: '656958',
            location: '',
            unit: 'c',
            success: function(weather) {
                html = '<h2 class="ld-weather--today"><i class="wi wi-yahoo-'+weather.code+'"></i>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
                html += '<ul class="ld-weather--forecast">';
                for(var i=0;i<5;i++) {
                    html += '<li class="ld-weather--forecast-item"><i class="wi wi-yahoo-'+weather.forecast[i].code+'"></i>'+weather.forecast[i].day+ '<br>' +weather.forecast[i].high+'&deg;</li>';
                }
                html += '</ul>';
                $(".ld-weather").html(html);
            },
            error: function(error) {
                $(".ld-weather").html('<p>'+error+'</p>');
            }
        });
    }

    var quotes = [
        "💪 Fridel is stronger than Matze! 💪",
        "✨ You are awesome! ✨",
        "🍼 Drink enough water, will you? 🍼",
        "🏃 Get up and stretch from time to time 🏃",
        "🐣 Talk to someone you don't really know 🐣",
        "🎈 Hello, handsome 🎈"
    ];

    function randomQuote() {
        var currentQuoteNum = Math.floor(Math.random()*quotes.length);
        $('.ld-quote-content').replaceWith('<h3 class="ld-quote-content">' + quotes[currentQuoteNum] + '</h3>');
    }

    setBodyBG();
    updateClock();
    updateWeather();
    randomQuote();

    setInterval(updateClock, 10000);
    setInterval(setBodyBG, 60000);
    setInterval(updateWeather, 900000);
    setInterval(randomQuote, (Math.floor(Math.random()*4) + 1) * 60000);

});
