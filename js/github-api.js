/* functional backend code goes in this file */
var apiKey = require('./../.env').apiKey;

exports.getGHUser = function(userId){
  var userUri = 'https://api.github.com/users/'+userId+'?access_token=' + apiKey;
  var repoUri = 'https://api.github.com/users/'+userId+'/repos?access_token=' + apiKey;

  $.get(userUri).then(function(response){
    var fullName = response.name;
    if(fullName === undefined) { fullName = response.login; }

    $('#avatar').append('<a href="'+response.html_url+'" target="_blank"><img src="'+response.avatar_url+'"alt="'+response.login+'"></a>');

    $('#userInfo').append('<h1>' + fullName + '</h1>' +
                          '<h3><span><a href="'+response.html_url+'"target="_blank">'+response.login+'</a></span></h3>' +
                          '<div>' +
                            '<p>Followers: <span>'+response.followers+'</span></p>' +
                            '<p>Following: <span>'+response.following+'</span></p>' +
                            '<p>Repositories: <span>'+response.public_repos+'</span></p>' +
                          '</div>');

    var repositories;
    $.getJSON(repoUri, function(json){
      repositories = json;
      ropoOutput = generateRepoList(repositories);
      console.log(json);
    });

  }).fail(function(error){
    $('#userInfo').append("<h1>"+error.responseJSON.message+"</h1>");
  });
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
