/* functional backend code goes in this file */
var apiKey = require('./../.env').apiKey;

exports.getGHUser = function(userId){  
  var userUri = 'https://api.github.com/users/'+userId+'?access_token=' + apiKey;
  var repoUri = 'https://api.github.com/users/'+userId+'/repos?access_token=' + apiKey;
  var apiOutput;
  
  $.get(userUri).then(function(response){
    console.log(response);
    var userName   = response.name;
    var userLogin   = response.login;
    var avatarUrl     = response.avatar_url;
    var htmlUrl = response.html_url;
    var location   = response.location;
    var followers = response.followers;
    var following = response.following;
    var publicRepos     = response.public_repos;
    
    if(userName === undefined) { userName = userLogin; }
    
    $('#userName').append(userName);
    $('#htmlUrl').append('<a href="'+htmlUrl+'" target="_blank">'+userLogin+'</a>)';
    $('#avatar').append('<a href="'+htmlUrl+'" target="_blank"><img src="'+avatarUrl+'" width="80" height="80" alt="'+userLogin+'"></a>');
    $('#followers').append(followers);
    $('#following').append(following);
    $('#publicRepos').append(publicRepos);
    
    var repositories;
    $.getJSON(repoUri, function(json){
      repositories = json;
      ropoOutput = generateRepoList(repositories);
      console.log(json);
    });

  }).fail(function(error){
    $('#erroMsg').append("<h1>"+error.responseJSON.message+"</h1>");
  });
  return apiOutput;
};


function generateRepoList(repositories) {
  var outputHtml = '<ul>'; 
  if(repositories.length === 0) {outputHtml += '<li>No repositories found</li>'; }
  else {
    $.each(repositories, function(i) {
    outputHtml += '<li><a href="'+repositories[i].html_url+'" target="_blank">'+repositories[i].name + '</a></li>';
    });
  }
  outputHtml += "</ul>";
  $('#repoList').append(outputHtml);
}
