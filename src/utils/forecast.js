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
     callback(undefined, summary + " It is currently " + temp + " degrees out. There is a " + precipProbab + "%" + " chance of rain.");
    }
  });
};

module.exports = forecast;