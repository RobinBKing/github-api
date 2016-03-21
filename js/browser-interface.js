/* Front-end User interface (jquery) code goes in this file */
var getGHUser = require('../js/github-api.js').getGHUser;

$(document).ready(function() {
  // $("form").submit(function (event) {
  $('#submitBtn').on('click', function(event){
    event.preventDefault();
    // $(".ghContent").empty();
    var userName = $('input#userName').val();
    getGHUser(userName);
    $('.ghContent').show();
  });
});