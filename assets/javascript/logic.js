// Initialize Firebase
var config = {
    apiKey: "AIzaSyDWxw-9nPKC2U7W4WihPfvRS_lEQQeAHsE",
    authDomain: "train-time-9d65f.firebaseapp.com",
    databaseURL: "https://train-time-9d65f.firebaseio.com",
    projectId: "train-time-9d65f",
    storageBucket: "train-time-9d65f.appspot.com",
    messagingSenderId: "719690047313"
};
firebase.initializeApp(config);;

var database = firebase.database();

$(document).ready(function () {

    $("#submitBtn").click(function (e) {

        e.preventDefault();

        var train = $("#train-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firsttrain = $("#firsttrain-input").val().trim();
        var frequency = $("#freq-input").val().trim();

        database.ref().push({
            train: train,
            destination: destination,
            firsttrain: firsttrain,
            frequency: frequency
        })

    });

    database.ref().on("child_added", function (snapshot) {
        var row = $("<tr>");
        var traindata = $("<td>");
        var destinationdata = $("<td>");
        var freqdata = $("<td>");
        var nextdata = $("<td>");
        var minutesdata = $("<td>");


        var train = snapshot.val().train;
        var destination = snapshot.val().destination;
        var frequency = snapshot.val().frequency;


        // Assumptions

        // Time is 3:30 AM
        var firstTime = snapshot.val().firsttrain;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        traindata.text(train);
        destinationdata.text(destination);
        freqdata.text(frequency);
        nextdata.text(moment(nextTrain).format("HH:mm"));
        minutesdata.text(tMinutesTillTrain);


        row.append(traindata, destinationdata, freqdata, nextdata, minutesdata);

        $("#employee-table > tbody").append(row);

    })

    // var randomDate = "02/23/1999";
    // var randomFormat = "MM/DD/YYYY";
    // console.log(randomDate);
    // var convertedDate = moment(randomDate, randomFormat);

    // randomDate = moment(randomDate, "MM/DD/YYYY");
    // console.log(convertedDate.format("YYYY/DD/MM"));
    // console.log(convertedDate.format("YYYY/MM/DD"));
    // console.log(convertedDate.format("DD/MM/YYYY"));
    // console.log(convertedDate.format("X"));

    // console.log(convertedDate.toNow());
    // console.log(moment().diff(convertedDate, "years"));
    // console.log(moment().diff(convertedDate, "months"));
    // console.log(moment().diff(convertedDate, "days"));

    // var newDate = moment("02/14/2001", randomFormat);

    // console.log(newDate.diff(convertedDate, "days"));




})



