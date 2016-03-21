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

    if(userName == undefined) { userName = userLogin; }
    
    $('#userName').append(userName);
    $('#htmlUrl').append('(@<a href="'+htmlUrl+'" target="_blank">'+userLogin+'</a>)');
    $('#avatar').append('<a href="'+htmlUrl+'" target="_blank"><img src="'+avatarUrl+'" width="80" height="80" alt="'+userLogin+'"></a>');
    $('#followers').append(followers);
    $('#following').append(following);
    $('#publicRepos').append(publicRepos);
    // var userHtml = '<h2>'+userName+' <span class="smallname">(@<a href="'+htmlUrl+'" target="_blank">'+userLogin+'</a>)</span></h2>';
    // userHtml += '<div class="ghcontent"><div class="avi"><a href="'+htmlUrl+'" target="_blank"><img src="'+avatarUrl+'" width="80" height="80" alt="'+userLogin+'"></a></div>';
    // userHtml += '<p>Followers: '+followers+' - Following: '+following+'<br>Repos: '+publicRepos+'</p></div>';
    // userHtml += '<div class="repolist clearfix">';
    // $('#userInfo').append(userHtml);
    
    var repositories;
    $.getJSON(repoUri, function(json){
      repositories = json;
      ropoOutput = outputPageContent(repositories);
    });

  }).fail(function(error){
    console.log(error.responseJSON.message);
    $('#erroMsg').append("<h1>"+error.responseJSON.message+"</h1>");
  });
  return apiOutput;
};


function outputPageContent(repositories) {
  if(repositories.length == 0) { var outputHtml = '<p>No repos!</p></div>'; }
  else {
    outputHtml += '<p><strong>Repos List:</strong></p> <ul>';
    $.each(repositories, function(i) {
      outputHtml += '<li><a href="'+repositories[i].html_url+'" target="_blank">'+repositories[i].name + '</a></li>';
    });
    outputHtml += '</ul></div>';
  }
  $('#repoList').append(outputHtml);
};
