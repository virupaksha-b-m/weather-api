var express = require("express");
var https = require("https");
var bodyparser = require("body-parser");

var app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function (req, res) {
 

  res.sendFile(__dirname + "/index.html");
})




app.post("/",function(req,res){
  

  var contry = req.body.cityName;
  var api = "c8859080a93090795e0cbef5c2ac35c3";

const url = 
"https://api.openweathermap.org/data/2.5/weather?q="+contry+"&units=imperial&appid="+api+"";

https.get(url, function (response) {
// console.log(response.statusCode);

response.on("data", function (data) {
  const weatherData = JSON.parse(data); //object
  const temp = weatherData.main.temp;
  const Description = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;

  res.write(
    `<h1>now the current temperature of "${contry}" is ${temp}  degree celciuse</h1>`
  );
  res.write(
    `the description of the temperature in "${contry}" is "${Description}"`
  );

  // res.write(`<input type="text" value=${temp}> `);
  res.write(`<br>`)
  
  res.write(
    `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Girl in a jacket"></img>`
  );

  res.send();
});
});



})

app.listen(process.env.PORT || 3000, function () {
  console.log("server is running....on 3000");
});





