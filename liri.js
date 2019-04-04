require("dotenv").config();
const fs = require('fs');
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require('axios');
const spotify = new Spotify(keys.spotify);


var command = process.argv[2];
var input = process.argv[3];

var Ombd = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy"
var bandsInTown = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

Userinputs(command, input)

function Userinputs (command, input){
    console.log("command:" + command);
    console.log("Input: " + input);
    switch (command) {
            case "concert-this":
              concertThis(input);
              break;
            case "spotify-this":
              spotifyThis(input);
              break;
            case "movie-this":
              movieThis(input);
              break;
            case "do-what-it-says":
            doWhatItSays(input);
            break;
            default:
            console.log("somethings not right");
            break;
    }
};
// concert-this
function concertThis(){
    axios.get(bandsInTown).then(
        function(response){
            if(input === undefined){
                console.log("No data on this Artist, please try again");
            } 
                console.log("Venue: " + response.data[0].venue.name);
                console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
        }
    );

}

//spotify-this
function spotifyThis(){
    if(input === undefined){
        input = "What's My Age Again";  
    }
    spotify.search(
        {type: "track", 
        query: input 
        },
        function(err, data){
            if (err) {
                return console.log("Error Occurred: ", err);
            }
            var song = data.tracks.items;
            console.log("Artist: " + song[0].artists[0].name);
            console.log("Song Title: " + song[0].name);
            console.log("Listen Now: " + song[0].preview_url);
            console.log("Album this song is from: " + song[0].album.name);

        }
    );
}

//movie-this
function movieThis(){
    if(input === undefined){
        input = "Mr. Nobody";  
        console.log(input);
    }
    
    axios.get(Ombd).then(        
        function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMBD Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0].Value);
            console.log("Produced in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
}

//do-what-it-says
function doWhatItSays(){
  
   const data = fs.readFileSync("random.txt", "utf8")
        console.log(data);
        var dataArr = data.split(", ");
        console.log(dataArr[0], dataArr[1])
        spotifyThis(input);

}
