// require("dotenv").config();
// var request = require('request');
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var request = require("request");
var fs = require('fs');
var moment = require('moment');
var input1 = process.argv[2];
var input2 = process.argv[3];
var date;
if (input1 === 'movie-this') {
    if(!input2) {
        input2 = 'Mr. Nobody'
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + input2 + "&y=&apikey=trilogy";    
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(body));
            var details = JSON.parse(body);
            console.log(`
            Title: ${details.Title}
            --
            Year: ${details.Year}    
            --
            IMDB Rating: ${details.Ratings[0].Value}   
            --       
            Rotton Tomatoes Rating: ${details.Ratings[1].Value}   
            --  
            Country: ${details.Country}   
            --
            Language: ${details.Language}
            --
            Plot: ${details.Plot}
            --
            Actors: ${details.Actors}
            `)
        }
    })
} else if(input1 === 'concert-this') {
    var queryUrl = "https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {     
            var details = JSON.parse(body);
            for(var i = 0; i < details.length; i++) {
                date = moment(details[i].datetime).format('MM-DD-YYYY')
                console.log(`
                Venue:     ${details[i].venue.name}
                Location:  ${details[i].venue.city}, ${details[i].venue.country} 
                Date:      ${date}
                `)
            }
        }
    })
} else if(input1 === 'spotify-this-song') {
    //call spotify api with terminal commands to output information on song
} else if (input1 === 'do-what-it-says') {
    //var data = data from local file
    //run spotify call with data as parameter
} else {
    console.log('that was not a valid command');
}
