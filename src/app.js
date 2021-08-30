import express from "express";
import path from "path";
import hbs from "hbs";
import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";

// Define paths for Express config
const __dirname = path.resolve();
const publicDirectoryPath = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "templates", "views");
const partialsPath = path.join(__dirname, "templates", "partials");

const app = express();

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Very nice home page",
    name: "Ihor Hudkov",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page!!!",
    name: "Ihor Hudkov",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help super page",
    message: "Little help",
    name: "Ihor Hudkov",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "you must provide an address term",
    });
  }

  geocode(address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(data, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        location: data.location,
        address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "404 Error: Help article not found.",
    name: "Ihor Hudkov",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "404 Error: Page not found.",
    name: "Ihor Hudkov",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
