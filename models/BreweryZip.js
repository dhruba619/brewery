//node packages
var zipcodes = require("zipcodes");
var request = require("request");

var queryURL1 = "https://api.brewerydb.com/v2/search/geo/point?key=";
//api key for testing
var apiKey = "7666aff49d47c147ba22244312acf587";
//full API Key
var apiKey02 = "dd89d2e84b2df24a8168a303c291c04c";
var queryURL2 = "&lat=";
var queryURL3 = "&lng=";
var queryURL4 = "&radius=";
var testZip = 90210;
var testRadius = 50;

//Array to store all Brewery Objects from API Pull
//This array is populated using getBreweriesZip function
var breweriesArray = [];

//Array to store only open Brewey Objects from API Pull
//this array is populated using the getOpenBreweries function
var breweriesOpenArray = [];

//FUNCTION TO TEXT API PULL FROM BreweryDB using zip code and radius
function getBreweriesZip(zipCode, radius, breweries) {
  var zipObject = zipcodes.lookup(zipCode);
  var latitude = zipObject.latitude;
  var longitude = zipObject.longitude;
  var queryURL =
    queryURL1 +
    apiKey +
    queryURL2 +
    latitude +
    queryURL3 +
    longitude +
    queryURL4 +
    radius;
  console.log("queryURL: " + queryURL);

  request(queryURL, function(error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      console.log(
        "Status Result of BreweryDB API call: " + JSON.parse(body).status
      );

      //empty the Brewery Array
      breweriesArray = [];

      for (var i = 0; i < JSON.parse(body).data.length; i++) {
        breweries[i] = JSON.parse(body).data[i];
        console.log(breweries[i].longitude);
        //add brewery object to external array
        breweriesArray.push(breweries[i]);
        console.log(
          i +
            "th element of external Breweries Array: " +
            breweriesArray[i].latitude
        );
        console.log(
          i +
            "th element of external Breweries Array brand classification: " +
            breweriesArray[i].brewery.brandClassification
        );
      }
    }
  });
}

/*
function getOpenBreweries(allBreweries, openBreweries) {
 //empty the openbreweries array
 openBreweries = [];
 //add only the open breweries from "allBreweries" to the "openBreweries" Array
 for (var i = 0, i < allBreweries.length, i++) {
   console.log(i);
 }
} */

/*
function getOpenCraftBreweries(allBreweries, openBreweries) {
 //empty the openbreweries array
 openBreweries = [];
 //add only the open breweries from "allBreweries" to the "openBreweries" Array
 for (i = 0, i < allBreweries.length, i++) {
   if (allBreweries[i].openToPublic = "Y" && ) {
     openBreweries.push(allBreweries[i]);
   }
 }
} */

getBreweriesZip(testZip, testRadius, breweriesArray);
