import request from "postman-request";

const forecast = ({ longitude, latitude } = {}, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=dd97b8c2b3a8b387bac557b0c3863993&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, {body} = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location from forecast", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out.`
      );
    }
  });
};

export default forecast;
