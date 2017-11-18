// Initialize Firebase
var config = {
  apiKey: "AIzaSyBZJhJvvZLBMZ193ZPqTS2hBHggKVPB3Ek",
  authDomain: "rock-paper-scissors-86334.firebaseapp.com",
  databaseURL: "https://rock-paper-scissors-86334.firebaseio.com",
  projectId: "rock-paper-scissors-86334",
  storageBucket: "",
  messagingSenderId: "732013757228"
};
firebase.initializeApp(config);

var database = firebase.database();
var playersRef = database.ref("/players");
var connectedRef = database.ref(".info/connected");

// // Initialize player variables
// database.ref("players/1").set({
//   name: "",
//   losses: 0,
//   wins: 0
// });

// database.ref("players/2").set({
//   name: "",
//   losses: 0,
//   wins: 0
// });

// // Clear chat log
// database.ref("chat").remove();

var myPosition = 0;
var myName = "";



// connectedRef.on("value", function(snap) {
//   // If they are connected..
//   if (snap.val()) {
//     // Add user to the connections list.
//     var player = playersRef.push(true);
//     // Remove user from the connection list when they disconnect.
//     con.onDisconnect().remove();
//   }
// });

// // When first loaded or when the connections list changes...
// connectionsRef.on("value", function(snap) {
//   // Display the viewer count in the html.
//   // The number of online users is the number of children in the connections list.
//   $("#messages").text(snap.numChildren());
// });




$(document).ready(function() {



  $("#startBtn").on("click", function() {

    var name = $("#name").val().trim().replace(/[^a-zA-Z 0-9]+/g, '');

    // if you haven't entered your name, error
    if(name == "") {
      $("#msgBox").text("Please enter your name.");
      return;
    }
    else {
      $("#msgBox").empty();

    }

    // Find an open spot (player 1 or 2)
    database.ref("players").once("value").then(function(snapshot) {

      if(!snapshot.child("1").exists()) {
        console.log("There is no player 1 yet");
        database.ref("players/1").update({
          name: name,
          wins: 0,
          losses: 0});

        myPosition = 1;
        myName = name;

        $("#p1name").text(name);
        $("#p1score").css("display", "inline");
      }
      else if (!snapshot.child("2").exists()) {
        console.log("There is no player 2 yet");
        database.ref("players/2").update({
          name: name,
          wins: 0,
          losses: 0});

        myPosition = 2;
        myName = name;

        $("#p2name").text(name);
        $("#p2score").css("display", "inline");

        database.ref().set({"turn": 1});
      }
      else {
        console.log("No open spot");
        $("#msgBox").text("There are already two players in this game.");
        return;
      }

      $("#topArea").html("<h2>Hi " + name + "! You are player " + myPosition + ".</h2>");
    });



    database.ref("players/1/").on("value", function(snapshot) {
      $("#p1name").text(snapshot.val().name);
    });

    database.ref("players/2/").on("value", function(snapshot) {
      $("#p2name").text(snapshot.val().name);
    });

  });









});











// players
//   1
//   2
//     losses
//     name
//     wins
//   turn