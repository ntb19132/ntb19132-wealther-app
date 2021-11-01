const request = require("postman-request");

const forecast = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2400ae8f72c11a09ef90c0f3cf175d4b&query=${latitude},${longtitude}&units=f`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions +
          ". It is currently " +
          response.body.current.temperature +
          " degrees out. It feels like " +
          response.body.current.feelslike +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
