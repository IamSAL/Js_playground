var util = require('util');
var exec = require('child_process').exec;

var command = 'curl -X GET localhost/movie.mp4 --output downloaded_movie_js.mp4'

child = exec(command, function(error, stdout, stderr){

console.log('stdout: ' + stdout);
console.log('stderr: ' + stderr);

if(error !== null)
{
    console.log('exec error: ' + error);
}

});``