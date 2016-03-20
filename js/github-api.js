/* functional backend code goes in this file */
var apiKey = require('./../.env').apiKey;

exports.getGHUser = function(userName){  
  var userUri = 'https://api.github.com/users/'+userName+'?access_token=' + apiKey;
  var repoUri = 'https://api.github.com/users/'+userName+'/repos?access_token=' + apiKey;
  var apiOutput;
  
  $.get(userUri).then(function(response){
    console.log(response);
    $('#userInfo').append("<h1>"+response.name+"</h1>");

  }).fail(function(error){
    console.log(error.responseJSON.message);
    $('#userInfo').append("<h1>"+error.responseJSON.message+"</h1>");
  });
  return apiOutput;
};


