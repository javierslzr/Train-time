$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDWxw-9nPKC2U7W4WihPfvRS_lEQQeAHsE",
        authDomain: "train-time-9d65f.firebaseapp.com",
        databaseURL: "https://train-time-9d65f.firebaseio.com",
        projectId: "train-time-9d65f",
        storageBucket: "",
        messagingSenderId: "719690047313"
      };
      firebase.initializeApp(config);
x   
    var database = firebase.database();


    database.ref().on("child_added", function (snapshot) {
        var row = $("<tr>");
        var namedata = $("<td>");
        var roledata = $("<td>");
        var datedata = $("<td>");
        var ratedata = $("<td>");
        var monthsdata = $("<td>");
        var totaldata = $("<td>");

        var name = snapshot.val().name;
        var role = snapshot.val().role;
        var date = snapshot.val().date;
        var rate = snapshot.val().rate;
        var months = snapshot.val().months;
        var total = snapshot.val().total;

        namedata.text(name);
        roledata.text(role);
        datedata.text(date);
        ratedata.text(rate);
        monthsdata.text(months);
        totaldata.text(total);

        row.append(namedata, roledata, datedata, monthsdata, ratedata, totaldata);

        $("#employee-table > tbody").append(row);

    })


    $("#submitBtn").click(function (e) {

        e.preventDefault();

        var row = $("<tr>");
        var namedata = $("<td>");
        var roledata = $("<td>");
        var datedata = $("<td>");
        var ratedata = $("<td>");

        var name = $("#name-input").val().trim();
        var role = $("#role-input").val().trim();
        var date = $("#date-input").val().trim();
        var rate = $("#rate-input").val().trim();

        var startDate = moment(date, "MM/DD/YYYY");
        var months = moment().diff(startDate, "months");

        var total = parseInt(months) * parseInt(rate);







        database.ref().push({
            name: name,
            role: role,
            date: date,
            rate: rate,
            months: months,
            total: total
        })

    });


    var randomDate = "02/23/1999";
    var randomFormat = "MM/DD/YYYY";
    console.log(randomDate);
    var convertedDate = moment(randomDate, randomFormat);

    randomDate = moment(randomDate, "MM/DD/YYYY");
    console.log(convertedDate.format("YYYY/DD/MM"));
    console.log(convertedDate.format("YYYY/MM/DD"));
    console.log(convertedDate.format("DD/MM/YYYY"));
    console.log(convertedDate.format("X"));

    console.log(convertedDate.toNow());
    console.log(moment().diff(convertedDate, "years"));
    console.log(moment().diff(convertedDate, "months"));
    console.log(moment().diff(convertedDate, "days"));

    var newDate = moment("02/14/2001", randomFormat);

    console.log(newDate.diff(convertedDate, "days"));




})



