const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = "https://api.darksky.net/forecast/28bf34804de18a06039290e235b33a4d/" + latitude + "," + longitude + "?units=si&lang=uk";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to the weather service.", undefined)
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
     const temp = body.currently.temperature;
     const precipProbab = parseInt(body.currently.precipProbability*100);
     const summary = body.daily.data[0].summary;
     const maxTemp = body.daily.data[0].temperatureHigh;
     const minTemp = body.daily.data[0].temperatureLow;
     callback(undefined, summary + " Зараз " + temp + "\u2103. Ймовірність опадів: " + precipProbab + "%. Температурний максимум сьогодні: " + maxTemp + "\u2103 . Мінімальне значення: " + minTemp + "\u2103.");
    }
  });
};

module.exports = forecast;