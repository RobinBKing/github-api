/* functional backend code goes in this file */
var apiKey = require('./../.env').apiKey;

exports.getGHUser = function(userId){  
  var userUri = 'https://api.github.com/users/'+userId+'?access_token=' + apiKey;
  var repoUri = 'https://api.github.com/users/'+userId+'/repos?access_token=' + apiKey;
  
  //clear old values
  var apiOutput;
  var fullName = '';
  var userLogin = '';
  var avatarUrl = '';
  var htmlUrl = '';
  var location = '';
  var followers = '';
  var following = '';
  var publicRepos = '';
 
  $('#userName').append(fullName);
  $('#htmlUrl').append('<a href="'+htmlUrl+'" target="_blank">'+userLogin+'</a>');
  $('#avatar').append('<a href="'+htmlUrl+'" target="_blank"><img src="'+avatarUrl+'" width="80" height="80" alt="'+userLogin+'"></a>');
  $('#followers').append(followers);
  $('#following').append(following);
  $('#publicRepos').append(publicRepos);

  $('#repoList').empty();
  
  $.get(userUri).then(function(response){
    console.log(response);
    fullName = response.name;
    userLogin = response.login;
    avatarUrl = response.avatar_url;
    htmlUrl = response.html_url;
    location = response.location;
    followers = response.followers;
    following = response.following;
    publicRepos = response.public_repos;    
    if(fullName === undefined) { userName = userLogin; }
    
    $('#userName').append(fullName);
    $('#htmlUrl').append('<a href="'+htmlUrl+'" target="_blank">'+userLogin+'</a>');
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
