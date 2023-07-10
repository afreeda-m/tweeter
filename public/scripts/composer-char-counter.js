const maxLength = 140;

$(document).ready(function() {
  $("#tweet-text").keyup(function(event) {

    const currentLengthRemaining = maxLength - ($(this).val().length);

    $("#current-count").text(currentLengthRemaining);

    if (currentLengthRemaining < 0){
      $("#current-count").css("color", "red");
    } else {
      $("#current-count").css("color", "black");
    };
    
  })
});