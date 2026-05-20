'use strict'

const API_KEY = '566b8912206058fcbe45e6ca77863369';

document.getElementById('btn'),addEventListener('click', getWeather);

function getWeather() {
  const city = document.getElementById('city').value;
  const result = document.getElementById('result');

  if(!city) {
    result.innerText = '都市名を入力してください';
    return;
  }

  result.innerText = '取得中...'

    // APIに接続し、都市名から天気を取得
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},JP&appid=${API_KEY}&lang=ja`)

    .then(function(res){
      return res.json();
    })
    .then(function(weather_data){
      if(weather_data.cod !== 200){
        result.innerText = '都市が見つかりません';
        return;
      }

    // 気温単位変換（ケルビン→摂氏℃）
    const temp = (weather_data.main.temp - 273.15).toFixed(2);

    // 結果表示
    result.innerText = `
    都市: ${weather_data.name}
    天気: ${weather_data.weather[0].description}
    気温: ${temp}℃
    湿度: ${weather_data.main.humidity}%
    風速: ${weather_data.wind.speed}m/s
    `;
    })

    .catch(function() {
      result.innerText = '通信エラーが発生しました'
    });
  }
