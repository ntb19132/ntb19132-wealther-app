const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nattapat Siripin",
  });
});

app.get("/about", (req, res) => {
  res.render("About", {
    title: "About",
    name: "Nattapat Siripin",
  });
});

app.get("/help", (req, res) => {
  res.render("Help", {
    title: "Help",
    helpText: "This is some helpful text",
    name: "Nattapat Siripin",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return console.log("Error", error);
      }
      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
          return console.log("Error", error);
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Nattapat Siripin",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "page not found",
    name: "Nattapat Siripin",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000");
});
