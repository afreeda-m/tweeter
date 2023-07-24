const maxLength = 140;

// implement character counter
$(document).ready(function() {
  $("#tweet-text").keyup(function(event) {

    const currentLengthRemaining = maxLength - ($(this).val().length);

    $("#current-count").text(currentLengthRemaining);

    // change CSS properties based on count to indicate count limit exceeded
    if (currentLengthRemaining < 0){
      $("#current-count").removeClass("black").addClass("red");
    } else {
      $("#current-count").removeClass("red").addClass("black");
    };
  })
});