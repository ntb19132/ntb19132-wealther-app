const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibmF0dGFwYXRyc3UyamF6eiIsImEiOiJja21id2g2bmcyNXg4MnZueGIwcHg1aG8xIn0.PyDvJSltv5KgH61b43GHSg&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longtitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      }); //callback(error, data)
    }
  });
};

module.exports = geocode;
