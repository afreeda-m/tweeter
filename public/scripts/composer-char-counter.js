const maxLength = 140;

$(document).ready(function() {
  $("#tweet-text").keyup(function(event) {

    const currentLengthRemaining = maxLength - ($(this).val().length);

    $("#current-count").text(currentLengthRemaining);

    if (currentLengthRemaining < 0){
      $("#current-count").removeClass("black").addClass("red");
    } else {
      $("#current-count").removeClass("red").addClass("black");
    };
  })
});