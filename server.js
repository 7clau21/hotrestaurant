// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // Reservation Tables (DATA)
// // =============================================================
var reservations = [
];

var waitlist = [
];
// // Routes
// // =============================================================

 // Basic route that sends the user first to the AJAX Page
 app.get("/", function(req, res) {
 res.sendFile(path.join(__dirname, "homepage.html"));
 });

 app.get("/viewtables", function(req, res) {
res.sendFile(path.join(__dirname, "viewtables.html"));
 });

 app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
   });

 // Get all reservations
app.get("/all", function(req, res) {
res.json(reservations);
 });

 app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
 });

 app.get("/api/tables", function(req, res) {
  return res.json(reservations);
 });

  //    var chosen = req.params.reservations;
 // Search for reservations (all current and waitlist) - provides JSON
// app.get("/api/:reservations?", function(req, res) {
//    var chosen = req.params.reservations;

//    if (chosen) {
//      console.log(chosen);

//      for (var i = 0; i < reservations.length; i++) {
//        if (chosen === reservations[i].routeName) {
//          return res.json(reservations[i]);
//        }
//      }
//      return res.json(false);
//    }
//    return res.json(reservations);
//  });

//  app.get("/api/:waitlist?", function(req, res) {
//   var wait = req.params.waitlist;

//   if (wait) {
//     console.log(wait);

//     for (var i = 0; i < waitlist.length; i++) {
//       if (wait === waitlist[i].routeName) {
//         return res.json(waitlist[i]);
//       }
//     }
//     return res.json(false);
//   }
//   return res.json(waitlist);
// });

// Create New Reservation - takes in JSON input
 app.post("/api/new", function(req, res) {
   // req.body hosts is equal to the JSON post sent from the user
   // This works because of our body-parser middleware
   var newReservation = req.body;
   var newWaitlist = req.body;
   // Using a RegEx Pattern to remove spaces from newReservation
   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
   newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
   newWaitlist.routeName = newWaitlist.name.replace(/\s+/g, "").toLowerCase();
   console.log(newReservation);
   console.log(newWaitlist);

   reservations.push(newReservation);
   if (reservations.length < 5) {
    res.json(newReservation);
   }
else {
  reservations.push(newWaitlist);
  res.json(newWaitlist);
}
   
 });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
